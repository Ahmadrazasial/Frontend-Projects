let cont = document.querySelector(".container");
let info = document.querySelector("#intro");
let startBtn = document.querySelector("#btn");
let qBox = document.querySelector(".question");
let sawal = document.querySelectorAll(".sawal");
let submit = document.querySelectorAll(".Check");
let next = document.querySelectorAll(".next");
let options = document.querySelectorAll(".options")
let radios = document.querySelector('input[name="options"]');
// let label = selected.closest('label');
const answers = ["Ramzan"];

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
            } else {
                label.style.color = "red";
                const radios = currentS.querySelector('input[name="options"]');
                const otherlabel = radios.closest("label");
                const otherText = otherlabel.textContent.trim();
                if (answers.includes(otherText)) {
                    otherlabel.style.color = "green";
                }
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