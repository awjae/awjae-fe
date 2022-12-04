export type UserInfo = {
  user: {
    ID: string;
    NAME: string;
  };
  accessToken: string;
  setUser: Function;
  removeUser: Function;
}
