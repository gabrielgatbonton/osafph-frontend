<template>
  <v-card outlined class="pa-0 bordered-card colored-border">
    <v-row no-gutters>
      <v-col cols="12" class="d-flex align-center">
        <v-card
          flat
          class="card-light-bgColor reversed-shaped-card px-4 d-flex"
        >
          <v-icon size="20" color="white">>mdi-history</v-icon>
          <p
            class="text-subtitle-2 white--text font-weight-bold pa-0 my-2 ml-2"
          >
            Patient's Previous Consultations
          </p>
        </v-card>
      </v-col>

      <v-container fluid class="py-4" v-if="previousConsultations.length !== 0">
        <v-row no-gutters>
          <v-col
            cols="12"
            v-for="(consultation, index) in previousConsultations"
            :key="index"
          >
            <div class="my-2">
              <v-expansion-panels flat focusable>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-container class="py-1">
                      <v-row>
                        <v-col cols="auto" class="px-0">
                          <v-icon color="success"> mdi-check </v-icon>
                        </v-col>
                        <v-col cols="auto" class="py-0">
                          <div class="text-subtitle-2 font-weight-bold">
                            CONSULTATION DATE
                          </div>
                          <div class="text-subtitle-2">
                            {{ consultation.consultation_date }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="scrollable-expansion-panel">
                    <div class="ma-2">
                      <v-row dense class="my-4">
                        <v-col cols="auto" class="">
                          <v-avatar color="primary">
                            <v-icon color="white"> mdi-history </v-icon>
                          </v-avatar>
                        </v-col>
                        <v-col cols="auto" class="pt-2">
                          <div class="text-subtitle-2 font-weight-bold">
                            SUBJECTIVE
                          </div>
                          <div class="text-caption grey--text">
                            Declared Medical History
                          </div>
                        </v-col>
                      </v-row>
                      <v-row
                        v-for="(info, index) in consultation.subjectives"
                        :key="'subjectives-' + index"
                        no-gutters
                        :class="{
                          'mb-3':
                            $vuetify.breakpoint.xs &&
                            index < categories.length - 1,
                        }"
                      >
                        <v-col cols="12" md="6" sm="6">
                          <v-card-subtitle class="py-0">{{
                            info.title
                          }}</v-card-subtitle>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-card-text
                            :class="{
                              font: $vuetify.breakpoint.xs,
                              'font-weight-bold': !$vuetify.breakpoint.xs,
                            }"
                            class="py-0"
                            >{{ info.content }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                      <!-- <v-row>
                        <v-col
                          cols="6"
                          v-for="(info, index) in consultation.subjectives"
                          :key="'subjectives-' + index"
                        >
                          <div class="text-subtitle-1 grey--text">
                            {{ info.title }}
                          </div>
                          <div class="text-h5">
                            {{ info.content }}
                          </div>
                        </v-col>
                      </v-row> -->
                      <v-divider class="my-5"></v-divider>
                      <v-row dense class="my-4">
                        <v-col cols="auto" class="">
                          <v-avatar color="primary">
                            <v-icon color="white"> mdi-folder </v-icon>
                          </v-avatar>
                        </v-col>
                        <v-col cols="auto" class="pt-2">
                          <div class="text-subtitle-2 font-weight-bold">
                            OBJECTIVE
                          </div>
                          <div class="text-caption grey--text">
                            Declared Medical Examination
                          </div>
                        </v-col>
                      </v-row>

                      <v-row
                        v-for="(info, index) in consultation.objectives"
                        :key="'objectives-' + index"
                        no-gutters
                        :class="{
                          'mb-3':
                            $vuetify.breakpoint.xs &&
                            index < categories.length - 1,
                        }"
                      >
                        <v-col cols="12" md="6" sm="6">
                          <v-card-subtitle class="py-0">{{
                            info.title
                          }}</v-card-subtitle>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-card-text
                            :class="{
                              font: $vuetify.breakpoint.xs,
                              'font-weight-bold': !$vuetify.breakpoint.xs,
                            }"
                            class="py-0"
                            >{{ info.content }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                      <!-- <v-row>
                        <v-col
                          cols="4"
                          v-for="(info, index) in consultation.objectives"
                          :key="'objectives-' + index"
                        >
                          <div class="text-subtitle-1 grey--text">
                            {{ info.title }}
                          </div>
                          <div class="text-h5">
                            {{ info.content }}
                          </div>
                        </v-col>
                      </v-row> -->
                      <v-divider class="my-5"></v-divider>
                      <v-row dense class="my-4">
                        <v-col cols="auto" class="">
                          <v-avatar color="primary">
                            <v-icon color="white"> mdi-notebook-check </v-icon>
                          </v-avatar>
                        </v-col>
                        <v-col cols="auto" class="pt-2">
                          <div class="text-subtitle-2 font-weight-bold">
                            ASSESSMENT
                          </div>
                          <div class="text-caption grey--text">
                            Declared Assessment History
                          </div>
                        </v-col>
                      </v-row>

                      <v-row
                        v-for="(info, index) in consultation.assessments"
                        :key="'objectives-' + index"
                        no-gutters
                        :class="{
                          'mb-3':
                            $vuetify.breakpoint.xs &&
                            index < categories.length - 1,
                        }"
                      >
                        <v-col cols="12" md="6" sm="6">
                          <v-card-subtitle class="py-0">{{
                            info.title
                          }}</v-card-subtitle>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-card-text
                            :class="{
                              font: $vuetify.breakpoint.xs,
                              'font-weight-bold': !$vuetify.breakpoint.xs,
                            }"
                            class="py-0"
                            >{{ info.content }}</v-card-text
                          >
                        </v-col>
                      </v-row>
                      <!-- <v-row>
                        <v-col
                          cols="12"
                          v-for="(info, index) in consultation.assessments"
                          :key="'objectives-' + index"
                        >
                          <div class="text-subtitle-1 grey--text">
                            {{ info.title }}
                          </div>
                          <div class="text-h5">
                            {{ info.content }}
                          </div>
                        </v-col>
                      </v-row> -->
                      <v-divider class="my-5"></v-divider>
                      <v-row dense class="my-4">
                        <v-col cols="auto" class="">
                          <v-avatar color="primary">
                            <v-icon color="white"> mdi-pill </v-icon>
                          </v-avatar>
                        </v-col>
                        <v-col cols="auto" class="pt-2">
                          <div class="text-subtitle-2 font-weight-bold">
                            PLAN
                          </div>
                          <div class="text-caption grey--text">
                            Declared Medical Plan
                          </div>
                        </v-col>
                      </v-row>
                      <v-row
                        v-for="(info, index) in consultation.plans"
                        :key="'plans-' + index"
                        no-gutters
                        :class="{
                          'mb-3':
                            $vuetify.breakpoint.xs &&
                            index < categories.length - 1,
                        }"
                      >
                        <v-col cols="12" md="6" sm="6">
                          <v-card-subtitle class="py-0">{{
                            info.title
                          }}</v-card-subtitle>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-card-text
                            :class="{
                              font: $vuetify.breakpoint.xs,
                              'font-weight-bold': !$vuetify.breakpoint.xs,
                            }"
                            class="py-0"
                            >{{ info.content }}</v-card-text
                          >
                        </v-col>
                      </v-row>

                      <!-- <v-row>
                        <v-col
                          :cols="info.title === '' ? 12 : 6"
                          v-for="(info, index) in consultation.plans"
                          :key="'plans-' + index"
                        >
                          <div class="text-subtitle-1 grey--text">
                            {{ info.title }}
                          </div>
                          <div class="text-h5">
                            {{ info.content }}
                          </div>
                          <div v-if="(index + 1) % 5 === 0">
                            <v-divider></v-divider>
                          </div>
                        </v-col>
                      </v-row> -->
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div v-else class="error--text text-center my-5 text-h6">
        No Recorded Consultations
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "PreviousConsultationsComponent",
  props: ["previousConsultations"],
};
</script>

<style scoped>
.bordered-card {
  border-radius: 10px;
  border: 1px solid whitesmoke;
  overflow: hidden;
}
.colored-border {
  border: 1px solid #ffd1d1;
}
.card-light-bgColor {
  background-color: #ff4949;
}
.reversed-shaped-card {
  border-top-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.no-rounded-corners {
  border-radius: 0 !important;
}
</style>
