interface IUserEmail {
  email: string;
}

interface IUserNickname {
  nickname: string;
}

interface IUserSignup {
  email: string;
  nickname: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export { IUserEmail, IUserNickname, IUserSignup, IUserLogin };
