let input= document.getElementById("input");
let screen = document.querySelector("#screen");
let btn = document.querySelectorAll(".btn");


for(const item of btn){
    item.addEventListener("click", (e) => {
        let btntext = e.target.innerText; 

        // clear the screen before entering new expression
        if(input.value){
            input.value ="";
            screen.value="";
        }
        if(btntext === "AC"){
            btntext = "";
            screen.value ="";
        }
        if(btntext === "÷"){
            btntext = "/";
        }
        if(btntext === "×"){
            btntext = "*";
        }
        //screen.value -> will get the access of whatever value get in the input screen
        screen.value = screen.value + btntext;
    });      
}

const returnEval = (arg) =>{
    return eval(`"use strict"; (${arg})`);
};

const getresult = () =>{
    input.value = screen.value;
    // Never use direct 'eval()"
    // screen.value = eval(screen.value);

    screen.value = returnEval(screen.value);
};


const backspc = () =>{
    screen.value = screen.value.substring(0,screen.value.length - 1);
};


//TYPE-1 :: IT"S a Lengthy Process -> that's why we used "onclick()"
//it will run only after the clicking 
    // let equal = document.getElementById("eval");
    // equal.addEventListener("click", ()=>{
    // getresult();
    // });


//immediately calling without any values -> will through an error
    // getresult();


//TYPE-2 :: By using below u'll get error. it's immediately running without waiting, it'll run without even clicking

    // let equal = document.getElementById("eval");
    // equal.addEventListener("click", getresult());


//TYPE-3 :: It'll run without a bracket() for function -> getresult, i'm not calling

    // let equal = document.getElementById("eval");
    // equal.addEventListener("click", getresult);

