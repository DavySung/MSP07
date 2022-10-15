import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public isCollapsed = true;
  constructor(private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }

}
