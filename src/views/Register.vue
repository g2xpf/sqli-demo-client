<template>
  <v-card>
    <v-card-title>
      Sign Up
    </v-card-title>
    <v-card-text>
      <v-main class="pt-0">
        <v-row v-show="showError">
          <v-col class="red--text darken-4">
            {{ errorMessage }}
          </v-col>
        </v-row>
        <v-form>
          <v-text-field
            :rules="usernameRules"
            v-model="username"
            autocomplete="username"
            type="text"
            label="username"
            required
          />
          <v-text-field
            :rules="passwordRules"
            v-model="password"
            autocomplete="new-password"
            :type="passwordVisible ? 'text' : 'password'"
            :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            label="password"
            @click:append="passwordVisible = !passwordVisible"
            required
          />
          <v-text-field
            :rules="passwordVerificationRules"
            v-model="verifyPassword"
            autocomplete="new-password"
            :type="verifyPasswordVisible ? 'text' : 'password'"
            :append-icon="verifyPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            label="verify password"
            @click:append="verifyPasswordVisible = !verifyPasswordVisible"
            required
          />
          <v-btn @click="register">Sign Up</v-btn>
        </v-form>
      </v-main>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DB from '@/lib/DB';

@Component
export default class Register extends Vue {
  private username = '';
  private password = '';
  private passwordVisible = false;
  private verifyPassword = '';
  private verifyPasswordVisible = false;

  private errorMessage = 'the user already exists';
  private showError = false;

  private usernameRules = [
    (v: string) => !!v || 'username is required',
    (v: string) =>
      /^[0-9a-zA-Z]+$/.test(v) ||
      'username must consist of alphabetic characters'
  ];

  private passwordRules = [
    (v: string) => (v && v.length >= 8) || 'password must be >=8 characters'
  ];

  private passwordVerificationRules = [this.isVerifyPasswordMatches];

  private isVerifyPasswordMatches(v: string): string | boolean {
    return v === this.password || `verification password doesn't match`;
  }

  async register() {
    const succeeded = await DB.register(this.username, this.password);
    if (!succeeded) {
      this.showError = true;
    } else {
      alert('successfully created your account!');
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>
