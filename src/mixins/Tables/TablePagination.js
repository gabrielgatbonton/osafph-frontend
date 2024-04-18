// Import the following about the export default
// import TablePaginationMixin from "@/mixins/Tables/TablePagination"

export default {
  data: () => ({
    searchTimeout: null,
    options: {},
    query_params: {},
    search: "",
  }),
  methods: {
    assignParams(payload) {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          const value = payload[key];
          if (value === null) {
            // if value is null, delete in query_params
            this.$delete(this.query_params, key);
          } else {
            // if property has data, add to query_params
            this.$set(this.query_params, key, value);
          }
        }
      }
      this.$emit("query_params", this.query_params);
    },
  },
  watch: {
    options: {
      deep: true,
      handler(value) {
        if (value.page > 1) {
          this.query_params.page = value.page;
        } else {
          delete this.query_params.page;
        }
        if (value.itemsPerPage) {
          this.query_params.per_page = value.itemsPerPage;
        }
        if (value.sortBy.length === 1 && value.sortDesc.length === 1) {
          this.query_params.sort_by = value.sortBy[0];
          this.query_params.sort_order = value.sortDesc[0] ? "asc" : "desc";
        } else {
          delete this.query_params.sort_by;
          delete this.query_params.sort_order;
        }

        this.$emit("query_params", this.query_params);
      },
    },
    search: {
      deep: true,
      handler(value) {
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
          this.query_params.search = value;
          this.$emit("query_params", this.query_params);
        }, 300);
      },
    },
  },
};
