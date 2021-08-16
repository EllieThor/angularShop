import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/home/registration/registration.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'prefix' },
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
