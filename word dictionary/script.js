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
            return ;
        }
        const [defData, synData, theData, antData] = await Promise.all([
            defRes.json(),
            synRes.json(),
            theRes.json(),
            antRes.json(),

        ])
        const meaning = defData.meaning?.adjective
            ? defData.meaning.adjective.split("(adj)").map(s => s.trim()).filter(Boolean).slice(0, 1)
            : ["no meaning found"];

        const synonyms = synData.relation?.synonyms
            ? synData.relation.synonyms.split(",").map(s => s.trim()).slice(0, 5)
            : ["not found"]

        const theme = theData.theme || "no theme found";
        const antonym = antData[0]?.meanings[1]
            ? antData[0].meanings[1].antonyms.slice(0,2)
            :["not found"];


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

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (input.value.trim() === "") {
        errorMsg.innerHTML = "please enter a word";
        return
    }

    let value = input.value.toLowerCase();
    // try{
    const apiresult = await result(value);
    if (!apiresult) return;
    const [meaning, synonyms, theme, antonym] = apiresult;
    let table = document.querySelector(".result").querySelector("table");
    table.innerHTML = `<tbody>
                        <tr>
                            <td>meaning</td>
                            <td>${meaning}</td>
                        </tr>
                        <tr>
                            <td>synonym</td>
                            <td>${synonyms}</td>
                        </tr>
                        <tr>
                            <td>Antonym</td>
                            <td>${antonym}</td>
                        </tr>
                        <tr>
                            <td>theme</td>
                            <td>${theme}</td>
                        </tr>
                    </tbody>

                    `
    // }catch{
    //     // console.error("error")
    // }
})
input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        errorMsg.innerHTML = "";
    }
})