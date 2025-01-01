const url = 'https://jokes-always.p.rapidapi.com/common';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '08de0fa1b3mshc88eaff21fbf380p15fd7fjsn2fdca5c03488',
		'x-rapidapi-host': 'jokes-always.p.rapidapi.com'
	}
};
var jokeString = "";
var funnyJokes = 0;
var unfunnyJokes = 0;

var tagline = document.querySelector("#tagline");
var question = document.querySelector("#question");
var punchLine = document.querySelector("#punchLine");
var joke = document.querySelector("#joke");
var reveal = document.querySelector("#reveal");

var choice = document.querySelector("#choice");
var funny = document.querySelector("#funny");
var unfunny = document.querySelector("#unfunny");

choice.style.display = "none";
reveal.style.display = "none";
joke.style.display = "block";
var jokeList = [];
joke.addEventListener("click",generateJoke);
reveal.addEventListener("click",function(){
	choice.style.display = "block";
	reveal.style.display = "none";
    punchLine.style.display = "block";
});
funny.addEventListener("click",function(){
	joke.style.display = "block";
	choice.style.display = "none";
	funny++;
});
unfunny.addEventListener("click",function(){
	joke.style.display = "block";
	choice.style.display = "none";
	unfunny++;
});

function generateJoke(){
	tagline.style.display = "none";
	question.textContent = "Generating Joke...";
    fetch(url, options)
	.then(response => response.json())
	.then(response => {console.log(response)

		
		jokeString = response.data;
		
		if(jokeList.includes(jokeString)){
			generateJoke();
		}
		else{
			
			jokeList.push(jokeString);
			var jokeData = jokeString.split("?");
			joke.style.display = "none"
			reveal.style.display = "block";
			punchLine.style.display = "none";
        	question.textContent = jokeData[0] + "?";
        	punchLine.textContent = jokeData[1];
        	punchLine.style.display = "none";
			if(jokeList.length == 10){
				console.log("list is full");
				jokeList = [];
				
				if(funny == 10){
					alert("You got a fantastic sense of humor!");
				}
				else if(funny > unfunny){
					alert("Definitely some funny jokes.");
				}
				else if(funny < unfunny){
					alert("Must not have some funny jokes here.");
				}
				else if(unfunny == 0){
					alert("Wow!  Those jokes must be down right terrible...");
				}
				funny = 0;
				unfunny = 0;
			}
			}
        

		 })
		 

	.catch(err => {console.error(err)});
}






// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }