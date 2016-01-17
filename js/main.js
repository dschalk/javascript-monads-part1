"use strict";
import snabbdom from 'snabbdom';
import h from 'snabbdom/h';
import cow from './cow.js';

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);
     
var oldVnode = document.getElementById('placeholder');

var style2 = {backgroundColor: '#000', textAlign: 'left', borderColor: 'darkred', outline: '0px',
  color: '#CCFDCB', borderRadius: '10px', paddingTop: '1.1px', paddingBottom: '5px', marginRight: '3px',
  marginLeft: '12px', fontSize: '22px' };
var style1 = {backgroundColor: 'blue', textAlign: 'left', borderColor: 'lightblue', outline: '0px',
  color: 'yellow', borderRadius: '10px', paddingTop: '1.1px', paddingBottom: '5px', marginRight: '3px',
  marginLeft: '12px', fontSize: '22px' };
var style3 = { marginTop: '40px', backgroundColor: '#000', height: '100%' , width: '100%', color: '#FFE4C4', fontSize: '22px', textAlign: 'left' };
var styleM = {color: '#FF000A', marginLeft: '13px', marginBottom: '2px', fontSize: '22px' };
var styleMI = {color: '#FF000A', marginLeft: '7px', marginBottom: '2px', fontSize: '22px' };
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
    return h('div',{style: style3}, 
    [  h('div',{style: { width: '65%', textAlign: 'left', marginLeft: 40, marginRight: '17%', fontSize: '24px'}}, 
    [ h('h2', {style: {textAlign: 'center', color:  '#BBFFFF'}}, 'Javascript Monads Part 1'),
      h('span', {style: {marginLeft: '18px'}},  'The code for this single-page site is at ' ),
      h('a', {props: {href: 'https://github.com/dschalk/javascript-monads-part1'}, style: {color: '#EECCFF'}}, 'javascript-monads-part1' ),
      h('span', ' If pressing F12 switches your browser to a console, I think you will find that you have access to all of the monads and functions being used in this presentation, Try entering "mM1.ret("Hello world")" on the command like. Press F12 again and roll over (don\'t click it) the RE-SET button at the bottom of the right column. When the column gets updated, the new value of mM1.x that you created should appear. '  ),
      h('h3', 'This Series Is For Web Developers' ),
     h('p', 'This is not about category theory or the lambda calculus. I call my little inventions "monads", and I am sorry if that drives away that dwindling breed of developers who strive for little more than to master JQuery and whatever frameword they are using. I developed the manads to make my work easier and more satisfying, and now I am taking time out to share them with whomever is interested. ' ),
     h('p', 'This project centers around a simple monad constructor, called "Monad", and the more elaborate MonadIter constructor whose instances can take control of the order of execution of monad trees, wait for asynchronous events to complete, and interactively step through sequences. They do some things that ES6 Promises and Generators do, but in different ways, and are by no means meant as a replacement for them. ' ),
    h('p', ' Here is how the Monad class is defined:'),
      cow.monad,
    h('p', 'And here are the functions we will use in this brief demonstration: '  ),  
      cow.functions1,
    h('p', 'These are simple math functions operating on monads with number values. The value of a monad can be any javascript value, even an object containing arrays of monads and functions. There are no limitations, so there is a one to one corresponsdence between the set of all possible javascript values and all possible monads.'  ), 
   h('h3', 'Do monads support lambda expressions?'  ),
   h('p', 'Click below to see the answer.'  ),
   h('button', {on: { mouseenter: update4e, mouseleave: update4l, click: updateDemo1 }, style: style4}, [
    cow.lambdas] ),
   h('p', 'Or, putting it more succinctly,'  ), 
   h('button', {on: { mouseenter: update5e, mouseleave: update5l, click: update2 }, style: style5},
               'mM1.ret(3).bnd(x => mM2.ret(4).bnd(y => mM3.ret(x + y)))'  ),
   h('p', 'bnd sends itself down the chain of monads. It can change the values of other monads and have its value changed along the way. '  ),
      h('h3',  'How The Simple Monads Work' ),
      h('p', 'If setting mM1 to 0, adding 3, and cubing it to give mM1 a value of 27 this way ' ),
      h('pre', 'mM1.ret(0).bnd(add,3).bnd(cube)'  ), 
      h('p', 'is too object-oriented for any of you functional programming zealots, you can avoid object methods by doing it this way: ' ),
      h('pre',
'   cube(add(add(mM1,-mM1.x),3))  '           ),    
      h('p', ' "mM1.bnd(cube)" does exactly what "cube(mM1)" does. They both return mM1 after cubing its value, or return mM1 with a value of NAN if its value was not a number. In the above expression, the innermost call to "add" sets mM1.x to 0; the next call adds 3, and cube yields mM1.x = 27, no matter what the value of mM1 was before. The above expression can make a person cross-eyed, so I will stick with linking objects when nesting operations.'   ),
      h('h3',  'Anonymous Monads' ),
      h('p', 'Chains of computations can be performed anonymously, releasing the final value into a named monad or releasing it as a side-effect in the very last step. Here\'s an example: '  ),
   h('button', {on: { mouseenter: update6e, mouseleave: update6l, click: updateAnon }, style: style6},
               'new Monad(0).bnd(add,3).bnd(cube).bnd(x => mM1.ret(x.x))'  ),
      h('p', 'Before wrapping up this first installment, I think I should provide a "Hello world." program. Here it is: '  ),
   h('button', {on: { mouseenter: update4e, mouseleave: update4l, click: updateHello }, style: style5}, [
   h('pre',
`var hello = new Monad;
hello.ret('Hello world');`   
    ),     ] ),
      h('p', 'Bye for now.'  ),
      h('h3', 'Next: Websocket interractions with MonadIter instances. ' ),
      h('p', 'In the next section, we will see how MonadIter facilitates building lazy chains of computations that can be paused, interacted with, and possibly never executed . If the computations along the chain manipulate only monadic values, with a possible side effect only at the last link, we can use only pure (side-effect free) functions outside of the Monad and MonadIter classes. We could also refrain from mutating values outside of the monad world. What we would gain and what we would lose are hard to know from this theoretical vantage point, so in some future installment in this series, I will dig in and do some experimenting. "Fun with monads"? Well, I\'m having fun.  ' ),
        
      h('span','The open source code for this page is at '  ),  
      h('a', {props: {href: 'https://github.com/dschalk/javascript-monads-part1'}, style: {color: '#EECCFF'}}, 'fun_with_monads' ),
      h('span', '  Demonstrations of this and the next pages in "Javascript Monads" project can be found at ',   ),
      h('a', {props: {href: 'http://schalk.net'}, style: {color: '#EECCFF'}}, 'schalk.net' ),
      h('br', ),   
      h('div', {style: {height: '300px'}} ),
   ] ), 
      h ('div',{style: { width: '30%', position: 'fixed', top: '200px', right: '15px', color: '#CCFDDA'}},
        [
          h('br'),
          h('span', 'mM1.x: '),
          h('span', {style: styleM}, '  ' + m1),
          h('br'),
          h('span', 'mM2.x: '),
          h('span', {style: styleM}, '  ' + m2),
          h('br'),
          h('span', 'mM3.x: '),
          h('span', {style: styleM}, '  ' + m3),
          h('br'),
          h('span', 'mM4.x: '),
          h('span', {style: styleM}, '  ' + m4),
          h('br'),
          h('span', 'mM5.x: '),
          h('span', {style: styleM}, '  ' + m5),
          h('br'),
          h('span', 'mM6.x: '),
          h('span', {style: styleM}, '  ' + m6),
          h('br'),
          h('span', 'mM7.x: '),
          h('span', {style: styleM}, '  ' + m7),
          h('br'),
          h('span', 'mM8.x: '),
          h('span', {style: styleM}, '  ' + m8),
          h('br'),
          h('span', 'mMI1.x: '),
          h('span', {style: styleMI}, '  ' + mI1),
          h('br'),
          h('span', 'mMI2.x: '),
          h('span', {style: styleMI}, '  ' + mI1),
          h('br'),
          h('span', 'hello.x: '),
          h('span', {style: styleMI}, '  ' + hello),
          h('br'),
          h('br'),
      h('button', {on: { mouseenter: updateRe, mouseleave: updateRl, click: updateR }, style: styleR},
                     'RE-SET'   )           
        ] )        
    ] )
}  


