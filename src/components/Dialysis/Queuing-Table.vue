<template>
  <v-data-table
    :headers="headers"
    :items="queueData"
    item-key="name"
    class="elevation-0"
    :loading="loading"
    loading-text="Loading... Please wait"
    calculate-widths
  >
    <template v-slot:top>
      <v-toolbar
        flat
        color="blue darken-1"
        dark
        :rounded="dialog ? false : 'lg'"
      >
        <v-toolbar-title :class="{ header_size: !$vuetify.breakpoint.xs }"
          >Dialysis Queuing, {{ formattedDate }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn
          v-if="dialog !== true && !$vuetify.breakpoint.xs"
          dark
          color="blue darken-4"
          @click="fullScreenEnable"
          >Full Screen</v-btn
        >
        <v-btn
          v-else-if="dialog !== true && $vuetify.breakpoint.xs"
          icon
          dark
          @click="fullScreenEnable"
          ><v-icon>mdi-arrow-expand-all</v-icon></v-btn
        >
        <v-btn v-else icon dark @click="fullScreenEnable"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }" v-if="!$vuetify.breakpoint.xs">
      <tr>
        <td class="py-5">
          <div :class="`${item_class}`">{{ item.dialysis_machine }}</div>
        </td>
        <td class="py-5">
          <div
            :class="`${machineStatusColor(item.morning_name)} ${item_class}`"
          >
            {{ item.morning_name }}
          </div>
        </td>
        <td class="py-5">
          <div :class="`${machineStatusColor(item.noon_name)} ${item_class}`">
            {{ item.noon_name }}
          </div>
        </td>
        <td class="py-5">
          <div
            :class="`${machineStatusColor(item.afternoon_name)} ${item_class}`"
          >
            {{ item.afternoon_name }}
          </div>
        </td>
      </tr>
    </template>
    <template v-for="h in headers" v-slot:[`header.${h.value}`]="{ header }">
      <div
        :class="`d-inline-block py-5 ${header_class}`"
        :key="h.text"
        v-if="!$vuetify.breakpoint.xs"
      >
        {{ header.text }}
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { parseISO, format } from "date-fns";
export default {
  name: "Queuing-Table",
  props: ["queue_data", "dialogResponse"],
  data: () => ({
    dialog: false,
    loading: true,
    item_class: "item_size font-weight-regular",
    header_class: "header_size font-weight-bold",
  }),
  methods: {
    machineStatusColor(status) {
      if (status === "Machine Available") return "green--text";
      return "";
    },
    fullScreenEnable() {
      this.dialog = !this.dialog;
      this.$emit("dialog", this.dialog);
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "DIALYSIS MACHINE",
          value: "dialysis_machine",
          sortable: false,
        },
        {
          text: "MORNING",
          value: "morning_name",
          sortable: false,
        },
        {
          text: "NOON",
          value: "noon_name",
          sortable: false,
        },
        {
          text: "AFTERNOON",
          value: "afternoon_name",
          sortable: false,
        },
      ];
    },
    queueData() {
      return this.queue_data
        ? this.queue_data.data.map((item) => ({
            dialysis_machine: item.dialysis_machine,
            morning_name: item.morning ? item.morning : "Machine Available",
            afternoon_name: item.afternoon
              ? item.afternoon
              : "Machine Available",
            noon_name: item.noon ? item.noon : "Machine Available",
          }))
        : [];
    },
    formattedDate() {
      return this.queue_data
        ? format(parseISO(this.queue_data.date), "MMMM d, yyyy")
        : null;
    },
  },
  watch: {
    queue_data: {
      immediate: true,
      handler(value) {
        this.loading = true;
        if (!value.data && !value.data.length) {
          setTimeout(() => {
            this.loading = false;
          }, 5000);
        } else {
          this.loading = false;
        }
      },
    },
    dialogResponse: {
      immediate: true,
      handler(value) {
        this.dialog = value;
      },
    },
  },
};
</script>

<style scoped>
.header_size {
  font-size: 2vw;
}
.item_size {
  font-size: 1.5vw;
}
</style>
