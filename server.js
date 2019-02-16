const fastify = require('fastify')({ logger: { level: 'error' } })
const Next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

fastify.register(require('fastify-cookie'), (err) => {
  if (err) throw err
})

fastify.register((fastify, opts, next) => {
  const app = Next({ dev })
  app
    .prepare()
    .then(() => {
      if (dev) {
        fastify.get('/_next/*', (req, reply) => {
          return app.handleRequest(req.req, reply.res).then(() => {
            reply.sent = true
          })
        })
      }

      fastify.get('/a', (req, reply) => {
        reply.setCookie('test','this').send({ hello: 'world' })
      })

      fastify.get('/b', (req, reply) => {
        return app.render(req.req, reply.res, '/a', req.query).then(() => {
          reply.sent = true
        })
      })

      fastify.get('/*', (req, reply) => {
        return app.handleRequest(req.req, reply.res).then(() => {
          reply.sent = true
        })
      })

      fastify.setNotFoundHandler((request, reply) => {
        return app.render404(request.req, reply.res).then(() => {
          reply.sent = true
        })
      })

      next()
    })
    .catch(err => next(err))
})

fastify.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})