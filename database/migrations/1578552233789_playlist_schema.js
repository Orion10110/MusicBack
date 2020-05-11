'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaylistSchema extends Schema {
  up () {
    this.create('playlists', (table) => {
      table.increments()
      table.string('title', 120).notNullable()
      table.string('image', 250)
      table.timestamps()
    })
  }

  down () {
    this.drop('playlists')
  }
}

module.exports = PlaylistSchema
