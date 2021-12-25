import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from 'src/app/models/genre';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'create-games',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameComponent implements OnInit {
  genres: Array<Genre> | null = null;
  poster: File | null = null;
  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(2500)]),
    releaseDate: new FormControl('', Validators.required),
    genreId: new FormControl('', Validators.required)
  });

  constructor(private dataService: DataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.getGenres().toPromise()
      .then(
        (data: Genre[]) => {
          this.genres = data;
          this.cd.markForCheck();
        }
      );
  }

  createGame() {
    if(this.poster != null && this.createForm.valid) {
      this.dataService.createGame(this.createForm, this.poster).toPromise()
      .then(
        () => this.createForm.reset()
      );
    }
  }

  handleFileInput(event: any) {
    this.poster = event.target.files[0];
  }
}