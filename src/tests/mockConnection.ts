import path from 'path'
import {createConnection, getConnection} from 'typeorm';
import * as connectionJson from '../../ormconfig-tests.json'

const connection = {
  async create(){
    const connection = await createConnection();
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