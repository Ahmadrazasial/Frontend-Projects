// Define different randomColor functions
const randomColorFns = [
    () => `hsl(${Math.random() * 60}, 100%, 50%)`,   // Red range
    () => `hsl(${Math.random() * 60 + 60}, 100%, 50%)`, // Yellow/Green
    () => `hsl(${Math.random() * 60 + 120}, 100%, 50%)`, // Green/Cyan
    () => `hsl(${Math.random() * 60 + 180}, 100%, 50%)`, // Cyan/Blue
    () => `hsl(${Math.random() * 60 + 240}, 100%, 50%)`, // Blue/Purple
    () => `hsl(${Math.random() * 60 + 300}, 100%, 50%)`, // Magenta/Red
];
const pelArr = Array.from(document.querySelectorAll(".pel"));
// Apply each color function to its corresponding pel
pelArr.forEach((pel, i) => {
    const colorFn = randomColorFns[i]; // cycle if more pels than functions
    const colArr = Array.from(pel.querySelectorAll(".col"));

    colArr.forEach((col,index) => {
        col.style.backgroundColor = colorFn();
        // const colI= colArr[1];
        const style = window.getComputedStyle(col);
        const bgColor = style.backgroundColor;
        col.textContent = bgColor;
        console.log(bgColor)
    });
});
