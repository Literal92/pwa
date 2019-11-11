import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { Header } from './shared/header';
import { result } from './voting/interface/vote_result';
import { catchError } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';

const headers = new HttpHeaders({ "Content-Type": "application/json;charset=utf-8" });
const headerPost = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
const BaseURL = "https://panel.irsocapp.com/api/v1/";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  header = { 'Content-Type': 'application/json;charset=utf-8' };
  localData: any;
  constructor(private httpclient: HttpClient,protected localStorage: LocalStorage) { }

  // getMenu(): Observable<any> {
  //   const url = 'http://www.photoshahr.ir/api/json-number';
  //   return this.CheckOffline(url);
  //   // return this.httpclient.get('http://www.photoshahr.ir/api/json-number');
  // }

  getInitial(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}home`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get(${BaseURL}lecture-list);
  }

  getLectures(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}lecture-list`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get(${BaseURL}lecture-list);
  }

  getLectureById(id,isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}lecture-detail?lectureId=${id}`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get(`${BaseURL}lecture-detail?lectureId=${id}`);
  }

  getScientifics(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}scifi-committee`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get('${BaseURL}scifi-committee');
  }

  getExecutive(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}exec-committee`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get('${BaseURL}exec-committee');
  }

  // getWelcomeText(isInitial: boolean = false): Observable<any> {
  //   const url = 'http://www.photoshahr.ir/api/json-welcom';
  //   return this.CheckOffline(url, isInitial);
  //   // return this.httpclient.get('http://www.photoshahr.ir/api/json-welcom');
  // }

  getEvents(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}current-event`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get('${BaseURL}current-event');
  }

  getAbstractList(id,isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}abstracts-list?abstractsGroupId=${id}`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get(`${BaseURL}abstracts-list?abstractsGroupId=${id}`);
  }

  getAbstractDetail(id,isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}abstracts-detail?abstractsId=${id}`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get(`${BaseURL}abstracts-detail?abstractsId=${id}`);
  }

  getVotingList(isInitial: boolean = false): Observable<any> {

    const url = `${BaseURL}poll-list`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get('${BaseURL}poll-list');
  }

  getAbstractCat(isInitial: boolean = false): Observable<any> {

    const url = `${BaseURL}abstracts-category`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get('${BaseURL}abstracts-category');
  }

  getExhibition(isInitial: boolean = false): Observable<any> {

    const url = `${BaseURL}exhibition-list`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get('${BaseURL}exhibition-list');
  }

  getExhibitionDetails(id,isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}exhibition-detail?exhibitionId=${id}`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get(`${BaseURL}exhibition-detail?exhibitionId=${id}`);
  }

  getInstructional(isInitial: boolean = false): Observable<any> {

    const url = `${BaseURL}instructional-course-list`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get('${BaseURL}instructional-course-list');
  }

  getInstructionalDetails(id,isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}instructional-course-detail?instructionalCourseId=${id}`;
    return this.CheckOffline(url, isInitial);
    // return this.httpclient.get(`${BaseURL}instructional-course-detail?instructionalCourseId=${id}`);
  }
  getSearch(term,type?): Observable<any> {

    const url = `${BaseURL}search?term=${term}&type=${type}`;
    return this.CheckOffline(url);
    // return this.httpclient.get(`${BaseURL}search?term=${term}`);
  }

  getRating(newRate, oldRate, term, termId): Observable<any> {

    const url = `${BaseURL}rate?rate=${newRate}&term=${term}&termId=${termId}&termStatus=${oldRate}`;
    return this.CheckOffline(url);
    // return this.httpclient.get(
    //   `${BaseURL}rate?rate=${newRate}&term=${term}&termId=${termId}&termStatus=${oldRate}`
    // );
  }

  getAboutMashhad(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}about-list`;
    return this.CheckOffline(url, isInitial);
    //return this.httpclient.get('${BaseURL}about-list');
  }

  getSponsors(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}sponsor-list`;
    return this.CheckOffline(url, isInitial);
    //return this.httpclient.get('${BaseURL}sponsor-list');
  }

  postVote(model): Observable<any> {
    return this.httpclient.post<any>(`${BaseURL}vote-poll`, model, { headers: headerPost })
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }
  getLecturesAll(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}lectures`;
    return this.CheckOffline(url, isInitial);
  }
  getInstructionalAll(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}instructional-courses`;
    return this.CheckOffline(url, isInitial);
  }
  getabstractsAll(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}abstracts`;
    return this.CheckOffline(url, isInitial);
  }
  getexhibitionsAll(isInitial: boolean = false): Observable<any> {
    const url = `${BaseURL}exhibitions`;
    return this.CheckOffline(url, isInitial);
  }


  CheckOffline(url, isInitial: boolean = false): any {
    // debugger;
    if (navigator.onLine) {
      const headerCross = new HttpHeaders();
      // headerCross.append('Access-Control-Allow-Origin', '*');
      // headerCross.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      // headerCross.append('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, HEAD, DELETE, OPTOINS');
      // this.localStorage.getItem('url').subscribe((data) => {
      //   this.localData = data as any;
      // });
      // debugger;
      if (isInitial === true && localStorage.getItem(url)) { //localStorage.getItem(url)
        const res = localStorage.getItem(url);
        return of(JSON.parse(res).body);
      } else {
        const res = this.httpclient.get(url, { headers: headerCross });
        // localStorage.setItem(url, JSON.stringify(res));
        return res;
      }
    } else {
      const res = localStorage.getItem(url);
      return of(JSON.parse(res).body);
    }
  }
}
