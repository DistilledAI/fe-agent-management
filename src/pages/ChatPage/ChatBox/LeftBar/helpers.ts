import { IUser } from "@reducers/user/UserSlice"

export const getAvatarGroupChat = (
  ownerId: number,
  userA: IUser,
  userB: IUser,
) => {
  return ownerId === userA.id ? userB.avatar : userA.avatar
}
