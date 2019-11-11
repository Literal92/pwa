import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';



@Component({
  selector: 'app-booths',
  templateUrl: './booths.component.html',
  styleUrls: ['./booths.component.css']
})
export class BoothsComponent implements OnInit {
  booth$ : any[] = [];
  id : any;
  private readonly notifier: NotifierService;

  constructor(
      private route: ActivatedRoute,
      private dataService: DataService,
      private router: Router,
      private notifierService: NotifierService

  ) {
		this.notifier = notifierService;
  }

ngOnInit() {
  EnableLoading();
  Header("Exhibition",true,null);
  this.booth$ = [];

  return this.dataService.getexhibitionsAll().subscribe(
    (data) => {
      let output = data as any;
      if (output != undefined) {
        // debugger;
        this.booth$ = output;
        // console.log(this.booth$);
        DisableLoading();
      } else {
        DisableLoading();
        this.notifier.show({
          type: 'error',
          message: 'Not Found'
        });
      }
    },
    (err) => {
      DisableLoading();
      this.notifier.show({
        type: 'error',
        message: 'Connection Lost'
      });
    }
  );
}

}
