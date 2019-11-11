import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../shared/header';

@Component({
  selector: 'app-map-plan',
  templateUrl: './map-plan.component.html',
  styleUrls: ['./map-plan.component.css']
})
export class MapPlanComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;

  }

  ngOnInit() {
    Header("Venue Map",true,null);
  }

}
