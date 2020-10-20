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
        <q-input standout v-model="taskManager.id" label="ID" readonly />
      </div>
      <div class="col-2">
        <q-input
          standout
          v-model="data.shortCode"
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
          :src="data.imageSrc"
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
                <a target="_blank" :href="data.imageIG"
                  ><img
                    src="~assets/logo_ig.png"
                    style="height: 50px; max-width: 50px"
                /></a>
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="data.userName"
                  readonly
                  label="Username"
                  stack-label
                />
              </div>

              <div class="col">
                <q-input
                  filled
                  v-model="data.fullName"
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
                  v-model="data.locationName"
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
                  v-model="data.captionText"
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
              v-model="data.toggleAdvertisement"
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
              v-model="data.toggleTourism"
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
        massage: null,
        id: null,
        code: null
      },
      data: {
        id: null,
        shortCode: null,
        imageSrc: null,
        imageIG: null,
        userName: null,
        fullName: null,
        locationName: null,
        captionText: null,
        toggleAdvertisement: null,
        toggleTourism: null
      },
      dataLabelLog: {
        id: null,
        shortCode: null,
        userId: null,
        timeStart: null,
        timeStop: null,
        no: null
      },
      dataLabelStatus: {
        id: null,
        shortCode: null,
        status: null
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
      this.data.toggleAdvertisement = null;
      this.data.toggleTourism = null;

      await this.getLabelTaskManager();
      if (this.taskManager.massage == "Data") {
        console.log(this.taskManager.massage);
        await this.getLabelStatus();
        await this.putLabelStatus();
        await this.getLabelData();
        await this.postLabelLog();
        await this.getLabelLogMaxId();
        await this.getLabelLog();
        this.data.imageSrc =
          "https://storage.cloud.google.com/instagram_phuket/post_image/" +
          this.data.shortCode +
          ".jpg";
      } else if (this.taskManager.massage == "ShortCode_max") {
        console.log(this.taskManager.massage);
        await this.getLabelStatus();
        await this.putLabelStatus();
        await this.init();
      } else if (this.taskManager.massage == "Reset_Status") {
        console.log(this.taskManager.massage);
        await this.putLabelStatusSetStatusAll();
        await this.init();
      } else if (this.taskManager.massage == "Completed") {
        console.log(this.taskManager.massage);
        this.inform.persistentPostPhotoNumber = true;
      }
    },

    
    // >> TaskManager
    async getLabelTaskManager() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelTaskManager"
        );
        this.taskManager.massage = response.data.massage;
        this.taskManager.id = response.data.id;
        this.taskManager.code = response.data.code;
      } catch (e) {
        console.log(e);
      }
    },

// >> LabelData
    async getLabelData() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelData/" +
            this.taskManager.code
        );
        this.data.id = response.data.id;
        this.data.imageIG =
          "https://www.instagram.com/" + response.data.username;
        this.data.shortCode = response.data.shortCode;
        this.data.userName = response.data.username;
        this.data.fullName = response.data.fullname;
        this.data.locationName = response.data.locationName;
        this.data.captionText = response.data.captionText;
      } catch (e) {
        console.log(e);
      }
    },

// >> LabelClassification
    async postLabelClassification() {
      try {
        const response = await this.$axios.post(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelClassification",
          {
            Id: this.taskManager.id,
            ShortCode: this.data.shortCode,
            IsAds: this.data.toggleAdvertisement,
            IsTourist: this.data.toggleTourism,
            TimeStamp: 0,
            UserId: this.login.userLogin,
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

// >> LabelStatus
    async getLabelStatus() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelStatus/" +
            this.taskManager.id
        );
        this.dataLabelStatus.id = response.data.id;
        this.dataLabelStatus.shortCode = response.data.shortCode;
        this.dataLabelStatus.status = response.data.status;
      } catch (e) {
        console.log(e);
      }
    },

    async putLabelStatus() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelStatus/" +
            this.dataLabelStatus.shortCode,
          {
            Id: this.dataLabelStatus.id,
            ShortCode: this.dataLabelStatus.shortCode,
            Status: true
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async putLabelStatusSetStatusAll() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelStatus/SetStatusAll"
        );
      } catch (e) {
        console.log(e);
      }
    },

// >> LabelLog
    async postLabelLog() {
      try {
        const response = await this.$axios.post(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelLog/TimeStart",
          {
            Id: this.taskManager.id,
            ShortCode: this.data.shortCode,
            UserId: this.login.userLogin,
            TimeStart: 0,
            TimeStop: 0,
            No: 0
          }
        );
      } catch (e) {
        console.log(e);
      }
    },

    async getLabelLogMaxId() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelLog/MaxId"
        );
        this.dataLabelLog.no = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getLabelLog() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelLog/" +
            this.dataLabelLog.no
        );
        this.dataLabelLog.id = response.data.id;
        this.dataLabelLog.shortCode = response.data.shortCode;
        this.dataLabelLog.userId = response.data.userId;
        this.dataLabelLog.timeStart = response.data.timeStart;
        this.dataLabelLog.timeStop = response.data.timeStop;
        this.dataLabelLog.no = response.data.no;
      } catch (e) {
        console.log(e);
      }
    },

    async putLabelLog() {
      try {
        const response = await this.$axios.put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/LabelLog/TimeStop/" + this.dataLabelLog.no,
          {
            Id: this.dataLabelLog.id,
            ShortCode: this.dataLabelLog.shortCode,
            UserId: this.dataLabelLog.userId,
            TimeStart: this.dataLabelLog.timeStart,
            TimeStop: 0,
            No: this.dataLabelLog.no
          }
        );
      } catch (e) {
        console.log(e);
      }
    },


    async onSave() {
      console.log("onSave");
      if (
        this.data.toggleAdvertisement == null &&
        this.data.toggleTourism == null
      ) {
        console.log("Do nothing");
      } else {
        console.log("Doen");
        await this.postLabelClassification();
        await this.putLabelLog();
        await this.init();
      }
    },

    onCheckToggle() {
      if (this.data.toggleAdvertisement == true) {
        this.data.toggleTourism = false;
      } else if (this.data.toggleTourism == true) {
        this.data.toggleAdvertisement = false;
      } else if (this.data.toggleAdvertisement == false) {
        this.data.toggleTourism = false;
      } else if (this.data.toggleTourism == false) {
        this.data.toggleAdvertisement = false;
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