function update0(event) {
  const newVnode = view(mM1.x, mM2.x, mM3.x, mM4.x, mM5.x, mM6.x, mM7.x, mM8.x, mMI1.x, mMI2.x, hello.x);
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
  mM2.bnd(v => add(v,mM2,5).bnd(cube));
  update0();
}

function update2(event) {
  mM1.ret(6).bnd(x => mM2.ret(7).bnd(y => mM3.ret(x.x * y.x)))
  update0();
}
// ((((((((((***********************************************************

function updateDemo1() {
    mM3.ret(2)
     .bnd(() => mM2
     .ret(7)
     .bnd(() => mM1
     .ret(3)
     .bnd(x => mM2
     .bnd(y => mM3
     .bnd(z => mM4
     .ret(x.x*y.x*z.x) 
     .bnd(() => mM5.ret('Lambda!')           
        ))))))
  update0();
}

function updateHello() {
  hello.ret('Hello world.'); 
  update0();
}


function updateAnon() {
  new Monad(0).bnd(add,3).bnd(cube).bnd(x => mM1.ret(x.x))
  update0();
}


function updateDemo2() {
  add(3, mM1)
  update0();
}

function updateDemo3() {
  add(3, mM1)
  update0();
}

function updateDemo4() {
  mM1.bnd(mM1.ret)
  update0();
}

