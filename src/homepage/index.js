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
      likes: 0,
      liked: false,
      createdAt: new Date()
    },
    {
      user: {
        username: 'aitor',
        avatar: 'https://pbs.twimg.com/profile_images/565680017737125888/ad1qqkg0.jpeg'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  empty(main).appendChild(template(pictures));

})
