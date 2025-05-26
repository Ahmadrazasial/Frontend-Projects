
console.log("Pinned");
let upload = document.getElementById("upload");
let input = document.getElementById("uploadFile");
let mainImg = document.getElementById("uploadedImg");
let preview = document.querySelector(".view");
let uploadBtn = document.querySelector(".viewBtn");

/*uploading single image reading the file and converting it as a url for image src */

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

/** uploading a complete folder */

let folder = document.getElementById("folder");
let thumbnails = document.getElementById("thumbnails");
let folderBtn = document.getElementById("folderBtn");
let folderInput = document.querySelector("#folUpload");
let list = document.querySelector("#list");
folderBtn.addEventListener("click", () => folderInput.click());//clicks the folder input

//function when flder is uploaded
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

    //makes small image appear in large
    function changeImg() {
        let img = document.querySelectorAll(".smallImg");
        
        img.forEach(image => {
            image.addEventListener("click", () => {
               
                mainImg.src = image.src
                mainImg.style.transform = "scale(1)";
                // mainImg.style.transition = "none";
            });
        })
    }
    changeImg();
})

//scrolls small images on mouse wheel
list.addEventListener("wheel", (e) => {
    e.preventDefault();
    list.scrollLeft += e.deltaY;
})


//to scroll left on click
let next = document.querySelector("#next")
next.addEventListener("click", (e) => {
    e.preventDefault();
    back.style.opacity = 1;
    back.style.visibility = "visible";
    list.scrollBy({
        left: +200,
        behavior: 'smooth',
    })
    const max = list.scrollWidth - list.clientWidth;
    if (list.scrollLeft >= max) {
        next.style.opacity = 0;
        next.style.visibility = "hidden";
    }
})

//scroll right on click
let back = document.querySelector("#back");
back.addEventListener("click", (e) => {
    next.style.opacity = 1;
    next.style.visibility = "visible";
    list.scrollBy({
        left: -200,
        behavior: 'smooth',
    })
    if (list.scrollLeft <= 0) {
        back.style.opacity = 0;
        back.style.visibility = "hidden";
    }
})

//zooms the large image
function zoom() {
    let zoomed = true;
    let currentY = 0;
    function length(e, element) {

        const rect = mainImg.getBoundingClientRect();//gets image lengths
        // alert(rect.left);

        const offsetX = e.clientX - rect.left; //cursor from left

        const offsetY = e.clientY - rect.top;//from top
        // alert(offsetX & offsetY);

        const percentX = (offsetX / rect.width) * 100; //cursor position in percent
        const percentY = (offsetY / rect.height) * 100;

        return { percentX, percentY };
    }
    mainImg.addEventListener("dblclick", (e) => {
        // alert("clicked")
        const { percentX, percentY } = length(e, mainImg);//on function call gets percent values frommain image and stores in local variab;les

        if (!zoomed) {

            mainImg.style.transformOrigin = `${percentX}% ${percentY}%`;//where to zoom
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

    //slides image up and down when zoomed.Zoom is working but limits re not
    mainImg.setAttribute('tabindex', '0');
    mainImg.focus();
    mainImg.addEventListener("keydown", (e) => {

        if (!zoomed) return;
        const preBox = preview.getBoundingClientRect();/**lengths of image and image box based on zoom */
        const imgBox = mainImg.getBoundingClientRect();



        const preHeight = preBox.height;

        const scaleHeight = imgBox.height;

        const maxUp = preHeight - scaleHeight; //how long image can go up by getting a negative value

        if (e.key === "ArrowUp") {
            currentY -= 20;

            if (currentY < maxUp) currentY = maxUp;
        }
        if (e.key === "ArrowDown") {
            currentY += 20;

            // if (currentY >= 0) currentY = 0;


        }

        mainImg.style.transform = `scale(2) translateY(${currentY}px)`;
    })

}
zoom();

//buttons to upload folder and image
let add = document.querySelector(".add");
let thumbnailBtn = document.querySelector("#thumbnail");
let addBox = document.querySelector(".adding");
let rotated = false;

//displays buttons
add.addEventListener("click", (e) => {
    e.stopPropagation();//prevents event handler to propagate on parent
    rotated = !rotated;

    add.style.transform = rotated ? "rotate(45deg)" : "rotate(0deg)";
    addBox.classList.toggle("show");
})
addBox.addEventListener("click", (e) => {
    e.stopPropagation();
})

//on body click hides upload section
document.body.addEventListener("click", () => {
    addBox.classList.remove("show");
    add.style.transform = "rotate(0deg)"
})

//trigger events based on inputs
let imgAdd = document.querySelector("#cam");
let folAdd = document.querySelector("#fol");

folAdd.addEventListener("click", () => folderInput.click());
imgAdd.addEventListener("click", () => {
    input.click();
})




let left = document.getElementById("left");
let right = document.getElementById("right");

//moves the next image
right.addEventListener("click", (e) => {
    e.preventDefault();
    left.style.opacity = 1;
    left.style.visibility = "visible";

    let listImg = document.getElementsByClassName("smallImg");
    let array = Array.from(listImg);
    const currentIndex = array.findIndex(img => img.src === mainImg.src)//gets the index of current image
    if (currentIndex !== -1 && currentIndex < array.length - 1) {
        const nextImg = array[currentIndex + 1];
        mainImg.src = nextImg.src;
        mainImg.style.transform = "scale(1)"

    }
    if (currentIndex + 1 === array.length - 1) {
        right.style.opacity = 0;
        right.style.visibility = "hidden";

    }
})

//gets the previous image
left.addEventListener("click", (e) => {
    let listImg = document.getElementsByClassName("smallImg");
    let array = Array.from(listImg);
    right.style.opacity = 1;
    right.style.visibility = "visible";

    const currentIndex = array.findIndex(img => img.src === mainImg.src);//same thing
    if (currentIndex > 0) {
        const preImg = array[currentIndex - 1];
        mainImg.src = preImg.src;

    }
    if (currentIndex - 1 === 0) {
        left.style.opacity = 0;
        left.style.visibility = "hidden";
    }
})

//triggers events on keyborad keys
document.body.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "i") {
        input.click();
    }
    if (e.ctrlKey && e.key === "f") {
        folderInput.click();
    }
    if (e.key === "ArrowRight") {
        right.click();
        // right();
    }
    if (e.key === "ArrowLeft") {
        left.click();
    }
})
