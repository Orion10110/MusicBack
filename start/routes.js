'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
Route.post('api/register', 'AuthController.register')
Route.post('api/login', 'AuthController.login')
Route.post('api/refresh', 'AuthController.refresh')
Route.get('api/user', 'AuthController.user')

Route.get('api/songs', 'SongController.index')
Route.get('api/songs/:id', 'SongController.get')
Route.post('api/songs', 'SongController.create')
Route.put('api/songs/:id', 'SongController.update')
Route.delete('api/songs/:id', 'SongController.delete')

Route.get('api/playlists', 'PlaylistController.index')
Route.get('api/playlists/:id', 'PlaylistController.get')
Route.post('api/playlists', 'PlaylistController.create')
Route.put('api/playlists/:id', 'PlaylistController.update')
Route.patch('api/playlists/image', 'PlaylistController.image')
Route.delete('api/playlists/:id', 'PlaylistController.delete')
Route.patch('api/playlists/:id/song', 'PlaylistController.attachSong')
Route.delete('api/playlists/:id/song/:songId', 'PlaylistController.detachSong')

Route.get('api/authors', 'AuthorController.index')
Route.post('api/authors', 'AuthorController.create')
Route.put('api/authors/:id', 'AuthorController.update')
Route.delete('api/authors/:id', 'AuthorController.delete')

Route.any('*', ({ view }) => view.render('index'))
