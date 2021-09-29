import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ShopService, UserService } from '../core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  isLoader = false;
  categories: any[] = [];
  active: string = '';

  products: any[] = [];
  isProductLoader = false;
  form: FormGroup = this.fb.group({
    prod_name: ['', [Validators.required]],
    category_id: [null, [Validators.required]],
    price: ['', [Validators.required]],
    img: ['', [Validators.required]],
  });
  id = null;
  cart : any[] = [];
  constructor(private fb: FormBuilder, private shopService: ShopService, private userService: UserService, private router: Router) { 
    const myCart = localStorage.getItem('myCart') || '[]';
    this.cart = JSON.parse(myCart);
  }

  ngOnInit(): void {
    this.getCategories();

  }
  get isAdmin() {return this.currentUser.is_admin === 1;}
  get currentUser() {return this.userService.getCurrentUser()}
  get imgControl() { return this.form.controls.img as FormControl }
  get total() {return this.cart.length > 0 ? this.cart.reduce((sum, c) => sum + (c.price * c.qty) , 0) : 0}

  getCategories() {
    this.isLoader = true;
    this.shopService.getCategories().subscribe(res => {
      this.categories = res;
      this.active = this.categories[0].id;
      this.isLoader = false;
      this.getProducts()
    })
  }
  getProducts() {
    this.isProductLoader = true;
    this.products = [];
    this.shopService.getProducts(this.active).subscribe(res => {
      this.products = res;
      this.isProductLoader = false;
    })
  }
  cancel() {
    this.id = null;
    this.form.reset();
  }
  onSubmit() {
    if (this.form.invalid) return;
    let sub = null;
    if (this.id !== null) {
      const updatedProd = { ...this.form.value, id: this.id }

      sub = this.shopService.udpateProducts(updatedProd)
    }
    else sub = this.shopService.createProducts(this.form.value)

    sub
      .subscribe(res => {
       
          this.getProducts();
         
        
        this.form.reset();
        this.id = null;
      })
  }
  onEditClick(prod: any) {
    this.id = prod.id;
    this.form.patchValue(prod);
  }
  onAddToCart(prod: any) {
    const index = this.cart.findIndex((p: any) => p.id == prod.id);
    if(index === -1) {
      this.cart.push({...prod, qty: 1})
    } else {
      this.cart = this.cart.filter((p: any )=> {
        if(p.id === prod.id) {
          p.qty++;
        }
        return p;
      } )
    }
  }
  onRemove(prodId : string) {
    this.cart = this.cart.filter((c: any) => c.id !== prodId)
  }
  onOrderClick(){
    localStorage.setItem('myCart', JSON.stringify(this.cart));
    this.router.navigate(['/order']);
  }
}
