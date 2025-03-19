let currSlideIndex = 0;

function showslide(index){
const slides = document.getElementsByClassName("carousel-slide");
console.log(slides);

const dot = document.getElementsByClassName("dot");
console.log(dot);

//Condition to reset to first slide when the user clicks next button on the last slide
if(index >= slides.length){
    currSlideIndex = 0;
}

//Condition to reset to last slide when the user clicks previous button on the first slide
if(index < 0){
    currSlideIndex = slides.length-1;
}

//Looping through the slides to hide unwanted slides from the DOM.
for(let i=0; i< slides.length; i++){
    slides[i].style.display = "none";
}

//Looping through the dots to remove class from the dots
for(let i=0; i<dot.length; i++){
    dot[i].className = dot[i].className.replace("dot-active", "");
}

//To show only 1 slide with current index by replacing display property
slides[currSlideIndex].style.display ="block";

// console.log(dot[currSlideIndex].className);

//To add class to active dots, enabling us to add specific style to active dot.
dot[currSlideIndex].className += " dot-active";
}
 
// A function responsible for moving slide by n number
function changeslide(n){
    showslide((currSlideIndex += n));
}

// A function to jump on to particular slide
function currentslide(n){
    showslide(currSlideIndex = n);        
}

//Initial Setup
showslide(currSlideIndex);

