<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-10"></div>
      <div class="col-2">
        <q-input
          standout
          v-model="login.userLogin"
          label="User login"
          readonly
        />
      </div>
    </div>

    <div class="row q-pa-sm">
      <div class="col-5">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.progressDone"
          color="green"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'Complete : ' + linear.countByDone"
            /> 
          </div>
        </q-linear-progress>
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.progressAds"
          color="purple"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'Ads : ' + linear.counetAds"
            />
          </div>
        </q-linear-progress>
      </div>
    </div>
    <!-- // -->
    <div class="row q-pa-sm">
      <div class="col-5">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.countAllData"
          color="blue"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'All Data : ' + linear.countAllData"
            />
          </div>
        </q-linear-progress>
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <q-linear-progress
          dark
          stripe
          rounded
          size="30px"
          :value="linear.progressTourist"
          color="pink"
          class="row q-mt-sm"
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="dark"
              :label="'Tourist : ' + linear.countTourist"
            />
          </div>
        </q-linear-progress>
      </div>
      <div class="col-1">
        <q-btn color="green-6" label="Reload" @click="init" />
      </div>
    </div>

    <div class="row q-pa-sm"></div>
    <!-- All User -->
    <div class="q-pa-md">
      <q-table
        title="User"
        :data="data_all"
        :columns="columns_data_all"
        row-key="userID"
      ></q-table>
    </div>

    <!-- User Done -->
    <div class="q-pa-md">
      <q-table
        title="Detail by User"
        :data="data_by_user"
        :columns="columns_data_by_user"
        row-key="userID"
      ></q-table>
    </div>

  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { QSpinnerFacebook } from "quasar";

export default {
  name: "PageIndex",
  computed: {
    ...mapGetters({
      user_login: "user_login/user_login",
    }),
  },
  data() {
    return {
      login: {
        userLogin: null,
      },
      linear: {
        countAllData: null,
        countByDone: null,
        progressDone: null,

        counetAds: null,
        countTourist: null,
        progressAds: null,
        progressTourist: null,
      },
      report: {
        all: null,
        byUser: null,
      },
      timer: 0,

      columns_data_all: [
        {
          name: "userID",
          required: true,
          label: "User Name",
          align: "left",
          field: (row) => row.userID,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "count",
          align: "center",
          label: "Count",
          field: "count",
          sortable: true,
        },
      ],
      data_all: [
        {
          userID: "korawit.p@gmail.com",
          count: 5,
        },
        {
          userID: "korawit.p@phuket.psu.ac.th",
          count: 24,
        },
      ],

      columns_data_by_user: [
        {
          name: "shortcode",
          required: true,
          label: "shortcode",
          align: "left",
          field: (row) => row.shortcode,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "ads",
          align: "center",
          label: "ads",
          field: "ads",
          sortable: true,
        },
        {
          name: "tourist",
          align: "center",
          label: "tourist",
          field: "tourist",
          sortable: true,
        },
        {
          name: "userID",
          align: "center",
          label: "userID",
          field: "userID",
          sortable: true,
        },
      ],
      data_by_user: [
        {
          shortcode: "BvkUlOtA8iD",
          ads: true,
          tourist: false,
          userID: "korawit.p@gmail.com",
        },
        {
          shortcode: "ASkUlOtA8iD",
          ads: true,
          tourist: false,
          userID: "korawit.p@gmail.com",
        },
        
      ],


    };
  },

  async mounted() {
    this.login.userLogin = this.user_login;
    console.log("User Login : ", this.login.userLogin);
    this.init();
  },
  methods: {
    async init() {
      this.showLoading();
      await this.getHelpClassificationCount();
      await this.getHelpClassificationCountByDone();
      await this.getHelpClassificationCountAds();
      await this.getHelpClassificationCountTourist();
      await this.progressLabel();
      console.log("countAllData : " + this.linear.countAllData);
      console.log("countByDone : " + this.linear.countByDone);
      console.log("countAds : " + this.linear.counetAds);
      console.log("countTourist : " + this.linear.countTourist);
      await this.getHelpReportAll();
      console.log(this.report.all);
      // onClick
      await this.onDetail()
      


      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 500);
    },

    async progressLabel() {
      this.linear.progressDone =
        this.linear.countByDone / this.linear.countAllData;
      this.linear.progressAds = this.linear.counetAds / this.linear.countByDone;
      this.linear.progressTourist =
        this.linear.countTourist / this.linear.countByDone;
    },

    // >> Classification
    async getHelpClassificationCount() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/Count"
        );
        this.linear.countAllData = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpClassificationCountByDone() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/CountByDone"
        );
        this.linear.countByDone = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpClassificationCountAds() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/CountAds"
        );
        this.linear.counetAds = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpClassificationCountTourist() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/CountTourist"
        );
        this.linear.countTourist = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    // >> Report
    async getHelpReportAll() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpReport"
        );
        this.report.all = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async getHelpReportByUser() {
      try {
        const response = await this.$axios.get(
          "https://insightapi-myzemjarqq-as.a.run.app/api/HelpClassification/DetailByUser/" + "korawit.p@gmail.com"
        );
        this.report.byUser = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    // >> Button
    onLogout() {
      console.log("Logout");
      this.$auth
        .signOut()
        .then(() => {
          this.$router.push({ name: "signin", params: { nextUrl: "/home" } });
        })
        .catch((error) => {
          // An error happened.
        });
    },
    
    async onDetail(){
      console.log("Detail");
      await this.getHelpReportByUser();
      console.log(this.report.byUser);
    },
    
    // >> Loading
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "yellow",
        spinnerSize: 140,
        backgroundColor: "blue-8",
      });
    },
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
body {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 254, 234, 1) 0%,
    rgba(255, 254, 234, 1) 35%,
    #b7e8eb 100%
  );
  overflow: hidden;
}
</style>
