<template>
  <q-page class="bg-secondary">
    <div class="row q-pa-sm">
      <div class="col-1">
        <q-input standout v-model="id" label="ID" readonly />
      </div>
      <div class="col-2">
        <q-input standout v-model="shortCode" label="Short Code" readonly />
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <q-input
          v-model="search"
          filled
          label="Search by ID"
          mask="#######"
          @keydown.enter.prevent="onSearch"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center items-center">
      <div class="col-2 text-center">
        <q-btn
          push
          color="negative"
          label="<< Previous"
          type="submit"
          @click="onPrevious"
        />
      </div>
      <div class="col-8 text-center">
        <q-img
          :src="imageSrc"
          style="height: 480px; max-width: 480px"
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
      <div class="col-2 text-center">
        <q-btn
          push
          color="negative"
          label="Next >>"
          type="submit"
          @click="onNext"
        />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-2"></div>
      <div class="col-8 bg-info  items-start">
        <div class="row">
          <div class="col-0.5">
            <a target="_blank" :href="url_ig"><img src="~assets/logo_ig.png" style="height: 50px; max-width: 50px"></a>
          </div>
          <div class="col">
            <q-input
              filled
              v-model="username"
              readonly
              label="Username"
              stack-label
            />
          </div>
          
          <div class="col">
            <q-input
              filled
              v-model="fullname"
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
              v-model="location_name"
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
              v-model="caption_text"
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
          v-model="toggle_advertisement"
          spread
          no-caps
          toggle-color="purple"
          color="white"
          text-color="black"
          :options="[
            { label: 'Advertisement', value: true },
            { label: 'Not Advertisement', value: false }
          ]"
        />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-2"></div>
      <div class="col-8 bg-info  items-start">
        <q-btn-toggle
          v-model="toggle_tourism"
          spread
          no-caps
          toggle-color="pink"
          color="white"
          text-color="black"
          :options="[
            { label: 'Tourism', value: true },
            { label: 'Not Tourism', value: false }
          ]"
        />
      </div>
    </div>
    <div class="row q-mt-sm"></div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      count: null,
      status: true,
      search: null,
      imageSrc: null,
      id: 1,
      url_ig: null,
      shortCode: null,
      username: null,
      fullname: null,
      location_name: null,
      caption_text: null,
      toggle_advertisement: null,
      toggle_tourism: null,
      timestamp: 0,
    };
  },
  async mounted() {
    await this.getCount();
    await this.init();
  },
  methods: {
    async init() {
      this.toggle_advertisement = null;
      this.toggle_tourism = null;
      this.search = null;
      await this.getData();
      console.log(this.id + ": ShortCode : " + this.shortCode);
      this.imageSrc =
        "https://storage.cloud.google.com/instagram_phuket/post_image/" +
        this.shortCode +
        ".jpg";
      console.log("Status : " + this.status);
    },
    getCount() {
       this.$axios
        .get("https://insightapi-myzemjarqq-as.a.run.app/api/Posts/count")
        .then(response => {
          this.count = response.data;
          console.log(this.count);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async getData() {
      await this.$axios
        .get("https://insightapi-myzemjarqq-as.a.run.app/api/Posts/" + this.id)
        .then(response => {
          // console.log(response.data);
          this.url_ig = "https://www.instagram.com/" + response.data.username;
          this.shortCode = response.data.shortCode;
          this.username = response.data.username;
          this.fullname = response.data.fullname;
          this.id = response.data.id;
          this.location_name = response.data.locationName;
          this.caption_text = response.data.captionText;
        })
        .catch(e => {
          console.log(e);
        });
      await this.$axios
        .get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostClassifications/" +
            this.shortCode
        )
        .then(response => {
          this.toggle_advertisement = response.data.isAds;
          this.toggle_tourism = response.data.isTourist;
        })
        .catch(e => {
          // console.log(JSON.stringify(e));
          // console.log(JSON.stringify(e.response.data.status));
          this.status = false;
        });
    },
    async postData() {
      await this.$axios
        .post(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostClassifications",
          {
            shortCode: this.shortCode,
            isAds: this.toggle_advertisement,
            isTourist: this.toggle_tourism,
            timestamp: this.timestamp
          }
        )
        .then(response => {})
        .catch(e => {
          console.log(e);
        });
    },
    async putData() {
      await this.$axios
        .put(
          "https://insightapi-myzemjarqq-as.a.run.app/api/PostClassifications/" +
            this.shortCode,
          {
            shortCode: this.shortCode,
            isAds: this.toggle_advertisement,
            isTourist: this.toggle_tourism,
            timestamp: this.timestamp
          }
        )
        .then(response => {})
        .catch(e => {
          console.log(e);
        });
    },
    onSearch() {
      if (!(this.search == 0 || this.search > this.count)) {
        this.id = this.search;
      }
      this.init();
    },
    onPrevious() {
      console.log("onPrevious");
      if (this.toggle_advertisement == null && this.toggle_tourism == null) {
        console.log("Do nothing");
      } else {
        this.id = this.id - 1;
        if (this.id <= 0) {
          this.id = 1;
        }
        this.onCheck();
        if (this.status == true) {
          this.putData();
        } else {
          this.postData();
        }
      }
      this.init();
    },
    onNext() {
      console.log("onNext");
      if (this.toggle_advertisement == null && this.toggle_tourism == null) {
        console.log("Do nothing");
      } else {
        this.id = this.id + 1;
        if (this.id > this.count) {
          this.id = this.count;
        }
        this.onCheck();
        if (this.status == true) {
          this.putData();
        } else {
          this.postData();
        }
      }
      this.init();
    },

    onCheck() {
      if (this.toggle_advertisement == null) {
        this.toggle_advertisement = false;
      } else if (this.toggle_tourism == null) {
        this.toggle_tourism = false;
      } else if (this.toggle_advertisement == true) {
        this.toggle_tourism = false;
      } else if (this.toggle_tourism == true) {
        this.toggle_advertisement = false;
      }
    }
  }
};
</script>
