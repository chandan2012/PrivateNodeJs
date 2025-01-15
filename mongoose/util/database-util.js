 const mongodb = require("mongodb");
 const MongoClient = mongodb.MongoClient;
 const url = "mongodb+srv://root:root@airbnb.no48h.mongodb.net/?retryWrites=true&w=majority&appName=airbnb";

 let _db;
 const mongoConnect = (callback) =>{
 MongoClient.connect(url).then((client) => {
   _db = client.db("airbnb");
   callback()
 }) 
 .catch(error => {
  console.error(error);
 })
}

const getDb = () => {
  if (!_db) {
    throw new Error("No database found!");
  }
  return _db;
}
 exports.mongoConnect = mongoConnect;
 exports.getDb = getDb;