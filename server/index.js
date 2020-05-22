const firebaseAdmin = require('firebase-admin')
// const cors = require('cors')({ origin: true })
const express = require('express')
const Issuer = require('openid-client').Issuer
const bodyParser = require('body-parser')

const firebaseConfig = require('./config/firebase.config')
const judgeAppConfig = require('./config/judgeapps.config')

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  databaseURL: firebaseConfig.databaseURL,
})
const db = firebaseAdmin.firestore()
const auth = firebaseAdmin.auth()

const app = express()
// app.use(cors)
app.use(bodyParser.json())

app.post('/authenticate', async function (req, res) {
  const code = req.body.code
  if (!code) {
    return res.status('400').json({ error: 'Fields missing' })
  }
  try {
    const issuer = await Issuer.discover(judgeAppConfig.issuer)
    Issuer.defaultHttpOptions = { timeout: 250000 }
    const client = new issuer.Client({
      client_id: judgeAppConfig.client_id,
      client_secret: judgeAppConfig.client_secret,
    })
    client.CLOCK_TOLERANCE = 5
    const tokenSet = await client.callback(judgeAppConfig.redirect_url, { code })
    const info = await client.userinfo(tokenSet.access_token)
    const uid = info.sub
    delete info.sub
    info.uid = uid
    try {
      await auth.getUser(uid)
    } catch (e) {
      await auth.createUser({ uid })
    }
    await auth.setCustomUserClaims(uid, info)
    await db.collection('users').doc(uid).set({ judgeapps: info }, { merge: true })
    const token = await auth.createCustomToken(uid)

    return res.json({ token })
  } catch (e) {
    console.log('err', e)
    res.status('500').json({ err: 'Something wrong happen' })
  }
})

app.listen(3003)
