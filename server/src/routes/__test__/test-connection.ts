import { Connection, getConnection } from 'typeorm';
import dbLoader from '@/loaders/db-loader';

const testConnection = {
  async create() {
    await dbLoader();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(entities.map(entity => this.deleteAll(entity.name, connection)));
  },

  async deleteAll(entityName: string, connection: Connection) {
    const repository = connection.getRepository(entityName);
    await repository.query(`DELETE FROM ${entityName}`);
  },
};

export default testConnection;
