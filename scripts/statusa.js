const app2 = document.querySelector('.statusCopy');
const app3 = document.querySelector('.letterCopy');


function getStatusCopy() {
    db.collection('forms').get().then(snapshot => {
        printStatusCopy(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}
const printStatusCopy = (data) => {
    if (data.length) {
        data.forEach(doc => {
            const formdata = doc.data();
            let html = formdata.url;
            app2.innerHTML = html
        });

    }
}

function getLetterCopy() {
    db.collection('letters').get().then(snapshot => {
        printStatusCopy(snapshot.docs);
    }).catch(err => {
        console.log(err.message)
    });
}
const printLetterCopy = (data) => {
    if (data.length) {
        data.forEach(doc => {
            const letterdata = doc.data();
            let html = letterdata.letter;
            app3.innerHTML = html
        });

    }
}


function approval() {
    console.log("Shit");
    db.collection('approval').doc('random-id').set({
        approved: true
    }, { merge: true });
    const html = `<tr>
                        <td>Leave</td>
                        <td>Granted</td>
                    </tr>`
    app2.innerHTML = html;
}


const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // db.collection('approval').doc('random-id').set({
        //     approved: false
        // }, { merge: true });
        window.location.replace('/index.html');
        console.log('user signed out');
    })
});