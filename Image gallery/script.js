// const { createElement } = require("react");

console.log("Pinned");
let upload = document.getElementById("upload");
let input = document.getElementById("uploadFile");
let mainImg = document.getElementById("uploadedImg");
let preview = document.querySelector(".view");
let uploadBtn = document.querySelector(".viewBtn");

upload.addEventListener("click", () => {
    input.click();
})
input.addEventListener("change", function () {
    const file = this.files[0];
    const img = document.querySelector(".uploaded")

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            mainImg.setAttribute('src', e.target.result);
            uploadBtn.style.display = "none";
            preview.style.display = "block";

        }
        reader.readAsDataURL(file);
    }
})

let folder = document.getElementById("folder");
let thumbnails = document.getElementById("thumbnails");
let folderBtn = document.getElementById("folderBtn");
let folderInput = document.querySelector("#folUpload");
let list = document.querySelector("#list");
folderBtn.addEventListener("click", () => folderInput.click());

folderInput.addEventListener("change", function (e) {
    e.preventDefault();
    const files = this.files;
    if (files) {
        // alert("folder uploaded")
        const filesArr = Array.from(files);

        const first = filesArr[0];

        filesArr.forEach((file, index) => {
            const li = document.createElement("li");
            li.className = "small";
            const img = document.createElement("img");
            img.className = "smallImg";
            li.appendChild(img)

            list.appendChild(li);



            const reader = new FileReader();
            reader.onload = function (e) {
                e.preventDefault();
                img.setAttribute('src', e.target.result);
                if (index === 0)
                    mainImg.setAttribute('src', e.target.result);
                folder.style.display = "none";
                thumbnails.style.display = "block";
                uploadBtn.style.display = "none";
                preview.style.display = "block";
            }

            reader.readAsDataURL(file);
        })
    }
    function changeImg() {
        let img = document.querySelectorAll(".smallImg");
        img.forEach(image => {
            image.addEventListener("click", () => {
                mainImg.src = image.src

            });
        })
    }
    changeImg();

})
list.addEventListener("wheel", (e) => {
    e.preventDefault();
    list.scrollLeft += e.deltaY;
})
let isHovered = false;
list.addEventListener("mouseenter", (e) => {
    isHovered = true;
})
list.addEventListener("mouseleave", (e) => {
    isHovered = false;
})
list.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (!isHovered) return;
    if (e.key === "ArrowRight") {
        list.scrollBy({
            left: 200,
            behavior: 'smooth',
        })
    } else if (e.key === "ArrowLeft") {
        list.scrollBy({
            left: -200,
            behavior: 'smooth',
        })
    }
})

function zoom() {
    let zoomed = true;
    let currentY = 0;
    function length(e,element){
        
        const rect = mainImg.getBoundingClientRect();
        // alert(rect.left);
   
        const offsetX = e.clientX - rect.left;
        
        const offsetY = e.clientY - rect.top;
        // alert(offsetX & offsetY);

        const percentX = (offsetX / rect.width) * 100;
        const percentY = (offsetY / rect.height) * 100;

        return {percentX ,percentY};
    }
    mainImg.addEventListener("dblclick", (e) => {
        // alert("clicked")
         const {percentX,percentY} = length(e,mainImg);

        if (!zoomed) {

            mainImg.style.transformOrigin = `${percentX}% ${percentY}%`;
            mainImg.style.transform = "scale(2)";
            preview.style.overflow = "hidden";
            zoomed = true;
        } else if (zoomed) {
            mainImg.style.transformOrigin = " center center";
            mainImg.style.transform = "scale(1)";
            zoomed = false;
            preview.style.height = '';
           
        }
    })

        mainImg.addEventListener("wheel",(e)=>{
            const {percentX , percentY} = length(e,mainImg)
            if(e.ctrlKey){
                mainImg.style.transformOrigin = `${percentX}% ${percentY}%`;
                mainImg.style.transform = "scale(2)";
                zoomed = true;
            }
        })


    mainImg.setAttribute('tabindex', '0');
    mainImg.focus();
    mainImg.addEventListener("keydown", (e) => {

        if (!zoomed) return;
        const preBox = preview.getBoundingClientRect();
        const imgBox = mainImg.getBoundingClientRect();


        const scale = 2;
        const preHeight = preBox.height;

        const scaleHeight = imgBox.height;
        
        const maxUp = preHeight - scaleHeight;

        if (e.key === "ArrowUp") {
            currentY -= 20;
            // if( currentY < scaleHeight) currentY = 0;

        }
        if (e.key === "ArrowDown") {
            currentY += 20;

            if (currentY > 0) currentY = 0;


        }

        mainImg.style.transform = `scale(2) translateY(${currentY}px)`;
    })

}

zoom();
let add = document.querySelector(".add");
let thumbnailBtn = document.querySelector("#thumbnail");
  let addBox = document.querySelector(".adding");
  let rotated = false;

add.addEventListener("click",(e)=>{
    e.stopPropagation();
    rotated = !rotated;

    add.style.transform = rotated ? "rotate(45deg)": "rotate(0deg)";
    addBox.classList.toggle("show");
})
addBox.addEventListener("click",(e)=>{
    e.stopPropagation();
})
document.body.addEventListener("click",()=>{
    addBox.classList.remove("show");
    add.style.transform = "rotate(0deg)"
})

let imgAdd = document.querySelector("#cam");
let folAdd = document.querySelector("#fol");

folAdd.addEventListener("click", () => folderInput.click());
imgAdd.addEventListener("click", () => {
    input.click();
})



 
let left = document.getElementById("left");
let right = document.getElementById("right");

right.addEventListener("click",(e)=>{
    e.preventDefault();
    let listImg = document.getElementsByClassName("smallImg");
    let array = Array.from(listImg);
   const currentIndex = array.findIndex(img => img.src === mainImg.src)
    if(currentIndex !== -1 && currentIndex < array.length - 1){
        const nextImg = array[currentIndex + 1];
        mainImg.src = nextImg.src ;
    }
})
left.addEventListener("click",(e)=>{
    let listImg = document.getElementsByClassName("smallImg");
    let array = Array.from(listImg);
    const currentIndex = array.findIndex(img => img.src === mainImg.src);
    if(currentIndex > 0){
        const preImg = array[currentIndex - 1];
        mainImg.src = preImg.src;
    }
})

// mainImg.addEventListener("mouseenter",()=>{
//     isHovered = true;
//     if(e.key === "ArrowRight"){
//         right.click();
//     }
// })

document.body.addEventListener("keydown",(e)=>{
    if(e.ctrlKey && e.key === "i"){
        input.click();
    }
    if(e.ctrlKey && e.key === "f"){
        folderInput.click();
    }
    if(e.key === "ArrowRight"){
        right.click();
    }
    if(e.key === "ArrowLeft"){
        left.click();
    }
})
