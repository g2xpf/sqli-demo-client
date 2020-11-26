import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';
import { Session } from '@/lib/Session';
import { Initialization } from '@/lib/utils';

export const LS_STATE_KEY = 'state';

@Module({ dynamic: true, store: store, name: 'auth' })
export class AuthState extends VuexModule {
  private initialization = new Initialization();
  session: Session = {
    isAuthenticated: false
  };

  @Mutation
  initialize() {
    const rawState = localStorage.getItem(LS_STATE_KEY);
    if (rawState) {
      const _state = JSON.parse(rawState);
      this.session = { ...this.session, ..._state };
      this.initialization.ready();
    }
  }

  @Mutation
  login(session: Session) {
    this.session = {
      ...this.session,
      ...session
    };
  }

  @Mutation
  logout() {
    this.session = {
      isAuthenticated: false
    };
  }

  @Action
  async waitInitialization() {
    await this.initialization.wait();
  }
}

export const AuthStateModule = getModule(AuthState);

store.subscribe(() => {
  localStorage.setItem(LS_STATE_KEY, JSON.stringify(AuthStateModule.session));
});
