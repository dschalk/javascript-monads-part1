(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _snabbdom = require('snabbdom');

var _snabbdom2 = _interopRequireDefault(_snabbdom);

var _snabbdomH = require('snabbdom/h');

var _snabbdomH2 = _interopRequireDefault(_snabbdomH);

var monad = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '  class Monad {\n    constructor(z) {\n\n      this.x = z;\n\n      this.bnd = (func, ...args) => {\n        func(this, ...args);\n      };\n\n      this.ret = a => {\n        this.x = a;\n        return this;\n      };\n\n      this.fmap = (f, mon = this, ...args) => {      \n        mon.ret( f(mon.x, ...args));\n        return mon;\n\n      };\n    }\n  };\n');

var monadIter = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '  class MonadIter {\n    constructor(z,g) {\n      this.x = z;\n      this.id = g;\n      this.p = [];\n      this.block = () => {\n        this.x = true;\n        return this;\n        }\n      this.release = () => {\n        this.x = false;\n        let self = this;\n        let p = this.p;\n        if (p[1] === \'bnd\') {\n          p[2](self.x, self, ...p[3]);\n          return self;\n        }\n        if (p[1] === \'ret\') {\n          self.x = p[2];\n          return self;\n        }\n        if (p[1] === \'fmap\') { \n          p[3].ret(p[2](p[3].x, ...p[4]));\n          return p[3];\n        }\n     }\n      this.bnd = (func, ...args) => {\n        let self = this;\n        if (self.x === false) {\n          func(self, ...args);\n          return self;\n        }\n        if (self.x === true) {\n          self.p = [self.id, \'bnd\', func, args];\n          return self;\n        }\n      }\n      this.fmap = (f, mon = this, ...args) => {   \n        let self = this;\n          if (self.x === false) {\n            mon.ret(f(mon.x,  ...args));\n            return mon;\n          }\n          if (self.x === true) {\n            self.p = [self.id, \'fmap\', f, mon, args];\n            return self;\n          }\n      }\n      this.ret = a => { \n        let self = this;\n          if (self.x === false) {\n            self.x = a;\n          }\n          if (self.x === true) {\n          self.p = [self.id, \'ret\', a];\n          return self;\n          }\n        this.x = false;\n        return this;\n      }\n    }\n  }\n    constructor(z,g) {\n\n        this.x = z;\n        this.id = g;\n        this.flag = false;\n        this.p = [];\n  \n        this.block = () => {\n            this.flag = true;\n            return this;\n        }\n\n        this.release = () => {\n            let self = this;\n            let p = this.p;\n  \n            if (p[1] === \'bnd\') {\n                p[2](self.x, self, ...p[3]);\n                self.flag = false;\n                return self;\n            }\n  \n            if (p[1] === \'ret\') {\n                self.x = p[2];\n                self.flag = false;\n                return self;\n            }\n  \n            if (p[1] === \'fmap\') { \n                p[3].ret(p[2](p[3].x, ...p[4]));\n                self.flag = false;\n                return p[3];\n            }\n        }\n    };\n');

var steps = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\n    mM1.ret(0).bnd(mM2.ret).bnd(mM3.ret).bnd(mM4.ret)\n     .bnd(() => mM1.ret(\'Click the mMI2.release() button to proceed\')\n     .bnd(refresh)\n     .bnd(() => mMI2.block()\n     .bnd(() => mM2.ret(\'Click it again.\').bnd(refresh)\n     .bnd(() => mMI2.block()\n     .bnd(() => mM3.ret(\'Keep going\').bnd(refresh)\n     .bnd(() => mMI2.block()\n     .bnd(() => mM4.ret(\'One more\').bnd(refresh)\n     .bnd(() => mMI2.block()\n     .bnd(() => mM1.ret(0).bnd(mM2.ret).bnd(mM3.ret)\n     .bnd(mM4.ret).bnd(refresh)\n      ))))))))) \n');

var test = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, 'mM8.ret(\'test\');\nmM2.ret(mM8.x);\nmM3.fmap(_ => mM8.x);\nmM8.bnd(mM4.ret);');

