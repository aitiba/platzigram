var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/', function(ctx, next) {
  title('Platzigram');
  var main = document.getElementById("main-container");

  var pictures = [
    {
      user: {
        username: 'aitor',
        avatar: 'https://pbs.twimg.com/profile_images/565680017737125888/ad1qqkg0.jpeg'
      },
      url: 'office.jpg',
      likes: 10,
      liked: true
    },
    {
      user: {
        username: 'aitor',
        avatar: 'https://pbs.twimg.com/profile_images/565680017737125888/ad1qqkg0.jpeg'
      },
      url: 'office.jpg',
      likes: 3,
      liked: true
    }
  ];

  empty(main).appendChild(template(pictures));

})
