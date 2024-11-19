import { Roles } from "@/entities/roles";
import { BaseService } from "./base_service";
import { Repository } from "typeorm";
import { DatabaseUtil } from "@/util/database_util";

export class RolesService extends BaseService<Roles> {
  private rolesRepository: Repository<Roles> | null = null;

  constructor() {
    let rolesRepository = new DatabaseUtil().getRepository(Roles);
    super(rolesRepository);
    this.rolesRepository = rolesRepository;
  }
}
