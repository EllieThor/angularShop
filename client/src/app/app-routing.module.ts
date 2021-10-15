import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/home/registration/registration.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ShopComponent } from './pages/shop/shop.component';

import { HighlightComponent } from './pages/highlight/highlight.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'prefix' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'highlight',
    component: HighlightComponent,
  },
  // {
  //   path: 'highlight',
  //   loadChildren: () =>
  //     import('./pages/highlight/highlight.module').then(
  //       (m) => m.HighlightModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
