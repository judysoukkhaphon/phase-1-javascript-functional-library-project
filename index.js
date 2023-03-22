/* Phase-1. Module: Context in Javascript. 
This lab is about creating functions that can handle either an array or an object(aka JS dictionaries). 
Challenge is to write them without using built in methods. Which I haven't been using anyway because I don't know how. Lol.

NOTE*: myReduce() isn't passing test, see comments for more details. Pushing to Github anyway to see if it passes.
*/

/*
a callback function is a function passed as an argument to myFunc(data, callback)
myFunc will call >> callback() inside of its body.
example: 
if I have:
function print(x){ 
    console.log(x)
}
function myFunc(x, callback){
    let y = x.charAt(0)
    callback(y);                    << This will call my print() function on y.
}
then I call:
>> myFunc("hello World", print)
I get:
>> "h"
*/

/* COLLECTION FUNCTIONS (Arrays or Objects)*/

    /* The collection has to be iterable for both arrays and objects(dictionaries)
    my for-loop works on arrays only. There is no way to write a generic function in JS.
    so I have to first test the data type of the collection.
    if type = false, then its a dictionary object
    I create an array, genericArray, of just the dictionary values, excluding the keys.
    if type = true, then genericArray is just set to the original collection
    */
    // created this so I don't have to keep testing the collection in every function
    function testCollection(collection){
            let type = Array.isArray(collection);
            let genericArray = [];
            if(type === false){       
                genericArray = Object.values(collection);
            } else{
                genericArray = collection;
            }
            return genericArray;
        }

function myEach(collection, callback){
    let genericArray = testCollection(collection);

    // iterate over the collection, passing each element to the callback function which should just return the original collection
    //Return the original, unmodified collection.

    for(let j = 0; j < genericArray.length; j++){
        callback(genericArray[j]);
    }

    return collection;
}

function myMap(collection, callback){
    let genericArray = testCollection(collection);

    // produce a new array of values by 'mapping' each value in collection through a transformation callback function.
    // return the new array WITHOUT MODIFYING the original
    
    let result =[];
    for(let j = 0; j < genericArray.length; j++){
        result.push(callback(genericArray[j]));
    }

    return result;
}


/* myReduce() isn't passing test. It says I should expect 28 when an initial value isn't passed. 
My 'acc' is set to equal collection[0] when no initial value is given, 
as the directions ask for (I think anyway). I'm looking at the math from the given callback
 function in the test and it doesn't seem like my result of 31 should be wrong?

 From Test:
    const testArr = unmodifiedTestArr.slice() // arr is [1, 2, 3, 4]
    const testObj = Object.assign({}, unmodifiedTestObj) // obj is {one: 1, two: 2, three: 3, four: 4}
    const callback = (acc, val, collection) => (acc + (val * 3))
    ...
    ...
    const reduceSansAcc = myReduce(testArr, callback)
    expect(reduceSansAcc).to.equal(28)

My loop results of (acc + (val * 3)):
    1 + ((1) * 3) = 4
    4 + ((2) * 3) = 10
    10 + ((3) * 3) = 19
    19 + ((4) * 3) = 31
    returns: 31
*/
function myReduce(collection, callback, acc){
    //console.log("original: " + collection);
    
    let genericArray = testCollection(collection);
    //console.log("collection: " + genericArray);

    if(acc === undefined){
        acc = genericArray[0];   
    }
    //console.log("acc: " + acc);

    /* FROM DIRECTIONS */
    // acc argument is a starting value for the accumulator (optional)
    // iterate through a collection of values, sending each to the callback function which will accumulate the values in some way
    // if an "acc" is not passed, the starting value should be the first value in the collection
    // return a single value
    // The callback is passed three arguments: the current value of acc, the current element/value in our iteration, and a reference to the entire collection


    for(let j = 0; j < genericArray.length; j++){
        console.log(acc + " + ((" + genericArray[j] + ") * 3) = " +  callback(acc, genericArray[j], genericArray));
        acc = callback(acc, genericArray[j], genericArray);
    }
    //console.log("return: " + acc);
    return acc;
}


function myFind(collection, predicate){
    let genericArray = testCollection(collection);

    // "predicate" is a callback function that returns a boolean value.
    // test each value in the collection with the predicate callback function. 
    // return first value that returns "true" or "undefined" if none pass the test. Must stop iterating over collection as soon as a "true" value is found.

    let result;
    for(let j = 0; j < genericArray.length; j++){
        if(predicate(genericArray[j]) === true){
            return result = genericArray[j];
        }
    }

    return result;
}

function myFilter(collection, predicate){
    let genericArray = testCollection(collection);
    // "predicate" is a callback function that returns a boolean value.
    // return an array of all values in the collection that return "true" from the predicate callback function

    let result = [];
    for(let j = 0; j < genericArray.length; j++){
        if(predicate(genericArray[j]) === true){
            result.push(genericArray[j]);
        }
    }

    return result;
}

function mySize(collection){
    let genericArray = testCollection(collection);
    // return an integer representing the number of values in the collection

    let counter = 0;
    for(let j = 0; j < genericArray.length; j++){
        counter += 1;
    }

    return counter;
}

/* ARRAY FUNCTIONS*/

function myFirst(array, n=0){
    // n is an integer, which is optional
    // return the first element or an array of the first [n] elements
    let result;
    if(n === 0){
        result =  array[n];
    } else{
        result = [];
        for(let i = 0; i < n; i++){
            result.push(array[i]);
        }
    }

    return result;
}

function myLast(array, n){
    // [n] is an integer, which is optional
    // return the last element or an array of the last [n] elements
    // NOTE*: You can't access the array in reverse by using negative numbers. 
    //  i.e. array[-1] will not return the last element. the index is always non-negative
    // at first I set n = array.length - 1, so that it will grab the last element if no arg is passed for n
    // but then the test passed a value that was equal to array.length - 1
    // so I had to test whether a value was passed for n in the function body instead.

    let result;
    if(n === undefined){
        result =  array[array.length-1];
    } else{
        result = [];
        let count = 0;
        for(let i = array.length - 1; count < n; i--){
            result.unshift(array[i]);
            count++;
        }
    }
    return result;
}

/* BONUS */
function mySortBy(array, callback){
// return a copy of the array in ascending order
}

/* BONUS */
function myFlatten(array, [shallow], newArr=[]){
    // parameters: an array, an (optional) boolean value, a new array
    // return a copy of the array that removes the first nested array and adding their elements into the upper-array. 
    // i.e. if array = [1,[2], [[3]]] then return [1, 2, [3]]
}

/* OBJECT FUNCTIONS */

function myKeys(object){
    // object is a dictionary, return an array of the keys
    // is there another way to access keys without using Object.keys(object)?
    return Object.keys(object);
}

function myValues(object){
    // object is a dictionary, return an array of the values
    return Object.values(object);
}