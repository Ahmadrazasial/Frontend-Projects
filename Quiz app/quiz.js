let cont = document.querySelector(".container");
let info = document.querySelector("#intro");
let startBtn = document.querySelector("#btn");
let qBox = document.querySelector(".question");
let sawal = document.querySelectorAll(".sawal");
let submit = document.querySelectorAll(".Check");
let next = document.querySelectorAll(".next");
let options = document.querySelectorAll(".options")
let radios = document.querySelector('input[name="options"]');
let result = document.querySelector(".result");
let btn = document.querySelector(".finish");
let mark = document.querySelector(".marks");
let marks = 0;
// let label = selected.closest('label');
const answers = ["Ramzan","Rehmat Ali","Syed Amir-uddin","Sarhad","140,001 - 150,000","Two-Nation Theory","Debates over language, religious identity, and federal structure","It caused urban overcrowding, resource shortages, and communal tension","Iran","Karachi"];

startBtn.addEventListener("click", () => {
    info.style.display = "none";
    qBox.style.display = "block";
    startBtn.style.display = "none"
    // qBox.style.opacity = 1;
    // qBox.style.transition= "opacity .5s ease-in-out";
})
submit.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        btn.style.display = "block";

        const currentS = Array.from(sawal).find(q => {
            return window.getComputedStyle(q).display !== "none";
        })

        const selected = currentS.querySelector('input[name="options"]:checked');

        if (!selected) {
            alert("Please select an option");
        }
        else if (selected) {
            submit[index].style.display = "none"
            next[index].style.display = "inline-block";
            const label = selected.closest("label");

            const text = label.textContent.trim();
            if (answers.includes(text)) {
                label.style.color = "Green";
                marks += 1;
                console.log(marks);
            } else {
                label.style.color = "red";
                const radios = currentS.querySelectorAll('input[name="options"]');
                radios.forEach(radio =>{
                const otherlabel = radio.closest("label");
                const otherText = otherlabel.textContent.trim();
                if (answers.includes(otherText)) {
                    otherlabel.style.color = "green";
                }
                })
              
            }
        }
    })
})
function nextSawal() {
    const currentS = Array.from(sawal).find(q => {
        return window.getComputedStyle(q).display !== "none";
    })
    const nextS = currentS.nextElementSibling;
    if (nextS) {
        currentS.style.display = "none";
        nextS.style.display = "block";
    }

}
next.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        nextSawal();
    })
})

let h2 = result.querySelector('h2');
let span = mark.querySelector('span');
let img = result.querySelector('img');
function show(){
    if(marks < 4){
        h2.innerHTML = "You are failed. Please try again";
        span.innerHTML = marks + "/10";
        img.src = "bd.png";
    }else if(marks >= 4){
        img.src = "congrats.svg";
        h2.innerHTML = "You have passed the test";
span.innerHTML = marks + "/10";
    }
}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    qBox.style.display = "none";
    result.classList.remove("pass");

    console.log(marks);

    show();

})