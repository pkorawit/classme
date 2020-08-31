<template>
  <q-page class="bg-secondary">
    <div class="row q-pa-sm">
      <div class="col-3">
        <q-input standout v-model="text_ID" readonly />
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <q-input v-model="search" standout type="search" label="Search by ID">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center items-center">
      <div class="col-2 text-center">
        <q-btn push color="negative" label="<< Previous" />
      </div>
      <div class="col-8 text-center">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" style="height: 480px; max-width: 480px" native-context-menu>
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
        <q-btn push color="negative" label="Next >>" />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-2"></div>
      <div class="col-8 bg-info  items-start">
         <div class="row">
          <div class="col"><q-input filled v-model="text_ID" readonly label="Location Name" stack-label /></div>
        </div>
        <div class="row">
          <div class="col"><q-input filled v-model="text_ID" readonly type="textarea" label="Caption Text" stack-label /></div>
        </div>    
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row"></div>
    <div class="row q-mt-sm">
      <div class="col-2"></div>
      <div class="col-8 bg-info  items-start">
         <q-btn-toggle
        v-model="radio_advertisement"
        spread
        no-caps
        toggle-color="purple"
        color="white"
        text-color="black"
        :options="[
          {label: 'Advertisement', value: 'T'},
          {label: 'Not Advertisement', value: 'F'}
        ]"
      />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-2"></div>
      <div class="col-8 bg-info  items-start">
        <q-btn-toggle
        v-model="radio_tourism"
        spread
        no-caps
        toggle-color="pink"
        color="white"
        text-color="black"
        :options="[
          {label: 'Tourism', value: 'T'},
          {label: 'Not Tourism', value: 'F'}
        ]"
      />
      </div>
    </div>
    <div class="col-2"></div>
    <div class="row"></div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      text_ID: "00001",
      search: "",
      radio_advertisement: "",
      radio_tourism: "",

    };
  },
};
</script>
