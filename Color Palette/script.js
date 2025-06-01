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


// const cols = ["red", "green", "blue", "yellow", "orange", "pink", "black", "white"];

function redShade(rMin = 150, rMax = 255, gMax = 80, bMax = 80) {
  const seed = Math.random();
  const r = Math.floor(rMin + seed * (rMax - rMin));
  const g = Math.floor(Math.random() * gMax);
  const b = Math.floor(Math.random() * bMax);
  return `rgb(${r}, ${g}, ${b})`;
}

function greenShade(gMin = 150, gMax = 255, rMax = 80, bMax = 80) {
  const seed = Math.random();
  const r = Math.floor(Math.random() * rMax);
  const g = Math.floor(gMin + seed * (gMax - gMin));
  const b = Math.floor(Math.random() * bMax);
  return `rgb(${r}, ${g}, ${b})`;
}

function blueShade(bMin = 150, bMax = 255, rMax = 80, gMax = 80) {
  const seed = Math.random();
  const r = Math.floor(Math.random() * rMax);
  const g = Math.floor(Math.random() * gMax);
  const b = Math.floor(bMin + seed * (bMax - bMin));
  return `rgb(${r}, ${g}, ${b})`;
}

function yellowShade(rMin = 200, rMax = 255, gMin = 200, gMax = 255, bMax = 80) {
  const seedR = Math.random();
  const seedG = Math.random();
  const r = Math.floor(rMin + seedR * (rMax - rMin));
  const g = Math.floor(gMin + seedG * (gMax - gMin));
  const b = Math.floor(Math.random() * bMax);
  return `rgb(${r}, ${g}, ${b})`;
}

function orangeShade(rMin = 200, rMax = 255, gMin = 100, gMax = 170, bMax = 50) {
  const seedR = Math.random();
  const seedG = Math.random();
  const r = Math.floor(rMin + seedR * (rMax - rMin));
  const g = Math.floor(gMin + seedG * (gMax - gMin));
  const b = Math.floor(Math.random() * bMax);
  return `rgb(${r}, ${g}, ${b})`;
}

function pinkShade(rMin = 200, rMax = 255, gMax = 100, bMin = 150, bMax = 255) {
  const seedR = Math.random();
  const seedB = Math.random();
  const r = Math.floor(rMin + seedR * (rMax - rMin));
  const g = Math.floor(Math.random() * gMax);
  const b = Math.floor(bMin + seedB * (bMax - bMin));
  return `rgb(${r}, ${g}, ${b})`;
}

function blackShade(maxValue = 100) {
  const val = Math.floor(Math.random() * maxValue);
  return `rgb(${val}, ${val}, ${val})`;
}

function whiteShade(minValue = 200) {
  const val = Math.floor(minValue + Math.random() * (255 - minValue));
  return `rgb(${val}, ${val}, ${val})`;
}

// Get shade generator function based on color name
function getColorShadeFunction(color) {
  switch (color) {
    case "red": return redShade;
    case "green": return greenShade;
    case "blue": return blueShade;
    case "yellow": return yellowShade;
    case "orange": return orangeShade;
    case "pink": return pinkShade;
    case "black": return blackShade;
    case "white": return whiteShade;
    default: return null;
  }
}

document.getElementById('sBtn').addEventListener('click', () => {
  const input = document.getElementById('searchBar').value.trim().toLowerCase();
  if (!cols.includes(input)) {
    alert("Please enter a valid color.");
    return;
  }

  const shadeFunc = getColorShadeFunction(input);
//   const pels = document.querySelectorAll('.pel');

  pelArr.forEach(pel => {
    const colArr =Array.from( pel.querySelectorAll(".col"));
    
    colArr.forEach(col=>{
        col.style.backgroundColor = shadeFunc();
    })
  });
});
