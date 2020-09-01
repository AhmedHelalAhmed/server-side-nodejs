exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.insert(document); // this return promise
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray(); // this return promise
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document); // this return promise
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null); // this return promise
};
