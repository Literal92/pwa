import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Header } from '../shared/header';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  private readonly notifier: NotifierService;
  constructor(private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute
   ) {
    this.notifier = notifierService;
  }


  closeModal() {
    let myModal = document.getElementsByClassName("search_field") as HTMLCollectionOf<HTMLElement>;
    myModal[0].style.display = "none";
  }
  onSearch(term,type) {
    debugger;
    if (location.hash != undefined) {
      type = location.hash.substr(2)
    } else {
      type = location.pathname.substr(1);
    }
    if (type == "workshops") {
      type = "instructionalCourse";
    }
    if (type == "booths") {
      type = "Exhibition";
    }
    if (type == "articles") {
      type = "abstracts";
    }
    if (term != undefined && term != "") {
      // location.href = `/searchResult?term=${term}`;
      // type = "lecture"
      this.router.navigate(['/searchResult'], { queryParams: { term: `${term}`, type:`${type}` } });
      Header(`Search '${term}'`);
      this.closeModal();
      console.log(term);
    } else {
      this.notifier.show({
        type: 'warning',
        message: 'Insert Search Term'
      });
    }
  }


  ngOnInit() {

  }

}
