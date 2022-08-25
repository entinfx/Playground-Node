# JavaScript

# Compiled or Interpreted?
The line between the two is blurred. The underlying standard behind JavaScript
ECMAScript does not require whether the language must be compiled or
interpreted, therefore different implementations exist:
- V8 (Chrome/Chromium, Node.js) compiles the code to bytecode and then machine
  code using JIT compilation before executing it. V8 uses a Garbage Collector
  for memory management.
- SpiderMonkey (FireFox) contains an Interpreter, a JIT compiler WarpMonkey and
  a Garbage Collector. WarpMonkey compiles the code to bytecode, generates Mid-
  and then Low-level Intermediate Representation, and compiles it to machine
  code.
- Rhino (Mozilla Foundation) converts JS code to Java classes and is intended
  for use in server-side applications. Rhino can work in either Interpreted or
  Compiled mode.

# Overview
- JS is dynamically typed and verifies type safety at runtime
- JS is prototype-based and allows the reuse of existing objects for inheritance
  and extension
- JS supports First-Class Functions, which means functions are treated as first-
  class citizens and support operations such as passing to other functions as
  arguments, returning them as values, and assigning them to variables.

# Typing
- JS is Weakly Typed, which means certain types are implicitly cast during certain
  operations.
- JS is Dynamically Typed, which means data type safety is checked at runtime.

# Prototype-Based OOP
- Existing objects in JS are used as prototypes for objects that want to extend
  or inherit their behaviors.
- Objects are arrays where the key is the name of object's property. A property
  can be accessed using the `object.property` or `object['property']` syntax.
- Functions are used as object constructors. Prefixing a function call with
  `new` will create a new instance of a prototype, inheriting its methods and
  properties. The constructor has the `prototype` property that is used for
  inheritance and extension of the object.
- There is no destinction between Functions and Methods. The destinction is made
  during the call - if a function is called as a method of an object, the
  function's local `this` keyword gets bound to that object.

# Single Threaded
JS is single threaded. Functions are processed one by one creating a Call Stack
with the functions' parameters and local variables. When the call stack is
empty, execution moves on to the next function in queue. This is called the
Event Loop. Due to the use of events and callbacks, the event loop is
non-blocking. Functions that run asynchronously 'call back' later once they are
ready to continue.