const appl = document.querySelector('.status');

var on1 = '';
var os1 = '';

function getStatus() {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("inside");
            db.collection('users').doc(user.uid).get().then(doc => {
                on1 = 'Leave';
                os1 = doc.data().Leave;
                const html = `<tr>
                        <td>${on1}</td>
                        <td>${os1}</td>
                    </tr>`
                db.collection('/forms').doc().set({
                    "url": html
                })
                appl.innerHTML = html;
            })
        }
    })
}

db.collection('approval').doc('random-id').get().then(doc => {
    if (doc.data().approved== true) {
        const html = `<tr>
                        <td>Leave</td>
                        <td>Granted</td>
                    </tr>
                    <div class="row">
                    <button>
                    <img class="responsive-img" src="/img/demoLetter.png"></img>
                    </button>
                    </div>`
                    
        appl.innerHTML = html;
        window.stop();

    }
    else {
        console.log("Pending");
    }

}).catch(err => {
    console.log(err.message)
});