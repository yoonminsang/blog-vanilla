export interface ICheckUser {
  id: string;
}

export interface ICheckEmail {
  email: string;
}

export interface ICheckNickname {
  nickname: string;
}

export interface ICreateUser {
  email: string;
  nickname: string;
  password: string;
}
