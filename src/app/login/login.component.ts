import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { SpinnerService } from '../utilities/spinner/spinner.service';
import { Router } from '@angular/router';
import { AlertModalService } from '../utilities/alert-modal/alert-modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private loginService: LoginService,
    private router: Router,
    private alertModalService: AlertModalService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.spinnerService.open();
      let params = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.loginService
        .login(params)
        .subscribe({
          next: (data: any) => {
            if (data['status']) {
              console.log('🚀 ~ LoginComponent ~ login ~ data:', data);
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('userId', data['data']['id']);
              localStorage.setItem('userRoleId', data['data']['rol']);
              this.router.navigate(['/home']);
              this.spinnerService.close();
            } else {
              this.alertModalService.open('Alerta', data['message'], 2000);
            }
          },
          error: (error) => {
            this.spinnerService.close();
            console.log('err: ', error.message);
          },
        })
        .add(() => {
          this.spinnerService.close();
        });
    }
    this.loginForm;
  }

  get formControlsLogin(): any {
    return this.loginForm.controls;
  }
}
