/* function to crack */

var letters = "acdegilmnoprstuw";
function hash (s) {

    var h = 7;
        
    for(i = 0; i < s.length; i++) {
    
    h = (h * 37 + letters.indexOf(s[i]));
    
    }
    
    return h;
    
    }

/*  
There are several ways to solve the issue
we could do a brute force way where we would test "aaaaaaaa" then "aaaaaaac" and then "aaaaaaad".... 
but this would be very boring and with an 8 char string it would work somehow but if we work with a 20 char string i guess we would have to wait awhile.

We could proceed by using a dichotomy algorithm in order to put the amount of calculus to the minimum.
The issue with this idea is that in order to do so we need to be able to find for two given strings "s1" and "s2" a string "ms"
 which value would approximately be in the middle of hash(s1) and hash(s2)
 Basically so hash(ms) = (hash(s1) +hash(s2))/2 .
 And just thinking about how to do so annoys me.


The obvious solution would be to do the first solution I gave but start by the left index. try "aaaaaaaa" then "caaaaaaa" .... until it's bigger than 24682779393128 
then start again with the next index. that is of course possible because "hash("awwwwwww") < hash("caaaaaaa")" is true.
My issue here is that the fact that "hash("awwwwwww") < hash("caaaaaaa")" is true is not obvious at all. And unless it was proven that the function hash is a strickly increasing function
using that solution is not recommended because we might have weird suprises if we tackle bigger numbers.


 But my idea might ask a bit more calculus from the processor but it's fairly easy to implement.

 We are going to throw n randomised strings into the hash function get the closest one from 24682779393128 (and inferior because counting in reverse would be annoying too)

 And then proceed to go step by step from there to find the solution.
 */

 /* just a function to get random ints  */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

/*  function to replace char in middle of strings.*/
  function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

/**
 * gives next String according to the problem.
 * @param {string} s 
 */
function getNextString(s){
    var next = s;
    for (var i = next.length-1; i>=0; i--){

        if (letters.indexOf(s[i]) == (letters.length-1)){
            next = replaceAt(next, i, letters[0])
        }
        else {
            var index = letters.indexOf(next[i])+1;
            next = replaceAt(next, i, letters[index])
            break;
        }
    }
    return next;
}
    



/*main function.
*/
function findString(n) {
    
    var closestString = "aaaaaaaa";
    var closestNumber = hash("aaaaaaaa");
    for(var i = 0; i < n; i++) {
        var s ="";
        for(var j=0; j<8; j++){
            s = s + letters[getRandomInt(letters.length)];
        }
        if (hash(s) > closestNumber && hash(s) < 24682779393128){
            closestNumber = hash(s);
            closestString = s;
            
        }
            
    }
    while(hash(closestString) != 24682779393128){
        closestString = getNextString(closestString);
    }
    console.log(hash(closestString))
    return closestString;

}

var rand = 10000;
console.log(findString(rand));
