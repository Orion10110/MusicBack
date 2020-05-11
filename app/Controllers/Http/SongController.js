'use strict'
const Song = use('App/Models/Song')
const Author = use('App/Models/Author')
const Playlist = use('App/Models/Playlist')
const Helpers = use('Helpers')

class SongController {
  async index () {
    const songs = await Song.query().with('user').with('genre').with('playlists')
      .with('author')
      .fetch()
    return songs
  }

  async moveFile(file) {
    const fileName = `${Date.now()}.${file.extname}`
    await file.move(Helpers.publicPath('uploads'), {
      name: fileName,
      overwrite: true
    })
    return `uploads/${fileName}`
  }


  async create ({request, auth}) {
    const { author, playlist_id, ...data } = request.all()
    const { id: author_id } = await this.getAuthor(author);
    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    const file = request.file('file', {
      types: ['audio'],
      size: '20mb'
    })
    const imageName = await this.moveFile(image)
    const fileName = await this.moveFile(file)



    const song = await Song.create({
      ...data,
      user_id: (await auth.getUser()).id,
      author_id,
      image: imageName,
      file: fileName
    })
    const pl = await Playlist.find(playlist_id)
    pl.songs().save(song)

    return song
  }

  async getAuthor(name) {
    let author = await Author.query()
      .where({ name }).first()
    if(!author) {
      author = await Author.create({ name })
    }
    return author;
}

  async update ({ params, request, auth }) {
    const { id } = params;
    const song = await Song.find(id)
    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    const file = request.file('file', {
      types: ['audio'],
      size: '3mb'
    })
    const imageName = await this.moveFile(image)
    const fileName = await this.moveFile(file)
    song.merge(request.only(['name', 'genre_id', 'author_id']))
    song.image = imageName
    song.file = fileName
    await song.save()
    return await Song.find(id);
  }

  async get ({ params: {id} }) {
    const song = await Song.query()
      .where({ id })
      .with('user').with('genre').with('playlists')
      .with('author')
      .first()
    return song
  }

  async delete ({ params: { id } }) {
    const song = await Song.find(id)
    await song.playlists().detach()
    const result = await song.delete()
    return result
  }
}

module.exports = SongController
