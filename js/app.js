const subscribeButton = document.getElementById('subscribe');
const unsubscribeButton = document.getElementById('unsubscribe');
//const saveandforwardButton = document.getElementById('forward');

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}
messaging.onTokenRefresh(handleTokenRefresh);

subscribeButton.addEventListener("click", subscribeToNotifications);
unsubscribeButton.addEventListener("click", unsubscribeFromNotifications);
//saveandforwardButton.addEventListener("click", sendNotification);


function handleTokenRefresh() {
  return messaging.getToken().then((token) => {
    ddb.ref('/tokens').push({
      token: token,
      uid: auth.currentUser.uid
    });
  });
}

function checkSubscription() {
  ddb.ref('/tokens').orderByChild("uid").equalTo(auth.currentUser.uid).once('value').then((snapshot) => {
    if ( snapshot.val() ) {
      subscribeButton.setAttribute("hidden", "true");
      unsubscribeButton.removeAttribute("hidden");
    } else {
      unsubscribeButton.setAttribute("hidden", "true");
      subscribeButton.removeAttribute("hidden");
    }
  });
}

function subscribeToNotifications() {
  messaging.requestPermission()
    .then(() => handleTokenRefresh())
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error getting permission :(");
    });
}

function unsubscribeFromNotifications() {
  messaging.getToken()
    .then((token) => messaging.deleteToken(token))
    .then(() => ddb.ref('/tokens').orderByChild("uid").equalTo(auth.currentUser.uid).once('value'))
    .then((snapshot) =>  {
      const key = Object.keys(snapshot.val())[0];
      return ddb.ref('/tokens').child(key).remove();
    })
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error deleting token :(");
    });
}