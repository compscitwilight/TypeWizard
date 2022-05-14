const themeSelections = document.getElementsByClassName("theme-selection")
const languageSelections = document.getElementsByClassName("language-selection")

const themePaths = "/frontend/src/styles/themes"
const changeLanguageConfirmationMsg = `Are you sure you want to change your language? This will make browsing the website more difficult if you do not speak the language.`

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

    // theme
    for (var i = 0; i < themeSelections.length; i++) {
        const element = themeSelections[i]
        element.addEventListener("click", () => {
            localStorage.setItem("theme", element.name)
            SetTheme(element.name)
            console.log(`set theme to ${element.name}`)
        })
    }

    // language
    for (var i = 0; i < languageSelections.length; i++) {
        const element = languageSelections[i]
        element.addEventListener("click", (event) => {
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
        })
    }
}