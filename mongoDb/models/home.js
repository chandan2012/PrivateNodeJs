const {getDb} = require("../util/database-util");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
  }
  save() {
    const db = getDb();
    return db.collection("homes").insertOne(this).then((result) => {
      console.log(result);
    });
    
  }
  static fetchHomes() {    
    const db = getDb();
    return db.collection("homes").find().toArray();
    
  }
  static findById(id) {
   
  }
  static deleteHome(id) {
    
  }
};
