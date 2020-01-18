import { Component, OnInit } from '@angular/core';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../shared/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  addProductForm: FormGroup;
  submitted: boolean;
  image: string | ArrayBuffer;
  imageFile: File;

  constructor(private productService: FirebaseProductService, private router: Router)
  {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      image: new FormControl()
    })
  }

  ngOnInit() {
  }

  add() 
  {
    this.submitted = true;
    if (this.addProductForm.valid) {
      let imageName = '';
      if (this.imageFile) {
        imageName = this.imageFile.name;
      }

      var d = new Date();

      const prod = new Product(this.addProductForm.value.name, 
        this.addProductForm.value.description,
        this.addProductForm.value.quantity,
        imageName,
        d.getTime());
      this.productService.add(prod);
      this.router.navigate(['/list']);
    }
  }

  changeFile(event) {
    // Save the file to add in DB later when user click on 'Add' button
    this.imageFile = event.target.files[0];
    // Show the image on the page
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.imageFile);
    fileReader.onloadend = (e) => {
      this.image = fileReader.result;
    };
  }


}
