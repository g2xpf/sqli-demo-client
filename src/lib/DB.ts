import Axios from './Axios';
import { AuthStateModule } from '@/store/modules/AuthState';
import { unreachable } from './utils';
import { Session } from '@/lib/Session';
import { User } from '@/lib/User';

export default class DB {
  static async register(username: string, password: string): Promise<boolean> {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    try {
      await Axios.post('/users/register', params);
      return true;
    } catch (_) {
      return false;
    }
  }

  static async login(username: string, password: string): Promise<boolean> {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    try {
      const res = await Axios.post('/users/login', params);
      if (res?.status === 200) {
        const session = { ...res.data, isAuthenticated: true };
        if (Session.guard(session)) {
          AuthStateModule.login(session);
          return true;
        } else {
          unreachable();
        }
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  static async getUserInfo(): Promise<User | undefined> {
    const res = await Axios.get('/cert/users/info');
    if (res?.status === 200) {
      const user = { ...res.data, isAuthenticated: true };
      if (User.guard(user)) {
        return user;
      }
    }
    return undefined;
  }

  static logout() {
    AuthStateModule.logout();
  }

  static async post(message: string) {
    await Axios.post('/cert/posts', null, { params: { message } });
  }
}
