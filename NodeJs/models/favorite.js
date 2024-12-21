const fs = require("fs");
const path = require("path");
const routeDir = require("./../util/path-util");
const favouriteFilePath = path.join(routeDir, 'data', 'favourite.json');

module.exports = class Favourite { 
  static favouriteHomes(callback) {    
    fs.readFile(favouriteFilePath,(err,data)=>{
        err ? callback([]) : callback(JSON.parse(data))
    });
  }
  

  static addToFavourites(homeId, callback) {
    Favourite.favouriteHomes(favouriteIds => {
      favouriteIds.push(homeId);
      fs.writeFile(favouriteFilePath, JSON.stringify(favouriteIds), callback);
    });
  }
 
};
