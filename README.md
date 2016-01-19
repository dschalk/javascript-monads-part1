#DEPRICATED

The monads now map values to monads. Functions can be defined however you like, but for my purposes, "m.bnd(f, ...args)" no longer replaces the value in m or any other monad, it creates a new one with "new Monad(f(v, ...args)" where v is the value of m. There is now a function named "ret" which performs like Haskell's "return", and named monads still have a "ret" method for replacing their values. The project stresses chains and trees of anonymous monads that only release values into the global environment if and when they are needed.

The new repository is at [https://github.com/dschalk/JS-monads-part1](https://github.com/dschalk/JS-monads-part1)



