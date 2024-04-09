<template>
  <div class="background">
    <v-container fluid class="mx-auto" style="max-width: 85vw" v-if="dashData">
      <v-row class="mt-2">
        <v-col
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
        </v-col>
        <v-col
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
        </v-col>
        <v-col
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
        </v-col>
      </v-row>
      <v-row v-if="userRole === `ROOT` && dashRoot">
        <v-col
          cols="12"
          md="6"
          v-for="(item, index) in dashboardRootValues.encoder"
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
              class="card-number mb-6"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
            >
              {{ item.value }}
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
          v-for="(item, index) in dashboardRootValues.doctor"
          :key="'doctor' + index"
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
                v-for="(indivDoc, index) in item.values"
                :key="'indivdoctor' + index"
              >
                <div class="card-number">
                  {{ indivDoc.value }}
                </div>
                <div>{{ indivDoc.title }}</div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-6" rounded="lg">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Funding</div>
              <div
                class="card-icon blue lighten-5 d-flex justify-center align-center"
              >
                <v-icon size="28" color="primary">mdi-cash-multiple</v-icon>
              </div>
            </div>
            <template>
              <div>
                <v-data-table
                  :headers="headers"
                  :items="dashboardRootValues.tableContent"
                  item-key="name"
                  class="elevation-0"
                  :search="search"
                  :loading="loading"
                  loading-text="Loading... Please wait"
                >
                  <template v-slot:top>
                    <v-text-field
                      v-model="search"
                      label="Search"
                      class="mx-4"
                      prepend-icon="mdi-magnify"
                    >
                    </v-text-field>
                  </template>
                </v-data-table>
              </div>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="userRole === `ADMIN` && dashRoot">
        <v-col cols="12">
          <v-card class="pa-6" rounded="lg">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Packages Availed</div>
              <div
                class="card-icon blue lighten-5 d-flex justify-center align-center"
              >
                <v-icon size="28" color="primary">mdi-package</v-icon>
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
                v-for="(packages, index) in dashboardRootValues.packages"
                :key="'indivpackage' + index"
              >
                <div class="card-number">
                  {{ packages.count }}
                </div>
                <div>{{ packages.package }}</div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-6" rounded="lg">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Funding</div>
              <div
                class="card-icon blue lighten-5 d-flex justify-center align-center"
              >
                <v-icon size="28" color="primary">mdi-cash-multiple</v-icon>
              </div>
            </div>
            <template>
              <div class="pa-0">
                <v-data-table
                  :headers="headers"
                  :items="dashboardRootValues.tableContent"
                  item-key="name"
                  class="elevation-0"
                  :search="search"
                  :loading="loading"
                  loading-text="Loading... Please wait"
                >
                  <template v-slot:top>
                    <v-text-field
                      v-model="search"
                      label="Search"
                      class="mx-4"
                      prepend-icon="mdi-magnify"
                    >
                    </v-text-field>
                  </template>
                </v-data-table>
              </div>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="userRole === `ENCODER` && dashRoot">
        <v-col
          cols="12"
          v-for="(item, index) in dashboardRootValues.encoder"
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
        </v-col>
      </v-row>
      <v-row v-if="userRole === `DOCTOR` && dashRoot">
        <v-col
          cols="12"
          v-for="(item, index) in dashboardRootValues.doctor"
          :key="'doctor' + index"
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
                v-for="(indivDoc, index) in item.values"
                :key="'indivdoctor' + index"
              >
                <div class="card-number">
                  {{ indivDoc.value }}
                </div>
                <div>{{ indivDoc.title }}</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "DashboardView",
  data: () => ({
    search: "",
    loading: true,
  }),
  methods: {
    ...mapActions("dashboard", ["getDashboardData", "getRootData"]),
    formattedTitle(value) {
      // Capitalize the first character of each word and replace underscores with spaces
      const formattedTitle = value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return formattedTitle;
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
                title: "Pending Patients",
                value: this.dashRoot[data]["pending_patients"],
              },
              {
                title: "Completed Patients",
                value: this.dashRoot[data]["completed_patients"],
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

          const admin = root[indata];
          Object.keys(admin).forEach((adminDatas) => {
            if (adminDatas.includes("data")) {
              admin[adminDatas].forEach((adminData) => {
                tableContent.push({
                  name: adminData["name"],
                  total_amount: adminData["contribution"],
                  date: adminData["created_at"],
                  rem_amount: adminData["contribution_left"]
                });
              });
            }
          });
        });
      });

      return {
        tableContent: tableContent,
        encoder: encoder,
        doctor: doctor,
        packages: packages,
      };
    },

    headers() {
      return [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Total Contribution",
          value: "total_amount",
        },
        {
          text: "Date",
          value: "date",
        },
        {
          text: "Remaining Amount",
          value: "rem_amount",
        }
      ];
    },
  },

  created() {
    this.getDashboardData();
    this.getRootData();
  },

  watch: {
    dashboardRootValues:{
      handler(value) {
        console.log("Root", value)
      }
    },
    dashRoot: {
      handler(value) {
        this.loading = true;
        if (value.length === 0) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
        }
      },
    },
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
  background: #f4f4f4;
  height: 100%;
}
</style>
