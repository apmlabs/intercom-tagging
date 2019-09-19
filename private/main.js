const axios = require('axios');
const capture = require('./grabber')
var exports = module.exports = {};


exports.apiCall = function(email,sort,state,order,callback) {
    capture.userValue(email, function(admin){
        console.log('ADMIN ID', admin);
        axios.defaults.headers.common = {
          "Authorization": "",
          "Accept": "application/json"
        };
        const getChats = (url, resolve, reject) => {
            var array = [];
            axios.get(url)
            .then(response => { 
              var a = response.data.pages.total_pages;
              console.log(response.data.pages.next)
              for (var i = 1; i <= a; i++){
                array.push(axios.get(`
                https://api.intercom.io/conversations?type=admin&display_as=plaintext&admin_id=${admin}&sort=${sort}&state=${state}&order=${order}&per_page=20&page=${i}`))
              }
              
              getAll(array, resolve, reject)
              .then(response => {
                resolve(response)
              }) 
              .catch(err => {
                reject(err)
              })
            })
          
            }
            function getAll(urls, resolve, reject) {
                return new Promise((resolve, reject) => {
                  axios.all(urls)
                  .then( results => {
                    var convser = []
                    for (var i = 0; i < results.length; i++) {
                      convser.push(results[i].data.conversations);
                    }
                    resolve(convser);
                  })
                })
              
              }

new Promise((resolve, reject) => {
    getChats(`
    https://api.intercom.io/conversations?type=admin&display_as=plaintext&admin_id=${admin}&sort=${sort}&state=${state}&order=${order}`, resolve, reject)
  })
    .then(response => {
        var merged = [].concat(...response)
        console.log(merged.length)
        new Promise((resolve, reject) => {
            var filtered = [];
            merged.filter(function(chats){
                if(chats.tags.tags.length === 0) {
                    filtered.push(chats);
                }
            })
            callback(filtered, merged.length);
        })
    })
    .catch(error => {
        callback(error)
    })

    });
}