'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaylistSongSchema extends Schema {
  up () {
    this.create('playlist_song', (table) => {
      table.increments()
      table.integer('playlist_id').unsigned().references('id').inTable('playlists')
      table.integer('song_id').unsigned().references('id').inTable('songs')
    })
  }

  down () {
    this.drop('playlist_song')
  }
}

module.exports = PlaylistSongSchema
