const express = require("express")
const fs = require("fs")
const ws = require("ws")

const scripts = require("./routes/scripts")
const themes = require("./routes/themes")
const components = require("./routes/components")
const languages = require("./routes/languages")
const config = require("./routes/config")
const localization = require("./routes/localization")

const PORT = 5500
const ROOT = { root: ".." }

const site = express()

// endpoints
site.use("/scripts", scripts)
site.use("/themes", themes)
site.use("/components", components)
site.use("/languages", languages)
site.use("/config", config)
site.use("/localization", localization)

site.get("/", (req, res) => {
    res.sendFile("/frontend/src/pages/index.html", ROOT)
})

site.get("/:page", (req, res) => {
    const path = `/frontend/src/pages/${req.params.page}.html`
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        res.sendFile("/frontend/src/pages/notfound.html", ROOT)
        return
    }

    res.sendFile(path, ROOT)
})

site.listen(PORT, () => {
    console.log("Server is online.")
})