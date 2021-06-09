import dotnev from "dotenv"
import path from 'path'
import {createConnection, getConnection} from 'typeorm';
import connectionJson from '../../ormconfig.json'

dotnev.config()

const connection = {
  async create(){
    const connection = await createConnection({
      "type": "mysql",
      "host": process.env.DATABASE_HOST,
      "port": Number(process.env.DATABASE_HOST),
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
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