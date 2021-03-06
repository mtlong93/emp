export interface Emp {
  id: number;
  userName: string;
  password: string;
  fullName: string;
  gender: string;
  birthday: string;
  email: string;
  isAdmin: boolean;
}

export interface PageState {
  skip: number;
  take: number;
}
