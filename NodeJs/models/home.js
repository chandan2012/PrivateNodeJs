const fs = require("fs");
const path = require("path");
const routeDir = require("./../util/path-util");
const homeFilePath = path.join(routeDir, 'data', 'homes.json');
const registeredHomes = [];

module.exports = class Home {
  constructor(houseName,price,location,rating,photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save(callback) {
    registeredHomes.push(this);    
    fs.writeFile(homeFilePath, JSON.stringify(registeredHomes), callback)
  }
  static fetchHomes(callback) {
    fs.readFile(homeFilePath,(err,data)=>{
        if(err){
            callback([]);
        }
        else{
            callback(JSON.parse(data))
        }        
    });
  }
};