var functions1 = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\nvar cube = function cube(mon) {\n  mon.ret(mon.x * mon.x * mon.x);\n  return mon;\n};\n\nvar add = function add(mon, y) {\n  mon.ret(mon.x + y);\n  return mon;\n};\n');

var lambdas = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\n    mM3.ret(2)\n     .bnd(() => mM2\n     .ret(7)\n     .bnd(() => mM1\n     .ret(3)\n     .bnd(x => mM2\n     .bnd(y => mM3\n     .bnd(z => mM4\n     .ret(x*y*z) \n     .bnd(() => mM5.ret(\'Lambda!\')           \n        ))))))\n');

var test3 = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\n');

var test4 = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\n');

var test5 = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\n');

var test6 = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\n');

var test7 = (0, _snabbdomH2['default'])('pre', { style: { color: '#AFEEEE' } }, '\n');

var next = (0, _snabbdomH2['default'])('div', { style: { fontSize: '28px', color: 'FFFF00' } }, 'mMI2.release()');

exports['default'] = { monad: monad, monadIter: monadIter, steps: steps, next: next, test: test, functions1: functions1, lambdas: lambdas };

// Cows and horses.
module.exports = exports['default'];

},{"snabbdom":9,"snabbdom/h":3}],2:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _snabbdom = require('snabbdom');

var _snabbdom2 = _interopRequireDefault(_snabbdom);

var _snabbdomH = require('snabbdom/h');

var _snabbdomH2 = _interopRequireDefault(_snabbdomH);

var _cowJs = require('./cow.js');

var _cowJs2 = _interopRequireDefault(_cowJs);

var patch = _snabbdom2['default'].init([require('snabbdom/modules/class'), // makes it easy to toggle classes
require('snabbdom/modules/props'), // for setting properties on DOM elements
require('snabbdom/modules/style'), // handles styling on elements with support for animations
require('snabbdom/modules/eventlisteners')]);

// attaches event listeners
var oldVnode = document.getElementById('placeholder');

var style2 = { backgroundColor: '#000', textAlign: 'left', borderColor: 'darkred', outline: '0px',
  color: '#CCFDCB', borderRadius: '10px', paddingTop: '1.1px', paddingBottom: '5px', marginRight: '3px',
  marginLeft: '12px', fontSize: '22px' };
var style1 = { backgroundColor: 'blue', textAlign: 'left', borderColor: 'lightblue', outline: '0px',
  color: 'yellow', borderRadius: '10px', paddingTop: '1.1px', paddingBottom: '5px', marginRight: '3px',
  marginLeft: '12px', fontSize: '22px' };
var style3 = { marginTop: '40px', backgroundColor: '#000', height: '100%', width: '100%', color: '#FFE4C4', fontSize: '22px', textAlign: 'left' };
var styleM = { color: '#FF000A', marginLeft: '13px', marginBottom: '2px', fontSize: '22px' };
var styleMI = { color: '#FF000A', marginLeft: '7px', marginBottom: '2px', fontSize: '22px' };
var style0 = style2;

var style4 = style2;
var style4e = style1;
var style4l = style2;

var style5 = style2;
var style5e = style1;
var style5l = style2;

var style6 = style2;
var style6e = style1;
var style6l = style2;

var style7 = style2;
var style7e = style1;
var style7l = style2;

var style8 = style2;
var style8e = style1;
var style8l = style2;

var styleR = style2;
var styleRe = style1;
var styleRl = style2;

function view(m1, m2, m3, m4, m5, m6, m7, m8, mI1, mI2, hello) {
  return (0, _snabbdomH2['default'])('div', { style: style3 }, [(0, _snabbdomH2['default'])('div', { style: { width: '65%', textAlign: 'left', marginLeft: 40, marginRight: '17%', fontSize: '24px' } }, [(0, _snabbdomH2['default'])('h2', { style: { textAlign: 'center', color: '#BBFFFF' } }, 'Javascript Monads Part 1'), (0, _snabbdomH2['default'])('span', { style: { marginLeft: '18px' } }, 'The code for this single-page site is at '), (0, _snabbdomH2['default'])('a', { props: { href: 'https://github.com/dschalk/javascript-monads-part1' }, style: { color: '#EECCFF' } }, 'javascript-monads-part1'), (0, _snabbdomH2['default'])('span', ' If pressing F12 switches your browser to a console, I think you will find that you have access to all of the monads and functions being used in this presentation, Try entering "mM1.ret("Hello world")" on the command like. Press F12 again and roll over (don\'t click it) the RE-SET button at the bottom of the right column. When the column gets updated, the new value of mM1.x that you created should appear. '), (0, _snabbdomH2['default'])('h3', 'This Series Is For Web Developers'), (0, _snabbdomH2['default'])('p', 'This is not about category theory or the lambda calculus. I call my little inventions "monads", and I am sorry if that drives away that dwindling breed of developers who strive for little more than to master JQuery and whatever frameword they are using. I developed the manads to make my work easier and more satisfying, and now I am taking time out to share them with whomever is interested. '), (0, _snabbdomH2['default'])('p', 'This project centers around a simple monad constructor, called "Monad", and the more elaborate MonadIter constructor whose instances can take control of the order of execution of monad trees, wait for asynchronous events to complete, and interactively step through sequences. They do some things that ES6 Promises and Generators do, but in different ways, and are by no means meant as a replacement for them. '), (0, _snabbdomH2['default'])('p', ' Here is how the Monad class is defined:'), _cowJs2['default'].monad, (0, _snabbdomH2['default'])('p', 'And here are the functions we will use in this brief demonstration: '), _cowJs2['default'].functions1, (0, _snabbdomH2['default'])('p', 'These are simple math functions operating on monads with number values. The value of a monad can be any javascript value, even an object containing arrays of monads and functions. There are no limitations, so there is a one to one corresponsdence between the set of all possible javascript values and all possible monads.'), (0, _snabbdomH2['default'])('h3', 'Do monads support lambda expressions?'), (0, _snabbdomH2['default'])('p', 'Click below to see the answer.'), (0, _snabbdomH2['default'])('button', { on: { mouseenter: update4e, mouseleave: update4l, click: updateDemo1 }, style: style4 }, [_cowJs2['default'].lambdas]), (0, _snabbdomH2['default'])('p', 'Or, putting it more succinctly,'), (0, _snabbdomH2['default'])('button', { on: { mouseenter: update5e, mouseleave: update5l, click: update2 }, style: style5 }, 'mM1.ret(3).bnd(x => mM2.ret(4).bnd(y => mM3.ret(x + y)))'), (0, _snabbdomH2['default'])('p', 'bnd sends itself down the chain of monads. It can change the values of other monads and have its value changed along the way. '), (0, _snabbdomH2['default'])('h3', 'How The Simple Monads Work'), (0, _snabbdomH2['default'])('p', 'If setting mM1 to 0, adding 3, and cubing it to give mM1 a value of 27 this way '), (0, _snabbdomH2['default'])('pre', 'mM1.ret(0).bnd(add,3).bnd(cube)'), (0, _snabbdomH2['default'])('p', 'is too object-oriented for any of you functional programming zealots, you can avoid object methods by doing it this way: '), (0, _snabbdomH2['default'])('pre', '   cube(add(add(mM1,-mM1.x),3))  '), (0, _snabbdomH2['default'])('p', ' "mM1.bnd(cube)" does exactly what "cube(mM1)" does. They both return mM1 after cubing its value, or return mM1 with a value of NAN if its value was not a number. In the above expression, the innermost call to "add" sets mM1.x to 0; the next call adds 3, and cube yields mM1.x = 27, no matter what the value of mM1 was before. The above expression can make a person cross-eyed, so I will stick with linking objects when nesting operations.'), (0, _snabbdomH2['default'])('h3', 'Anonymous Monads'), (0, _snabbdomH2['default'])('p', 'Chains of computations can be performed anonymously, releasing the final value into a named monad or releasing it as a side-effect in the very last step. Here\'s an example: '), (0, _snabbdomH2['default'])('button', { on: { mouseenter: update6e, mouseleave: update6l, click: updateAnon }, style: style6 }, 'new Monad(0).bnd(add,3).bnd(cube).bnd(x => mM1.ret(x.x))'), (0, _snabbdomH2['default'])('p', 'Before wrapping up this first installment, I think I should provide a "Hello world." program. Here it is: '), (0, _snabbdomH2['default'])('button', { on: { mouseenter: update4e, mouseleave: update4l, click: updateHello }, style: style5 }, [(0, _snabbdomH2['default'])('pre', 'var hello = new Monad;\nhello.ret(\'Hello world\');')]), (0, _snabbdomH2['default'])('p', 'Bye for now.'), (0, _snabbdomH2['default'])('h3', 'Next: Websocket interractions with MonadIter instances. '), (0, _snabbdomH2['default'])('p', 'In the next section, we will see how MonadIter facilitates building lazy chains of computations that can be paused, interacted with, and possibly never executed . If the computations along the chain manipulate only monadic values, with a possible side effect only at the last link, we can use only pure (side-effect free) functions outside of the Monad and MonadIter classes. We could also refrain from mutating values outside of the monad world. What we would gain and what we would lose are hard to know from this theoretical vantage point, so in some future installment in this series, I will dig in and do some experimenting. "Fun with monads"? Well, I\'m having fun.  '), (0, _snabbdomH2['default'])('span', 'The open source code for this page is at '), (0, _snabbdomH2['default'])('a', { props: { href: 'https://github.com/dschalk/javascript-monads-part1' }, style: { color: '#EECCFF' } }, 'fun_with_monads'), (0, _snabbdomH2['default'])('span', '  Demonstrations of this and the next pages in "Javascript Monads" project can be found at '), (0, _snabbdomH2['default'])('a', { props: { href: 'http://schalk.net' }, style: { color: '#EECCFF' } }, 'schalk.net'), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('div', { style: { height: '300px' } })]), (0, _snabbdomH2['default'])('div', { style: { width: '30%', position: 'fixed', top: '200px', right: '15px', color: '#CCFDDA' } }, [(0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM1.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m1), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM2.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m2), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM3.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m3), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM4.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m4), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM5.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m5), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM6.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m6), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM7.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m7), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mM8.x: '), (0, _snabbdomH2['default'])('span', { style: styleM }, '  ' + m8), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mMI1.x: '), (0, _snabbdomH2['default'])('span', { style: styleMI }, '  ' + mI1), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'mMI2.x: '), (0, _snabbdomH2['default'])('span', { style: styleMI }, '  ' + mI1), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('span', 'hello.x: '), (0, _snabbdomH2['default'])('span', { style: styleMI }, '  ' + hello), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('br'), (0, _snabbdomH2['default'])('button', { on: { mouseenter: updateRe, mouseleave: updateRl, click: updateR }, style: styleR }, 'RE-SET')])]);
}

