import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/models/LoginDTO';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() redirectRoute: string;
  @Output() loginSuccessCallback = new EventEmitter();

  form: FormGroup;
  submitting: boolean = false;
  isError: boolean = false;
  errMsg: string = 'Some error has occured!';
  accountLocked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private tokenService: TokenService,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl([], [Validators.required]),
      password: new FormControl([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    // clear off any tokens in cache
    // if user lands on login
    //
    if (this.tokenService.IsAuthenticated) {
      this.router.navigate(['/dashboard']);
    } else {
      this.tokenService.clearToken();
    }

  }

  login() {
    this.submitting = true;
    this.isError = false;
    this.accountLocked = false;
    this.authService.login(<LoginDTO>this.form.value)
      .then((response) => {
        this.tokenService.setToken(response);
        let loginCallback = {
          redirectRoute: this.redirectRoute
        };

        this.loginSuccessCallback.emit(loginCallback);
      })
      .catch((response) => {
        this.form.patchValue({ password: '' });
        if (response.status === 401) {
          this.accountLocked = true;
          this.errMsg = response.error.errors.error;
        }

        if (!response.status) {
          this.errMsg = response.errors.error;
        }

        this.submitting = false;
        this.isError = true;
      });
  }

  back() {
    this.location.back();
  }

  open(content: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, { centered: true });
  }
}
