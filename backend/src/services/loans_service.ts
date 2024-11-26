import { Loan } from "@/entities/loan";
import { BaseService } from "./base_service";
import { Repository } from "typeorm";
import { DatabaseUtil } from "@/util/database_util";

export class LoanService extends BaseService<Loan> {
  private loansRepository: Repository<Loan> | null = null;

  constructor() {
    let loansRepository = new DatabaseUtil().getRepository(Loan);
    super(loansRepository);
    this.loansRepository = loansRepository;
  }
}
