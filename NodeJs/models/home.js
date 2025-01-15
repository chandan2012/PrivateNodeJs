const airbnb = require("../util/database-util");

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
    if (this.id) {
      return airbnb.execute(
        `UPDATE homes SET houseName = ?, price = ?, location = ?, rating = ?, photoUrl = ?, description = ? WHERE id = ?`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      return airbnb.execute(
        `INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?,?,?,?,?,?)`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }
  static fetchHomes() {
    return airbnb.execute("SELECT * FROM homes");
  }
  static findById(id) {
    return airbnb.execute("SELECT * FROM homes WHERE id = ?", [id]);
  }
  static deleteHome(id) {
    return airbnb.execute("DELETE FROM homes WHERE id = ?", [id]);
  }
};
