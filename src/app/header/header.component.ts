import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu.model';
import { DataService } from '../data.service';
import { SwUpdate } from '@angular/service-worker';
import { openNav } from './js/script';
import { closeNav } from './js/script';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	// items = items;
	@Input() isShowSearch: boolean;
	update: boolean = false;
	count: any;
	public list: any[] = [
		{ id: 1, name: 'Welcome', router: 'welcome' },
		{ id: 2, name: 'Scientific Committee', router: 'scientific' },
		{ id: 3, name: 'Executive Committee', router: 'executive' }
	];
	menus$: any[] = [];
	openN() {
		let menu = document.getElementsByClassName('nav_items') as HTMLCollectionOf<HTMLElement>;
		let myBody = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
		// let structure = document.querySelectorAll('.menu_list');
		if (menu.length != 0) {
			menu[0].style.display = 'block';
			myBody[0].style.overflowY = 'hidden';
		} else {
			console.log('hi');
		}
	}
	OnLi(name: string) {
		if (name == 'Congress Structure') {
			console.log('hello Welcome');
		}
	}
	closeN(name) {
		// debugger;
		if (name != 'Congress Structure') {
			let menu = document.getElementsByClassName('nav_items') as HTMLCollectionOf<HTMLElement>;
			if (menu.length != 0) {
				menu[0].style.display = 'none';
			} else {
				console.log('hi');
			}
		} else {
			let item = document.getElementsByClassName('item-cong') as HTMLCollectionOf<HTMLElement>;
			let navIcon = document.getElementsByClassName('open_congress') as HTMLCollectionOf<HTMLElement>;
			let myImg = document.getElementsByClassName('open_congress') as HTMLCollectionOf<HTMLElement>;
			console.log(item[0].style.display);
			item[0].className =
				item[0].className == 'item-cong d-none'
					? item[0].className.replace('d-none', '')
					: item[0].className.replace(' ', ' d-none');


					if(item[0].className == 'item-cong d-none'){
						console.log('sahba');
						myImg[0].style.transform = 'rotate(180deg)';
					}else{
						myImg[0].style.transform = 'rotate(270deg)';
					}
		}

  }
	openSearch() {
		const searchField = document.getElementsByClassName('search_field') as HTMLCollectionOf<HTMLElement>;
		if (searchField) {
			searchField[0].style.display = 'block';
		} else {
			console.log('hello');
		}
	}

	constructor(updates: SwUpdate, private dataService: DataService) {
		updates.available.subscribe((event) => {
			updates.activateUpdate().then(() => document.location.reload());
		});
	}
	ngOnInit() {
		// debugger;
		this.menus$ = [
			{
				img: '../../assets/icons/home (3).svg ',
				linksNum: '',
				name: 'Home',
				route: ''
			},
			{
				img: '../../assets/icons/calendar%20(2).svg',
				linksNum: '',
				name: 'Schedule',
				route: 'time'
			},
			{
				img: '../../assets/icons/conference.svg',
				linksNum: '',
				name: 'Lecture',
				route: 'lecture'
			},
			{
				img: '../../assets/icons/document.svg',
				linksNum: '',
				name: 'Abstracts',
				route: 'article'
			},
			{
				img: '../../assets/icons/presentation%20(1)%20copy.svg',
				linksNum: '',
				name: 'Instructional Courses',
				route: 'workshop'
			},
			{
				img: '../../assets/icons/Telegram%20Archive%20(4)/booth.svg',
				linksNum: '',
				name: 'Exhibition',
				route: 'booths'
			},
			{
				img: '../../assets/icons/Telegram%20Archive%20(4)/destination.svg',
				linksNum: '',
				name: 'Navigation The Venue',
				route: 'navigation'
			},
			{
				img: '../../assets/icons/Telegram%20Archive%20(4)/location.svg',
				linksNum: '',
				name: 'Venue Map',
				route: 'mapPlan'
			},
			{
				img: '../../assets/icons/Telegram%20Archive%20(4)/task.svg',
				linksNum: '',
				name: 'My Notes',
				route: 'notes'
			},
			{
				img: '../../assets/icons/live.svg',
				linksNum: '',
				name: 'Current Events',
				route: 'events'
			},
			{
				img: '../../assets/icons/diagram.svg ',
				linksNum: '',
				list: [
					{ name: 'Scientific Committee', route: 'Scientific' },
					{ name: 'Executive Committee', route: 'Executive' },
					{ name: 'Welcome', route: 'Welcome' }
				],
				name: 'Congress Structure',
				route: ''
			},
			{
				img: '../../assets/icons/spancer.svg',
				linksNum: '',
				name: 'Sponsors',
				route: 'sponsor'
			},
			{
				img: '../../assets/icons/mashhad.png ',
				linksNum: '',
				name: 'About Mashhad',
				route: 'about'
			}
		];

		this.count = [];
		// this.dataService.getMenu().subscribe((data) => {
		//   this.menus$ = data;
		//   console.log(this.menus$);
		// });
		this.dataService.getInitial(true).subscribe((res) => {
			// debugger;
			let output = res as any;
			this.count = output;
			console.log(this.count);
		});

		// let special = document.getElementsByClassName('special') as HTMLCollectionOf<HTMLElement>;
		// console.log(special);
		// if (special[0].hasChildNodes()) {
		// 	var children = special[0].childNodes[6];
		// 	children[0].style.display = 'block';
		// } else {
		// 	children[0].style.display = 'none';
		// }
	}
}
