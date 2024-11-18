import { ERROR_MESSAGES } from "@/util/common";
import { DeepPartial, Repository, FindOneOptions } from "typeorm";

export interface ApiResponse<T> {
  status: "success" | "error";
  message?: keyof typeof ERROR_MESSAGES;
  data?: T;
  statusCode?: number;
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export type UpdateDataKeys<T> = keyof T & keyof DeepPartial<T>;

export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  /**
   * Creates a new entity using the provided data and saves it to the database.
   * @param entity - The data to create the entity with.
   * @returns An ApiResponse with the created entity data on success or an error message on failure.
   */
  async create(entity: DeepPartial<T>): Promise<ApiResponse<T>> {
    try {
      // Create the entity (creates in memory, not yet saved to DB. We can still manipulate before saving)
      const createdEntity = await this.repository.create(entity);

      // Save entity to the DB
      const savedEntity = await this.repository.save(createdEntity);

      return { statusCode: 201, status: "success", data: savedEntity };
    } catch (error) {
      // Unique value already exists!
      if (error.code === "23505") {
        return { statusCode: 409, status: "error", message: error.detail };
      } else {
        return {
          statusCode: 500,
          status: "error",
          message: error.message,
        };
      }
    }
  }

  async update(
    id: string,
    data: DeepPartial<T>
  ): Promise<ApiResponse<T> | undefined> {
    try {
      const exists = await this.findOne(id);

      if (exists.statusCode === 404) {
        return exists;
      }

      const where = {};
      const primaryKey: string =
        this.repository.metadata.primaryColumns[0].databaseName;
      where[primaryKey] = id;

      const validColumns = this.repository.metadata.columns.map(
        (column) => column.propertyName
      );

      const updateQuery: any = {};
      const keys = Object.keys(data) as UpdateDataKeys<T>[];
      for (const key of keys) {
        if (data.hasOwnProperty(key) && validColumns.includes(key as string)) {
          updateQuery[key] = data[key];
        }
      }

      const result = await this.repository
        .createQueryBuilder()
        .update()
        .set(updateQuery)
        .where(where)
        .returning("*")
        .execute();

      if (result.affected > 0) {
        return { statusCode: 200, status: "success", data: result.raw[0] };
      } else {
        return {
          statusCode: 400,
          status: "error",
          data: null,
          message: "INVALID_DATA",
        };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, status: "error", message: "SERVER_ERROR" };
    }
  }

  async findOne(id: string): Promise<ApiResponse<T> | undefined> {
    try {
      const where = {};
      const primaryKey: string =
        this.repository.metadata.primaryColumns[0].databaseName;
      where[primaryKey] = id;

      const options: FindOneOptions<T> = { where: where };

      const data = await this.repository.findOne(options);

      if (data) {
        return { statusCode: 200, status: "success", data: data };
      } else {
        return { statusCode: 404, status: "error", message: "NOT_FOUND" };
      }
    } catch (error) {
      console.log(error);
      return { statusCode: 500, status: "error", message: "SERVER_ERROR" };
    }
  }

  async findAll(queryParams: object): Promise<ApiResponse<T[]>> {
    try {
      // For allowing pagination
      let limit = null;
      let page = null; // Destructure limit and page from query params

      console.log(queryParams);

      if (
        queryParams.hasOwnProperty("limit") &&
        queryParams.hasOwnProperty("page")
      ) {
        limit = +queryParams["limit"];
        page = +queryParams["page"];
      }

      let data = [];
      let pagination: ApiResponse<T>["pagination"];

      if (Object.keys(queryParams).length > 0) {
        const query = this.repository.createQueryBuilder();
        for (const field in queryParams) {
          if (
            queryParams.hasOwnProperty(field) &&
            field !== "limit" &&
            field !== "page"
          ) {
            const value = queryParams[field];
            query.andWhere(`LOWER(${field}) LIKE LOWER(:${field})`, {
              [field]: `%${value}%`,
            });
          }
        }

        // If pagination is requested, apply limit and page
        if (limit && page) {
          query.skip((page - 1) * limit).take(limit);
        }
        data = await query.getMany();

        // Build pagination if it exists
        if (limit && page) {
          const total = await query.getCount();
          pagination = {
            total: +total,
            currentPage: page,
            limit: limit,
            totalPages: Math.ceil(+total / limit),
          };
        }
      } else {
        data = await this.repository.find();
      }
      return {
        statusCode: 200,
        status: "success",
        data: data,
        ...(pagination && { ...pagination }),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "SERVER_ERROR",
      };
    }
  }

  async delete(id: string): Promise<ApiResponse<T>> {
    try {
      const exists = await this.findOne(id);
      if (exists.statusCode === 404) {
        return exists;
      }

      await this.repository.delete(id);

      return { statusCode: 200, status: "success" };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, status: "error", message: "SERVER_ERROR" };
    }
  }

  async findByIds(ids: string[]): Promise<ApiResponse<T[]>> {
    try {
      const primaryKey: string =
        this.repository.metadata.primaryColumns[0].databaseName;

      const data = await this.repository
        .createQueryBuilder()
        .where(`${primaryKey} IN (:...ids)`, { ids: ids })
        .getMany();

      return { statusCode: 200, status: "success", data: data };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "SERVER_ERROR",
      };
    }
  }

  async customQuery(query: string): Promise<T[]> {
    try {
      const data = await this.repository
        .createQueryBuilder()
        .where(query)
        .getMany();

      return data;
    } catch (error) {
      return [];
    }
  }
}
