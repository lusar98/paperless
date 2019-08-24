const outpreview = document.querySelector('.outpreview');

var ouserid = '';
var oname = '';
var oid = '';
var obranch = '';
var oage = '';
var oprogram = '';
var osection = '';
var oemail = '';
var osem = '';

var obeg = '';
var oend = '';
var reason = '';

var today = new Date();
var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            oemail = user.email;
            oname = doc.data().Name;
            oid = doc.data().ID;
            obranch = doc.data().Branch;
            oage = doc.data().Age;
            oprogram = doc.data().Program;
            osection = doc.data().Section;
            osem = doc.data().Sem;
        })
    }
})

function pushData() {
    var autodoc = db.collection('/recieved').doc();
    console.log(autodoc);
    db.collection('/users').doc(auth.currentUser.uid).set({
        'Leave': 'pending'
    }, { merge: true })
    autodoc.set({
        'UserID': auth.currentUser.uid,
        'Subject': 'Leave',
        'ID': oid,
        'Reason': reason,
        'From-Date': obeg,
        'End-Date': oend,
    }, { merge: true });
    window.location.href="/pages/statusp.html";


}

function getData() {
    obeg = document.getElementById('datefrom').value;
    oend = document.getElementById('dateto').value;
    reason = document.getElementById('reason').value;
    preview();
}

function preview() {
    const html = `The Head of the Department<br>
    ${obranch}<br>
    National Institute of Technology Silchar<br><br>
    ${date}<br><b>Subject:</b>Application for leave<br><br>Respected Sir<br>
    This is to inform you that I, ${oname}, am ${osem} Sem student in the department of ${obranch}
    with Scholar ID: ${oid}. <br>
    Due to the following reason(s), I was not able to attend the lectures from ${obeg} to ${oend}.
    Reason being, ${reason}. <br><br>

    Hence, you are kindly requested you to issue leave for the above-mentioned dates.<br><br>
    Thanking You <br><br>
    Yours Sincerely <br>
    ${oname}<br>
    ${obranch}<br>
    National Institute of Technology Silchar`;

    db.collection('/letters').doc().set({
        "letter" : html
    });
    outpreview.innerHTML = html
}

function autoFill() {
    document.getElementById('name').value = oname;
    foid = oid.split("-");
    document.getElementsByName('tel_no_1')[0].value = foid[0];
    document.getElementsByName('tel_no_2')[0].value = foid[1];
    document.getElementsByName('tel_no_3')[0].value = foid[2];

    document.getElementById('email').value = oemail;
};




//const saveandforwardButton = document.getElementById('forward');

//saveandforwardButton.addEventListener("click", sendNotification);

// function sendNotification() {
//     //e.preventDefault();
//     const notificationMessage = "Got a notification Sir";
//     //if ( !notificationMessage ) return;

//     ddb.ref('/notifications')
//         .push({
//             user: auth.currentUser.displayName,
//             message: notificationMessage,
//             //userProfileImg: auth.currentUser.photoURL
//         })
//         .then(() => {
//             document.getElementById('notification-message').value = "";
//         })
//         .catch(() => {
//             console.log("error sending notification :(")
//         });
// }