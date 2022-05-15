const express = require("express")
const fs = require("fs")
const router = express.Router()

const ROOT = { root: "../" }

router.get("/:component", (req, res) => {
    const path = `/frontend/components/${req.params.component}.html`
    if (!fs.existsSync(`${ROOT.root}${path}`)) {
        return res.sendFile("/frontend/src/pages/notfound.html", ROOT)
    }

    res.sendFile(path, ROOT)
})

module.exports = router