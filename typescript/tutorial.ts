// Benefits of typescript
// 1. Typescript is a strong typed language
// 2. Object oriented features
// 3. Compile time errors
// 4. Great tooling

// Typescript is transpiled to javascript so that it can be understood by the browsers
// installation ------> npm i -g typescript
// compiling ------> tsc FILENAME.ts
// Giving additional features in the tsconfig.json file (in the root folder of the project)


// Variable declaration
// A variable declared with var is declared (scoped) to the nearest function while if declared with let it is bound (scoped) to the nearest block of code 

let a = 5;
// count = 'a';     gets error as it is a number (if not declared with types, it takes types from the value passed (default behaviour))

// If we want the variable to have any type use like;
let b: any = 10;
// b = 'this';      does not generate an error

// Types in typescript (except the any type)
let c: number; 
let d: boolean;
let e: string;

enum Color { Red, Green, Blue };
let backgroundColor = Color.Blue;   // gets value 2 (index of Blue)


// Type Assertions (same as type casting in C/C++)
let message: string;    // type declared in assignment 
let msg;    // This is of type:any
msg = 'abc';     // this does not change the type
let m1 = (<string>msg).endsWith('c');   // one way of doing 
let m2 = (msg as string).endsWith('c'); // alternative way of doing 


// concept of arrow functions 
let log = (msg) => { console.log(msg); }
/* also written shorthand as */     let newlog = msg => console.log(msg);


// functions in typescript
// function parameters and return values also require type check, if no type is set, defaults to any
let doSomething = (x?:number, y?:number):string => {
    console.log('This works in the do something function');
    return (x+y).toString();
}   // x and y have number type set
doSomething(); // does not return error as '?' makes the parameters optional 



// Object oriented programming stuff
// Approach 1 (inline annotations) verbose and everytime we need to repeat the object literal
let drawPoint = (point: { x: number, y: number }) => {
    //....function body
}
drawPoint({ x:1, y:2 }); // passed values

// Approach 2 (use of interfaces and making use of abstraction principle)
interface Point { x:number, y:number }  // making some sort of prototype (only for declarations, cant have algorithms)
// can have signature of the function (function prototyping in C/C++)

// use of pascal naming convention (first letter should be capitalised and every subsequent part's first letter be capitalised like if we want to write "do something" we write as DoSomething)

let draw = (point: Point) => { /* function body */ }
let getDistance = (pointA: Point, pointB: Point) => { /* function body */ }
// this is not promoted by the object oriented principles (particularly known as cohesion)
// cohesion means that things of one type should stay together
// here, draw and getDistance are functions (methods) defined on the Point type, so it is better to take this under one 

class Position{
    latitude: number;
    longitude: number;
    height: number;
    getDistance(another: Position){ /* function body */ };
    printPosition(){ console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}, height: ${this.height}`) }
}

// let pos1: Position;
// let pos2: Position;
// pos1.getDistance(pos2)  // This throws an error because the pos1 (and pos2 also) is not defined (because we need to dynamically allocate memory for this newly created variable using the new keyword)
let pos1 = new Position();  // this doesnt throw error but results in pos1 being undefined because its members arent set yet
pos1.longitude = 12;
pos1.latitude = 10;
pos1.height = 55;
pos1.printPosition();   // now this prints the values defined

// Classes with constructors (members are public by default)

// In typescript, this code can be shortened to
// class Human{
//     name: String;
//     age: Number;
//     isAlive: Boolean;
//     constructor(private name: String, isAlive: Boolean, age?: Number){  }   // similar for public keyword
// }
// In this approach, typescript automatically generates the members with the same name and initialize the values also

class Human{
    private _name: String;   // Name cannot be changed once it is initialized in making the object from this class
    age: Number;
    isAlive: Boolean;

    constructor(name: String, isAlive: Boolean, age?: Number){   // ? to make the constructor variables optional
        this._name = name;
        this.age = age;
        this.isAlive = isAlive;
    }
    get name(){ return this._name; } 	// getter function
    set name(name){                     // setter function
        if(name == ''){ throw new Error('name cannot be empty')}        // validate name here because it cannot be accessed outside
        this._name = name;
    }
}
let man = new Human('Ramesh', true, 32);
console.log(man.name);  // using the getter function
man.name = 'Rahul'      // using the setter function


// file (module) is exported with the export keyword like export something...... and importing as import { something, somethingelse.... } from 'path of the file'
