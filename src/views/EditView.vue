<template>
  <div>
    <v-container fluid class="mx-auto" :style="`max-width: ${breakpointVal};`">
      <v-row dense>
        <v-col cols="12">
          <p class="text-h6">Edit Registrant</p>
          <!-- <v-divider /> -->
        </v-col>
        <v-col cols="12">
          <FormFormat
            :id="routeID"
            :loading="loading"
            v-on:submitData="submit"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
import FormFormat from "@/components/Registration Form/FormFormat.vue";
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
export default {
  name: "EditView",
  data: () => ({
    routeID: null,
    loading: false,
  }),
  mixins: [ContainerBreakpoint],
  components: {
    FormFormat,
  },
  methods: {
    async submit(data) {
      try {
        const id = this.$route.params.id;
        this.loading = true;

        // Prepare the data object to be sent in the POST request
        // const collection = {
        //   category: data.category,
        //   passport_number: data.passport_number,
        //   last_name: data.last_name,
        //   first_name: data.first_name,
        //   middle_name: data.middle_name,
        //   suffix: data.suffix,
        //   gender: data.gender,
        //   birthday: format(parseISO(data.birthday), "yyyy-MM-dd"), //MMMM d, yyyy
        //   civil_status: data.civil_status,
        //   contact_number: data.contact_number,
        //   tin_number: data.tin_number,
        //   blood_type: data.blood_type,
        //   emergency_name: data.emergency_name,
        //   emergency_number: data.emergency_number,
        //   address: data.address,
        //   province: data.province,
        //   barangay: data.barangay,
        //   municipality: data.municipality,
        //   region: data.region,
        //   mcg_cares_card: data.mcg_cares_card,
        // };

        const registrantData = {
          ...data,
        };
        delete registrantData.mcg_cares_card;

        // Dispatch the 'addRegistrant' action from the Vuex store
        return this.$store
          .dispatch("registrants/updateRegistrant", {
            id: id,
            data: registrantData,
          })
          .then(
            (this.loading = false),
            this.$router.push({ name: "citizens" }).catch((error) => {
              console.error("Error submitting request", error);
            })
          );
      } catch (error) {
        console.error("Error updating registrant form:", error);
      }
    },
    assignId() {
      const id = this.$route.params.id;
      this.routeID = id.toString();
    },
  },
  created() {
    this.assignId();
  },
};
</script>
