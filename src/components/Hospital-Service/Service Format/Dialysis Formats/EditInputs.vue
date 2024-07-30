<template>
  <v-container fluid class="mx-auto">
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.hospital"
          label="Medical Site"
          :items="medical_sites"
          item-text="name"
          @blur="$v.payload.hospital.$touch()"
          :error-messages="errorMessages.hospital"
          :disabled="disabled"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-autocomplete
          v-model="payload.dialysis_machine"
          label="Dialysis Machine"
          :items="dialysis_machines"
          item-text="name"
          @blur="$v.payload.dialysis_machine.$touch()"
          :error-messages="errorMessages.dialysis_machine"
          :disabled="disabled"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          max-width="290"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          v-model="menu_1"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formattedDate_1"
              v-on="on"
              v-bind="attrs"
              label="Scheduled Date"
              readonly
              @blur="$v.payload.scheduled_date.$touch()"
              :error-messages="errorMessages.scheduled_date"
              :disabled="disabled"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="payload.scheduled_date"
            :min="minDate"
            @input="menu_1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          :items="session_choices"
          label="Schedule Session"
          v-model="payload.scheduled_session"
          @blur="$v.payload.scheduled_session.$touch()"
          :error-messages="errorMessages.scheduled_session"
          :disabled="disabled"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-row v-for="(item, index) in payload.dialysis_packages" :key="index">
          <v-col cols="12" md="6">
            <v-select
              v-model="item.name"
              :items="dialysis_packages"
              item-text="package_name"
              :label="`Dialysis Package ${index + 1}`"
              @blur="
                $v.payload.dialysis_packages.$each.$iter[index].name.$touch()
              "
              :error-messages="errorMessages.dialysis_package_name[index]"
            >
              <template v-slot:item="{ item }">
                <div class="d-flex flex-column justify-start align-start">
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
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="item.funder"
              :items="crowd_fundings"
              item-text="name"
              :label="`Funder ${index + 1}`"
            >
              <template v-slot:item="{ item }" v-if="funderPermission">
                <div class="d-flex flex-column">
                  <div>{{ item.name }}</div>
                  <div class="item-description">
                    Amount: {{ item.contribution_left }} /
                    {{ item.initial_contribution }}
                  </div>
                </div>
              </template></v-autocomplete
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          max-width="290"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          v-model="menu_2"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formattedDate_2"
              v-on="on"
              v-bind="attrs"
              label="Date Released"
              readonly
              @blur="$v.payload.date_released.$touch()"
              :error-messages="errorMessages.date_released"
              :disabled="disabled"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="payload.date_released"
            :min="minDate"
            @input="menu_2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="payload.status"
          label="Status"
          :items="statuses"
          @blur="$v.payload.status.$touch()"
          :error-messages="errorMessages.status"
          :disabled="disabled"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditInputsMixin from "@/mixins/Validation/ServiceRequestValidation/Dialysis Formats/EditInputs";
import { format, parseISO } from "date-fns";
export default {
  name: "EditInputs",
  mixins: [EditInputsMixin],
  props: {
    hospitalService: {
      type: Object,
      required: false,
    },
    medical_sites: {
      type: Array,
      required: true,
    },
    dialysis_machines: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    dialysis_packages: {
      type: Array,
      required: true,
    },
    crowd_fundings: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    payload: {
      status: null,
      scheduled_date: null,
      date_released: null,
      scheduled_session: null,
      hospital: null,
      dialysis_machine: null,
      dialysis_packages: null,
    },
    session_choices: ["MORNING", "NOON", "AFTERNOON"],
    menu_1: false,
    menu_2: false,
    minDate: new Date().toISOString().slice(0, 10),
  }),
  methods: {
    touchValidations() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.pushToParent();
        this.$emit("validationSuccess", true);
        this.$v.$reset();
      }
    },
    resetValidations() {
      this.$v.$reset();
    },
    pushToParent() {
      this.$emit("payload", this.payload);
    },
    checkEditData() {
      if (this.hospitalService) {
        this.payload.hospital = this.hospitalService.data.hospital;
        this.payload.dialysis_machine =
          this.hospitalService.data.dialysis_machine;
        this.payload.scheduled_date = this.hospitalService.data.scheduled_date;
        this.payload.date_released = this.hospitalService.data.date_released;
        this.payload.scheduled_session = this.hospitalService.data.session;
        this.payload.status = this.hospitalService.data.status;
        this.payload.dialysis_packages =
          this.hospitalService.data.dialysis_packages.map((item) => ({
            name: item.name,
            funder: item.funder,
          }));
      }
    },
  },
  computed: {
    userRole: function () {
      return this.$auth.role();
    },
    formattedDate_1() {
      return this.payload.scheduled_date
        ? format(parseISO(this.payload.scheduled_date), "MMMM d, yyyy")
        : null;
    },
    formattedDate_2() {
      return this.payload.date_released
        ? format(parseISO(this.payload.date_released), "MMMM d, yyyy")
        : null;
    },
    statuses() {
      return this.disabled
        ? ["PENDING", "UNATTENDED", "COMPLETED", "IN PROGRESS"]
        : ["PENDING", "UNATTENDED", "COMPLETED"];
    },
    funderPermission() {
      return this.userRole === "ADMIN" || this.userRole === "ROOT";
    },
  },
  watch: {
    hospitalService: {
      handler(newVal) {
        console.log(newVal);
        if (newVal) {
          this.checkEditData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.packages-description {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}

.item-description {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}
</style>
