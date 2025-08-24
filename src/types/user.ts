export type User = {
  email: string;
  token: string;
}

export type UserAuth = Pick<User, 'email'> & {password: string};
