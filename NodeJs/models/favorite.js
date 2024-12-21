const fs = require("fs");
const path = require("path");
const routeDir = require("./../util/path-util");
const favouriteFilePath = path.join(routeDir, 'data', 'favourite.json');

module.exports = class Favourite { 

    static fetchHomes(callback) {
      fs.readFile(favouriteFilePath,(err,data)=>{
          err ? callback([]) : callback(JSON.parse(data))
      });
    }

    static addToFavourite(homeId, callback) {
      Favourite.fetchHomes(favouriteIds => {
        if(favouriteIds.includes(homeId)) return callback();
        favouriteIds.push(homeId);
        fs.writeFile(favouriteFilePath, JSON.stringify(favouriteIds), callback);
      })
    }
};
