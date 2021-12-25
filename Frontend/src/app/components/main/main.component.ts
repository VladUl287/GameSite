import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { GameComment } from 'src/app/models/comment';
import { Game } from 'src/app/models/game';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  game: Game | undefined;
  userId: Guid | undefined;
  commentText: string = "";
  rating: number = 0;
  commentIsExists: boolean = false;
  isAdmin: boolean = false;
  ratingRes: number | string = "Недостатоно оценок";

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router) {
    route.params.subscribe(
      data => {
        this.getGame(data.id);
        let token = this.userService.getUserToken();
        this.userId = token.id;
        if (token.role == 'Admin') {
          this.isAdmin = true;
        }
        this.dataService.commentExists(data.id, token.id).toPromise()
          .then(
            (data: boolean) => {
              if (!data) {
                this.commentIsExists = true;
              }
              else {
                this.commentIsExists = false;
              }
              this.cd.markForCheck();
            }
          )
      }
    );
  }

  getGame(id: Guid) {
    this.dataService.getGame(id).toPromise()
      .then(
        (data: Game) => {
          this.game = data;
          this.game.posterUrl = this.dataService.getPosterUrl(this.game.poster);
          if(this.game.countReviews > 10 && this.game.rating > 0) {
            this.ratingRes = this.game.rating / this.game.countReviews;
          }
          this.cd.markForCheck();
        })
      .catch(
        () => {
          this.router.navigateByUrl('/games');
        }
      );
  }


  async createComment() {
    if (this.game && this.commentText.length != 0 && this.rating != 0) {
      let token = this.userService.getUserToken();
      let crt = new GameComment(0, this.game.id, token.id, this.rating, this.commentText, token.email);
      await this.dataService.createComment(crt).toPromise();
      this.getGame(this.game.id);
      this.commentIsExists = true;
      this.commentText = '';
      this.cd.markForCheck();
    }
  }

  async delete() {
    if (this.game) {
      await this.dataService.deleteGame(this.game.id).toPromise();
    }
    this.router.navigateByUrl('/games');
  }

  async deleteComment(comment: GameComment) {
    if (this.game) {
      const index = this.game.comments.indexOf(comment);
      if (index > -1) {
        this.game.comments.splice(index, 1);
      }
      this.commentIsExists = false;
    }
    this.cd.markForCheck();
    await this.dataService.deleteComment(comment.id).toPromise();
  }

  handleChange(event: any) {
    switch (event.target.id) {
      case "star10":
        this.rating = 1;
        break;
      case "star9":
        this.rating = 2;
        break;
      case "star8":
        this.rating = 3;
        break;
      case "star7":
        this.rating = 4;
        break;
      case "star6":
        this.rating = 5;
        break;
      case "star5":
        this.rating = 6;
        break;
      case "star4":
        this.rating = 7;
        break;
      case "star3":
        this.rating = 8;
        break;
      case "star2":
        this.rating = 9;
        break;
      case "star1":
        this.rating = 10;
        break;
      default:
        this.rating = 0;
        break;
    }
  }
}