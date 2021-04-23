export interface IUser {
  id: number;
  username: string;
  password: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  gender: string;
  phone: number;
  email: string;
  address: string;
  avatar: string;
  createdDate: Date;
  blocked: boolean;
  appRole: AppRole;
}
