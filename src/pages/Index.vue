<template>
  <q-page class="bg-secondary">
    <div class="row q-pa-sm">
      <div class="col-3">
        <q-input standout v-model="text_ID" readonly />
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <q-input
          v-model="search_ID"
          standout
          type="search"
          label="Search by ID"
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
        <q-btn color="negative" label="Next >>" type="submit" @click="onNext" />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-2"></div>
      <div class="col-8 bg-info  items-start">
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
      id: 1,
      shortCode: null,
      imageSrc: null,
      text_ID: null,
      search_ID: null,
      location_name: null,
      caption_text: null,
      toggle_advertisement: null,
      toggle_tourism: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.toggle_advertisement = null,
      this.toggle_tourism = null
      await this.getData();
      console.log(this.id + ": ShortCode : " + this.shortCode);
      this.imageSrc =
        "https://storage.cloud.google.com/instagram_phuket/post_image/" +
        this.shortCode +
        ".jpg";
    },
    async getData() {
      await this.$axios
        .get("https://insightapi-myzemjarqq-as.a.run.app/api/Posts/" + this.id)
        .then(response => {
          // console.log(response.data);
          this.shortCode = response.data.shortCode;
          this.text_ID = response.data.id;
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
          console.log(e);
        });
    },
    onPrevious() {
      console.log("onPrevious");
      if (this.toggle_advertisement == null && this.toggle_tourism == null) {
        console.log("Do nothing");
      } else {
        this.onData();
        this.id = this.id - 1;
        if (this.id <= 0) {
          this.id = 1;
        }
        this.init();
      }
    },
    onNext() {
      console.log("onNext");
      if (this.toggle_advertisement == null && this.toggle_tourism == null) {
        console.log("Do nothing");
      } else {
        this.onData();
        this.id = this.id + 1;
        this.init();
      }
    },

    onData() {
      this.dialog == true;
      if (this.toggle_advertisement == null) {
        this.toggle_advertisement = "false";
      }
      if (this.toggle_tourism == null) {
        this.toggle_tourism = "false";
      }
      if (this.toggle_tourism == "true") {
        this.toggle_advertisement = "false";
      }
      console.log("shortCode : " + this.shortCode);
      console.log("advertisement : " + this.toggle_advertisement);
      console.log("tourism : " + this.toggle_tourism);
    }
  }
};
</script>
