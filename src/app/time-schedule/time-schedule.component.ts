import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../shared/header';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.css']
})
export class TimeScheduleComponent implements OnInit {
  currentimg: any = undefined;
  constructor(
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    EnableLoading();
    Header("Congress Schedule");
    this.currentimg = document.getElementsByClassName("im-first") as HTMLCollectionOf<HTMLElement>;
    DisableLoading();
  }

  activate(weeks){
    // debugger;
    EnableLoading();
    document.body.scrollTop = 0
    let links = document.getElementsByClassName("active") as HTMLCollectionOf<HTMLElement>;
    links[0].className = links[0].className.replace("active", "");
    let current = document.getElementsByClassName(`link-${weeks}`) as HTMLCollectionOf<HTMLElement>;
    current[0].className += " active";
    if (this.currentimg != undefined) {
      this.currentimg[0].className += " d-none";
    }
    this.currentimg =  document.getElementsByClassName("im-"+weeks) as HTMLCollectionOf<HTMLElement>;
    this.currentimg[0].className = this.currentimg[0].className.replace("d-none", "");
    DisableLoading();
  }

}
