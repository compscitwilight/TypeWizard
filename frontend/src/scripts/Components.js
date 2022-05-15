$("head").load("/components/Head", () => {
    console.log("Loaded head tag")
})

if ($("#topbar")) {
    $("#topbar").load("/components/TopBar", () => {
        console.log("Loaded topbar")
    })
} else {
    let element = document.createElement("div")
    element.id = "topbar"
    document.body.appendChild(element)
}