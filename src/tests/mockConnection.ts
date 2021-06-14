require('dotenv').config()
import {createConnection, getConnection} from 'typeorm';

const connection = {
  async create(){
    const connection = await createConnection({
      "type": "mysql",
      "host": process.env.HOST,
      "port": 3306,
      "username": process.env.USER,
      "password": process.env.PASSWORD,
      "database": process.env.DATABASE,
      "entities": [
        "src/models/*.ts"
      ],
      "migrations": [
          "src/database/migrations/*.ts"
      ],
      "cli": {
          "migrationsDir": "src/database/migrations"
      }
   });
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
        const repository = getConnection().getRepository(entity.name); // Get repository
        await repository.clear(); // Clear each entity table's content
    }
  },
};

export default connection;