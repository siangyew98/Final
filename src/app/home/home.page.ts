import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { Product } from '../shared/models/product';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allProducts: Product[];
  products: Product[];
  user: User = new User();

  constructor(private authService: AuthService, public toastController: ToastController, private productService: FirebaseProductService) {

  }

  getDate(dateNum : Number) {
    var date = new Date(dateNum.toString());
    return date.toString();
  }

  ngOnInit() {
    this.productService.getAllProducts().then(result => {
      this.products = this.allProducts = result;
    });
  }

search(event) {
  const text = event.target.value;

  if (text && text.trim() !== '') {
    this.products = this.allProducts.filter(
      item => item.name.toLowerCase().includes(text.toLowerCase()));
  } else {
    // Blank text, clear the search, show all products
    this.products = this.allProducts;
  }
} 
refresh(event) {
  this.products = this.allProducts;
  event.target.complete();
}
}
