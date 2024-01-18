<template>
  <v-card>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left>mdi-medical-bag</v-icon
      >{{ hospitalServiceTitle }}</v-card-title
    >
    <v-container fluid class="py-4">
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
          sm="6"
          v-for="(info, index) in serviceInformation"
          :key="index"
        >
          <div class="ma-2">
            <div class="text-subtitle-2 grey--text">
              {{ info.title }}
            </div>
            <div class="text-h5">{{ info.content }}</div>
          </div>
        </v-col>
        <v-col
          cols="12"
          class="mt-3"
          v-if="data.hospitalService.service_type === 'DIALYSIS'"
        >
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                class="text-subtitle-1 font-weight-bold"
              >
                Items Availed
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="6"
                      v-for="(item, index) in expansionItemsAvailed"
                      :key="index"
                    >
                      <ul>
                        <li>{{ item }}</li>
                      </ul>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="12" class="mt-3">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(info, index) in expansionRemarks"
              :key="index"
            >
              <v-expansion-panel-header>
                <div class="text-subtitle-1 font-weight-bold">
                  {{ info.title }}
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ info.content }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PatientHospitalService",
  props: ["data"],
  computed: {
    hospitalServiceTitle() {
      let title = null;
      if (this.data.hospitalService.service_type !== "DIALYSIS") {
        title = "Hospital Service Information";
      } else {
        title = "Patient Dialysis";
      }
      return title;
    },
    serviceInformation() {
      let data = null;
      if (this.data.hospitalService.service_type !== "DIALYSIS") {
        data = [
          {
            title: "Service ID",
            content: this.data.hospitalService.id,
          },
          {
            title: "Health Professional",
            content: `${this.data.hospitalService.doctor_last_name}, ${this.data.hospitalService.doctor_first_name} ${this.data.hospitalService.doctor_middle_name}`,
          },
          {
            title: "Service Availed",
            content: this.data.hospitalService.service_type,
          },
          {
            title: "Serviceable Availed",
            content: this.data.hospitalService.serviceable_type_name,
          },
        ];
      } else {
        data = [
          {
            title: "Dialysis ID",
            content: this.data.hospitalService.id,
          },
          {
            title: "Session",
            content: this.data.hospitalService.session,
          },
          {
            title: "Service Availed",
            content: this.data.hospitalService.service_type,
          },
          {
            title: "Dialysis Machine",
            content: this.data.hospitalService.dialysis_machine.name,
          },
          {
            title: "Cost of Service",
            content: `PHP ${
              this.data.hospitalService.service_fee
                ? this.data.hospitalService.service_fee
                : "XXXX"
            }`,
          },
        ];
      }
      return data;
    },
    expansionRemarks() {
      return [
        {
          title: "Remarks",
          content: this.data.hospitalService.remarks
            ? this.data.hospitalService.remarks
            : "None",
        },
      ];
    },
    expansionItemsAvailed() {
      return this.data.hospitalService.dialysis_items
        ? this.data.hospitalService.dialysis_items
        : "None";
    },
  },
};
</script>

<style scoped></style>
