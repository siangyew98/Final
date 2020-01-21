import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  signupError: string;

  constructor(private authService: AuthService,private toastController: ToastController,private modalController: ModalController,private route: ActivatedRoute, private router: Router) 
  { 
    this.signupForm = new FormGroup({
        email: new FormControl(""),
        password: new FormControl("")
    });
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }


  signup() {
    this.authService.signup(this.signupForm.value.email, this.signupForm.value.password,).then(
        async () => {
          const toast = await this.toastController.create({
            message: 'Signup successful. Auto logged in as ' + this.signupForm.value.email,
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
      error => this.signupError = error.message
    );

  }
}