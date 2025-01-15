// const { getDb } = require("../util/database-util");

// module.exports = class Favourite {
//   constructor(id) {
//     this.id = id;
//   }
//   static fetchHomes() {
//     const db = getDb();
//     return db.collection("favourites").find().toArray();
//   }
//   save() {
//     const db = getDb();
//     return db
//       .collection("favourites")
//       .findOne({ id: this.id })
//       .then((exists) => {
//         if (!exists) {
//           return db.collection("favourites").insertOne(this);
//         }
//         return Promise.resolve();
//       });
//   }

//   static deleteFromFavourite(homeId) {
//     const db = getDb();
//     return db.collection("favourites").deleteOne({ id: homeId });
//   }
// };
const mongoose = require("mongoose");
const favouriteSchema = new mongoose.Schema({
  id: { type: String, required: true },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
