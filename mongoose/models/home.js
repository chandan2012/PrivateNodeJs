const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
  houseName: { type: String, requuired: true },
  price: { type: Number, requuired: true },
  location: { type: String, requuired: true },
  rating: { type: Number, requuired: true },
  photoUrl: String,
  description: String,
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Home", homeSchema);

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoUrl, description, _id) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photoUrl = photoUrl;
//     this.description = description;
//     if (_id) {
//       this._id = new ObjectId(String(_id));
//     }
//   }

//   save() {
//     const db = getDb();
//     if (this._id) {
//       return db
//         .collection("homes")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       return db.collection("homes").insertOne(this);
//     }
//   }
//   static fetchHomes() {
//     const db = getDb();
//     return db.collection("homes").find().toArray();
//   }
//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection("homes")
//       .find({ _id: new ObjectId(String(id)) })
//       .next();
//   }
//   static deleteHome(id) {
//     const db = getDb();
//     return db.collection("homes").deleteOne({ _id: new ObjectId(String(id)) });
//   }
// };
