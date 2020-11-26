<template>
  <v-card>
    <v-card-title>
      Sign In
    </v-card-title>
    <v-card-text>
      <v-main class="pt-0">
        <v-row v-show="showError">
          <v-col class="red--text darken-4">
            {{ errorMessage }}
          </v-col>
        </v-row>
        <v-form @submit.prevent lazy-validation v-model="valid">
          <v-text-field
            :rules="usernameRules"
            autocomplete="username"
            type="text"
            label="username"
            v-model="username"
            required
          />
          <v-text-field
            :rules="passwordRules"
            autocomplete="current-password"
            type="password"
            label="password"
            v-model="password"
            required
          />
          <v-card-actions>
            <v-btn :disabled="!valid" type="submit" @click="login"
              >sign in</v-btn
            >
          </v-card-actions>
        </v-form>
        <v-row>
          <v-col>
            Query:
            <highlightjs lang="sql" :code="sqlQuery" />
          </v-col>
        </v-row>
      </v-main>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DB from '@/lib/DB';

@Component
export default class Login extends Vue {
  private username = '';
  private password = '';

  private readonly errorMessage: string = 'incorrect username or password';
  private showError = false;
  private valid = false;

  get sqlQuery(): string {
    return `SELECT id FROM users WHERE name = '${this.username}' AND password = '${this.password}'`;
  }

  private usernameRules = [
    (v: string) => !!v || 'username is required'
    // (v: string) => /^[0-9a-zA-Z]+$/.test(v) || 'username must consist of alphabetic characters'
  ];

  private passwordRules = [
    (v: string) => (v && v.length >= 8) || 'password must be >=8 characters'
  ];

  async login() {
    const succeeded = await DB.login(this.username, this.password);
    if (succeeded) {
      this.$router.push({ name: 'Home' });
    } else {
      this.showError = true;
    }
  }
}
</script>
