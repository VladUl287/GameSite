import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SearchGame } from 'src/app/models/searchGame';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  searchedGame: Array<SearchGame> = new Array<SearchGame>();
  userId: string | undefined = undefined;
  email: string | undefined = undefined; 
  productName: string | undefined = undefined;
  
  constructor(
    private router: Router, 
    private dataService: DataService,
    private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token != null) {
      let parseToken =  JSON.parse(window.atob(token.split('.')[1]));
      this.userId = parseToken.id;
      this.email = parseToken.email;
    }
    else {
      this.router.navigateByUrl('/auth/login');
    }
  }

  search(name: string) {
    if(name.length > 10 && this.searchedGame.length == 0) {
      return;
    }
    if(name.length == 0) {
      this.searchedGame = [];
      return;
    }
    let load = document.querySelector('.search-zone');
    load?.classList.add('loading');
    this.dataService.getGamesByName(name).toPromise()
      .then(
        (data: SearchGame[]) => {
          this.searchedGame = data;
          load?.classList.remove('loading');
          this.cd.markForCheck();
        }
      )
      .catch(
        () => {
          this.searchedGame.length = 0;
          load?.classList.remove('loading');
          this.cd.markForCheck();
        }
      );
  }
}
