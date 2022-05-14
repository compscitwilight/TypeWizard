$("head").load("/frontend/components/Head.html", () => {
    console.log("Loaded head tag")
})

$("#topbar").load("/frontend/components/TopBar.html", () => {
    console.log("Loaded topbar")
})