function update0(event) {
  var newVnode = view(mM1.x, mM2.x, mM3.x, mM4.x, mM5.x, mM6.x, mM7.x, mM8.x, mMI1.x, mMI2.x, hello.x);
  oldVnode = patch(oldVnode, newVnode);
}

function updateR(event) {
  mM1.ret(0);
  mM2.ret(0);
  mM3.ret(0);
  mM4.ret(0);
  mM5.ret(0);
  mM6.ret(0);
  mM7.ret(0);
  mM8.ret(0);
  hello.ret('Goodbye');
  update0();
}

function update(event) {
  mM2.bnd(function (v) {
    return add(v, mM2, 5).bnd(cube);
  });
  update0();
}

function update2(event) {
  mM1.ret(6).bnd(function (x) {
    return mM2.ret(7).bnd(function (y) {
      return mM3.ret(x.x * y.x);
    });
  });
  update0();
}
// ((((((((((***********************************************************

function updateDemo1() {
  mM3.ret(2).bnd(function () {
    return mM2.ret(7).bnd(function () {
      return mM1.ret(3).bnd(function (x) {
        return mM2.bnd(function (y) {
          return mM3.bnd(function (z) {
            return mM4.ret(x.x * y.x * z.x).bnd(function () {
              return mM5.ret('Lambda!');
            });
          });
        });
      });
    });
  });
  update0();
}

