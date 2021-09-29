import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ShopService {

  constructor (
    private apiService: ApiService,
  ) {}
  
  // Update the user on the server (email, pass, etc)
  getCategories() {
    return this.apiService.get('/shop/getcat');
  }
  getProducts(catId: string) {
    return this.apiService.get(`/shop/prods/${catId}`)
  }
  createProducts(product: any) {
    return this.apiService.post(`/shop/add/`, product)
  }
  udpateProducts( product: any) {
    return this.apiService.post(`/shop/update/`, product)
  }
  order(order: any) {
    return this.apiService.post(`/shop/order/`, order)
  }

}
