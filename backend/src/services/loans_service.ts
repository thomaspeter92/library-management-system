import { Loan } from "@/entities/loan";
import { ApiResponse, BaseService } from "./base_service";
import { Repository } from "typeorm";
import { DatabaseUtil } from "@/util/database_util";

export class LoanService extends BaseService<Loan> {
  private loansRepository: Repository<Loan> | null = null;

  constructor() {
    let loansRepository = new DatabaseUtil().getRepository(Loan);
    super(loansRepository);
    this.loansRepository = loansRepository;
  }

  async getAllPastUserLoans(
    userId: string,
    page?: number,
    limit?: number
  ): Promise<ApiResponse<Loan[]>> {
    try {
      const query = this.loansRepository
        .createQueryBuilder("loan")
        .where("loan.user_id = :userId", { userId })
        .andWhere("loan.return_date IS NOT NULL");

      if (limit && page) {
        query.skip((page - 1) * limit).take(limit);
      }

      let result = await query.getMany();
      let total = await query.getCount();

      let pagination;
      if (limit && page) {
        pagination = {
          total: +total,
          currentPage: page,
          limit: limit,
          totalPages: Math.ceil(+total / limit),
        };
      }

      return {
        statusCode: 200,
        status: "success",
        data: result,
        ...(pagination && { ...pagination }),
      };
    } catch (error) {
      return { statusCode: 500, status: "error", message: "SERVER_ERROR" };
    }
  }
}
