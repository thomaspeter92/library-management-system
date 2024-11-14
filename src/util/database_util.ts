import { DataSource, Repository } from "typeorm";
import { IServerConfig, server_config } from "@/server_config";
import { Book } from "@/entities/book";

export class DatabaseUtil {
  public server_config: IServerConfig = server_config;
  private repositories: Record<string, Repository<any>> = {};
  private static connection: DataSource | null = null;
  private static instance: DatabaseUtil;

  constructor() {
    this.dbConnect();
  }

  public async dbConnect(): Promise<DataSource> {
    try {
      if (DatabaseUtil.connection) {
        return Promise.resolve(DatabaseUtil.connection);
      }
      const db_config = this.server_config.db_config;
      const dataSource = new DataSource({
        type: "postgres",
        host: db_config.host,
        port: db_config.port,
        username: db_config.username,
        password: db_config.password,
        database: db_config.dbname,
        entities: [Book],
        synchronize: true,
        logging: false,
        poolSize: 10,
      });
      await dataSource.initialize();
      DatabaseUtil.connection = dataSource;
      console.log("connected to the DB");
      return DatabaseUtil.connection;
    } catch (error) {
      console.error("Error connecting to the DB", error);
    }
  }

  /**
   * Get the repository for a given entity.
   * @param entity - The entity for which the repository is needed.
   * @returns The repository instance for the entity.
   */
  public getRepository(entity) {
    try {
      if (DatabaseUtil.connection) {
        const entityName = entity.name;
        if (!this.repositories[entityName]) {
          this.repositories[entityName] =
            DatabaseUtil.connection.getRepository(entity);
        }
        return this.repositories[entityName];
      }
      return null;
    } catch (error) {
      console.error(`Error while getRepository => ${error.message}`);
    }
  }
}
