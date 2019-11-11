import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import * as $ from 'jquery';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { ExecutiveCommitteeComponent } from './executive-committee/executive-committee.component';
import { ScientificCommitteeComponent } from './scientific-committee/scientific-committee.component';
import { TimeScheduleComponent } from './time-schedule/time-schedule.component';
import { LecturesComponent } from './lectures/lectures.component';
import { ArticlesComponent } from './articles/articles.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { BoothsComponent } from './booths/booths.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MapPlanComponent } from './map-plan/map-plan.component';
import { NotesComponent } from './notes/notes.component';
import { EventsComponent } from './events/events.component';
import { SponsersComponent } from './sponsers/sponsers.component';
import { AboutMashhadComponent } from './about-mashhad/about-mashhad.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { welcomeComponent } from './welcome/welcome.component';
import { LectureDetailsComponent } from './lecture-details/lecture-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { BoothDetailsComponent } from './booth-details/booth-details.component';
import { AboutDetailsComponent } from './about-details/about-details.component';
import { VotingComponent } from './voting/voting.component';
import { AbstractCategoryComponent } from './abstract-category/abstract-category.component';
import { AbstractDetailsComponent } from './abstract-details/abstract-details.component';
import { RatingModule } from 'ng-starrating';
import { StarRatingModule } from 'angular-rating-star';
import { AddNoteComponent } from './add-note/add-note.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { checkInternetInterceptor } from './shared/interceptors/checkInternet.interceptor';
import { crossOriginInterceptor } from './shared/interceptors/crossOrigin.interceptor';
import { MapListComponent } from './map-plan/components/map-list/map-list.component';
import { LayoutComponent } from './layout/layout.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StorageModule } from '@ngx-pwa/local-storage';
//#region notify-optional
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 1
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
//#endregion
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ExecutiveCommitteeComponent,
		ScientificCommitteeComponent,
		TimeScheduleComponent,
		LecturesComponent,
		ArticlesComponent,
		WorkshopsComponent,
		BoothsComponent,
		NavigationComponent,
		MapPlanComponent,
		NotesComponent,
		EventsComponent,
		SponsersComponent,
		AboutMashhadComponent,
		HomeComponent,
		welcomeComponent,
		LectureDetailsComponent,
		ProductListComponent,
		ProductDetailsComponent,
		WorkshopDetailsComponent,
		BoothDetailsComponent,
		AboutDetailsComponent,
		VotingComponent,
		AbstractCategoryComponent,
    AbstractDetailsComponent,
    AddNoteComponent,
    SearchResultComponent,
    MapListComponent,
    LayoutComponent,
	],
	imports: [
		BrowserModule,
    AppRoutingModule,
    StorageModule,
    RatingModule,
    StarRatingModule,
    NotifierModule.withConfig(customNotifierOptions),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'primary' // set defaults here
    }),
		HttpClientModule,
		MatTabsModule,
		RouterModule.forRoot([
			{ path: '', component: HomeComponent },
			{ path: 'Executive', component: ExecutiveCommitteeComponent },
			{ path: 'Scientific', component: ScientificCommitteeComponent },
			{ path: 'time', component: TimeScheduleComponent },
			{ path: 'lecture', component: LecturesComponent },
			{ path: 'article', component: AbstractCategoryComponent },
			{ path: 'workshop', component: WorkshopsComponent },
			{ path: 'booths', component: BoothsComponent },
			{ path: 'navigation', component: NavigationComponent },
			{ path: 'map', component: MapPlanComponent },
			{ path: 'notes', component: NotesComponent },
			{ path: 'events', component: EventsComponent },
			{ path: 'sponsor', component: SponsersComponent },
			{ path: 'voting' , component: VotingComponent },
			{ path: 'about', component: AboutMashhadComponent },
			{ path: 'Welcome', component: welcomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
		], { useHash: true }),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		BrowserAnimationsModule
	],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: crossOriginInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: checkInternetInterceptor,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
