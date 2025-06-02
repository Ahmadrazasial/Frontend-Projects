let gen = document.getElementById("generate");
const pelArr = Array.from(document.querySelectorAll(".pel"));

const randomcolors = [
    () => `hsl(${Math.random() * 30} , 80%,60%)`,
    () => `hsl(${Math.random() * 30 + 30},80%,60%)`,
    () => `hsl(${Math.random() * 30 + 60},80% ,60%)`,
    () => `hsl(${Math.random() * 30 + 160},80% ,60%)`,
    () => `hsl(${Math.random() * 60 + 180},100% ,40%)`,
    () => `hsl(${Math.random() * 30 + 310},80% ,60%)`,
];



function toHex(rgb) {
    const result = rgb.match(/\d+/g)
        // console.log(result)
        .map(n => parseInt(n).toString(16).padStart(2, '0'))
        .slice(0, 3);
    return `#${result.join('')}`;
    // console.log(`#${result.join("")}`)

}

function fill() {
    pelArr.forEach((pel, i) => {
        const colorfn = randomcolors[i];
        const colArr = Array.from(pel.querySelectorAll(".col"));


        colArr.forEach((col) => {
            // const color = colorfn()
            col.style.backgroundColor = colorfn();
            const colRGB = window.getComputedStyle(col).backgroundColor;
            // console.log(colRGB)
            const colHex = toHex(colRGB).toUpperCase();

            col.querySelectorAll(".colCode").forEach(el => el.remove());

            const span = document.createElement("span");
            span.className = "colCode";
            span.textContent = colHex;
            span.style.display = "none";
            col.appendChild(span);

            col.addEventListener("mouseenter", (e) => {
                span.style.display = "block"
            })

            col.addEventListener("mouseleave", (e) => {
                span.style.display = "none"
            })
            col.addEventListener("click", () => {
                navigator.clipboard.writeText(colHex)
                    .then(() => {
                        span.textContent = "Copied!";
                        setTimeout(() => {
                            span.textContent = colHex;
                        }, 1000)
                    })


            })
        })

    })
}
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    fill()
})
gen.addEventListener("click", (e) => {
    e.stopPropagation();
    fill();
})



 let cont = document.getElementById("searchCon")
    let input = document.getElementById("searchBar");
    let btn = document.getElementById("Sbtn");
    const cols = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white"];
function autifill() {

    const div = document.createElement("div");
    div.className = "list";
    cont.appendChild(div);
    div.style.display = "none";
    input.addEventListener("input", () => {
        const value = input.value.toLowerCase();
        div.innerHTML = "";

        if (!value) {
            div.style.display = "none";
            return;
        }

        const filtered = cols.filter(opt => opt.toLowerCase().includes(value));
        filtered.forEach(obj => {
            const box = document.createElement("div");
            box.className = "listItem";
            box.textContent = obj;
            box.addEventListener("mousedown", () => {
                input.value = obj;
                div.style.display = "none";

            })
            div.appendChild(box);
        })



        let currentIndex = -1;
        const items = Array.from(document.querySelectorAll(".listItem"));

        function clear() {
            items.forEach(item => item.classList.remove("selected"));
        }

        document.addEventListener("keydown", (e) => {
            if (currentIndex >= 0) items[currentIndex].classList.remove("selected");
            if (currentIndex >= 0) {
                items[currentIndex].style.backgroundColor = "";
            }
            if (e.key === "ArrowDown") {
                clear()
                currentIndex = (currentIndex + 1) % items.length;
                items[currentIndex].classList.add("selected")

            }
            if (e.key === "ArrowUp") {
                clear()
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                items[currentIndex].classList.add("selected");
            }
        })


        div.style.display = filtered.length ? "block" : "none";
    })
    document.addEventListener("click", (e) => {
        if (!div.contains(e.target)) {
            div.style.display = "none";
        }
    })
}
autifill();

function  colShade(min , max ) {
  const seed = Math.random();
    const value = Math.floor(min + seed * (max-min))

    return `rgb(${value},${value},${value})`;
}

const colTheme = [
    colShade()
]

// const cols = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white"];

function red(rmin = 150,rmax = 255,gmax = 80,bmax = 80) {
  const seed = Math.random();

  const r = Math.floor(rmin + seed *(rmax - rmin));
  const g = Math.floor(Math.random () *gmax);
  const b = Math.floor(Math.random() * bmax);

  return `rgb(${r},${g},${b})`;
}

function blue(bmin = 150,bmax = 250,rmax = 80,gmax = 80) {
  const seed = Math.random();
  const r = Math.floor(Math.random() * rmax);
  const g = Math.floor(Math.random() * gmax);
  const b =Math.floor(bmin + seed * (bmax - bmin));

  return `rgb(${r},${g},${b})`;
  
}

function blue(gmin = 150,gmax = 250,rmax = 80,bmax = 80) {
  const seed = Math.random();
  const r = Math.floor(Math.random() * rmax);
  const b = Math.floor(Math.random() * bmax);
  const g =Math.floor(gmin + seed * (gmax - gmin));

  return `rgb(${r},${g},${b})`;
  
}
console.log(blue())

function yellow(gmin = 200,gmax = 250, rmin = 200,rmax = 250,bmax = 80) {
  const seedr = Math.random();
  const seedg = Math.random();
  const r = Math.floor(rmin + seedr * (rmax - rmin));
  const g =Math.floor(gmin + seedg * (gmax - gmin));
const b = Math.floor(Math.random() * bmax);
  return `rgb(${r},${g},${b})`;
}
console.log(yellow())


function orange(rmin = 200,rmax = 255, gmin = 100,gmax = 170,bmax = 50) {
  const seedr = Math.random();
  const seedg = Math.random();
  const r = Math.floor(rmin + seedr * (rmax - rmin));
  const g =Math.floor(gmin + seedg * (gmax - gmin));
const b = Math.floor(Math.random() * bmax);
  return `rgb(${r},${g},${b})`;
}


function pink(rmin = 200,rmax = 255,gmax = 100,bmin=150,bmax = 255) {
  const seedr = Math.random();
  const seedb = Math.random();
  const r = Math.floor(rmin + seedr * (rmax - rmin));
  const g = Math.floor(Math.random() * gmax);
  const b =Math.floor(bmin + seedb * (bmax - bmin));

  return `rgb(${r},${g},${b})`;
}
function purple(rmin = 120,rmax = 200, gmax = 60,bmin=120,bmax = 200) {
  const seedr = Math.random();
  const seedb = Math.random();
  const r = Math.floor(rmin + seedr * (rmax - rmin));
  const g =Math.floor(Math.random() * gmax);
const b = Math.floor(bmin + seedb *(  bmax - bmin));
  return `rgb(${r},${g},${b})`;
}


function brown(rmin = 100,rmax = 160,gmin=50, gmax = 110,bmin=20,bmax = 60) {
  const seed = Math.random();
  const r = Math.floor(rmin + seed * (rmax - rmin));
  const g =Math.floor(gmin + Math.random() * (gmax-gmin));
const b = Math.floor(bmin + Math.random() *(  bmax - bmin));
  return `rgb(${r},${g},${b})`;
}
input.style.backgroundColor =brown() ;

function black(max = 100) {
  const value = Math.floor(Math.random() * max)
  return `rgb(${value},${value},${value})`;
}
input.style.backgroundColor =black() ;
function white(min = 200) {
  const value = Math.floor(min + Math.random() *(255 - min))
  return `rgb(${value},${value},${value})`;
}
input.style.backgroundColor = white() ;