function updateHello() {
  hello.ret('Hello world.');
  update0();
}

function updateAnon() {
  new Monad(0).bnd(add, 3).bnd(cube).bnd(function (x) {
    return mM1.ret(x.x);
  });
  update0();
}

function updateDemo2() {
  add(3, mM1);
  update0();
}

function updateDemo3() {
  add(3, mM1);
  update0();
}

function updateDemo4() {
  mM1.bnd(mM1.ret);
  update0();
}

function updateDemo5() {
  mM1.bnd(function (val) {
    return add(mM1.x, mM1, 1).bnd(cube);
  });
  update0();
}

function updateDemo6() {
  mM1.bnd(add, 1).bnd(cube);
  update0();
}

function updateDemo7() {
  mM1.bnd(function (val) {
    return add(mM1.x, mM1, v).bnd(cube);
  });
  update0();
}

function updateDemo8() {
  mM1.bnd(add, 1).bnd(cube);
  update0();
}

function updateDemo9() {

  update0();
}

function update2B(event) {
  mM1.ret(3).bnd(function (v) {
    return mM2.ret(v).fmap(cu, mM2);
  });
  console.log(mM1.x, mM2.x);
  update0();
}

function update2B2(event) {
  mM3.ret(3).fmap(function (_) {
    var a = mM3.x;mM4.ret(a).fmap(cu);return a;
  });
  console.log(mM1.x, mM2.x);
  update0();
}

