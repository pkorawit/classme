<template>
  <q-page class="bg-secondary">
    <q-dialog v-model="prepare">
      <q-card style="width: width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Inform</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          The email or password you have entered has expired or does not match
          our records, please try again.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row justify-center items-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Login to Image Classification Lebeling
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              v-model="email"
              label="Email address"
              @keydown.enter.prevent="onLogin"
              :rules="[val => !!val]"
            />
            <q-input
              outlined
              v-model="password"
              label="Password"
              type="password"
              hint
              @keydown.enter.prevent="onLogin"
              :rules="[val => !!val]"
            />
            <div class="text-center">
              <q-btn
                color="green-6"
                class="q-px-xl q-py-xs"
                label="Login"
                @click="onLogin"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageLogin",
  data() {
    return {
      prepare: false,
      email: null,
      password: null
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      this.email = null;
      this.password = null;
    },
    onLogin() {
      console.log("onLogin");
      this.onCheck();
    },
    onCheck() {
      if (this.email == "tee") {
        console.log("Login complete");
        this.$router.push({ path: "/index" });
      } else {
        console.log("Login failed");
        this.prepare = true;
        this.init();
      }
    }
  }
};
</script>
