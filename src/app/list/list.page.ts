import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  products: Product[]= [];
  

  constructor(private productService: FirebaseProductService, private toastController: ToastController) {
  }
  
  ionViewDidEnter() {
    this.productService.getAllProducts().then(result => {
      this.products = result
    });
  }

  ngOnInit() {
      // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  }

  delete(item : Product) {
    this.productService.delete(item);

    //Visually remove the item
    for(let i = 0; i < this.products.length; i++) {
        if (this.products[i] == item){       
          this.products.splice(i, 1);
        }
    }
  }
}