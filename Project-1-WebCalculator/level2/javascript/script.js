let input= document.getElementById("input");
let screen = document.querySelector("#screen");
let btn = document.querySelectorAll(".btn");

//Should not use eval() function directly -> so using "use strict ->  It enforces stricter parsing and error handling,"
const returnEval = (arg) =>{
    return eval(`"use strict"; (${arg})`);
};

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
        if(btntext === "+/-"){
          btntext = "";
          screen.value=  -returnEval(screen.value);          
        }
        if(btntext === "÷"){
            btntext = "/";
        }
        if(btntext === "×"){
            btntext = "*";
        }

        //STUDENT 1 ANSWER
        // if(btntext === "√"){
        //     screen.value = Math.sqrt(parseFloat(screen.value));
        //     //√ will come after the result
        //     btntext="";
        // }



        //screen.value -> will get the access of whatever value get in the input screen
        screen.value = screen.value + btntext;
    });      
}

      
const backspc = () =>{
    screen.value = screen.value.substring(0,screen.value.length - 1);
};

function convertToEvalString(input){
    // //Add space around operators
    // input = input.replace(/([%^()√\/+*-])/g, " $1 ");
    // console.log(`space: ${input}`);
    
    //replace ^ to **
    input=input.replace(/\^/g, "**");
    //replace √ to Math.sqrt()
    input = input.replace(/√/g, "Math.sqrt");
    

    // //Add parenthesis to Math.sqrt
    // input = input.replace(/Math.sqrt\s+(\S+)/, "Math.sqrt($1)");
    // console.log(`paranthesis: ${input}`);
    
    //Wrap the expression around paranthesis
    input = input.replace(/Math.sqrt(\d+)/g, "Math.sqrt($1)");
    return input;
};

const getresult = () =>{
    try{
        input.value = screen.value;
    // Never use direct 'eval()"
    // screen.value = eval(screen.value);

    screen.value = returnEval(convertToEvalString(screen.value));
    }
    catch(error){
        screen.value = "Error";
    }
};    

const calculatePercentage = () =>{
    let result = returnEval(screen.value) / 100;
    input.value = `${screen.value}%`;
    screen.value = result;
};

const inverse = () =>{
    try {
        let result = returnEval(1 / screen.value);
        input.value = `1/${screen.value}`;
        screen.value = result;        
    } catch (error) {
        console.log(error);
        
        screen.value = "Error";
    }
};


//To handle CE button
const clearExp = () =>{
    const currentExp = screen.value;    //23+96
    let lastExp = "";

    //lets use regex to find the last numerical exp
    let regex = /(\b\d+(\.\d+)?|\b\.\d+)\s*$/;
    let match = currentExp.match(regex);    // "space" 96
    if(match){
        lastExp = match[0].trim();  //"trimming space"96
    }
    screen.value = currentExp.replace(lastExp, "").trim();
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

