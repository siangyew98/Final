import { Component } from '@angular/core';
import { Platform, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { LoginPage } from './login/login.page';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
  ];

  public appPagesAuthenticated = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'happy'
    }
  ];
  
  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private menuController: MenuController, private modalController: ModalController) {
    this.initializeApp();
  }

  async login()
  {
    const modal = this.modalController.create({
      component: LoginPage
    });
    return (await modal).present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyA4QFUeIe511HCT-imNpO8_BtrqhjHh89o",
        authDomain: "logister.firebaseapp.com",
        databaseURL: "https://logister.firebaseio.com",
        projectId: "logister",
        storageBucket: "logister.appspot.com",
        messagingSenderId: "381202301518",
        appId: "1:381202301518:web:2e6c6b7b44412c9438f91f"
      };

      firebase.initializeApp(firebaseConfig);
      AuthService.intialize();
      firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {
        if (firebaseUser) {
          this.menuController.enable(true, 'authenticated');
        } else {
          this.menuController.enable(true, 'unauthenticated');
        }
      });
    });
  }
}
