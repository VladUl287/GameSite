import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Genre } from 'src/app/models/genre';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllGamesComponent implements OnInit {
  public games: Game[] | undefined;
  public genres: Array<Genre> = new Array<Genre>();

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllGenres();
  }

  getAllGames(): void {
    this.dataService.getGames().toPromise()
      .then(
        (data: Game[]) => {
          this.games = data;
          this.games.map(elem => {
            elem.posterUrl = this.dataService.getPosterUrl(elem.poster)
          });
          this.cd.markForCheck();
        }
      )
      .catch(
        (error) => {
          this.error(error);
        }
      );
  }

  private getAllGenres(): void {
    this.dataService.getGenres().toPromise()
      .then(
        (data: Genre[]) => {
          this.genres = data;
          this.cd.markForCheck();
        }
      )
      .catch(
        (error) => {
          this.error(error);
        }
      );
  }

  error(error: HttpErrorResponse): void {
    if (error.status == 401) {
      localStorage.removeItem('token');
      this.router.navigateByUrl("/auth/login");
    }
  }

  getGamesByGenre(id: number): void {
    this.games = undefined;
    this.dataService.getGamesByGenre(id).toPromise()
      .then(
        (data: Game[]) => {
          this.games = data;
          this.games.map(elem => {
            elem.posterUrl = this.dataService.getPosterUrl(elem.poster)
          });
          this.cd.markForCheck();
        }
      );
  }
}