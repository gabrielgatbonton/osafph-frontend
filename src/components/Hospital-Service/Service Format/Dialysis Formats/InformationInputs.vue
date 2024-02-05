<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.hospital"
          label="Medical Site"
          :items="medical_sites"
          item-text="name"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.dialysis_machine"
          label="Dialysis Machine"
          :items="dialysis_machines"
          item-text="name"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.crowd_funding_backer"
          label="Funding"
          :items="crowd_fundings"
          item-text="backer"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="payload.all_items_sponsored"
          label="Items included are sponsored by Funding"
          @change="pushToParent"
        ></v-checkbox>
        <v-select
          v-model="payload.dialysis_items"
          label="Select Packages to avail"
          :items="dialysis_packages"
          item-text="package_name"
          item-value="package_name"
        >
          <template v-slot:item="{ item }">
            <div id="packages-flex">
              <div>{{ item.package_name }}</div>
              <div class="packages-description">
                <span
                  v-for="(dialysisItem, index) in item.dialysis_items"
                  :key="index"
                >
                  {{ dialysisItem
                  }}{{ index < item.dialysis_items.length - 1 ? ", " : "" }}
                </span>
              </div>
            </div>
          </template>
        </v-select>
      </v-col>
      <!-- multiple and chips ^ -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "InformationInputs",
  props: {
    crowd_fundings: {
      type: Array,
      required: true,
    },
    medical_sites: {
      type: Array,
      required: true,
    },
    dialysis_machines: {
      type: Array,
      required: true,
    },
    dialysis_packages: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    payload: {
      hospital: null,
      dialysis_machine: null,
      crowd_funding_backer: null,
      // dialysis_items = [],
      dialysis_items: null,
      all_items_sponsored: false,
      all_sessions_sponsored: false,
    },
  }),
  methods: {
    pushToParent() {
      this.$emit("payload", this.payload);
    },
  },
};
</script>

<style scoped>
#packages-flex {
  display: flex;
  flex-direction: column;
}
.packages-description {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}
</style>
