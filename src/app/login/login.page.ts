import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { SignupPage } from '../signup/signup.page';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError: string;

  constructor(private authService: AuthService, private toastController: ToastController, private modalController: ModalController, private route: ActivatedRoute, private router: Router) 
  { 
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password,).then(
        async () => {
          const toast = await this.toastController.create({
            message: 'Login successful',
            duration: 2000,
            position: 'top',
            color: 'secondary'
          });

          toast.present();
          this.dismiss();
          this.router.navigate(['/home']);
        }
      )
    .catch(
      error => this.loginError = error.message
    );
  }
  async goToSignup(){
    this.dismiss();
    const modal = await this.modalController.create({
      component: SignupPage
    });
    return await modal.present();
  }
}
