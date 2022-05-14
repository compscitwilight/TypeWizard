$("head").load("/components/Head", () => {
    console.log("Loaded head tag")
})

$("#topbar").load("/components/TopBar", () => {
    console.log("Loaded topbar")
})