const express = require("express")
const pathJs = require("path")
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
    res.sendFile(pathJs.resolve(process.cwd(), "frontend/src/pages/index.html"))
})

site.get("/:page", (req, res) => {
    const path = pathJs.resolve(process.cwd(), `frontend/src/pages/${req.params.page}.html`)
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        res.sendFile(pathJs.resolve(process.cwd(), "frontend/src/pages/notfound.html"))
        return
    }

    res.sendFile(path)
})

site.listen(process.env.PORT || 3000, () => {
    console.log("Server is online.")
})