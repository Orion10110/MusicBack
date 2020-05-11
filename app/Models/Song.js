'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Song extends Model {
  getImage (image) {
    return image ? `${Env.get('SOURCE_URL')}/${image}` : null
  }

  getFile (file) {
    return file ? `${Env.get('SOURCE_URL')}/${file}` : null
  }

  author () {
    return this.belongsTo('App/Models/Author')
  }

  genre () {
    return this.belongsTo('App/Models/Genre')
  }

  playlists () {
    return this.belongsToMany('App/Models/Playlist')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Song
