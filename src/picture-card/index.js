var yo = require('yo-yo');

module.exports = function pictureCard(pic) {
  var el;
  function render(pic) {
     return yo`<div class="card">
        <div class="card-image">
          <img class="activator" src="${pic.url}" />
        </div>
        <div class="card-content">
          <a href="/user/${pic.user.username}" class="card-title">
            <img src="${pic.user.avatar}" class="avatar" />
            <span class="username">${pic.user.username}</span>
          </a>

          <small class="right time">Hace 1 día</small>
          <p>
            <a class="left" href="#" onclick=${like}>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
            </a>
            <span class="left likes">${pic.likes} me gusta</span>
          </p>
        </div>
      </div>`
  }

  function like() {
    pic.true = true;
    pic.likes++;
    var newEl = render(pic);
    yo.update(el, newEl);
    return false;
  }

  el = render(pic);
  return el;
}
