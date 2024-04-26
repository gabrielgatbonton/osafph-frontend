<template>
  <div class="background">
    <v-container fluid class="mx-auto" style="max-width: 85vw" v-if="dashData">
      <p class="text-h6">Dashboard</p>
      <v-divider />

      <!-- Registrations and hospital services created numeric data -->
      <v-row class="mt-2">
        <v-col cols="12">
          <v-card rounded class="gradient-background rounded-card pa-4">
            <v-row>
              <v-col
                v-for="(item, index) in dashboardValues.registrations"
                :key="index"
                cols="12"
                md="4"
              >
                <div
                  :class="{
                    'bordered-card':
                      item.title.toLowerCase() !== 'total registrations',
                  }"
                >
                  <v-card flat color="transparent">
                    <div class="d-flex justify-space-between px-4">
                      <v-card-subtitle
                        class="text-overline font-weight-bold white--text px-0"
                      >
                        {{ item.title.toUpperCase() }}
                      </v-card-subtitle>
                      <v-icon
                        size="28"
                        color="white"
                        :class="{
                          'd-none':
                            item.title.toLowerCase() === 'total registrations',
                        }"
                        >{{ item.icon }}</v-icon
                      >
                    </div>
                    <v-card-title
                      class="text-h5 white--text font-weight-bold pt-0"
                      >{{ item.value }}</v-card-title
                    >
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- <v-col
          cols="12"
          md="4"
          v-for="(item, index) in dashboardValues.registrations"
          :key="index"
        >
          <v-card class="pa-6" rounded="lg">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">{{ item.title }}</div>
              <div
                class="card-icon blue lighten-5 d-flex justify-center align-center"
              >
                <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
              </div>
            </div>
            <div
              class="card-number"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
            >
              {{ item.value }}
            </div>
          </v-card>
        </v-col> -->

        <!-- Sex, Vaccination, and Citizens' location numeric data -->
        <v-col
          cols="12"
          md="4"
          v-for="(item, index) in dashboardValues.sexVacLoc"
          :key="'sexVacLoc' + index"
        >
          <v-card outlined class="pa-0 bordered-card colored-border">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex align-center px-4">
                <p class="text-subtitle-2 font-weight-bold pa-0 my-2">
                  {{ item.title.toUpperCase() }}
                </p>
              </v-col>
              <v-col cols="12">
                <v-progress-linear
                  height="2"
                  :value="
                    Math.floor(
                      (item.values[0]?.value /
                        (item.values[0]?.value + item.values[1]?.value)) *
                        100
                    )
                  "
                  color="red darken-3"
                ></v-progress-linear>
              </v-col>
              <v-col
                v-for="(indivItem, index) in item.values"
                :key="'uniqServ' + index"
              >
                <v-card
                  flat
                  class="no-rounded-corners d-flex flex-column align-center justify-center"
                >
                  <v-card-title class="text-h5 font-weight-bold mb-1">{{
                    indivItem.value
                  }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1">{{
                    indivItem.title
                  }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Unique services numeric data -->
        <v-col cols="12">
          <v-card outlined class="pa-0 bordered-card colored-border">
            <v-row
              no-gutters
              v-for="(item, index) in dashboardValues.unique_services"
              :key="'uniqServ' + index"
            >
              <v-col cols="12" class="d-flex align-center">
                <v-card
                  flat
                  class="card-light-bgColor reversed-shaped-card px-4 d-flex"
                >
                  <v-icon size="20" color="white">{{ item.icon }}</v-icon>
                  <p
                    class="text-subtitle-2 white--text font-weight-bold pa-0 my-2 ml-2"
                  >
                    {{ item.title.toUpperCase() }}
                  </p>
                </v-card>
              </v-col>
              <v-col
                v-for="(indivItem, index) in item.values"
                :key="'uniqServ' + index"
              >
                <v-card
                  flat
                  class="no-rounded-corners d-flex flex-column align-center justify-center"
                >
                  <v-card-title class="text-h5 font-weight-bold mb-1">{{
                    indivItem.value
                  }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-1">{{
                    indivItem.title
                  }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- <v-col
          cols="12"
          md="4"
          v-for="(item, index) in dashboardValues.sexVacLoc"
          :key="'sexVacLoc' + index"
        >
          <v-card class="pa-6" rounded="lg">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">{{ item.title }}</div>
              <div
                class="card-icon blue lighten-5 d-flex justify-center align-center"
              >
                <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
              </div>
            </div>
            <div
              class="d-flex"
              :class="{
                'mt-5 flex-row justify-space-around align-center':
                  !$vuetify.breakpoint.xs,
                'mt-3 flex-column justify-center align-center':
                  $vuetify.breakpoint.xs,
              }"
            >
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
                v-for="(indivItem, index) in item.values"
                :key="'indivSexVacLoc' + index"
              >
                <div class="card-number">
                  {{ indivItem.value }}
                </div>
                <div>{{ indivItem.title }}</div>
              </div>
            </div>
          </v-card>
        </v-col> -->
        <!-- <v-col
          cols="12"
          v-for="(item, index) in dashboardValues.unique_services"
          :key="'uniqServ' + index"
        >
          <v-card class="pa-6" rounded="lg">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">{{ item.title }}</div>
              <div
                class="card-icon blue lighten-5 d-flex justify-center align-center"
              >
                <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
              </div>
            </div>
            <div
              class="d-flex"
              :class="{
                'mt-5 flex-row justify-space-around align-center':
                  !$vuetify.breakpoint.xs,
                'mt-3 flex-column justify-center align-center':
                  $vuetify.breakpoint.xs,
              }"
            >
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
                v-for="(indivItem, index) in item.values"
                :key="'indivSer' + index"
              >
                <div class="card-number">
                  {{ indivItem.value }}
                </div>
                <div>{{ indivItem.title }}</div>
              </div>
            </div>
          </v-card>
        </v-col> -->
      </v-row>
      <v-row v-if="userRole === `ROOT` && dashRoot">
        <RootContent @query_params="updateFetch" :data="dashboardRootValues" />
      </v-row>
      <v-row v-if="userRole === `ADMIN` && dashRoot">
        <AdminContent @query_params="updateFetch" :data="dashboardRootValues" />
      </v-row>
      <!-- <v-row v-if="userRole === `ENCODER` && dashRoot">
        <EncoderContent :data="dashboardRootValues" />
      </v-row> -->
      <v-row v-if="userRole === `DOCTOR` && dashRoot">
        <DoctorContent :data="dashboardRootValues" />
      </v-row>
    </v-container>
    <div v-else class="pa-6">
      <v-skeleton-loader type="card, table"></v-skeleton-loader>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import RootContent from "@/components/Dashboard/RootContent.vue";
