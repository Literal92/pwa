import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../shared/header';

@Component({
selector: 'app-notes',
templateUrl: './notes.component.html',
styleUrls: [ './notes.component.css' ]
})
export class NotesComponent implements OnInit {
NoteList: any[] = [];
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  // debugger;
  let order: any[] = [];
  Header('Notes');
  let list = JSON.parse(localStorage.getItem('notes'));
  list.forEach(element => {
    order.push(element.order);
  });
  let sort = order.sort((a, b) => {
    return b - a;
  });

  for (let i = 0; i < sort.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (sort[i] == list[j].order) {
        this.NoteList.push(list[j]);
      }
    }
  }
  console.log(this.NoteList);
}

ngAfterViewInit() {
    // location.reload();

}

loadNote() {}
}
