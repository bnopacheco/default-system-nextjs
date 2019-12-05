const { createServer } = require('http')
const { join, resolve } = require('path')
const { parse } = require('url')
const next = require('next')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const port = process.env.PORT || 3001;

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // handle GET request to /service-worker.js
      if (pathname === '/static/service-worker.js') {
        // const filePath = join(__dirname, '.next', pathname)
        // app.serveStatic(req, res, filePath)
        app.serveStatic(req, res, resolve('./static/service-worker.js'))
      } else {
        handle(req, res, parsedUrl)
      }
    })
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })