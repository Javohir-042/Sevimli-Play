import { SetMetadata } from "@nestjs/common";
import { AdminRole } from "../enum/admin.role";


export const ROLES_KEY = "roles";
export const Roles = (...roles: (AdminRole | string)[]) =>
    SetMetadata(ROLES_KEY, roles);
