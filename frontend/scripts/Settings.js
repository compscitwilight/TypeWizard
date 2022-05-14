const themesForm = document.querySelector("#themes")
const languagesForm = document.querySelector("#languages")
const themeSelections = document.getElementsByClassName("theme-selection")
const languageSelections = document.getElementsByClassName("language-selection")

const themePaths = "/frontend/src/styles/themes"
const changeLanguageConfirmationMsg = `Are you sure you want to change your language? This will make navigating the website difficult if you do not understand the language.`

if (!localStorage.getItem("theme") || !localStorage.getItem("language")) {
    localStorage.setItem("theme", "Basic")
    localStorage.setItem("language", "English")
}

window.onload = () => {
    // functions
    const SetTheme = (name) => {
        const themePath = `${themePaths}/${name}.css`
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

    // adding all themes to the themes form
    fetch("/frontend/static/config/themes.json")
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
        })

    // adding all languages to the languages form
    fetch("/frontend/static/config/languages.json")
        .then(res => {
            return res.json()
        }).then(data => {
            for (var i = 0; i < data.length; i++) {
                let element = document.createElement("button")
                element.classList.add("language-selection")
                element.name = data[i]
                element.style.display = "inline-block"
                element.style.cursor = "pointer"
                element.innerHTML = data[i]
                languagesForm.appendChild(element)

                element.addEventListener("click", (event) => {
                    OnLanguageButtonSelect(event, element)
                })
            }
        })
}