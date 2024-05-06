import { ROLES, type PermissionValues } from 'src/UI/Sidebar/Menu'
import { type User } from 'src/interfaces/Auth'

export const getPermission = ({ user, permission }: { user: User, permission: PermissionValues }): boolean => {
  return user.pagePermission.includes(permission) || user.rol === ROLES.ADMIN
}
