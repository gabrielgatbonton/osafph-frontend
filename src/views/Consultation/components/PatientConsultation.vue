<template>
  <v-card flat outlined>
    <v-card-title class="blue darken-1 white--text"
      ><v-icon dark left>mdi-account</v-icon>Patient Consultation</v-card-title
    >
    <v-container fluid class="py-4">
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
          sm="6"
          v-for="(info, index) in serviceInformation.service"
          :key="index"
        >
          <div class="ma-2">
            <div class="text-subtitle-1 grey--text">
              {{ info.title }}
            </div>
            <div class="text-h5">{{ info.content }}</div>
          </div>
        </v-col>
        <v-col cols="12" class="mt-3">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(info, index) in serviceInformation.address"
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
  name: "PatientConsultation",
  props: ["data"],
  computed: {
    serviceInformation() {
      let serviceable_title = null;
      if (this.data.hospital_service.service_type) {
        serviceable_title =
          this.data.hospital_service.service_type
            .charAt(0)
            .toUpperCase() +
          this.data.hospital_service.service_type
            .slice(1)
            .toLowerCase();
      }
      return {
        service: [
          {
            title: `${serviceable_title} ID`,
            content: this.data.id,
          },
          {
            title: "Status",
            content: this.data.hospital_service.status,
          },
          {
            title: "Service Availed",
            content: this.data.hospital_service.service_type,
          },
          {
            title: "Serviceable Availed",
            content: this.data.specialty.name,
          },
        ],
        address: [
          {
            title: "Remarks",
            content: this.data.hospital_service.remarks,
          },
        ],
      };
    },
  },
};
</script>

<style scoped></style>
