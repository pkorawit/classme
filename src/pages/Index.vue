<template>
  <q-page class="bg-secondary">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-dialog v-model="submitEmpty">
        <q-card style="width: 300px">
          <q-card-section>
            <div class="text-h6">Notification</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Please choose the answer.
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
            @click="submitEmpty = true"
          />
        </div>
        <div class="col-8 text-center">
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
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
            color="negative"
            label="Next >>"
            type="submit"
            @click="submitEmpty = true"
          />
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
            name="toggle_advertisement"
            v-model="toggle_advertisement"
            spread
            no-caps
            toggle-color="purple"
            color="white"
            text-color="black"
            :options="[
              { label: 'Advertisement', value: 'T' },
              { label: 'Not Advertisement', value: 'F' }
            ]"
          />
        </div>
      </div>
      <div class="row q-mt-sm">
        <div class="col-2"></div>
        <div class="col-8 bg-info  items-start">
          <q-btn-toggle
            name="toggle_tourism"
            v-model="toggle_tourism"
            spread
            no-caps
            toggle-color="pink"
            color="white"
            text-color="black"
            :options="[
              { label: 'Tourism', value: 'T' },
              { label: 'Not Tourism', value: 'F' }
            ]"
          />
        </div>
      </div>
      <div class="row q-mt-sm"></div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      shortCode: null,
      text_ID: null,
      search_ID: null,
      location_name: null,
      caption_text: null,
      toggle_advertisement: null,
      toggle_tourism: null,
      submitResult: [],
      submitEmpty: false
    };
  },
  methods: {
    onSubmit(evt) {
      this.$axios
        .get("https://insightapi-myzemjarqq-as.a.run.app/api/Posts/1")
        .then(response => {
          // console.log(response.data);
          this.shortCode = response.data.shortCode;
          this.text_ID = response.data.id;
          this.location_name = response.data.locationName;
          this.caption_text = response.data.captionText;
        });

      const formData = new FormData(evt.target);
      const submitResult = [];

      for (const [name, value] of formData.entries()) {
        submitResult.push({
          name,
          value
        });
      }
      this.submitResult = submitResult;
      this.submitEmpty = submitResult.length === 0;
      // console.log("SubmitEmpty : " + this.submitEmpty);
      if (this.submitEmpty == false) {
        console.log("Add data in database");
        // console.log(this.submitResult);
        if (this.toggle_advertisement == null) {
          this.toggle_advertisement = "F";
        }
        if (this.toggle_tourism == null) {
          this.toggle_tourism = "F";
        }
        if (this.toggle_tourism == "T") {
          this.toggle_advertisement = "F";
        }
        console.log("shortCode : " + this.shortCode);
        console.log("advertisement : " + this.toggle_advertisement);
        console.log("tourism : " + this.toggle_tourism);
      } else {
        console.log("Do nothing");
      }
    }
  }
};
</script>
