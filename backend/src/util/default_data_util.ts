import { User } from "@/entities/user";
import { UserService } from "@/services/user_service";
import { server_config } from "@/server_config";
import { v4 } from "uuid";
import { RolesService } from "@/services/roles_service";
import { Roles } from "@/entities/roles";
import { RolesUtil } from "./roles_util";
import { encryptString } from "./common";

export class DDUtil {
  private static superAdminRoleId: string;

  public static async addDefaultRole(): Promise<boolean> {
    try {
      const service = new RolesService();
      const rights = RolesUtil.getAllPermissionsFromRights();
      const role: Roles = {
        id: v4(),
        name: "SuperAdmin",
        description: "Has all permissions",
        rights: rights.join(","),
        created_at: new Date(),
        updated_at: new Date(),
      };
      const result = await service.create(role);
      console.log("Add Default Role Result", result);
      if (result.statusCode === 201) {
        this.superAdminRoleId = result.data.id;
        return true;
      } else if (result.statusCode === 409) {
        const roles = await service.findAll({ name: "SuperAdmin" });
        if (roles.data.length > 0) {
          this.superAdminRoleId = roles.data[0].id;
        }
      }
      return false;
    } catch (error) {
      console.error(`Error while addDefaultRole() => ${error.message}`);
      return false;
    }
  }

  public static async addDefaultUser(): Promise<boolean> {
    try {
      const service = new UserService();

      const defaultUser: User = {
        id: v4(),
        first_name: "Super",
        last_name: "Admin",
        email: server_config.user_config.default_user_email,
        password: await encryptString(
          server_config.user_config.default_user_password
        ),
        created_at: new Date(),
        updated_at: new Date(),
        role_id: DDUtil.superAdminRoleId,
      };
      const result = await service.create(defaultUser);
      console.log("Add Default User Result", result);
      if (result.statusCode === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error while addDefaultRole() => ${error.message}`);
      return false;
    }
  }
}