function update2B3(event) {
  mM5.ret(3).bnd(mM6.ret).bnd(cube);
  console.log(mM1.x, mM2.x);
  update0();
}

function update2C(event) {
  mM1.ret(3).fmap(function (v) {
    return mM2.ret(v + 7);
  }).bnd(pure);
  console.log(mM1.x, mM2.x);
  update0();
}

function update2D(event) {
  mM3.ret(3).fmap(function (x) {
    return x * x * x;
  }).bnd(pure);
  console.log(mM1.x, mM2.x);
}

function update5(event) {
  mM1.bnd(add, 5).bnd(cube);
  console.log(mM1.x, mM2.x);
  update0();
}

function updateTest(event) {
  mM8.ret('test');
  mM2.ret(mM8.x);
  mM3.fmap(function (_) {
    return mM8.x;
  });
  mM8.bnd(mM4.ret);
  console.log(mM1.x, mM2.x);
  update0();
}

function updateSteps(event) {
  mM1.ret(0).bnd(mM2.ret).bnd(mM3.ret).bnd(mM4.ret).bnd(function () {
    return mM1.ret('Click the mMI2.release() button to proceed').bnd(function () {
      return mMI2.block().bnd(function () {
        return mM2.ret('Click it again.').bnd(function () {
          return mMI2.block().bnd(function () {
            return mM3.ret('Keep going').bnd(function () {
              return mMI2.block().bnd(function () {
                return mM4.ret('One more').bnd(function () {
                  return mMI2.block().bnd(function () {
                    return mM1.ret(0).bnd(mM2.ret).bnd(mM3.ret).bnd(mM4.ret);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  console.log(mM1.x, mM2.x);
  update0();
}

function updateNext(event) {
  mMI2.release();
  console.log(mM1.x, mM2.x);
  update0();
}

function update3e(event) {
  style0 = style1;
  update0();
}

function update3l(event) {
  style0 = style2;
  update0();
}

function update4e(event) {
  style4 = style1;
  update0();
}

function update4l(event) {
  style4 = style2;
  update0();
}

function update5e(event) {
  style5 = style1;
  update0();
}

function update5l(event) {
  style5 = style2;
  update0();
}

function update6e(event) {
  style6 = style1;
  update0();
}

function update6l(event) {
  style6 = style2;
  update0();
}

function updateRe(event) {
  styleR = style1;
  update0();
}

function updateRl(event) {
  styleR = style2;
  update0();
}

function updateEvent(event) {
  mMI2.ret(event.data);
  console.log(event);
  update0();
}

oldVnode = patch(oldVnode, view(mM1.x, mM2.x, mM3.x, mM4.x, mM5.x, mM6.x, mM7.x, mM8.x, mMI1.x, mMI2.x));

},{"./cow.js":1,"snabbdom":9,"snabbdom/h":3,"snabbdom/modules/class":5,"snabbdom/modules/eventlisteners":6,"snabbdom/modules/props":7,"snabbdom/modules/style":8}],3:[function(require,module,exports){
var VNode = require('./vnode');
var is = require('./is');

module.exports = function h(sel, b, c) {
  var data = {}, children, text, i;
  if (arguments.length === 3) {
    data = b;
    if (is.array(c)) { children = c; }
    else if (is.primitive(c)) { text = c; }
  } else if (arguments.length === 2) {
    if (is.array(b)) { children = b; }
    else if (is.primitive(b)) { text = b; }
    else { data = b; }
  }
  if (is.array(children)) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
    }
  }
  return VNode(sel, data, children, text, undefined);
};

},{"./is":4,"./vnode":10}],4:[function(require,module,exports){
module.exports = {
  array: Array.isArray,
  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
};

},{}],5:[function(require,module,exports){
function updateClass(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldClass = oldVnode.data.class || {},
      klass = vnode.data.class || {};
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

module.exports = {create: updateClass, update: updateClass};

},{}],6:[function(require,module,exports){
var is = require('../is');

function arrInvoker(arr) {
  return function() { arr[0](arr[1]); };
}

function fnInvoker(arr) {
  return function(ev) { arr[0](ev); };
}

function updateEventListeners(oldVnode, vnode) {
  var name, cur, old, elm = vnode.elm,
      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
  if (!on) return;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    if (old === undefined) {
      if (is.array(cur)) {
        elm.addEventListener(name, arrInvoker(cur));
      } else {
        cur = [cur];
        on[name] = cur;
        elm.addEventListener(name, fnInvoker(cur));
      }
    } else if (old.length === 2) {
      old[0] = cur[0]; // Deliberately modify old array since it's
      old[1] = cur[1]; // captured in closure created with `arrInvoker`
      on[name]  = old;
    } else {
      old[0] = cur;
      on[name] = old;
    }
  }
}

module.exports = {create: updateEventListeners, update: updateEventListeners};

},{"../is":4}],7:[function(require,module,exports){
function updateProps(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    if (old !== cur) {
      elm[key] = cur;
    }
  }
}

module.exports = {create: updateProps, update: updateProps};

},{}],8:[function(require,module,exports){
var raf = requestAnimationFrame || setTimeout;
var nextFrame = function(fn) { raf(function() { raf(fn); }); };

function setNextFrame(obj, prop, val) {
  nextFrame(function() { obj[prop] = val; });
}

function updateStyle(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style || {},
      style = vnode.data.style || {},
      oldHasDel = 'delayed' in oldStyle;
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

function applyDestroyStyle(vnode) {
  var style, name, elm = vnode.elm, s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}

function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  if (!s || !s.remove) {
    rm();
    return;
  }
  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
      compStyle, style = s.remove, amount = 0;
  var applied = [];
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  var props = compStyle['transition-property'].split(', ');
  for (; i < props.length; ++i) {
    if(applied.indexOf(props[i]) !== -1) amount++;
  }
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}

module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};

},{}],9:[function(require,module,exports){
// jshint newcap: false
/* global require, module, document, Element */
'use strict';

var VNode = require('./vnode');
var is = require('./is');

function isUndef(s) { return s === undefined; }

function emptyNodeAt(elm) {
  return VNode(elm.tagName, {}, [], undefined, elm);
}

var emptyNode = VNode('', {}, [], undefined, undefined);

var insertedVnodeQueue;

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (!isUndef(key)) map[key] = i;
  }
  return map;
}

function createRmCb(parentElm, childElm, listeners) {
  return function() {
    if (--listeners === 0) parentElm.removeChild(childElm);
  };
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules) {
  var i, j, cbs = {};
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
    }
  }

  function createElm(vnode) {
    var i, data = vnode.data;
    if (!isUndef(data)) {
      if (!isUndef(i = data.hook) && !isUndef(i = i.init)) i(vnode);
      if (!isUndef(i = data.vnode)) vnode = i;
    }
    var elm, children = vnode.children, sel = vnode.sel;
    if (!isUndef(sel)) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = !isUndef(data) && !isUndef(i = data.ns) ? document.createElementNS(i, tag)
                                                                : document.createElement(tag);
      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          elm.appendChild(createElm(children[i]));
        }
      } else if (is.primitive(vnode.text)) {
        elm.appendChild(document.createTextNode(vnode.text));
      }
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      i = vnode.data.hook; // Reuse variable
      if (!isUndef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      elm = vnode.elm = document.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      parentElm.insertBefore(createElm(vnodes[startIdx]), before);
    }
  }

  function invokeDestroyHook(vnode) {
    var i = vnode.data, j;
    if (!isUndef(i)) {
      if (!isUndef(i = i.hook) && !isUndef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (!isUndef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i, listeners, rm, ch = vnodes[startIdx];
      if (!isUndef(ch)) {
        invokeDestroyHook(ch);
        listeners = cbs.remove.length + 1;
        rm = createRmCb(parentElm, ch.elm, listeners);
        for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
        if (!isUndef(i = ch.data) && !isUndef(i = i.hook) && !isUndef(i = i.remove)) {
          i(ch, rm);
        } else {
          rm();
        }
      }
    }
  }

  function updateChildren(parentElm, oldCh, newCh) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode);
        parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode);
        parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) { // New element
          parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode) {
    var i, hook;
    if (!isUndef(i = vnode.data) && !isUndef(hook = i.hook) && !isUndef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    if (!isUndef(i = oldVnode.data) && !isUndef(i = i.vnode)) oldVnode = i;
    if (!isUndef(i = vnode.data) && !isUndef(i = i.vnode)) vnode = i;
    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
    if (oldVnode === vnode) return;
    if (!isUndef(vnode.data)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      i = vnode.data.hook;
      if (!isUndef(i) && !isUndef(i = i.update)) i(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (!isUndef(oldCh) && !isUndef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch);
      } else if (!isUndef(ch)) {
        addVnodes(elm, null, ch, 0, ch.length - 1);
      } else if (!isUndef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
    } else if (oldVnode.text !== vnode.text) {
      elm.textContent = vnode.text;
    }
    if (!isUndef(hook) && !isUndef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
    return vnode;
  }

  return function(oldVnode, vnode) {
    var i;
    insertedVnodeQueue = [];
    if (oldVnode instanceof Element) {
      oldVnode = emptyNodeAt(oldVnode);
    }
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
    patchVnode(oldVnode, vnode);
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    insertedVnodeQueue = undefined;
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}

module.exports = {init: init};

},{"./is":4,"./vnode":10}],10:[function(require,module,exports){
module.exports = function(sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return {sel: sel, data: data, children: children,
          text: text, elm: elm, key: key};
};

},{}]},{},[2]);
