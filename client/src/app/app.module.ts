import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FilteredArrayPipe } from './pipes/filtered-array.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { LoginComponent } from './pages/home/login/login.component';
import { AboutComponent } from './pages/home/about/about.component';
import { RegistrationComponent } from './pages/home/registration/registration.component';
import { Step1Component } from './pages/home/registration/step1/step1.component';
import { Step2Component } from './pages/home/registration/step2/step2.component';
import { GeneralInfoComponent } from './pages/home/general-info/general-info.component';
import { CategoriesNavComponent } from './pages/shop/categories-nav/categories-nav.component';
import { CartComponent } from './pages/shop/cart/cart.component';
import { ProductsAreaComponent } from './pages/shop/products-area/products-area.component';
import { SingleCartProdComponent } from './pages/shop/cart/single-cart-prod/single-cart-prod.component';
import { SearchProductsComponent } from './pages/shop/search-products/search-products.component';
import { SingleProdCardComponent } from './pages/shop/products-area/single-prod-card/single-prod-card.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReceptionComponent } from './pages/orders/reception/reception.component';
import { ShippingDetailsComponent } from './pages/orders/shipping-details/shipping-details.component';
import { SingleReceptionProdComponent } from './pages/orders/reception/single-reception-prod/single-reception-prod.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { SuccessfulOrderComponent } from './pages/orders/successful-order/successful-order.component';
import { HeaderComponent } from './components/header/header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PlusMinusIconsComponent } from './components/plus-minus-icons/plus-minus-icons.component';
import { CartHeaderComponent } from './components/cart-header/cart-header.component';

// import { HighlightModule } from './pages/highlight/highlight.module';
import { HighlightComponent } from './pages/highlight/highlight.component';
// import { UiHighlightModule } from './lib/ui-highlight/ui-highlight.module';
import { UiHighlightDirective } from './lib/ui-highlight/ui-highlight.directive';
import { ChildCompComponent } from './pages/highlight/child-comp/child-comp.component';
import { InputCalendarComponent } from './components/input-calendar/input-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    LoginComponent,
    AboutComponent,
    RegistrationComponent,
    Step1Component,
    Step2Component,
    GeneralInfoComponent,
    CategoriesNavComponent,
    CartComponent,
    ProductsAreaComponent,
    SingleCartProdComponent,
    SearchProductsComponent,
    SingleProdCardComponent,
    OrdersComponent,
    ReceptionComponent,
    ShippingDetailsComponent,
    SingleReceptionProdComponent,
    FormProductComponent,
    FilteredArrayPipe,
    SuccessfulOrderComponent,
    HeaderComponent,
    CalendarComponent,
    PlusMinusIconsComponent,
    CartHeaderComponent,
    HighlightPipe,
    HighlightComponent,
    UiHighlightDirective,
    ChildCompComponent,
    InputCalendarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [UiHighlightDirective],
})
export class AppModule {}
