import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../shared/prisma';

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );

  return hashedPassword;
};

export const checkIsPasswordMatched = async (
  givenPassword: string,
  savedPassword: string
) => {
  const result = await bcrypt.compare(givenPassword, savedPassword);

  return result;
};

export const checkIsUserExist = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });

  return user;
};
