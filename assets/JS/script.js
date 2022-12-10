const selectTags = document.querySelectorAll("select"),
translateBtn = document.querySelector("button"),
fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchangeBtn = document.querySelector(".exchange"),
icons = document.querySelectorAll(".row i")

selectTags.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected
        if (id == 0 && country_code == "en-GB") {
            selected = "selected"
        }

        if (id == 1 && country_code == "hi-IN") {
            selected = "selected"
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        // Insert HTML code (which is option tag in this case) before the end of the select tag (last child)
        tag.insertAdjacentHTML("beforeend", option) 
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTags[0].value, // getting fromSelect tag value
    translateTo = selectTags[1].value // getting toSelect tag value
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toText.value = data.responseData.translatedText
            toText.setAttribute("placeholder", "Translation")
    })
});

exchangeBtn.addEventListener("click", () => {
    let tempText = fromText.value
        fromText.value = toText.value
        toText.value = tempText
    let tempSelectTag = selectTags[0].value
        selectTags[0].value = selectTags[1].value
        selectTags[1].value = tempSelectTag
});

icons.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.classList.contains("fa-clone")) {
            if (icon.id == "from") {
                navigator.clipboard.writeText(fromText.value)
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            let utterance
            if (icon.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTags[0].value // set utterance language to from Language
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTags[1].value // set utterance language to to Language
            }
            speechSynthesis.speak(utterance) // speak the utterance
        }
    });
});
