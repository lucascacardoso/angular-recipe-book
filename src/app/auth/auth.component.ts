import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cmpFacResolver: ComponentFactoryResolver,
    private placeholder: PlaceholderDirective
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService
        .login(email, password)
        .subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
          },
          errorMessage => {
            console.log(errorMessage);
            this.errorMessage = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;            
          }
        );
    } else {
      this.authService
        .signup(email, password)
        .subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
          },
          errorMessage => {
            console.log(errorMessage);
            this.errorMessage = errorMessage;
            this.isLoading = false;
          }
        );
    }

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.cmpFacResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.placeholder.viewContainerRef;
    hostViewContainerRef.clear();

    const cmpRef = hostViewContainerRef.createComponent(alertCmpFactory);
    cmpRef.instance.message = message;
    this.closeSub = cmpRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
