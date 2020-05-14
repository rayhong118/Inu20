const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateTags = functions.firestore
  .document('/restaurants/{id}')
  .onWrite((snapshot, context) => {
    const oldValue = snapshot.before.data();
    const newValue = snapshot.after.data();
    const oldTags = oldValue.tags || [];
    const newTags = newValue.tags || [];
    const tagsAdded = newTags.filter((tag) => !oldTags.includes(tag));
    const tagsRemoved = oldTags.filter((tag) => !newTags.includes(tag));

    const tagsCollectionRef = admin.firestore().collection('restaurant-tags');

    let batch = admin.firestore().batch();

    // let promiseAddTags = tagsAdded.forEach((tag) => {
    //   let id = tag.toLowerCase();
    //   tagsCollectionRef
    //     .where('id', '==', id)
    //     .get()
    //     .then((querySnapshot) => {
    //       if (querySnapshot.empty) {
    //         let newTagRef = tagsCollectionRef.doc();
    //         batch.set(newTagRef, { id, text: tag, count: 1 });
    //       } else {
    //         let result = querySnapshot.docs[0];
    //         batch.update(result.ref, { count: result.data().count + 1 });
    //       }
    //     });
    // });

    let promiseAddTags = tagsAdded.length
      ? tagsCollectionRef
          .where(
            'id',
            'in',
            tagsAdded.map((tag) => tag.toLowerCase())
          )
          .get()
          .then((querySnapshot) => {
            let existingTags = [];
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                batch.update(doc.ref, { count: doc.data().count + 1 });
                existingTags.push(doc.data().id);
              });
            }
            let createdTags = tagsAdded.map((tag) => {
              let id = tag.toLowerCase();
              return !existingTags.includes(id) ? tag : '';
            });

            createdTags.forEach((createdTag) => {
              let newTagRef = tagsCollectionRef.doc();
              batch.set(newTagRef, {
                id: createdTag.toLowerCase(),
                text: createdTag,
                count: 1,
              });
            });
          })
      : '';

    let promiseRemoveTags = tagsRemoved.length
      ? tagsCollectionRef
          .where(
            'id',
            'in',
            tagsRemoved.map((tag) => tag.toLowerCase())
          )
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) return null;
            else {
              querySnapshot.forEach((doc) => {
                batch.update(doc.ref, {
                  count: doc.data().count && doc.data().count - 1,
                });
              });
            }
          })
      : null;

    return Promise.all([promiseAddTags, promiseRemoveTags]).then(() => {
      return batch.commit();
    });
  });
