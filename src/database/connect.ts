import { createConnection } from 'typeorm'

createConnection().then(() => {
  console.log('Connecting with Database')
})
