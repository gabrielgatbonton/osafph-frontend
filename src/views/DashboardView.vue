<template>
  <div class="background">
    <v-container fluid class="mx-auto" style="max-width: 85vw" v-if="dashData">
      <v-row class="mt-2">
        <v-col cols="12" md="4">
          <v-card class="pa-6">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Total Registrations</div>
              <div class="card-icon d-flex justify-center align-center">
                <v-icon size="28" color="primary">mdi-account</v-icon>
              </div>
            </div>
            <div
              class="card-number"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
            >
              {{ dashData.citizens.total_registrations }}
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Total Registrations Today</div>
              <div class="card-icon d-flex justify-center align-center">
                <v-icon size="28" color="primary">mdi-account</v-icon>
              </div>
            </div>
            <div
              class="card-number"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
            >
              {{ dashData.citizens.total_registrations_today }}
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Hospital Services Created Today</div>
              <div class="card-icon d-flex justify-center align-center">
                <v-icon size="28" color="primary">mdi-account</v-icon>
              </div>
            </div>
            <div
              class="card-number"
              :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
            >
              {{ dashData.hospital_services.created_today }}
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Sex</div>
              <div class="card-icon d-flex justify-center align-center">
                <v-icon size="28" color="primary">mdi-account</v-icon>
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
              >
                <div class="card-number">
                  {{ dashData.citizens.registered.male }}
                </div>
                <div>Male</div>
              </div>
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              >
                <div class="card-number">
                  {{ dashData.citizens.registered.female }}
                </div>
                <div>Female</div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Vaccination</div>
              <div class="card-icon d-flex justify-center align-center">
                <v-icon size="28" color="primary">mdi-account</v-icon>
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
              >
                <div class="card-number">
                  {{ dashData.citizens.vaccinated.fully }}
                </div>
                <div>Fully Vaccinated</div>
              </div>
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              >
                <div class="card-number">
                  {{ dashData.citizens.vaccinated.not }}
                </div>
                <div>Not Vaccinated</div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="pa-6">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Citizens Location</div>
              <div class="card-icon d-flex justify-center align-center">
                <v-icon size="28" color="primary">mdi-account</v-icon>
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
              >
                <div class="card-number">
                  {{ dashData.citizens.cities.mabalacat }}
                </div>
                <div>Mabalacat</div>
              </div>
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              >
                <div class="card-number">
                  {{ dashData.citizens.cities.non_mabalacat }}
                </div>
                <div>Non-Mabalacat</div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-6">
            <div class="d-flex justify-space-between align-center">
              <div class="card-title">Unique Citizens Services</div>
              <div class="card-icon d-flex justify-center align-center">
                <v-icon size="28" color="primary">mdi-account</v-icon>
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
              >
                <div class="card-number">
                  {{ dashData.citizens.unique_services.consultation }}
                </div>
                <div>Consultations</div>
              </div>
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              >
                <div class="card-number">
                  {{ dashData.citizens.unique_services.diagnostic }}
                </div>
                <div>Diagnostics</div>
              </div>
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              >
                <div class="card-number">
                  {{ dashData.citizens.unique_services.dialysis }}
                </div>
                <div>Dialysis</div>
              </div>
              <div
                class="d-flex flex-column align-center"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-0'"
              >
                <div class="card-number">
                  {{ dashData.citizens.unique_services.laboratory }}
                </div>
                <div>Laboratories</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DashboardView",
  methods: {
    ...mapActions("dashboard", ["getDashboardData"]),
  },
  computed: {
    ...mapState("dashboard", {
      dashData: "dashboard_data",
    }),
  },
  watch: {
    dashData: {
      handler(value) {
        console.log(value);
      },
    },
  },
  created() {
    this.getDashboardData();
  },
};
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.card-number {
  font-size: 2rem;
  font-weight: bold;
}
.card-icon {
  width: 50px;
  height: 50px;
}
.background {
  background: #f4f4f4;
  height: 100%;
}
</style>
