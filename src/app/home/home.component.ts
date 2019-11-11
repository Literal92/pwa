import { Component, OnInit } from '@angular/core';
import { Header } from '../shared/header';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { showInstallPromotion } from '../app';

import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly notifier: NotifierService;
  SearchResult: any[] = [];
  events$: any[] = [];
  Lectures: any[] = [];
  Instructional: any[] = [];
  promptEvent;
  deferredPrompt;
  countapi:number=0;
  closeModal() {
    let myModal = document.getElementsByClassName("search_field") as HTMLCollectionOf<HTMLElement>;
    myModal[0].style.display = "none";
  }
  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService
  }
  sendType(type, id) {
    if (type === 'lecture') {
      console.log('lecture');
      this.router.navigate(['/lecture/' + id]);
    } else if (type === 'abstracts') {
      console.log('abstracts');
      this.router.navigate(['/articlesDetail/' + id]);

    } else {
      console.log('instructional Courses');
      this.router.navigate(['/workshops/' + id]);

    }
  }
  ngOnInit() {
    Header('XXIX Annual Congress Of The Iranian Society Of Ophthalmology', false, null);
    // debugger
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 76 and later from showing the mini-infobar
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
       // Update UI notify the user they can add to home screen
      showInstallPromotion();
    });
    window.addEventListener('appinstalled', (evt) => {
      console.log('pwa installed');
    });
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can add to home screen
    });
    // debugger;
    // this.route.snapshot.params.abstractId;
    EnableLoading();
    // this.dataService.getExecutive(true).subscribe();
    // this.dataService.getAboutMashhad(true).subscribe();
    // this.dataService.getExhibition(true).subscribe(res => {
    //   let output = res as any;
    //   if (output != undefined) {
    //     output.forEach(element => {
    //       this.dataService.getExhibitionDetails(element.id,true).subscribe();
    //     });
    //   }
    // });
    // this.dataService.getInitial(true).subscribe();
    // this.dataService.getAbstractCat(true).subscribe(res => {
    //   let output = res as any;
    //   if (output != undefined) {
    //     output.forEach(element => {
    //       this.dataService.getAbstractList(element.id, true).subscribe(ress => {
    //         let outputt = ress as any;
    //         if (outputt != undefined) {
    //           outputt.oral.forEach(element1 => {
    //             this.dataService.getAbstractDetail(element1.id,true).subscribe(() => { this.countapi++; if(this.countapi>=30){ DisableLoading() }});
    //           });
    //           outputt.poster.forEach(element1 => {
    //             this.dataService.getAbstractDetail(element1.id,true).subscribe(() => { this.countapi++; if(this.countapi>=30){ DisableLoading() }});
    //           });
    //         }

    //       });
    //     });
    //   }
    // });
    // this.dataService.getInstructional(true).subscribe(res => {
    //   let output = res as any;
    //   if (output != undefined) {
    //     this.Instructional.push(...Object.keys(output))
    //     this.Instructional.forEach(elementtt => {
    //       output[elementtt].forEach(element => {
    //         this.dataService.getInstructionalDetails(element.id,true).subscribe(() => { this.countapi++; if(this.countapi>=30){ DisableLoading() }});
    //       });
    //     });
    //   }
    // });
    // this.dataService.getLectures(true).subscribe(res => {
    //   debugger;
    //   let output = res as any;
    //   if (output != undefined) {
    //     this.Lectures.push(...Object.keys(output));

    //     this.Lectures.forEach(elementtt => {
    //       output[elementtt].forEach(element => {
    //         this.dataService.getLectureById(element.id,true).subscribe(() => { this.countapi++; if(this.countapi>=30){ DisableLoading() }});
    //       });
    //     });
    //   }
    // });
    // // this.dataService.getRating().subscribe();
    // this.dataService.getSponsors(true).subscribe();
    this.dataService.getLecturesAll(true).subscribe( () => {
      DisableLoading();
    });

    this.dataService.getInstructionalAll(true).subscribe( () => {
      DisableLoading();
    });

    this.dataService.getabstractsAll(true).subscribe( () => {
      DisableLoading();
    });

    this.dataService.getexhibitionsAll(true).subscribe( () => {
      DisableLoading();
    });



    // this.dataService.getWelcomeText(true).subscribe();
    this.events$ = [];
    this.dataService.getEvents().subscribe(
      (data) => {
        let output = data as any;
        if (output != undefined && output.length > 0) {
          this.events$ = output;
          console.log(this.events$);
        } else {
          // this.notifier.show({
          // 	type: 'error',
          // 	message: 'Not Found'
          // });
        }
        this.events$ = data;
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

  onSearch(term) {
    if (term != undefined && term != "") {
      this.router.navigate(['/searchResult'], { queryParams: { term: `${term}` } });
      console.log(term);
    } else {
      this.notifier.show({
        type: 'warning',
        message: 'Insert Search Term'
      });
    }
  }

}