function updateDemo5() {
  mM1.bnd(val => add(mM1.x, mM1, 1).bnd(cube))
  update0();
}

function updateDemo6() {
  mM1.bnd(add,1).bnd(cube)
  update0();
}

function updateDemo7() {
  mM1.bnd(val => add(mM1.x, mM1, v).bnd(cube))
  update0();
}

function updateDemo8() {
  mM1.bnd(add,1).bnd(cube)
  update0();
}

function updateDemo9() {

  update0();
}

function update2B(event) {
  mM1.ret(3).bnd(v => mM2.ret(v).fmap(cu, mM2));
  console.log(mM1.x, mM2.x);
  update0();
}

function update2B2(event) {
  mM3.ret(3).fmap( _ => {var a = mM3.x; mM4.ret(a).fmap(cu); return a})
  console.log(mM1.x, mM2.x);
  update0();
}

function update2B3(event) {
  mM5.ret(3).bnd(mM6.ret).bnd(cube) 
  console.log(mM1.x, mM2.x);
  update0();
}

function update2C(event) {
  mM1.ret(3).fmap(v => mM2.ret(v + 7)).bnd(pure);
  console.log(mM1.x, mM2.x);
  update0();
}

function update2D(event) {
  mM3.ret(3).fmap(x => x*x*x).bnd(pure);
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
  mM3.fmap(_ => mM8.x);
  mM8.bnd(mM4.ret);
  console.log(mM1.x, mM2.x);
  update0();
}

function updateSteps(event) {
    mM1.ret(0).bnd(mM2.ret).bnd(mM3.ret).bnd(mM4.ret)
     .bnd(() => mM1.ret('Click the mMI2.release() button to proceed')
     .bnd(() => mMI2.block()
     .bnd(() => mM2.ret('Click it again.')
     .bnd(() => mMI2.block()
     .bnd(() => mM3.ret('Keep going')
     .bnd(() => mMI2.block()
     .bnd(() => mM4.ret('One more')
     .bnd(() => mMI2.block()
     .bnd(() => mM1.ret(0).bnd(mM2.ret).bnd(mM3.ret)
     .bnd(mM4.ret)
      ))))))))) 
  console.log(mM1.x, mM2.x);
  update0();
}

function updateNext(event) {
  mMI2.release()  
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


