const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')

const port = process.env.PORT || 3001;

const express = require('express')
const httpApp = express()
httpApp.get("*", function (req, res, next) {
  res.redirect("https://" + req.headers.host + "/" + req.path);
});
httpApp.listen(port);
httpApp.on('listening', () => {
    console.log("Listening to redirect http to https");
})

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()



app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // handle GET request to /service-worker.js
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname)

        app.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
    })
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })