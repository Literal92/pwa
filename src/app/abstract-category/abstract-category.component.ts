import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';

@Component({
  selector: 'app-abstract-category',
  templateUrl: './abstract-category.component.html',
  styleUrls: ['./abstract-category.component.css']
})
export class AbstractCategoryComponent implements OnInit {
  abstractCat : any[] = [];
  private readonly notifier: NotifierService;

  constructor( private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private notifierService: NotifierService) {
      this.notifier = notifierService
    }

  ngOnInit() {
    EnableLoading();
    this.abstractCat = [];
    let head = Header("Abstract Category",true,null);
    console.log(head);
    // debugger;
    return this.dataService.getabstractsAll().subscribe((data) => {
      let output = data as any;
      if (output != undefined) {
      //   console.log(output);
      output.forEach(element => {
        this.abstractCat.push(element.category);
      });
    } else {
      DisableLoading();
      this.notifier.show({
        type: 'error',
        message: 'Data Not Found'
      })
    }
    DisableLoading();
  }, err => {
    DisableLoading();
    this.notifier.show({
      type: 'error',
      message: err.error.message != undefined ? err.error.message : 'Not Response'
    })
  });
  }

  onClick(id) {
    if (id != undefined) {
       this.router.navigate([`/articlesList/${id}`]);
    } else {
      this.notifier.show ({
        type: 'error',
        message: 'No Route Found'
      });
    }
  }
}
