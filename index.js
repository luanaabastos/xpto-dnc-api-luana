
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const auth = require('./routes/auth.route')
const presenca = require('./routes/presenca.route')
const usuario = require('./routes/usuario.route')

app.use(cors())

app.use('/auth', auth)
app.use('/presenca', presenca)
app.use('/usuario', usuario)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
