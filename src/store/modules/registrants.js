// store/modules/registrants.js
import axios from "axios";

const state = {
  registrants: [],
  registrant: null,
  vaccinationDetails: null,
};

const getters = {
  allRegistrants: (state) => state.registrants,
  getRegistrant: (state) => state.registrant,
  getVaccineInformation: (state) => state.vaccinationDetails,
};

const actions = {
  async fetchRegistrants({ commit }) {
    try {
      const response = await axios.get("http://200.10.77.4/api/citizens");
      const registrants = response.data.citizens; // Assuming the response contains the registrants' data in the "data" property

      commit("SET_REGISTRANTS", registrants);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
  },
  async addRegistrant({ commit }, data) {
    try {
      // Make the POST request to the endpoint using Axios
      const response = await axios.post(
        "http://200.10.77.4/api/citizens/create",
        data
      );
      const registrant = response.data;
      await commit("ADD_REGISTRANT", registrant);
    } catch (error) {
      console.error("Error adding citizen:", error);
    }
  },
  async fetchRegistrantId({ commit }, id) {
    try {
      const response = await axios.get(`http://200.10.77.4/api/citizens/${id}`);
      const registrant = response.data;
      commit("SET_REGISTRANT", registrant);
    } catch (error) {
      console.error("Error fetching registrant:", error);
    }
  },
  async updateRegistrant({ commit }, { id, data }) {
    try {
      const response = await axios.put(
        `http://200.10.77.4/api/citizens/${id}`,
        data
      );
      const updateRegistrant = response.data;
      await commit("UPDATE_REGISTRANT", { id, updateRegistrant });
    } catch (error) {
      console.error("Error updating request to registrant vuex:", error);
    }
  },
  async updateRegistrantFiles({ commit }, { id, data }) {
    try {
      const response = await axios.post(
        `http://200.10.77.4/api/citizens/${id}/files`,
        data
      );
      const files = response.data;
      await commit("UPDATE_REGISTRANT_FILES", { id, files });
    } catch (error) {
      console.error("Error updating registrant files:", error);
    }
  },
  async claimCard({ commit }, { id, data }) {
    try {
      const response = await axios.put(
        `http://200.10.77.4/api/citizens/${id}/card`,
        data
      );
      const claim = response.data;
      await commit("UPDATE_CARD_STATUS", { id, claim });
    } catch (error) {
      console.error("Error requesting claim:", error);
    }
  },
  async fetchVaccineInformation({ commit }, id) {
    try {
      const response = await axios.get(
        `http://200.10.77.4/api/citizens/${id}/vaccine/`
      );
      const vaccineInformation = response.data;
      commit("SET_VACCINATION_INFORMATION", vaccineInformation);
    } catch (error) {
      console.error("Error fetching vaccine information:", error);
    }
  },
  async updateVaccineInformation({ commit }, { id, data }) {
    try {
      const response = await axios.put(
        `http://200.10.77.4/api/citizens/${id}/vaccine/3`,
        data
      );
      const updateVaccineInformation = response.data;
      await commit("", { id, updateVaccineInformation });
    } catch (error) {
      console.error("Error requesting vaccination update:", error);
    }
  },
};

const mutations = {
  SET_REGISTRANTS(state, registrants) {
    state.registrants = registrants;
  },
  ADD_REGISTRANT(state, registrant) {
    state.registrants.push(registrant);
  },
  SET_REGISTRANT(state, registrant) {
    state.registrant = registrant;
  },
  UPDATE_REGISTRANT(state, { id, updateRegistrant }) {
    const registrant = state.registrant;
    if (registrant && registrant.id === id) {
      registrant.citizen = {
        hub_registrant_number: updateRegistrant.hub_registrant_number,
        passport_number: updateRegistrant.passport_number,
        last_name: updateRegistrant.last_name,
        first_name: updateRegistrant.first_name,
        middle_name: updateRegistrant.middle_name,
        suffix: updateRegistrant.suffix,
        gender: updateRegistrant.gender,
        birthday: updateRegistrant.birthday,
        civil_status: updateRegistrant.civil_status,
        contact_number: updateRegistrant.contact_number,
        tin_number: updateRegistrant.tin_number,
        blood_type: updateRegistrant.blood_type,
        emergency_name: updateRegistrant.emergency_name,
        emergency_number: updateRegistrant.emergency_number,
        address: updateRegistrant.address,
        barangay: updateRegistrant.barangay,
        municipality: updateRegistrant.municipality,
        province: updateRegistrant.province,
      };
    }
  },
  UPDATE_REGISTRANT_FILES(state, { id, files }) {
    const registrant = state.registrant;
    if (registrant && registrant.id === id) {
      registrant.citizen.citizen_file = {
        image_url: files.image_url,
        crop_image_url: files.crop_image_url,
        e_signature: files.e_signature,
      };
    }
  },
  UPDATE_CARD_STATUS(state, { id, claim }) {
    const registrant = state.registrant;
    if (registrant && registrant.id === id) {
      registrant.citizen.mcg_cares_card = claim;
    }
  },
  SET_VACCINATION_INFORMATION(state, vaccineInformation) {
    state.vaccinationDetails = vaccineInformation;
  },
  UPDATE_VACCINATION_INFORMATION(state, { id, updateVaccineInformation }) {
    const vaccineInformation = state.vaccinationDetails;
    if (vaccineInformation && vaccineInformation.citizen_id === id) {
      vaccineInformation.vaccinationStat = [
        {
          dose: updateVaccineInformation.dose,
          vaccination_date: updateVaccineInformation.vaccination_date,
          vaccine_name: updateVaccineInformation.vaccine_name,
          lot_no: updateVaccineInformation.lot_no,
          site_name: updateVaccineInformation.site_name,
        },
        // {
        //   dose: updateVaccineInformation.dose,
        //   vaccination_date: updateVaccineInformation.vaccination_date,
        //   vaccine_name: updateVaccineInformation.vaccine_name,
        //   lot_no: updateVaccineInformation.lot_no,
        //   site_name: updateVaccineInformation.site_name
        // }
      ];
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
