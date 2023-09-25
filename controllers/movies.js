// cambiando el import creamos una inyeccion de dependencia pirata
// import { MovieModel } from '../models/mariadb/movie.js'
import { validateMovie, validatePartialMovie } from '../schema/movie.js'

export class MovieController {
  constructor ({ MovieModel }) {
    this.MovieModel = MovieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.MovieModel.getAll({ genre })
    res.json(movies)
  }

  getByI = async (req, res) => {
    const { id } = req.params
    const movie = await this.MovieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).send({ message: 'movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.MovieModel.delete({ id })

    if (result) {
      return res.json({ message: 'Movies deleted' })
    }

    return res.status(404).json({ message: 'Movie not found' })
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await this.MovieModel.update({ id, input: result.data })
    return res.json(updatedMovie)
  }
}
