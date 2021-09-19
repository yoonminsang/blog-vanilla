export interface ICheckUser {
  id: string;
}

export interface ICheckEmail {
  email: string;
}

export interface ICheckNickname {
  nickname: string;
}

// TODO : 이걸 상속하는게 의미있는걸까??
export interface ICreateUser extends ICheckEmail, ICheckNickname {
  // email: string;
  // nickname: string;
  password: string;
}
