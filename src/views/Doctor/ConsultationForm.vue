<template>
  <div>
    <v-card
      rounded="lg"
      class="mx-5"
      flat
      outlined
      style="background-color: #f1f5fb"
    >
      <v-container fluid>
        <v-row dense class="ma-2">
          <v-col cols="auto" class="">
            <v-avatar color="indigo">
              <v-icon dark> mdi-account </v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto" class="pt-2">
            <div class="text-subtitle-2 font-weight-bold">BASIC DETAILS</div>
            <div class="text-caption grey--text">
              Patient Personal Information
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card flat outlined class="mx-2">
              <div class="ma-5">
                <v-row>
                  <v-col cols="6">
                    <v-text-field readonly label="Patient Name"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-select readonly label="Sex"></v-select>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="Age" type="number"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field readonly label="Birthdate"></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select readonly label="Civil Status"></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field readonly label="Religion"></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-combobox readonly label="Occupation"></v-combobox>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field readonly label="Nationality"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field readonly label="Address"></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
