import { Component, OnInit } from '@angular/core';
import { Header } from './shared/header';
import { showInstallPromotion } from './app';
import { EnableLoading } from './shared/loading/loading';
import * as $ from 'jquery';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  deferredPrompt;
  promptEvent;
  title = 'XXIX';
  constructor(){

  }
ngOnInit() {
    Header(this.title);
    // alert('befor');
    showInstallPromotion();
    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);
    // window.addEventListener('beforeinstallprompt', event => {
    //   this.promptEvent = event;
    // });
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
  }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
        // You might be online
        (document.querySelector("body") as any).style = "";
    } else {
        // 100% Sure you are offline
        (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
}

ngAfterViewInit(): void {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
       // Update UI notify the user they can add to home screen
      showInstallPromotion();
    });
    window.addEventListener('appinstalled', (evt) => {
      console.log('pwa installed');
    });
  }

}
