const express = require("express")
const site = express()

const PORT = 5500
const ROOT = { root: ".." }

site.listen(PORT, () => {
    console.log("Server is online.")
})

site.get("/", (req, res) => {
    res.sendFile("/frontend/src/pages/index.html", ROOT)
    //res.sendFile("/frontend/scripts/Components.js", ROOT)
})