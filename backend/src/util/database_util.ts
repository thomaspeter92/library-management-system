import { DataSource, Repository } from "typeorm";
import { IServerConfig, server_config } from "@/server_config";
import { Book } from "@/entities/book";
import { User } from "@/entities/user";
import { Loan } from "@/entities/loan";
import { Roles } from "@/entities/roles";

export class DatabaseUtil {
  public server_config: IServerConfig = server_config;
  private repositories: Record<string, Repository<any>> = {};
  private static connection: DataSource | null = null;
  private static instance: DatabaseUtil;

  constructor() {
    this.dbConnect();
  }

  /**
   * Returns a singleton instance of the DatabaseUtil class
   * If no instance, one is created
   * If one exists return it
   * @returns A promise that rsolves to the singleton instance of DatabaseUtil
   */
  public static async getInstance(): Promise<DatabaseUtil> {
    if (!DatabaseUtil.instance) {
      DatabaseUtil.instance = new DatabaseUtil();
      await DatabaseUtil.instance.dbConnect();
    }
    return DatabaseUtil.instance;
  }

  public async dbConnect(): Promise<DataSource> {
    try {
      if (DatabaseUtil.connection) {
        return Promise.resolve(DatabaseUtil.connection);
      }
      const db_config = this.server_config.db_config;
      console.log(db_config);
      const dataSource = new DataSource({
        type: "postgres",
        host: db_config.host,
        port: db_config.port,
        username: db_config.username,
        password: db_config.password,
        database: db_config.dbname,
        entities: [Book, User, Loan, Roles],
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
