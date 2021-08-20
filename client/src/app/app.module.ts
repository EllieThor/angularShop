import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { LoginComponent } from './pages/home/login/login.component';
import { AboutComponent } from './pages/home/about/about.component';
import { RegistrationComponent } from './pages/home/registration/registration.component';
import { Step1Component } from './pages/home/registration/step1/step1.component';
import { Step2Component } from './pages/home/registration/step2/step2.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ShopComponent, HeaderComponent, LoginComponent, AboutComponent, RegistrationComponent, Step1Component, Step2Component],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}