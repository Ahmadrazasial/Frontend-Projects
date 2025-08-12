console.log("working")


const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'd347ea0275mshde6afdce1672f1ep100f13jsnf46b51bb675e',
        'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    }
};

async function result(word) {

    const endpoints = {
        definition: `https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${word}`,
        synonym: `https://twinword-word-graph-dictionary.p.rapidapi.com/reference/?entry=${word}`,
        theme: `https://twinword-word-graph-dictionary.p.rapidapi.com/theme/?entry=${word}`,
        antonym: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,

    }


    try {

        const [defRes, synRes, theRes, antRes] = await Promise.all([
            fetch(endpoints.definition, options),
            fetch(endpoints.synonym, options),
            fetch(endpoints.theme, options),
            fetch(endpoints.antonym),
        ])
        const responses = [defRes, synRes, theRes, antRes];
        if (responses.some(res => !res.ok)) {
            document.querySelector(".error").innerHTML = "word not found";
           
            return;
        }
        const [defData, synData, theData, antData] = await Promise.all([
            defRes.json(),
            synRes.json(),
            theRes.json(),
            antRes.json(),

        ])
        console.log(synData);
        const meaning = defData.meaning?.adjective
            ? defData.meaning.adjective.split("(adj)").map(s => s.trim()).filter(Boolean).slice(0, 1)
            : ["no meaning found"];

        const synonyms = synData.relation?.synonyms
            ? synData.relation.synonyms.split(",").map(s => s.trim()).slice(0, 5)
            : ["not found"]

        const theme = theData.theme.map(item => item.trim()).slice(0, 4) || "no theme found";
        const antonym = antData[0]?.meanings[1]
            ? antData[0].meanings[1].antonyms.slice(0, 2)
            : ["not found"];


        // console.log(
        //     defData.meaning.adjective.split("(adj)").map(s => s.trim()).filter(Boolean),
        //     synData.relation.synonyms.split(",").map(s => s.trim()).slice(0, 5),
        //     theData.theme,
        //     antData[0].meanings[1].antonyms.slice(0, 6)
        // )
        return [meaning, synonyms, theme, antonym]
    } catch (error) {
        console.error("Api error", error.message);
        // return null
    }
}



let form = document.querySelector(".searchform");
let input = form.querySelector("#input");
let btn = form.querySelector("#btn");
let errorMsg = form.querySelector(".error");

// function search(param) {
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.innerHTML = "";
    if (input.value.trim() === "") {
        errorMsg.innerHTML = "please enter a word";
        return;
    }
    document.querySelector(".result").style.width = "90%"
    document.querySelector("#loading").style.display = "inline-Block";
    let resultCont = document.querySelector(".resultCont");
    resultCont.innerHTML = "";

    let value = input.value.toLowerCase();
    // try{
    const apiresult = await result(value);
    if (!apiresult){
        document.querySelector("#loading").style.display = "none";
        return;
    }
    const [meaning, synonyms, theme, antonym] = apiresult;

    resultCont.innerHTML = `
    <div class="output"><span class="title">Meaning : </span> <span class="copyText">${meaning}</span><span class="copied"></span><span class="copyImg"><img src="copy.svg" alt="copy"></span></div>
                <div class="output"><span class="title">Synonyms : </span> <span class="copyText">${synonyms}</span><span class="copied"></span><span class="copyImg"><img src="copy.svg" alt="copy"></span></div>
                <div class="output"><span class="title">Antonyms : </span> <span class="copyText">${antonym}</span><span class="copied"></span><span class="copyImg"><img src="copy.svg" alt="copy"></span></div>
                <div class="output"><span class="title">Theme : </span> <span class="copyText">${theme}</span><span class="copied"></span><span class="copyImg"><img src="copy.svg" alt="copy"></span></div>
                
                
                    `;
    document.querySelector("#loading").style.display = "none";
    let copyImgs = document.querySelectorAll(".copyImg");
    let outputs = document.querySelectorAll(".output .copyText");
    let copied = document.querySelectorAll(".copied");

    function copyText(index) {
        let indexed = outputs[index]?.childNodes[0]?.textContent.trim();
        if (!indexed) {
            alert("Nothing to copy")
            return;
        }
        navigator.clipboard.writeText(indexed)
            .then(() => {
                copied[index].innerHTML = "copied";
                setTimeout(() => {
                    copied[index].innerHTML = "";
                }, 2000);
            })
            .catch(err => {
                alert("failed" + err)
            })
    }


    copyImgs.forEach((img, index) => {
        img.addEventListener("click", () => {
            copyText(index);
        })
    })
    saveSearch(value);
    displayHistory();
})

// search("");
input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        errorMsg.innerHTML = "";
    }
})


// let value = input.value.toLowerCase();
let historyDirectory = JSON.parse(localStorage.getItem("history"));
function saveSearch(value) {

    if (!Array.isArray(historyDirectory)) {
        historyDirectory = [];
    }
    if (historyDirectory.includes(value)) return;
    historyDirectory.unshift(value);
    localStorage.setItem("history", JSON.stringify(historyDirectory));
}

let historyList = document.querySelector(".history ul");
function displayHistory() {
    if (historyDirectory.length === 0) {
        document.querySelector(".history").innerHTML = "Empty";
    } else {
        let history = historyDirectory.slice(0, 10)
        historyList.innerHTML = "";
        history.forEach(item => {
            let li = document.createElement("li");
            li.className = "list-group-item";
            let p = document.createElement("p");
            p.textContent = item;
            let img = document.createElement("img");
            img.src = "delete.svg";
            img.alt = "delete";
            li.appendChild(p)

            li.addEventListener("click", () => {
                input.value = item;
                form.requestSubmit();
            })

            img.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteHistoryItem(item);
            })
            li.appendChild(img)
            historyList.appendChild(li);

        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    displayHistory();
})

function deleteHistoryItem(index) {
    let item = historyDirectory.indexOf(index);
    historyDirectory.splice(item, 1);
    localStorage.setItem("history", JSON.stringify(historyDirectory));
    displayHistory();
}