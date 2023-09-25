// import movies from './movies.json' with { type: 'json' }  --> esto no es valido en ESModule
import Express, { json } from 'express' // commonJS
import { corsMiddleware } from './middleware/cors.js'
import { createMovieRouter } from './routes/movies.js'
import 'dotenv/config.js'

export const createApp = ({ MovieModel }) => {
  const app = Express()
  const PORT = process.env.PORT ?? 3000

  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use('/movies', createMovieRouter({ MovieModel }))

  app.listen(PORT, () => {
    console.log(`server listen ${PORT}`)
  })
}
