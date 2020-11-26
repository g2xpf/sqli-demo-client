<template>
  <v-card v-if="user">
    <v-card-title> Hello, {{ user.name }}! </v-card-title>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DB from '@/lib/DB';
import { User } from '@/lib/User';

@Component
export default class Home extends Vue {
  private user: User | null = null;

  async created() {
    const user = await DB.getUserInfo();
    if (user) {
      this.user = user;
    }
  }
}
</script>
