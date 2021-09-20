import bcrypt from 'bcryptjs';

interface IHashPassword {
  password: string;
}

interface IComparePassword {
  reqPassword: string;
  dbPassword: string;
}

const hashPassword = ({ password }: IHashPassword) => {
  const hashSaltRound = Number(process.env.HASH_SALT_ROUND);
  return bcrypt.hash(password, hashSaltRound);
};

const comparePassword = ({ reqPassword, dbPassword }: IComparePassword) => {
  return bcrypt.compare(reqPassword, dbPassword);
};

export { hashPassword, comparePassword };
