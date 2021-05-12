import app from '../src/app'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor rodando, PORT: ${PORT}`)
})
