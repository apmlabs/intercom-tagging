// Getting the admin ID by an Email

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './data/data.json');

var exports = module.exports = {};

exports.userValue = function(email, callback) {
   fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
           var users = JSON.parse(data);
           users.admins.filter(function(el) {
            if(el.email === email){
               callback(el.id);
            } else {
                return 'Email not found';
            }
        })
        } else {
            return err;
        }
    });
}



