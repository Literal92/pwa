import { Component, OnInit } from '@angular/core';
import { Header } from '../shared/header';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-add-note',
	templateUrl: './add-note.component.html',
	styleUrls: [ './add-note.component.css' ]
})
export class AddNoteComponent implements OnInit {
	note: any[] = [];
	type: any;
  id: number;
  NoteList: any;
  titleNote: any;
  descNote: any;
  update: boolean = false;
  typee: any;
  constructor(private route: ActivatedRoute,
		private router: Router
    ) {}

	ngOnInit() {
    Header('Add Notes',false,null);
    // debugger;

    this.type = this.route.snapshot.params.type;
    this.NoteList = JSON.parse(localStorage.getItem('notes'));
    if (this.NoteList != undefined) {
      this.NoteList.forEach(element => {
        if (element.id == this.type) {
          this.titleNote = element.title,
          this.descNote = element.desc
        }
      });
    }
	}
	saveText(title, desc) {
    // debugger;
    let time = Date.now();
    if (JSON.parse(localStorage.getItem('notes')) != null) {
      this.NoteList.forEach(element => {
        if (element.id == this.type) {
          this.update = true;
          element.title = this.titleNote;
          element.desc = this.descNote;
          element.id = this.type;
          element.order = element.order;
        }
      });
    }
    if (this.update == false) {
      this.note = [];
      this.id = Math.floor((Math.random() * 500) + 1);
      if (JSON.parse(localStorage.getItem('notes')) != null) {
        this.note.push(...JSON.parse(localStorage.getItem('notes'))); //old data
      }
      var noteValue = { title: title, desc: desc, type: this.type, id: this.id, order: time}; //new data
      this.note.push(noteValue);
    } else {
      this.note = [];
      this.NoteList.forEach(element => {
        if (element.id != this.type) {
            this.note.push(element); //old data
        }else{
          this.typee = element.type
        }
      });
      var noteValuee = { title: title, desc: desc, type: this.typee, id: this.type, order: time}; //new data
      this.note.push(noteValuee);
    }


    localStorage.setItem('notes', JSON.stringify(this.note));
    this.router.navigate(['/notes']);
	}
}
