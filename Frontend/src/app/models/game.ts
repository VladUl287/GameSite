import { SafeUrl } from "@angular/platform-browser";
import { Guid } from "guid-typescript";
import { GameComment } from "./comment";
import { Genre } from "./genre";

export class Game {
  constructor(
      public id: Guid,
      public name: string,
      public description: string,
      public poster: string,
      public posterUrl: SafeUrl,
      public releaseDate: string,
      public rating: number,
      public countReviews: number,
      public genreId: number,
      public genre: Genre,
      public comments: GameComment[]
    ) {}
}