<template>
  <q-page class="bg-secondary">
    <q-dialog
      v-model="inform.persistentPostPhotoNumber"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-blue-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Inform</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Completed
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Logout" v-close-popup @click="onLogout" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row q-pa-sm">
      <div class="col-1">
        <q-input standout v-model="display.id" label="ID" readonly />
      </div>
      <div class="col-2">
        <q-input
          standout
          v-model="display.shortCode"
          label="Short Code"
          readonly
        />
      </div>
      <div class="col-7"></div>
      <div class="col-2">
        <q-input
          standout
          v-model="login.userLogin"
          label="User login"
          readonly
        />
      </div>
    </div>

    <div class="row justify-center items-center">
      <div class="col-5 text-center">
        <q-img
          :src="display.imageSrc"
          style="height: 720px; max-width: 720px"
          native-context-menu
        >
          <q-icon
            class="absolute all-pointer-events"
            size="32px"
            name="info"
            color="white"
            style="top: 8px; left: 8px"
          >
            <q-tooltip>Tooltip</q-tooltip>
          </q-icon>
        </q-img>
      </div>

      <div class="col-5 text-center">
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 bg-info  items-start">
            <div class="row">
              <div class="col-0.5 text-center">
                <a target="_blank" :href="display.imageIG"
                  ><img
                    src="~assets/logo_ig.png"
                    style="height: 50px; max-width: 50px"
                /></a>
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="display.username"
                  readonly
                  label="Username"
                  stack-label
                />
              </div>

              <div class="col">
                <q-input
                  filled
                  v-model="display.fullname"
                  readonly
                  label="Fullname"
                  stack-label
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="display.locationName"
                  readonly
                  label="Location Name"
                  stack-label
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  filled
                  v-model="display.captionText"
                  readonly
                  type="textarea"
                  label="Caption Text"
                  stack-label
                />
              </div>
            </div>
          </div>
          <div class="col-2"></div>
        </div>

        <div class="row"></div>
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 bg-info  items-start">
            <q-btn-toggle
              v-model="display.toggleAdvertisement"
              spread
              no-caps
              toggle-color="purple"
              color="white"
              text-color="black"
              :options="[
                { label: 'Advertisement', value: true },
                { label: 'Not Advertisement', value: false }
              ]"
              @click="onCheckToggle"
            />
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 bg-info  items-start">
            <q-btn-toggle
              v-model="display.toggleTourism"
              spread
              no-caps
              toggle-color="pink"
              color="white"
              text-color="black"
              :options="[
                { label: 'Tourism', value: true },
                { label: 'Not Tourism', value: false }
              ]"
              @click="onCheckToggle"
            />
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-2"></div>
          <div class="col-8 text-center">
            <q-btn
              color="green-6"
              class="full-width"
              label="Save"
              @click="onSave"
            />
          </div>
        </div>

        <div class="row q-mt-sm"></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageIndex",
  computed: {
    ...mapGetters({
      user_login: "user_login/user_login"
    })
  },
  data() {
    return {
      login: {
        userLogin: null
      },
      taskManager: {
        id: null,
        massage: null
      },
      dataPostsLogData: {
        id: null,
        shortCode: null,
        username: null,
        timeStart: null,
        timeStop: null,
        status: null
      },
      display: {
        id: null,
        shortCode: null,
        imageSrc: null,
        imageIG: null,
        username: null,
        fullname: null,
        locationName: null,
        captionText: null,
        toggleAdvertisement: null,
        toggleTourism: null
      },
      inform: {
        persistentPostPhotoNumber: false
      }
    };
  },
  async mounted() {
    this.login.userLogin = this.user_login;
    console.log("User Login : ", this.login.userLogin);
    await this.init();
  },
  methods: {
    async init() {
      this.display.toggleAdvertisement = null;
      this.display.toggleTourism = null;
      await this.getTaskManager();
      if (this.taskManager.massage == "No_data_in_database_PostLog") {
        console.log("No data in database PostLog");
        this.display.id = 1;
        await this.getDBPostsData();
        await this.postDBPostsLogData();
        this.display.imageSrc =
          "https://storage.cloud.google.com/instagram_phuket/post_image/" +
          this.display.shortCode +
          ".jpg";
      } else if (this.taskManager.massage == "Reset_Status") {
        console.log("Reset Status");

        await this.putDBPostsLogSetStatusAll();
        await this.init();
      } else if (this.taskManager.massage == "max_ID") {
        console.log("maxID");
        this.display.id = this.taskManager.id;
        await this.getDBPostsData();
        await this.postDBPostsLogData();
        this.display.imageSrc =
          "https://storage.cloud.google.com/instagram_phuket/post_image/" +
          this.display.shortCode +
          ".jpg";
      } else if (this.taskManager.massage == "min_ID") {
        console.log("minID");
        this.display.id = this.taskManager.id;
        await this.getDBPostsData();
        await this.putDBPostsLogData();
        this.display.imageSrc =
          "https://storage.cloud.google.com/instagram_phuket/post_image/" +
          this.display.shortCode +
          ".jpg";
      } else if (this.taskManager.massage == "Completed") {
        console.log("Completed");
        this.inform.persistentPostPhotoNumber = true;
        console.log("LOGOUT");
      }
    },

    async getTaskManager() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/TaskManager"
        );
        this.taskManager.id = response.data.id;
        this.taskManager.massage = response.data.massage;
      } catch (e) {
        console.log(e);
      }
    },

    async getDBPostsData() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/Posts/" +
            this.display.id
        );
        this.display.id = response.data.id;
        this.display.imageIG =
          "https://www.instagram.com/" + response.data.username;
        this.display.shortCode = response.data.shortCode;
        this.display.username = response.data.username;
        this.display.fullname = response.data.fullname;
        this.display.locationName = response.data.locationName;
        this.display.captionText = response.data.captionText;
      } catch (e) {
        console.log(e);
      }
    },

    async postDBPostsLogData() {
      try {
        const response = await this.$axios.post(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog",
          {
            Id: this.display.id,
            ShortCode: this.display.shortCode,
            UserId: this.login.userLogin,
            TimeStart: 0,
            TimeStop: 0,
            status: true
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async getDBPostsLogData() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/" +
            this.display.id
        );
        this.dataPostsLogData.id = response.data.id;
        this.dataPostsLogData.shortCode = response.data.shortCode;
        this.dataPostsLogData.username = response.data.userId;
        this.dataPostsLogData.timeStart = response.data.timeStart;
        this.dataPostsLogData.timeStop = response.data.timeStop;
        this.dataPostsLogData.status = response.data.status;
      } catch (e) {
        console.log(e);
      }
    },

    async putDBPostsLogTimeStop() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/timestop/" +
            this.dataPostsLogData.shortCode,
          {
            Id: this.display.id,
            ShortCode: this.display.shortCode,
            UserId: this.login.userLogin,
            TimeStart: this.dataPostsLogData.timeStart,
            TimeStop: 0,
            status: false
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async putDBPostsLogData() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/" +
            this.display.shortCode,
          {
            Id: this.display.id,
            ShortCode: this.display.shortCode,
            UserId: this.login.userLogin,
            TimeStart: 0,
            TimeStop: 0,
            status: true
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async putDBPostsLogSetStatusAll() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/setStatusAll"
        );
      } catch (e) {
        console.log(e);
      }
    },

    async postDBPostsClassificationData() {
      try {
        const response = await this.$axios.post(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostClassifications",
          {
            ShortCode: this.display.shortCode,
            IsAds: this.display.toggleAdvertisement,
            IsTourist: this.display.toggleTourism,
            timestamp: this.timeStop,
            UserId: this.login.userLogin
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async onSave() {
      console.log("onSave");
      if (
        this.display.toggleAdvertisement == null &&
        this.display.toggleTourism == null
      ) {
        console.log("Do nothing");
      } else {
        await this.getDBPostsLogData();
        await this.putDBPostsLogTimeStop();
        await this.postDBPostsClassificationData();
        await this.onNext();
      }
    },

    onNext() {
      this.init();
    },

    onCheckToggle() {
      if (this.display.toggleAdvertisement == true) {
        this.display.toggleTourism = false;
      } else if (this.display.toggleTourism == true) {
        this.display.toggleAdvertisement = false;
      } else if (this.display.toggleAdvertisement == false) {
        this.display.toggleTourism = false;
      } else if (this.display.toggleTourism == false) {
        this.display.toggleAdvertisement = false;
      }
    },

    onLogout() {
      console.log("Logout");
      this.login.userLogin = null;
      this.$router.push({ path: "/" });
    }
  }
};
</script>
