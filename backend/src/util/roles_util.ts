import { Rights } from "./common";
import { RolesService } from "@/services/roles_service";
import { Roles } from "@/entities/roles";

export class RolesUtil {
  /**
   * Retrieves all possible permissions from the defined rights in the Rights object
   * @returns {string[]} an array of permissions
   */
  public static getAllPermissionsFromRights(): string[] {
    // Init an empty array to collect vals
    let permissions = [];

    // Iterate through each section of the rights object
    for (const module in Rights) {
      // check if rights for ALL are defined for current module
      if (Rights[module]["ALL"]) {
        let sectionValues = Rights[module]["ALL"];
        sectionValues = sectionValues.split(",");
        permissions = [...permissions, ...sectionValues];
      }
    }
    return permissions;
  }

  public static async checkValidRoleIds(role_ids: string[]) {
    const rolesService = new RolesService();

    // Query the db, check if all role ids are valid
    const roles = await rolesService.findByIds(role_ids);
    console.log(roles);

    // Check if all the role_ids are found in the db
    return roles.data.length === role_ids.length;
  }

  public static async getAllRightsFromRoles(
    role_ids: string[]
  ): Promise<string[]> {
    // create an instance of RolesService to interact with roles
    const service = new RolesService();

    // init array to store rights
    let rights: string[] = [];

    // validate provided role ids with DB
    const queryData = await service.findByIds(role_ids);
    const roles: Roles[] = queryData.data ? queryData.data : [];

    // extract rights from each role, add to array
    roles.forEach((role) => {
      const rightFromRole: string[] = role.rights.split(",");
      rights = [...new Set(rights.concat(rightFromRole))];
    });

    // return accumulated rights
    return rights;
  }
}
