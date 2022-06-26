const themesForm = document.querySelector("#themes")
const languagesForm = document.querySelector("#languages")
const themeSelections = document.getElementsByClassName("theme-selection")
const languageSelections = document.getElementsByClassName("language-selection")

const settingsInputs = {
    WordCount: document.querySelector("#wordCountInput"),
    PageZoom: document.querySelector("#pageZoomInput")
}

const settingsButtons = {
    WordCount: document.querySelector("#wordCountBtn"),
    PageZoom: document.querySelector("#pageZoomBtn")
}

const themePaths = "/themes"
const changeLanguageConfirmationMsg = `Are you sure you want to change your language? This will make navigating the website difficult if you do not understand the language.`

const DefaultSettings = {
    Theme: "Basic",
    Language: "EnglishUS",
    WordCount: 30
}

if (!localStorage.getItem("theme")) localStorage.setItem("theme", DefaultSettings.Theme)
if (!localStorage.getItem("language")) localStorage.setItem("language", DefaultSettings.Language)
if (!localStorage.getItem("wordCount")) localStorage.setItem("wordCount", DefaultSettings.WordCount)

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

const ChangeSetting = (setting, value) => localStorage.setItem(setting, value)
const OnWordCountSet = (event, element, count) => {
    event.preventDefault()

    try {
        let number = Number(count)
        ChangeSetting("wordCount", count)
    } catch (err) {
        console.error(err)
    }
}

const OnPageZoomSet = (event, element, zoom) => {
    event.preventDefault()

    if (zoom.endsWith("%")) {
        document.body.style.zoom = zoom
    }
}

window.onload = () => {
    // functions
    const SetTheme = (name) => {
        const themePath = `${themePaths}/${name}`
        const linkTag = document.querySelector("#theme-link-tag")
        try {
            linkTag.href = themePath
        } catch (err) {
            location.reload()
        }
    }
    SetTheme(localStorage.getItem("theme"))
    if (!themesForm && !languagesForm) return

    wordCountInput.value = localStorage.getItem("wordCount") || 30

    // general settings
    settingsButtons.WordCount.addEventListener("click", (event) => OnWordCountSet(event, event.target, settingsInputs.WordCount.value))
    settingsButtons.PageZoom.addEventListener("click", (event) => OnPageZoomSet(event, event.target, settingsInputs.PageZoom.value))

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