import create from 'zustand'
import { UserInfo } from '../types/userInfo'

const useStore = create<UserInfo>(set => ({
  accessToken: '',
  user: {
    ID: '',
    NAME: '',
  },
  setUser: (userInfo: UserInfo) => {
    window.localStorage.setItem("accessToken", userInfo.accessToken);
    window.localStorage.setItem("user_ID", userInfo.user.ID);
    window.localStorage.setItem("user_NAME", userInfo.user.NAME);
    return set({ accessToken: userInfo.accessToken, user: userInfo.user });
  },
  removeUser: () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("user_ID");
    window.localStorage.removeItem("user_NAME");
    return set({  accessToken: '', user: { ID: '', NAME: ''} });
  },
}))

export default useStore