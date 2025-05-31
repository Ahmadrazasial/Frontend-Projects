let gen = document.getElementById("generate");
const pelArr = Array.from(document.querySelectorAll(".pel"));

const randomcolors = [
    ()=> `hsl(${Math.random() * 30} , 80%,60%)`,
    ()=> `hsl(${Math.random() * 30 + 30},80%,60%)`,
    ()=> `hsl(${Math.random() * 30 + 60},80% ,60%)`,
    ()=> `hsl(${Math.random() * 30 + 160},80% ,60%)`,
    ()=> `hsl(${Math.random() * 60 + 180},100% ,40%)`,
    ()=> `hsl(${Math.random() * 30 + 310},80% ,60%)`,
];

function toHex(rgb) {
    const result = rgb.match(/\d+/g)
    // console.log(result)
    .map(n => parseInt(n).toString(16).padStart(2,'0'))
    .slice(0,3);
    return `#${result.join('')}`;
    // console.log(`#${result.join("")}`)

}

function fill() {
    pelArr.forEach((pel,i)=>{
        const colorfn = randomcolors[i];
        const colArr = Array.from(pel.querySelectorAll(".col"));
        
       
        colArr.forEach((col) =>{
            // const color = colorfn()
            col.style.backgroundColor = colorfn();
            const colRGB = window.getComputedStyle(col).backgroundColor;
            // console.log(colRGB)
            const colHex = toHex(colRGB).toUpperCase();

            col.querySelectorAll(".colCode").forEach(el=> el.remove());

 const span = document.createElement("span");
            span.className = "colCode";
            span.textContent = colHex;
            span.style.display = "none";
            col.appendChild(span);

            col.addEventListener("mouseenter",(e)=>{
                span.style.display = "block"
            })

            col.addEventListener("mouseleave",(e)=>{
                span.style.display = "none"
            })
            col.addEventListener("click",()=>{
                navigator.clipboard.writeText(colHex)
                .then(()=>{
                    span.textContent = "Copied!";
                setTimeout(()=>{
                    span.textContent = colHex;
                },1000)
                })
                

            })
        })
        
    })
}
document.addEventListener("DOMContentLoaded",(e)=>{
    e.preventDefault();
    fill()
})
gen.addEventListener("click",(e)=>{
e.stopPropagation();
    fill();
})

