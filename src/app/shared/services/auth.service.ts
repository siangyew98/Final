import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static user: User = new User();
  user: User = new User();

  constructor() {
    firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {

      if (firebaseUser) {
          this.user.email = firebaseUser.email;
      } else {
          this.user.email = '';

      }

  });
   }

   static intialize(){
     firebase.auth().onAuthStateChanged((firebaseUser: firebase.User) => {
       if (firebaseUser)
       {
         this.user.email = firebaseUser.email;
         console.log('User' + this.user.email);
        }
        else{
          console.log('User logged out');
          this.user.email = undefined;
        }
     });
   }

   getCurrentUser()
   {
     return AuthService.user;
   }

  login(email: string, password: string) {

    return firebase.auth().signInWithEmailAndPassword(email, password);

}
  logout(){
    firebase.auth().signOut();
  }

  signup(email:string, password: string)
  {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
}
