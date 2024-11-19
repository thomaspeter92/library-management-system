import { User } from "@/entities/user";
import { BaseService } from "./base_service";
import { Repository } from "typeorm";
import { DatabaseUtil } from "@/util/database_util";

export class UserService extends BaseService<User> {
  private userRepository: Repository<User> | null = null;

  constructor() {
    let userRepository = new DatabaseUtil().getRepository(User);
    super(userRepository);
    this.userRepository = userRepository;
  }
}
