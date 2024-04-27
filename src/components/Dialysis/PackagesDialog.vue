<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template
        v-slot:activator="{ on, attrs }"
        v-if="userRole === 'DIALYSIS_ENCODER'"
      >
        <v-btn v-bind="attrs" v-on="on" dark icon>
          <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="primary pb-4 white--text"
          ><v-icon dark left>mdi-pencil</v-icon>Edit Inputs</v-card-title
        >
        <v-container class="pa-8 mx-auto overflow-scroll">
          <v-row
            v-for="(set, index) in payload.dialysis_packages"
            :key="index"
          >
            <v-col cols="12" md="6" sm="6">
              <div>
                <v-select
                  v-model="set.name"
                  :label="`Dialysis Package ${index + 1}`"
                  :items="packages_enum"
                  item-text="package_name"
                  item-value="package_name"
                  @blur="
                    $v.payload.dialysis_packages.$each.$iter[
                      index
                    ].name.$touch()
                  "
                  :error-messages="errorMessages.dialysis_package_name[index]"
                >
                  <template v-slot:item="{ item }">
                    <div id="d-flex flex-column justify-start align-start">
                      <div>{{ item.package_name }}</div>
                      <div class="packages-description">
                        <span
                          v-for="(dialysisItem, index) in item.dialysis_items"
                          :key="index"
                        >
                          {{ dialysisItem
                          }}{{
                            index < item.dialysis_items.length - 1 ? ", " : ""
                          }}
                        </span>
                      </div>
                    </div>
                  </template>
                </v-select>
              </div>
            </v-col>
            <v-col cols="12" md="6" sm="6" class="relative-position">
              <v-autocomplete
                v-model="set.funder"
                :label="`Funder ${index + 1}`"
                :items="funders_enum"
                item-text="name"
                @blur="
                    $v.payload.dialysis_packages.$each.$iter[
                      index
                    ].name.$touch()
                  "
              >
              
              </v-autocomplete>
              <v-btn
                color="red darken-4"
                icon
                @click="removeIndex(index)"
                fab
                class="absolute-position"
                :ripple="false"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-col cols="12">
            <div class="d-flex justify-center align-center">
              <v-btn
                color="blue darken-4"
                icon
                @click="addIndex"
                fab
                :ripple="false"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-right my-n5">
              <v-btn dark class="primary" @click="submitForm">Submit</v-btn>
            </div>
          </v-col>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "PackagesDialog",
  props: ["serviceStatus"],
  data: () => ({
    dialog: false,
    payload: {
      dialysis_packages: [],
    },
  }),
  validations: {
    payload: {
      dialysis_packages: {
        $each: {
          name: { required },
          funder: { required },
        },
      },
    },
  },
  methods: {
    ...mapActions("dialysis", ["fetchEnumsPackages"]),
    ...mapActions("services_choices", ["fetchCrowdFundersEnum"]),
    addIndex() {
      this.payload.dialysis_packages.push({
        name: null,
        funder: null,
      });
    },
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("validationSuccess", true);
        this.$v.$reset();
        this.dialog = !this.dialog
      }
    },
    removeIndex(index) {
      if(this.payload.dialysis_packages.length > 1){
        this.payload.dialysis_packages.splice(index, 1);
      }
    },
  },
  computed: {
    ...mapState("dialysis", {
      packages_enum: "dialysis_packages",
    }),
    ...mapState("services_choices", {
      funders_enum: "crowd_fundings",
    }),
    ...mapGetters("login", ["userRole"]),
    errorMessages() {
      const errors = {};
      errors.dialysis_package_name = this.payload.dialysis_packages.map(
        (_, index) => {
          const sessionErrors = [];

          if (
            this.$v.payload.dialysis_packages.$each.$iter[index].name.$dirty
          ) {
            !this.$v.payload.dialysis_packages.$each.$iter[index].name
              .required && sessionErrors.push(`Dialysis Package is required`);
          }

          return sessionErrors;
        }
      );
      return errors;
    },

    // ExistingPackages(){
    //   let package_dialysis = [];

    //   Object.keys(this.serviceStatus).forEach((items) => {
    //     console.log(items);
    //       const packages_info = this.serviceStatus[items];

    //       Object.keys(packages_info).forEach((innerItems) => {
    //         if(innerItems.includes("packages")) {
    //           console.log("yehey")
    //             packages_info[innerItems].forEach((package_data) => {
    //               package_dialysis.push({
    //                 name: package_data["name"],
    //                 funder: package_data["funder"]
    //               })
    //             })
    //         }
    //       })
    //     });
    //   return {
    //     package_dialysis: package_dialysis
    //   };
    // }
  },
  watch: {
    packages_data: {
      handler(newVal) {
        //Change this if you are going to do the algorithm here
        this.payload.dialysis_packages = newVal;
      },
    },
    "payload.dialysis_packages": {
      handler(value) {
        console.log("payload", value);
      },
    },
    packages_enum: {
      handler(value) {
        console.log("packages_enum", value);
      },
    },
    funders_enum: {
      handler(value) {
        console.log("funders_enum", value);
      },
    },
  },
  created() {
    this.fetchEnumsPackages();
    this.fetchCrowdFundersEnum();
  },
};
</script>

<style scoped>
.packages-description {
  font-size: 12px;
  color: #333;
  font-weight: bold;
}



.overflow-scroll {
  overflow-y: auto;
  height: 100%;
}

.relative-position {
  position: relative;
}

.absolute-position {
  position: absolute;
  top: -10px;
  right: -10px;
}
</style>
