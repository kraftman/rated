const fastify = require('fastify')({ logger: { level: 'error' } })
const Next = require('next');

const nextCookie = require ('next-cookies');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

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
        reply.send({ hello: 'world' })
      })

      fastify.get('/login/:key', (req, reply) => {
        const key = req.params.key;
        console.log(key)
        reply.send({ hello: 'world' })
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