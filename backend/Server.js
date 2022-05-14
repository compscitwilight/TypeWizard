const express = require("express")
const site = express()

const scripts = require("./routes/scripts")
const themes = require("./routes/themes")
const components = require("./routes/components")
const languages = require("./routes/languages")
const config = require("./routes/config")

const PORT = 5500
const ROOT = { root: ".." }

// endpoints
site.use("/scripts", scripts)
site.use("/themes", themes)
site.use("/components", components)
site.use("/languages", languages)
site.use("/config", config)

site.get("/", (req, res) => {
    res.sendFile("/frontend/src/pages/index.html", ROOT)
})

site.get("/about", (req, res) => {
    res.sendFile("/frontend/src/pages/about.html", ROOT)
})

site.get("/code", (req, res) => {
    res.sendFile("/frontend/src/pages/code.html", ROOT)
})

site.get("/settings", (req, res) => {
    res.sendFile("/frontend/src/pages/settings.html", ROOT)
})

site.listen(PORT, () => {
    console.log("Server is online.")
})