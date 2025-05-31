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


function  autifill() {
   let cont = document.getElementById("searchCon")
let input = document.getElementById("searchBar");
let btn = document.getElementById("Sbtn");
const cols = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white"];


 const div = document.createElement("div");
    div.className = "list";
    cont.appendChild(div);
div.style.display = "none";
input.addEventListener("input",()=>{
   const value = input.value.toLowerCase();
   div.innerHTML = "";

   if(!value){
    div.style.display = "none";
    return;
   }

   const filtered =  cols.filter(opt => opt.toLowerCase().includes(value));
   filtered.forEach(obj=>{
const box = document.createElement("div");
box.className = "listItem";
box.textContent = obj;
box.addEventListener("mousedown",()=>{
    input.value = obj;
    div.style.display = "none";
  
})
div.appendChild(box);
   })


   
   let currentIndex = -1;
   const items =Array.from (document.querySelectorAll(".listItem"));
   
   function clear() {
    items.forEach(item => item.classList.remove("selected"));
   }

    document.addEventListener("keydown",(e)=>{
        if (currentIndex >= 0) items[currentIndex].classList.remove("selected");
        if(currentIndex >= 0){
                items[currentIndex].style.backgroundColor = "";
            }
        if(e.key === "ArrowDown"){
clear()
            currentIndex = (currentIndex + 1)%items.length;
            items[currentIndex].classList.add("selected")
            
        }
        if(e.key === "ArrowUp"){
            clear()
            currentIndex = (currentIndex - 1 + items.length)%items.length;
            items[currentIndex].classList.add("selected");
        }
    })


div.style.display = filtered.length ? "block" : "none";
})
 document.addEventListener("click",(e)=>{
    if(!div.contains(e.target)){
        div.style.display = "none";
    }
 })
}
autifill();
