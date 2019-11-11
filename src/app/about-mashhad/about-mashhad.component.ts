import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-about-mashhad',
	templateUrl: './about-mashhad.component.html',
	styleUrls: [ './about-mashhad.component.css' ]
})
export class AboutMashhadComponent implements OnInit {
	about$: any[] = [];
	id : any;
	photoUrl: string;
	photo: string;
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
		Header('About Mashhad',false,null);
    this.about$ = [];
		this.id = +this.route.snapshot.params.abstractCat;
		this.dataService.getAboutMashhad().subscribe(
			(data) => {
				let output = data as any;
				console.log(output);
				if (output != undefined && output.length > 0) {
					this.about$ = output;
				} else {
					this.notifier.show({
						type: 'error',
						message: 'Not Found'
					});
				}
			},
			(err) => {
				this.notifier.show({
					type: 'error',
					message: 'Connection Lost'
				});
			}
		);

		let description = document.getElementsByClassName('description');
		if(description.length != 0){
			console.log(description);
		}
		console.log(description);
		// if (description.length > 10){
		// 	description.substring(0, 10);
		// }
	}
	onClick(id) {
    if (id != undefined) {
       this.router.navigate([`/aboutDetails/${id}`]);
    } else {
      this.notifier.show ({
        type: 'error',
        message: 'No Route Found'
      });
    }
  }
}
