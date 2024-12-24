const path = require("path");
const routeDir = require("../util/path-util");
const fs = require("fs");
const homeData = path.join(routeDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, imageUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.imageUrl = imageUrl;
  }

  save(callback) {
    Home.fetchAllHomes(registeredHomes => {
      if(this.id){
        registeredHomes = registeredHomes.map(home => home.id !== this.id ? home : this);
      }
      else{
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      fs.writeFile(homeData, JSON.stringify(registeredHomes), callback)
    })
  }

  static fetchAllHomes(callback) {
    fs.readFile(homeData, (err, data) => {
      err ? callback([]) : callback(JSON.parse(data));
    });
  }

  static findById(id, callback) {
    Home.fetchAllHomes((homes) => {
      const home = homes.find((home) => home.id === id);
      callback(home);
    });
  }
};
