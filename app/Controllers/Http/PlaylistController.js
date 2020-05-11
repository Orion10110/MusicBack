'use strict'

const Playlist = use('App/Models/Playlist')
const Helpers = use('Helpers')

class PlaylistController {
  async index () {
    const playlists = await Playlist.query().with('songs.author').fetch()
    return playlists
  }

  async create ({ auth }) {
    const playlists = await Playlist.create({
      user_id: (await auth.getUser()).id,
      title: 'Новый плейлист'
    })
    return playlists
  }

  async get ({ params: { id } }) {
    const playlists = await Playlist.query()
      .where({ id })
      .with('songs.author')
      .first()
    return playlists
  }

  async update ({ params, request }) {
    const { title } = request.all()
    const { id } = params
    const playlist = await Playlist.find(id)
    playlist.title = title
    await playlist.save()
    return await Playlist.find(id)
  }

  async image ({ request }) {
    const id = request.input('id')
    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    const imageName = `${Date.now()}.${image.extname}`
    await image.move(Helpers.publicPath('uploads'), {
      name: imageName,
      overwrite: true
    })

    await Playlist.query()
      .where({ id })
      .update({ image: `uploads/${imageName}` })

    return await Playlist.find(id)
  }

  async delete ({ params: { id } }) {
    const pl = await Playlist.find(id)
    await pl.songs().detach()
    const result = await pl.delete()
    return result
  }

  async attachSong ({ request, response, params: { id } }) {
    const songId = request.input('id')
    const playlist = await Playlist.find(id)
    await playlist.songs().attach([songId])
    response.status(200)
  }

  async detachSong ({ response, params: { id, songId } }) {
    const pl = await Playlist.find(id)
    await pl.songs().detach([songId])
    response.status(200)
  }
}

module.exports = PlaylistController
