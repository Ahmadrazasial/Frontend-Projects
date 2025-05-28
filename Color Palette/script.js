console.log("working");
let pel = document.querySelectorAll(".pel");
const pelArr = Array.from(pel);

pelArr.forEach((pel,index)=>{
    const col = pel.querySelectorAll(".col");
    const colArr = Array.from(col);
    colArr.forEach((col)=>{
        
        col.style.backgroundColor = randomColor(100);
        console.log(col.backgroundColor);
    })
})


// const pelA = pelArr[0];

// let colA = pelA.querySelectorAll(".col");
// const colArra  = Array.from(colA);

// colArra.forEach(col=>{
//     col.style.backgroundColor = randomColor();
// })


function randomColor(nbr) {
    const r = Math.floor(Math.random() * nbr +60).toString(16).padStart(2,'0');
    const g = Math.floor(Math.random()* nbr + 60).toString(16).padStart(2,'0');
    const b = Math.floor(Math.random() * nbr + 60).toString(16).padStart(2,'0');

    return `#${r}${g}${b}`;
}
// randomColor();
