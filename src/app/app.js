export function showInstallPromotion(){
  // hide our user interface that shows our A2HS button
  // Show the prompt
  // alert('in beforeinstallprompt');
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 76 and later from showing the mini-infobar
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
     // Update UI notify the user they can add to home screen
     deferredPrompt.prompt();
     alert('in there');
     // Wait for the user to respond to the prompt
     deferredPrompt.userChoice
       .then((choiceResult) => {
         if (choiceResult.outcome === 'accepted') {
           console.log('User accepted the A2HS prompt');
         } else {
           console.log('User dismissed the A2HS prompt');
         }
         deferredPrompt = null;
       });
  });
  deferredPrompt.prompt();
  alert('in there');
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
};