import AdminContent from "@/components/Dashboard/AdminContent.vue";
import DoctorContent from "@/components/Dashboard/DoctorContent.vue";
// import EncoderContent from "@/components/Dashboard/EncoderContent.vue";
export default {
  name: "DashboardView",
  components: {
    RootContent,
    AdminContent,
    DoctorContent,
    // EncoderContent,
  },
  methods: {
    ...mapActions("dashboard", ["getDashboardData", "getRootData"]),
    formattedTitle(value) {
      // Capitalize the first character of each word and replace underscores with spaces
      const formattedTitle = value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return formattedTitle;
    },
    updateFetch(query) {
      this.getRootData(query).catch((error) => {
        console.error("Error updating fetch: ", error);
      });
    },
    routeEvents() {
      const channel = this.$pusher.subscribe("dashboard-notifications");

    
        channel.bind("notification.created", () => {
          this.getDashboardData();
          this.getRootData();
        });
      
    },
  },
  computed: {
    ...mapState("dashboard", {
      dashData: "dashboard_data",
      dashRoot: "dashboard_root_data",
    }),
    ...mapGetters("login", ["userRole"]),
    dashboardValues() {
      let registrations = [];
      let sexVacLoc = [];
      let unique_services = [];
      Object.keys(this.dashData).forEach((item) => {
        const citizens = this.dashData[item];

        Object.keys(citizens).forEach((itemers) => {
          if (itemers.includes("total_registrations_today")) {
            registrations.push({
              title: this.formattedTitle(itemers),
              value: citizens[itemers],
              icon: "mdi-account-multiple-plus-outline",
            });
          } else if (itemers.includes("total_registrations")) {
            registrations.push({
              title: this.formattedTitle(itemers),
              value: citizens[itemers],
              icon: "mdi-account-group-outline",
            });
          }
          if (itemers.includes("created_today")) {
            registrations.push({
              title: `Hospital Services ${this.formattedTitle(itemers)}`,
              value: citizens[itemers],
              icon: "mdi-cog-outline",
            });
          }
          if (itemers.includes("registered")) {
            sexVacLoc.push({
              title: "Sex",
              values: [
                { title: "Male", value: citizens[itemers]["male"] },
                { title: "Female", value: citizens[itemers]["female"] },
              ],
              icon: "mdi-account-multiple-outline",
            });
          }
          if (itemers.includes("vaccinated")) {
            sexVacLoc.push({
              title: "Vaccination",
              values: [
                {
                  title: "Fully Vaccinated",
                  value: citizens[itemers]["fully"],
                },
                { title: "Not Vaccinated", value: citizens[itemers]["not"] },
              ],
              icon: "mdi-needle",
            });
          }
          if (itemers.includes("cities")) {
            sexVacLoc.push({
              title: "Citizens Location",
              values: [
                {
                  title: "Mabalacat",
                  value: citizens[itemers]["mabalacat"],
                },
                {
                  title: "Non-Mabalacat",
                  value: citizens[itemers]["non_mabalacat"],
                },
              ],
              icon: "mdi-map-outline",
            });
          }
          if (itemers.includes("unique_services")) {
            unique_services.push({
              title: "Unique Citizens Services",
              values: [
                {
                  title: "Consultations",
                  value: citizens[itemers]["consultation"],
                },
                {
                  title: "Diagnostics",
                  value: citizens[itemers]["diagnostic"],
                },
                {
                  title: "Dialysis",
                  value: citizens[itemers]["dialysis"],
                },
                {
                  title: "Laboratories",
                  value: citizens[itemers]["laboratory"],
                },
              ],
              icon: "mdi-widgets-outline",
            });
          }
        });
      });
      return {
        registrations: registrations,
        sexVacLoc: sexVacLoc,
        unique_services: unique_services,
      };
    },

    dashboardRootValues() {
      let encoder = [];
      let doctor = [];
      let packages = [];
      let tableContent = [];

      Object.keys(this.dashRoot).forEach((data) => {
        if (data.includes("doctor")) {
          doctor.push({
            title: this.formattedTitle(data),
            icon: "mdi-doctor",
            values: [
              {
                title: "Specialty",
                value: this.dashRoot[data]["specialty"],
              },
              {
                title: "Pending Patients Today",
                value: this.dashRoot[data]["pending_patients_today"],
              },
              {
                title: "Total Pending Patients",
                value: this.dashRoot[data]["pending_patients_overall"],
              },
              {
                title: "Completed Patients",
                value: this.dashRoot[data]["completed_services"],
              },
            ],
          });
        }

        const root = this.dashRoot[data];
        Object.keys(root).forEach((indata) => {
          if (indata.includes("encoder")) {
            encoder.push({
              title: this.formattedTitle(indata),
              icon: "mdi-desktop-classic",
              value: root[indata],
            });
          }
          if (indata.includes("package_counts")) {
            root[indata].forEach((package_data) => {
              packages.push({
                package: package_data["name"],
                count: package_data["count"],
              });
            });
            packages.push({
              title: "Packages Availed",
              icon: "mdi-package",
            });
          }

          tableContent = this.dashRoot.admin.crowd_funding;
          // const admin = root[indata];
          // Object.keys(admin).forEach((adminDatas) => {
          //   if (adminDatas.includes("data")) {
          //     admin[adminDatas].forEach((adminData) => {
          //       tableContent.push({
          //         name: adminData["name"],
          //         total_amount: adminData["initial_contribution"],
          //         date: adminData["created_at"],
          //         rem_amount: adminData["contribution_left"],
          //         office: adminData["office"],
          //         type: adminData["type"],
          //       });
          //     });
          //   }
          // });
        });
      });

      return {
        tableContent: tableContent,
        encoder: encoder,
        doctor: doctor,
        packages: packages,
      };
    },
  },
  created() {
    this.getDashboardData();
    this.getRootData();
    this.routeEvents();
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
  font-weight: bold;
}
.card-number {
  font-size: 2rem;
  font-weight: bold;
}
.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10%;
}
.background {
  background: #ffffff;
  height: 100%;
}
.gradient-background {
  background-image: linear-gradient(to right, #a40e32, #db4a41);
  color: white;
}
.bordered-card {
  border-radius: 10px;
  border: 1px solid whitesmoke;
  overflow: hidden;
}
.colored-border {
  border: 1px solid #ffd1d1;
}
.rounded-card {
  border-radius: 12px !important;
}
.no-rounded-corners {
  border-radius: 0 !important;
}
.card-dark-bgColor {
  background-color: #a40e32;
}
.card-light-bgColor {
  background-color: #ff4949;
}
.reversed-shaped-card {
  border-top-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
</style>
