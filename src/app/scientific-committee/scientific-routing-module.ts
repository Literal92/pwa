import { ScientificCommitteeComponent } from './scientific-committee.component';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [{
    path: '', component: ScientificCommitteeComponent,
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScientificRoutingModule { }
