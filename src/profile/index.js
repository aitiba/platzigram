var page = require('page');

page('/user/platzi', function(ctx, next) {
  var main = document.getElementById("main-container");
  main.innerHTML = 'USER PLATZI';
})
