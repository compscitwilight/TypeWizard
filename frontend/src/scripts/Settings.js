const themesForm = document.querySelector("#themes")
const languagesForm = document.querySelector("#languages")
const themeSelections = document.getElementsByClassName("theme-selection")
const languageSelections = document.getElementsByClassName("language-selection")
const wordCountInput = document.querySelector("#wordCountInput")
const wordCountBtn = document.querySelector("#wordCountBtn")

const themePaths = "/themes"
const changeLanguageConfirmationMsg = `Are you sure you want to change your language? This will make navigating the website difficult if you do not understand the language.`

const DefaultSettings = {
    Theme: "Basic",
    Language: "English",
    WordCount: 30
}

if (!localStorage.getItem("theme") || !localStorage.getItem("language")) {
    localStorage.setItem("theme", DefaultSettings.Theme)
    localStorage.setItem("language", DefaultSettings.Language)
    localStorage.setItem("wordCount", DefaultSettings.WordCount)
}

// event functions
const OnThemeButtonSelect = (event, element) => {
    localStorage.setItem("theme", element.name)
    SetTheme(element.name)
    event.preventDefault()
}

const OnLanguageButtonSelect = (event, element) => {
    if (element.name == localStorage.getItem("language")) {
        event.preventDefault()
        return
    }

    let confirmation = confirm(changeLanguageConfirmationMsg)
    if (confirmation) {
        localStorage.setItem("language", element.name)
    } else {
        event.preventDefault()
    }
}

const OnWordCountSet = (event, element, count) => {
    event.preventDefault()

    try {
        let number = Number(count)
        localStorage.setItem("wordCount", count)

        console.log("Set wordCount")
    } catch (err) {
        console.error(err)
    }
}

window.onload = () => {
    // functions
    const SetTheme = (name) => {
        const themePath = `${themePaths}/${name}`
        try {
            const linkTag = document.querySelector("#theme-link-tag")
            linkTag.href = themePath
        } catch (err) {
            const linkTag = document.createElement("link")
            document.head.appendChild(linkTag)
            linkTag.id = "theme-link-tag"
            linkTag.href = themePath
            linkTag.rel = "stylesheet"

            console.warn(err)
        }
    }
    SetTheme(localStorage.getItem("theme"))
    if (!themesForm && !languagesForm) return

    // general settings
    wordCountBtn.addEventListener("click", (event) => {
        OnWordCountSet(event, event.target, wordCountInput.value)
    })

    // adding all themes to the themes form
    fetch("/config/themes")
        .then(res => {
            return res.json()
        }).then(data => {
            for (var i = 0; i < data.length; i++) {
                let element = document.createElement("button")
                element.classList.add("theme-selection")
                element.name = data[i]
                element.style.display = "inline-block"
                element.style.cursor = "pointer"
                element.innerHTML = data[i]
                themesForm.appendChild(element)

                element.addEventListener("click", (event) => {
                    OnThemeButtonSelect(event, element)
                })
            }
        }).catch(err => {
            console.warn(err)
        })

    // adding all languages to the languages form
    fetch("/config/languages")
        .then(res => {
            return res.json()
        }).then(data => {
            for (var i = 0; i < data.length; i++) {
                let element = document.createElement("button")
                element.classList.add("language-selection")
                element.name = data[i].name
                element.style.display = "inline-block"
                element.style.cursor = "pointer"
                element.innerHTML = data[i].displayName
                languagesForm.appendChild(element)

                element.addEventListener("click", (event) => {
                    OnLanguageButtonSelect(event, element)
                })
            }
        }).catch(err => {
            console.warn(err)
        })
}