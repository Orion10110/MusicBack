'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Playlist extends Model {
  getImage (image) {

    return image ? `${Env.get('SOURCE_URL')}/${image}` : `${Env.get('SOURCE_URL')}/images/stub.jpg`
  }

  songs () {
    return this.belongsToMany('App/Models/Song')
  }
}

module.exports = Playlist
