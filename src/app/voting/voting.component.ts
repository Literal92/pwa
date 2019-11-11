import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { result } from './interface/vote_result';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  @ViewChild('passCode', { static: false }) opendaiy: ElementRef<any>;
  public popoverTitle: string = '';
  public popoverMessage: string = 'Are you really <b>sure</b>? ';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  private readonly notifier: NotifierService;
  VoteList$: any[] = [];
  id = 0;
  pollCode = '';
  count: any[] = [];
  answered: boolean = false;
  model: result;
  // passCode: any;


  openModal(id, pollCode) {
    this.id = id; this.pollCode = pollCode;
    let myModal = document.getElementsByClassName("answers_field") as HTMLCollectionOf<HTMLElement>;
    if (myModal.length != 0) {
      myModal[0].style.display = 'block';
    } else {
      console.log('hi');
    }
  }
  closeModal() {
    let myModal = document.getElementsByClassName("answers_field") as HTMLCollectionOf<HTMLElement>;
    this.opendaiy = null;
    if (myModal.length != 0) {
      myModal[0].style.display = "none";
    } else {
      console.log('hello');
    }
  }

  openHow(){
    let myModal = document.getElementsByClassName("how_field") as HTMLCollectionOf<HTMLElement>;
    if (myModal.length != 0) {
      myModal[0].style.display = 'block';
    } else {
      console.log('hi');
    }
  }

  closeHow(){
    let myModal = document.getElementsByClassName("how_field") as HTMLCollectionOf<HTMLElement>;
    if (myModal.length != 0) {
      myModal[0].style.display = "none";
    } else {
      console.log('hello');
    }
  }

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private notifierService: NotifierService,
  ) { this.notifier = notifierService; }

  ngOnInit() {
    EnableLoading();
    Header("Voting");
    this.VoteList$ = [];
    this.dataService.getVotingList().subscribe((data) => {
      let output = data as any;
      if (output != undefined && output.length > 0) {
        // debugger;
        console.log(output);
        let locals: any[] =[];
        if (localStorage.getItem('vote') != null) {
          locals = JSON.parse(localStorage.getItem('vote'));
        }

        let countList = 1;
        output.forEach(item => {
          const index = locals.findIndex(a=>a.id==item.id) ;
          if(index>=0){
            locals[index]['count'] = countList++;
            this.VoteList$.push(locals[index]);
          } else {
            item['answered'] = false;
            item['count'] = countList++;
            this.VoteList$.push(item);
          }
        });


        console.log(this.VoteList$);
        DisableLoading();
      } else {
        DisableLoading();

        this.notifier.show({
          type: 'error',
          message: 'Not Found'
        });
      }
    }, err => {
      DisableLoading();

      this.notifier.show({
        type: 'error',
        message: err.error.message != undefined ? err.error.message : 'Not Response'
      })
    });
  }
  onConfirm(answer, pollcode, num, passCode) {
    // debugger;
    this.model = {
      pollCode: pollcode,
      option: answer,
      passCode: passCode
    };
    let json = JSON.stringify(this.model);
    this.dataService.postVote(json).subscribe(res => {
      let output = res as any;
      console.log(output);
      this.notifier.show({
        type: 'success',
        message: 'Voted'
      });
      this.VoteList$[--num]['answered'] = true;
      localStorage.setItem('vote', JSON.stringify(this.VoteList$));
      console.log(this.VoteList$);
      this.closeModal();
    }, err => {
      this.notifier.show({
        type: 'error',
        message: err.error.message != undefined ? err.error.message : 'Not Response'
      });
    });
  }

  onBlur(value) {
    console.log(value);
  }
}
