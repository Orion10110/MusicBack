'use strict'

const User = use('App/Models/User')

class AuthController {
  async register ({ request, auth }) {
    const user = await User.create(request.all())
    const token = await auth.withRefreshToken().generate(user)

    return { user, token }
  }

  async refresh ({ request, auth }) {
    const { refreshToken } = request.body
    const refresh = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken)
    return { token: refresh }
  }

  async user ({ auth }) {
    const user = await auth.getUser()
    return { user }
  }

  async login ({ request, auth, response }) {
    const { username, password } = request.all()
    try {
      if (await auth.attempt(username, password)) {
        const user = await User.findBy('username', username)
        const token = await auth.withRefreshToken().generate(user)
        return { user, token }
      }
    } catch (e) {
      return response.status(400).send('You are not registered!')
    }

    return response.status(400).send('Bad request!')
  }
}

module.exports = AuthController
