<template>
  <q-page class="bg-secondary">
    <div class="row q-pa-sm">
      <div class="col-3">
        <q-input standout v-model="text" readonly />
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <q-input v-model="search" standout type="search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-2 text-center">Previous</div>
      <div class="col-8 text-center">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" native-context-menu>
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
      <div class="col-2 text-center">Next</div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-2"></div>
      <div class="col-8 bg-info  items-start">
        <div class="row">
          <div class="col"><q-input filled v-model="text" label="Shortcode" stack-label /></div>
          <div class="col"><q-input filled v-model="text" label="Location ID" stack-label /></div>
        </div>

         <div class="row">
          <div class="col"><q-input filled v-model="text" label="Username" stack-label /></div>
          <div class="col"><q-input filled v-model="text" label="Location Name" stack-label /></div>
        </div>
        <div class="row">
          <div class="col"><q-input filled v-model="text" type="textarea" label="Caption Text" stack-label /></div>
        </div>
                
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row"></div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      text: "00001",
      search: "",
    };
  },
};
</script>
