import { Component, NgZone, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public tokenService: TokenService,
    private title: Title,
    private metaService: Meta) { }

  ngOnInit(): void {

    this.title.setTitle("Login | MSP")

    if (this.tokenService.IsAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  loginHandler(response: any) {
    console.log(response);
    this.router.navigate(['/']);
  }

}
