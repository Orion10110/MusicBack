'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SongSchema extends Schema {
  up () {
    this.create('songs', (table) => {
      table.increments()
      table.string('name', 120).notNullable()
      table.string('file', 250).notNullable()
      table.string('image', 250).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('genre_id').unsigned().references('id').inTable('genres')
      table.integer('playlist_id').unsigned().references('id').inTable('playlists')
      table.integer('author_id').unsigned().references('id').inTable('authors')
      table.timestamps()
    })
  }

  down () {
    this.drop('songs')
  }
}

module.exports = SongSchema
