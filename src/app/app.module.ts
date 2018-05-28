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
import { MatButtonModule, MatInputModule, MatSelectModule, MatCardModule, MatTableModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'appInfo/:id', component: AppInfoPageComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [
    ReviewService,
    FavoritesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
