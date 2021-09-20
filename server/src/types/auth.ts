interface IUserId {
  id: string;
}

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

export { IUserId, IUserEmail, IUserNickname, IUserSignup, IUserLogin };
