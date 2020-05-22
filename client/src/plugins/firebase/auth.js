import * as Oidc from 'oidc-client'

export default class Authentification {
  constructor({ firebaseAuth, openIdConfig, client }) {
    this.firebaseAuth = firebaseAuth
    this.openIdConfig = openIdConfig
    this.client = client
  }

  async logout() {
    await this.firebaseAuth.signOut()
  }

  loginWithJudgeApps() {
    const client = new Oidc.UserManager(this.openIdConfig)
    client.signinRedirect()
  }

  async processJudgeAppsToken(code) {
    const { data } = await this.client.post('/authenticate', { code })
    await this.firebaseAuth.signInWithCustomToken(data.token)
  }
}
