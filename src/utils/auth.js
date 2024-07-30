import store from "@/store";

export const auth = {
  user: function () {
    let user = store.getters["authentication/getCurrentUser"];
    return user;
  },
  token: function () {
    let user = store.getters["authentication/getCurrentUser"];
    return user && user.token ? user.token : null;
  },
  role: function () {
    let user = store.getters["authentication/getCurrentUser"];
    return user && user.user.role ? user.user.role : null;
  },
};
