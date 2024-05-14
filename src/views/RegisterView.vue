<template>
  <div>
    <v-container fluid :style="`max-width: ${breakpointVal};`">
      <v-row dense>
        <v-col cols="auto">
          <p class="title">New Registrant</p>
        </v-col>
        <v-col cols="12">
          <FormFormat v-on:submitData="submit" :loading="loading" />
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
import { mapActions } from "vuex";
export default {
  name: "RegisterView",
  data: () => ({
    loading: false,
  }),
  mixins: [ContainerBreakpoint],
  components: {
    FormFormat,
  },
  methods: {
    ...mapActions("registrants", ["addRegistrant"]),
    async submit(data) {
      try {
        this.loading = true;

        // // Prepare the data object to be sent in the POST request
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
        //   mcg_cares_card: "UNCLAIMED",
        // };
        const registrantData = {
          ...data,
          mcg_cares_card: "UNCLAIMED",
        };

        // Dispatch the 'addRegistrant' action from the Vuex store
        return this.$store
          .dispatch("registrants/addRegistrant", registrantData)
          .then(this.$router.push({ name: "citizens" }))
          .catch((error) => {
            console.error("Error dispatching registrant: ", error);
          })
          .finally(() => {
            this.loading = false;
          });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script>
