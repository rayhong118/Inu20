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
    const oldTags = oldValue ? oldValue.tags || [] : [];
    const newTags = newValue.tags || [];
    const tagsAdded = newTags.filter((tag) => !oldTags.includes(tag));
    const tagsRemoved = oldTags.filter((tag) => !newTags.includes(tag));

    const tagsCollectionRef = admin.firestore().collection('restaurant-tags');

    let batch = admin.firestore().batch();

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
            console.log('existingTags', existingTags);
            let createdTags = tagsAdded.filter((tag) => {
              let id = tag.toLowerCase();
              return !existingTags.includes(id);
            });
            console.log('createdTags', createdTags);

            createdTags.forEach((createdTag) => {
              let newTagRef = tagsCollectionRef.doc();
              batch.set(newTagRef, {
                id: createdTag.toLowerCase(),
                text: createdTag,
                count: 1,
              });
            });
          })
      : null;

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
