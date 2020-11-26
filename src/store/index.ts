import Vuex from 'vuex';
import Vue from 'vue';
import { AuthState } from './modules/AuthState';

Vue.use(Vuex);

interface GlobalState {
  auth: AuthState;
}

const state = new Vuex.Store<GlobalState>({});

export default state;
