var f = function f (x,id) {
  this.x = x;
  this.id = id;
  var g = function(func) {
    func.x = this.x;
    func.id = this.id;
    return func;
  }
  return g;
}

function bynd (h) {
  this.x = 0;
  this.id = 'nobody';
  return h(this.x,this.id)
}

var cu = function cu (x,id) {
  var a = x*x*x;
  return f(a,id);
}


var f2 = f(3,'f2');
var f3 = f2(bynd);
var f4 = f3(cu);
//var f5 = f4(bynd);
console.log(bynd);
console.log(f2);
console.log(bynd);
console.log(f3);
console.log(bynd);
console.log(f4);
console.log(f4.x);
