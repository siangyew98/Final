import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/models/product';
import { FirebaseProductService } from '../shared/services/firebase-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})

export class EditProductPage implements OnInit {
  productId: string;
  productImage: string;
  editProductForm: FormGroup;
  submitted: boolean;


  constructor(private productService: FirebaseProductService, private route: ActivatedRoute, private router: Router)
  { 
    this.productId = this.route.snapshot.params.id;
    const product = this.productService.getProductById(this.productId);
    this.productImage = product.image;
    this.submitted = false;
    
    this.editProductForm = new FormGroup({
      name: new FormControl(product.name, [Validators.required]),
      description: new FormControl(product.description, [Validators.required]),
      quantity: new FormControl(product.quantity, [Validators.required]),
    })
  }

  update() {
    this.submitted = true;
    var d = new Date();
    if (this.editProductForm.valid) {
      const prod = new Product(this.editProductForm.value.name,
        this.editProductForm.value.description,
        this.editProductForm.value.quantity,
        this.productImage,
        d.getTime(),
        this.productId);
      this.productService.update(prod);
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }
}