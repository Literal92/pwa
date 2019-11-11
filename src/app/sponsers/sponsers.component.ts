import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';


@Component({
  selector: 'app-sponsers',
  templateUrl: './sponsers.component.html',
  styleUrls: ['./sponsers.component.css']
})
export class SponsersComponent implements OnInit {
  sponsor$: any[] = [];
  pic: any;
  id: any;
  private readonly notifier: NotifierService;

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private notifierService: NotifierService
) {
  this.notifier = notifierService;
}

getId(id) {
    this.router.navigate([ '/booths/' + id ]);
}

ngOnInit() {
  EnableLoading();
  Header("Sponsers");
  // debugger;
  this.sponsor$ = [];
  return this.dataService.getSponsors().subscribe(
    (data) => {
      let output = data as any;
      if (output != undefined) {
        this.sponsor$ = output.list;
        this.pic = output.basePictureUrl;
        console.log(this.sponsor$);
        DisableLoading();

      } else {
        DisableLoading();
        this.notifier.show({
          type: 'error',
          message: 'Not Found'
        });
      }
      // this.sponsor$ = data;
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
