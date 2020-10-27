<template>
  <q-page class="bg-secondary">
    <q-dialog v-model="prepare">
      <q-card style="width: width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Inform</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ errorMessage }}
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
              :rules="[(val) => !!val]"
            />
            <q-input
              outlined
              v-model="password"
              label="Password"
              type="password"
              hint
              @keydown.enter.prevent="onLogin"
              :rules="[(val) => !!val]"
            />
            <div class="text-center">
              <q-btn
                color="green-6"
                class="q-px-xl q-py-xs full-width"
                label="Login with Classme"
                icon="alternate_email"
                filled
                @click="onLogin"
              />
            </div>
            <div class="text-center">
              <q-btn
                color="red"
                class="q-px-xl q-py-xs q-mt-sm full-width"
                label="Login with Gmail"
                icon="mail_outline"
                filled
                @click="onGmailLogin"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "PageLogin",
  computed: {
    ...mapGetters({
      user_login: "user_login/user_login",
    }),
  },
  data() {
    return {
      prepare: false,
      email: null,
      password: null,
      errorMessage: "",
    };
  },
  async mounted() {
    console.log("User Login >>> ", this.user_login);
    await this.init();
  },
  methods: {
    ...mapActions({
      setStatusLogin: "user_login/setUserLogin",
    }),
    async init() {
      this.email = null;
      this.password = null;
    },
    onLogin() {
      console.log("onLogin");
      this.onCheck();
    },
    onGmailLogin() {
      console.log("onGmailLogin");
      this.onGmailCheck();
    },
    onGmailCheck() {
      var provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth
        .signInWithPopup(provider)
        .then((result) => {
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          if (user) {
          this.prepare = false;
          let user_login = {
            email: user.email,
          };
          this.setStatusLogin(user_login);
          this.$router.push({ name: "home" });
        } else {
        }
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.errorMessage = errorMessage;
          this.prepare = true;
          console.log(errorMessage);
        });
    },
    onCheck() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          this.errorMessage = errorMessage;
          this.prepare = true;
          console.log(errorMessage);
        });

      this.$auth.onAuthStateChanged((user) => {
        if (user) {
          this.prepare = false;
          let user_login = {
            email: this.email,
          };
          this.setStatusLogin(user_login);
          this.$router.push({ name: "home" });
        } else {
        }
      });
    },
  },
};
</script>
