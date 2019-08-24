// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    if (user.uid == "DsenFL0sgNhUE4lTBfU79DJYAH52") {
      window.location.replace("/pages/statusa.html");
    }

    else {
      setupUI(user);
      // welcomeUI(user);
      checkSubscription();
      db.collection('guides').get().then(snapshot => {
        setupGuides(snapshot.docs);
      }).catch(err => {
        console.log(err.message)
      });
    }

  } else {

    setupUI();
    setupGuides([]);
  }
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
  })
});


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});