import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const uri = process.env.DB

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('pinged you deploument, you successfully connected to MongoDB!')
    const database = client.db('database')
    return database.collection('movies')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class MovieModel {
  static async getAll ({ genre }) {
    const db = await connect()

    if (genre) {
      return db.find({
        genre: {
          $elemMatch: {
            $regex: genre,
            $options: 'i'
          }
        }
      }).toArray()
    }
    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    return db.findOne({ _id: new ObjectId(id) })
  }

  static async create ({ input }) {
    const db = await connect()
    const { insertedId } = await db.insertOne(input)
    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connect()
    const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) })
    return deletedCount > 0
  }

  /**
   * update si actualiza los valores necesarios en la base de datos
   * pero no regresa el objeta actualizado como respuesta
   * el objeto trae como valor undefine
   * por realizar
   */
  static async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnNewDocument: true }
    )

    return ok ? false : value
  }
}
