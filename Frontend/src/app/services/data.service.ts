import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { Guid } from 'guid-typescript';
import { FormGroup } from '@angular/forms';
import { Genre } from '../models/genre';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SearchGame } from '../models/searchGame';
import { GameComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class DataService {  
  private baseUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl + 'api/game');
  }

  getGamesByGenre(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl + 'api/game/genre/' + id);
  }

  getGamesByName(name: string): Observable<SearchGame[]> {
    return this.http.get<SearchGame[]>(this.baseUrl + 'api/game/name/' + name);
  }

  getGame(id: Guid): Observable<Game> {
    return this.http.get<Game>(this.baseUrl + 'api/game/' + id)
  }

  createGame(gameForm: FormGroup, poster: File) {
    const formData: FormData = new FormData();
    Object.keys(gameForm.controls).forEach((key: string) => {
      formData.append(key, gameForm.controls[key].value);
    });
    formData.append('image', poster, poster.name);

    return this.http.post(this.baseUrl + 'api/game', formData);
  }

  updateGame(id: Guid, game: Game) {
    return this.http.put(this.baseUrl + 'api/game' + id, game);
  }
  
  deleteGame(id: Guid) {
    return this.http.delete(this.baseUrl + 'api/game/' + id);
  }

  commentExists(gameId: Guid, userId: Guid): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'api/comment/' + gameId + '/' + userId);
  }

  createComment(create: GameComment) {
    const formData = new FormData();
    formData.append('Rating', create.rating.toString());
    formData.append('Text', create.text);
    formData.append('GameId', create.gameId.toString());
    formData.append('UserId', create.userId.toString());
    formData.append('UserEmail', create.userEmail);
    return this.http.post(this.baseUrl + 'api/comment', formData);
  }

  deleteComment(id: number) {
    return this.http.delete(this.baseUrl + 'api/comment/' + id);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseUrl + 'api/genre');
  }

  createGenre(name: string) {
    return this.http.post(this.baseUrl + 'api/genre', { Name: name });
  }

  deleteGenre(id: number) {
    return this.http.delete(this.baseUrl + 'api/genre/' + id);
  }

  getPosterUrl(poster: string) {
    let objectUrl = 'data:image/png;base64,' + poster;
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }
}