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
list.addEventListener("wheel",(e)=>{
e.preventDefault();
  list.scrollLeft += e.deltaY;  
})
let isHovered = false;
list.addEventListener("mouseenter",(e)=>{
    isHovered = true;
})
list.addEventListener("mouseleave",(e)=>{
    isHovered = false;
})
list.addEventListener("keydown",(e)=>{
    e.preventDefault();
if(!isHovered) return;
    if(e.key === "ArrowRight"){
        list.scrollBy({
            left:200,
            behavior:'smooth',
        })
    }
})
let zoomed = false;
mainImg.addEventListener("dblclick",(e)=>{
    // e.preventDefault();
    // alert("clicked")
    if(!zoomed){
    mainImg.style.transform = "scale(1.2)";
    preview.style.overflow = "hidden";
    zoomed = true;
    }else if(zoomed){
         mainImg.style.transform = "scale(1)";
         zoomed = false;
     }
})
