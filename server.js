const db = require('./db.json')
const express = require('express')
const app = express()
const port = 3000

// [para não dar problema de CORS trouxe o html/css aqui pra dentro]

// estou expondo o diretório public para servir arquivos estáticos
// tudo que ele não encontrar nas rotas lá em baixo, ele procura aqui (index.html, index.css, xyz.png)
app.use(express.static('public'));

function index(req, res) {
  res.send(JSON.stringify(db))
}


function random(req, res) {
  let n = req.params.n
  let list = []
  for(let i=0; i<n; i++) {
    let r = Math.floor(Math.random()*db.length)
    list.push(db[r])
  }
  res.send(list)
}

// alterei as rotas, para deixar a API em um "path" só dela, para não confundir com os estáticos
app.get('/api', index)
app.get('/api/random/:n', random)
app.listen(port, () => console.log(`Beer server running on port ${port}!`))
