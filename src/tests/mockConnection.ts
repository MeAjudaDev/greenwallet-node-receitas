import path from 'path'
import {createConnection, getConnection} from 'typeorm';
import connectionJson from '../../ormconfig-tests.json'

const connection = {
  async create(){
    const connection = await createConnection({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "pepe",
      "password": "q2o4u2i4pepe",
      "database": "receitas",
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