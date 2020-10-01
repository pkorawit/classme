<template>
  <q-page class="bg-secondary">
    <q-dialog
      v-model="persistentPostPhotoNumber"
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
          <q-btn flat label="Logout" v-close-popup @click="onLogout"/>
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
        <q-input standout v-model="userLogin" label="User login" readonly />
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
                <a target="_blank" :href="imageIG"
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
      display: {
        id: null,
        shortCode: null,
        imageSrc: null,
        username: null,
        fullname: null,
        locationName: null,
        captionText: null,
        toggleAdvertisement: null,
        toggleTourism: null
      },
      imageIG: null,
      userLogin: null,
      countPostNumber: 0,
      countPostClassification: 0,
      countImage: 0,
      maxid: 0,
      minid: 0,
      id: 0,
      imageSrc: null,
      shortCode: null,
      username: null,
      fullname: null,
      locationName: null,
      captionText: null,
      userid: null,
      toggleAdvertisement: null,
      toggleTourism: null,
      timeStart: 0,
      timeStop: 0,
      persistentPostPhotoNumber: false,
    };
  },
  async mounted() {
    console.log("User Login : ", this.user_login);
    this.userLogin = this.user_login;
    await this.getDBPostsCountPostPhotoNumber();
    console.log("getDBPostsCountPostPhotoNumber : " + this.countPostNumber);
    
    await this.init();
  },
  methods: {
    async init() {
      await this.getDBPostsCountPostClassification();
    console.log(
      "getDBPostsCountPostClassification : " + this.countPostClassification
    );
      // if (this.countPostNumber > this.countPostClassification) {
      await this.getDBPostsLogMaxID();
      await this.getDBPostsLogMinID();

      if (5 > this.countPostClassification) {
        // if (this.countPostNumber > this.maxid) {
        if (5 > this.maxid) {
          this.id = this.maxid + 1;
          await this.getDBPostsData();
          await console.log("ID:" + this.id + " ShortCode: " + this.shortCode);
          await this.postDBPostsLogData();
          await this.onDisplay();
        } else if (this.minid > 0) {
          this.id = this.minid;
          await this.getDBPostsData();
          await console.log("ID:" + this.id + " ShortCode: " + this.shortCode);
          await this.putDBPostsLogData();
          await this.onDisplay();
        } else {
          await this.putDBPostsLogSetStatusAll();
          await this.init();
        }
      } else {
        this.persistentPostPhotoNumber = true;
        console.log("LOGOUT");
        
      }
    },

    async getDBPostsCountPostPhotoNumber() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/Posts/count"
        );
        this.countPostNumber = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getDBPostsCountPostClassification() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostClassifications/count"
        );
        this.countPostClassification = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getDBPostsData() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/Posts/" + this.id
        );
        this.imageIG = "https://www.instagram.com/" + response.data.username;
        this.shortCode = response.data.shortCode;
        this.username = response.data.username;
        this.fullname = response.data.fullname;
        this.id = response.data.id;
        this.locationName = response.data.locationName;
        this.captionText = response.data.captionText;
      } catch (e) {
        console.log(e);
      }
    },

    async getDBPostsLogData() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/" + this.id
        );
        this.shortCode = response.data.shortCode;
        this.username = response.data.userId;
        this.timeStart = response.data.timeStart;
        this.timeStop = response.data.timeStop;
        this.status = response.data.status;
      } catch (e) {
        console.log(e);
      }
    },

    async getDBPostsLogMaxID() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/maxid"
        );
        this.maxid = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getDBPostsLogMinID() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/minid"
        );
        this.minid = response.data;
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

    async postDBPostsLogData() {
      try {
        const response = await this.$axios.post(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog",
          {
            Id: this.id,
            ShortCode: this.shortCode,
            UserId: this.userLogin,
            TimeStart: this.timeStart,
            TimeStop: this.timeStop,
            status: true
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
            this.shortCode,
          {
            Id: this.id,
            ShortCode: this.shortCode,
            UserId: this.userLogin,
            TimeStart: this.timeStart,
            TimeStop: this.timeStop,
            status: true
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async putDBPostsLogTimeStop() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostLog/timestop/" +
            this.shortCode,
          {
            Id: this.display.id,
            ShortCode: this.display.shortCode,
            UserId: this.userLogin,
            TimeStart: this.timeStart,
            TimeStop: this.timeStop,
            status: false
          }
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
            UserId: this.userLogin
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    onDisplay() {
      this.display.id = this.id;
      this.display.shortCode = this.shortCode;
      this.display.imageSrc =
        "https://storage.cloud.google.com/instagram_phuket/post_image/" +
        this.shortCode +
        ".jpg";
      this.display.username = this.username;
      this.display.fullname = this.fullname;
      this.display.locationName = this.locationName;
      this.display.captionText = this.captionText;
      this.display.toggleAdvertisement = this.toggleAdvertisement;
      this.display.toggleTourism = this.toggleTourism;
    },

    async onSave() {
      console.log("onSave");
      if (
        this.display.toggleAdvertisement == null &&
        this.display.toggleTourism == null
      ) {
        console.log("Do nothing");
      } else {
        console.log(this.id);
        await this.getDBPostsLogData();
        await this.putDBPostsLogTimeStop();
        await this.postDBPostsClassificationData();
        await this.onNext();
      }
    },

    onNext() {
      if (this.id > this.countPostNumber) {
        this.onLogout();
      }
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
      this.userLogin = null
      this.$router.push({ path: "/" });
    }
  }
};
</script>
