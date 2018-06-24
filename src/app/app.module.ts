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
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppsSearchService } from './services/appsSearchService';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material';
import { ChartModule } from 'angular-highcharts';
import { CountriesChartComponent } from './components/countries-chart/countries-chart.component';
import { StarsChartComponent } from './components/stars-chart/stars-chart.component';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'home/:market/:word', component: HomePageComponent },
  { path: 'appInfo/:market/:id', component: AppInfoPageComponent },
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
    StarsChartComponent,
    CountriesChartComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatRippleModule,
    AngularFontAwesomeModule,
    ChartModule
  ],
  providers: [
    ReviewService,
    FavoritesService,
    AppsSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
