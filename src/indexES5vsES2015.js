// antes de ECMAScript 2015 (ES2015 - ES6)
// llamado ECMAScript 5 (ES5)

/* var numeros = [ 400, 200, 1, -23];

var numeroMas1 = numeros.map(function(numero) {
  return numero + 1;
})

console.log(numeroMas1); */

// ECMAScript 2015
// => ES2015 - ES6 babeljs.io/docs/learn-es2015


var numeros = [ 400, 200, 1, -23];

var numeroMas1 = numeros.map(v => v + 1)

console.log(numeroMas1);
