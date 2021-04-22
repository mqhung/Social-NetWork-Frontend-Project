export interface IUser {
  id: number;
  username: string;
  password: string;
  birthday: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: number;
  email: string;
  address: string;
  avatar: string;
  createDate: string;
  blocked: boolean;
  roles: string[];
}
