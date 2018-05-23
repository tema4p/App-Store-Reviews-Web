import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FavoritesPageComponent } from './pages/favorites/favorites';
import { ContactPageComponent } from './pages/contact/contact';
import { HomePageComponent } from './pages/home/home';
import { AppInfoPageComponent } from './pages/app-info/app-info';
import { StarsComponent } from './components/stars/stars.component';
import { AppCardComponent } from './components/appCard/appCard.component';

import { ReviewService } from './services/reviewService';
import { FavoritesService } from './services/favoritesService';


@NgModule({
  declarations: [
    AppComponent,
    FavoritesPageComponent,
    ContactPageComponent,
    HomePageComponent,
    StarsComponent,
    AppCardComponent,
    AppInfoPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ReviewService,
    FavoritesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
