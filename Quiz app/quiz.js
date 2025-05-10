let cont = document.querySelector(".container");
let info = document.querySelector("#intro");
let startBtn = document.querySelector("#btn");
let qBox = document.querySelector(".question");
let sawal = document.querySelectorAll(".sawal");
let submit = document.querySelectorAll(".Check");
let next = document.querySelectorAll(".next");
let options = document.querySelectorAll(".options")
let selected = document.querySelector('input[name="options"]:checked');
// let label = selected.closest('label');
const answers = ["Ramzan"];

startBtn.addEventListener("click",()=>{
info.style.display = "none";
qBox.style.display = "block";
startBtn.style.display = "none"
// qBox.style.opacity = 1;
// qBox.style.transition= "opacity .5s ease-in-out";
})
submit.forEach((btn,index) =>{
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    next[index].style.display = "inline-block"
    if(!selected){
        alert("select")
    }
})
})