import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from '../core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cart: any[] = [];
  form: FormGroup = this.fb.group({
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    shippingDate: ['', [Validators.required]],
    creditCard: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private router: Router, private shopService: ShopService) {
    const myCart = localStorage.getItem('myCart') || '[]';
    this.cart = JSON.parse(myCart);
    if (this.cart.length <= 0) {
      this.router.navigate(['/shopping']);
    }
  }

  ngOnInit(): void {
  }
  get total() { return this.cart.length > 0 ? this.cart.reduce((sum, c) => sum + (c.price * c.qty), 0) : 0 }
  onSubmit() {
    if (this.form.invalid) return;
    // this.shopService.order({cart: this.cart, ...this.form.value})
    // .subscribe(res => {
    //   console.log('res ===',res)
    // }, err => {

    // })
    localStorage.removeItem('myCart');
    alert('your order has been placed');
    this.router.navigate(['/shopping']);
    
  }
}
