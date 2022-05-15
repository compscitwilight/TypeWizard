const language = localStorage.getItem("language") || "English"
const languageTranslations = `/localization/${language}`

const paragraphs = document.querySelectorAll("p")
const anchors = document.querySelectorAll("a")
const headings = {
    h1: document.querySelectorAll("h1"),
    h2: document.querySelectorAll("h2"),
    h3: document.querySelectorAll("h3"),
    h4: document.querySelectorAll("h4"),
    h5: document.querySelectorAll("h5"),
    h6: document.querySelectorAll("h6")
}

fetch(languageTranslations)
    .then(res => {
        return res.json()
    }).then(data => {
        // heading localization
        for (var i = 0; i < headings.length; i++) {
            const headingArr = headings[i]
            for (var p = 0; p < heading.length; p++) {
                const heading = headingArr[p]
                for (var d = 0; d < data.length; d++) {
                    const arr = data[d]
                    if (arr[0] == heading.innerHTML) {
                        heading.innerHTML = arr[1]
                        console.log("YEAH")
                    }
                }
            }
        }

        // paragraph localization
        for (var i = 0; i < paragraphs.length; i++) {
            const paragraph = paragraphs[i]

            for (var d = 0; d < data.length; d++) {
                const arr = data[d]

                if (arr[0] == paragraph.innerHTML) {
                    paragraph.innerHTML = data[1]
                }
            }
        }
    })