<template>
  <v-app>
    <v-app-bar color="cyan darken-3" clipped-left dark app>
      <v-app-bar-nav-icon
        @click="miniVariant = !miniVariant"
      ></v-app-bar-nav-icon>
      <div class="title px-2">SQLi Demo</div>
      <v-spacer></v-spacer>
      <div v-if="authenticated">
        <v-btn class="grey darken-2" @click="logout"
          >logout<v-icon>mdi-logout</v-icon></v-btn
        >
      </div>
      <div v-else>
        <v-btn class="grey darken-2 ma-3" to="/register"
          >sign up<v-icon>mdi-account-plus</v-icon></v-btn
        >
        <v-btn class="grey darken-2" to="/login">
          sign in
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      absolute
      clipped
      :permanent="true"
      :mini-variant="miniVariant"
      app
      v-if="authenticated"
    >
      <v-list nav>
        <v-list-item to="/" exact>
          <v-list-item-icon class="mr-6">
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Home</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(page, key) of pages"
          :key="key"
          :to="page.link"
          class="px-0 mx-0 my-2"
          active-class
        >
          <v-list-item-avatar>
            <v-img :src="page.logo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>{{ page.name }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AuthStateModule } from '@/store/modules/AuthState';

interface Page {
  link: string;
  logo: string;
  name: string;
}

@Component
export default class App extends Vue {
  private pages: Page[] = [];
  private miniVariant = true;
  get authenticated(): boolean {
    return AuthStateModule.session.isAuthenticated;
  }

  logout() {
    // TODO: logout dialog
    if (window.confirm('Are you sure you want to logout?')) {
      AuthStateModule.logout();
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style lang="sass">
.v-application code
    all: unset
    color: #eee

.v-application code.code--custom
  all: unset
  color: #eee
</style>
