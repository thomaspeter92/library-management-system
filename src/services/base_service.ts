import { DeepPartial, Repository } from "typeorm";

export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data?: T;
  statusCode?: number;
}

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
}
