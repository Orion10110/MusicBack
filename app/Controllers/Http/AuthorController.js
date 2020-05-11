'use strict'

const Author = use('App/Models/Author')

class AuthorController {
  async index () {
    const authors = await Author.all()
    return authors
  }

  async create ({ request }) {
    const { name } = request.all()
    const author = await Author.create({ name })
    return author
  }

  async update ({ params, request }) {
    const { name } = request.all()
    const { id } = params
    const playlist = await Author.find(id)
    playlist.name = name
    await playlist.save()
    return await Author.find(id)
  }

  async delete ({ params: { id } }) {
    const result = await Author.query()
      .where('id', id).delete()
    return result
  }
}

module.exports = AuthorController
