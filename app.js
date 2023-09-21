// import movies from './movies.json' with { type: 'json' }  --> esto no es valido en ESModule
import Express, { json } from 'express' // commonJS
import { corsMiddleware } from './middleware/cors.js'
import { moviesRouter } from './routes/movies.js'

const app = Express()
const PORT = process.env.PORT ?? 3000

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`server listen ${PORT}`)
})
