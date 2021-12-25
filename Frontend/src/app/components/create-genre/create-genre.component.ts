import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGenreComponent implements OnInit {
  genreName: string | null = null;
  genres: Array<Genre> = new Array<Genre>();
  constructor(private dataService: DataService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getGenres();
  }

  private getGenres() {
    this.dataService.getGenres().toPromise()
      .then(
        (data: Genre[]) => {
          this.genres = data;
          this.cd.markForCheck();
        });
  }

  createGenre() {
    if(this.genreName) {
      this.dataService.createGenre(this.genreName).toPromise()
        .then(() => {
          this.genreName = '';
          this.getGenres();
        });
    }
  }

  delete(genre: Genre) {
    this.dataService.deleteGenre(genre.id).toPromise()
      .then(
        () => { 
          this.genres.splice(this.genres.indexOf(genre), 1);
          this.cd.markForCheck();
      });
  }
}
