const fs = require("fs");
const path = require("path");
const routeDir = require("./../util/path-util");
const homeFilePath = path.join(routeDir, 'data', 'homes.json');

module.exports = class Home {
  constructor(houseName,price,location,rating,photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save(callback) {
    Home.fetchHomes(registeredHomes => {
      if(this.id){
        registeredHomes = registeredHomes.map(home => home.id !== this.id ? home : this);
      }
      else{
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      fs.writeFile(homeFilePath, JSON.stringify(registeredHomes), callback)
    })
  }
  static fetchHomes(callback) {
    fs.readFile(homeFilePath,(err,data)=>{
        err ? callback([]) : callback(JSON.parse(data))
    });
  }
  static findById(id, callback) {
    Home.fetchHomes(homes => {
      const home = homes.find(home => home.id === id);
      callback(home);
    });
  }
};
