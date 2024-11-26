export interface IServerConfig {
  port: number;
  db_config: {
    db: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dbname: string;
  };
  email_config: {
    from: string;
    user: string;
    password: string;
  };
  user_config: {
    default_user_email: string;
    default_user_password: string;
  };
  front_app_url: string;
  attached_files_url?: string;
}

export const server_config: IServerConfig = {
  port: 8080,
  db_config: {
    db: process.env.DB as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    dbname: process.env.DB_NAME as string,
  },
  email_config: {
    from: "pms-support@pms.com",
    user: "pmsbook2023@gmail.com",
    password: "*****",
  },
  user_config: {
    default_user_email: process.env.DEFAULT_USER_EMAIL as string,
    default_user_password: process.env.DEFAULT_USER_PASSWORD as string,
  },
  front_app_url: "http://127.0.0.1:5000",
  attached_files_url:
    "/Users/thomasbuckley/Desktop/library-management-system/attachedFiles",
};
