import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExecutiveCommitteeComponent } from './executive-committee/executive-committee.component';
import { ScientificCommitteeComponent } from './scientific-committee/scientific-committee.component';
import { TimeScheduleComponent } from './time-schedule/time-schedule.component';
import { LecturesComponent } from './lectures/lectures.component';
import { AbstractCategoryComponent } from './abstract-category/abstract-category.component';
import { ArticlesComponent } from './articles/articles.component';
import { AbstractDetailsComponent } from './abstract-details/abstract-details.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { BoothsComponent } from './booths/booths.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MapPlanComponent } from './map-plan/map-plan.component';
import { NotesComponent } from './notes/notes.component';
import { EventsComponent } from './events/events.component';
import { SponsersComponent } from './sponsers/sponsers.component';
import { AboutMashhadComponent } from './about-mashhad/about-mashhad.component';
import { LectureDetailsComponent } from './lecture-details/lecture-details.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { BoothDetailsComponent } from './booth-details/booth-details.component';
import { AboutDetailsComponent } from './about-details/about-details.component';
import { VotingComponent } from './voting/voting.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { MapListComponent } from './map-plan/components/map-list/map-list.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'executive', component: ExecutiveCommitteeComponent },
      { path: 'scientific', component: ScientificCommitteeComponent },
      { path: 'timeSchedule', component: TimeScheduleComponent },
      { path: 'lecture', component: LecturesComponent },
      { path: 'lecture/:lectureId', component: LectureDetailsComponent },
      { path: 'articles', component: AbstractCategoryComponent },
      { path: 'articlesList/:abstractCat', component: ArticlesComponent },
      { path: 'articlesDetail/:abstractId/:catId', component: AbstractDetailsComponent },
      { path: 'workshops', component: WorkshopsComponent },
      { path: 'workshops/:instroductionalId', component: WorkshopDetailsComponent },
      { path: 'booths', component: BoothsComponent },
      { path: 'booths/:boothsId', component: BoothDetailsComponent },
      { path: 'navigation', component: NavigationComponent },
      { path: 'mapPlan/:id', component: MapPlanComponent },
      { path: 'mapPlan', component: MapListComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'events', component: EventsComponent },
      { path: 'sponsers', component: SponsersComponent },
      { path: 'searchResult', component: SearchResultComponent },
      { path: 'voting', component: VotingComponent },
      { path: 'aboutMashhad', component: AboutMashhadComponent },
      { path: 'aboutDetails/:about$', component: AboutDetailsComponent },
      { path: 'AddNote/:type', component: AddNoteComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [];
