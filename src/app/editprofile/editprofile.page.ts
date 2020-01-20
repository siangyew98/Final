import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  // editProfileForm: FormGroup;
  // submitted: boolean;
  

  // constructor(private productService: FirebaseProductService, private route: ActivatedRoute, private router: Router) 
  // { 
  //   this.submitted = false;
  //   this.editProfileForm = new FormGroup({
  //     companyname: new FormControl(user.companyname),
  //     email: new FormControl(user.email),
  //     password: new FormControl(user.password),
  //   })
  // }

  // update() {
  //   this.submitted = true;
  //   if (this.editProfileForm.valid)
  //   {
  //     const profile = new User(this.editProfileForm.value.companyname,
  //       this.editProfileForm.value.email,
  //       this.editProfileForm.value.password);
  //     this.router.navigate(['/profile']);

  //   }
  // }

  ngOnInit() {
  }

}
