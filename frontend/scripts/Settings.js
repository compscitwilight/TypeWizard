const themeSelections = document.getElementsByClassName("theme-selection")
const themePaths = "/frontend/src/styles/themes"

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
}