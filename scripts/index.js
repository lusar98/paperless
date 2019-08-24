// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetailLinks = document.querySelector('.account-details');
const welcomeDetailLinks = document.querySelector('.welcome-details');

// const welcomeUI = (user) => {
//   if (user) {
//     db.collection('users').doc(user.uid).get().then(doc => {
//       const html = `
//       <div><h4>Hello,  ${doc.data().Name}</h4></div>
//       `;
//       welcomeDetailLinks.innerHTML = html
//     } )
//   }
// };

const setupUI = (user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div> User ID: ${user.email}</div>
      <div> Name: ${doc.data().Name}</div>
      <div> Scholar ID: ${doc.data().ID}</div>
      `;
      accountDetailLinks.innerHTML = html
    } )
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <a href="/pages/sampleform.html" class="collapsible-body white waves-effect"> ${guide.content}</a>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Tap on Login</h5>';
  }

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});