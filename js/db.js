//real time listener
// db.collection('recipes').onSnapshot((snapshot) => {
//     //console.log(snapshot.docChanges());
//     snapshot.docChanges().forEach(change=>{
//         //console.log(change, change.doc.data());
//         if(change.type === 'added'){
//             //add the document on screen
//             renderDoc(change.doc.data(), change.doc.id);
//         }
//         if(change.type === 'removed'){
//             //remove the document
//         }
//     })
// })