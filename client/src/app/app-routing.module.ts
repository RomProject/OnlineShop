import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './shopping/shopping.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard, NoAuthGuard } from './core';

const routes: Routes = [
  {path: '', component: MainComponent, canActivate:[NoAuthGuard]},
  {path: 'shopping', component: ShoppingComponent, canActivate:[AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[NoAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
