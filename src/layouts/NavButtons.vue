<template>
  <v-list nav dense>
    <div v-if="isMiniVariant">
      <v-tooltip right v-for="(link, index) in links" :key="index">
        <template
          v-if="link.users.includes(user)"
          v-slot:activator="{ on, attrs }"
        >
          <!-- Shows only when the nav button has subroutes -->
          <v-list-group v-if="link.subroutes">
            <template v-slot:activator>
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
            </template>

            <!-- Subroutes -->
            <v-divider />
            <v-tooltip
              right
              v-for="(sub, index) in link.subroutes"
              :key="index"
            >
              <template
                v-if="link.users.includes(user)"
                v-slot:activator="{ on, attrs }"
              >
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                  :key="index"
                  :to="sub.route"
                  :ripple="false"
                  color="primary"
                  @click="toggleActiveState(sub.text)"
                >
                  <v-list-item-icon>
                    <v-icon>{{
                      sub.text === activeBtn ? sub.filledIcon : sub.icon
                    }}</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>

              <span>{{ sub.text }}</span>
            </v-tooltip>

            <v-divider />
          </v-list-group>

          <!-- Nav buttons without subroutes -->
          <v-list-item
            v-else
            :to="link.route"
            v-bind="attrs"
            v-on="on"
            color="primary"
            :ripple="false"
            @click="toggleActiveState(link.text)"
          >
            <v-list-item-icon>
              <v-icon>{{
                link.text === activeBtn ? link.filledIcon : link.icon
              }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>

        <span>{{ link.text }}</span>
      </v-tooltip>
    </div>

    <div v-else>
      <div v-for="(link, index) in links" :key="index">
        <v-list-group v-if="link.subroutes && link.users.includes(user)">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <div v-if="link.users.includes(user)">
            <v-list-item
              v-for="(sub, index) in link.subroutes"
              :key="index"
              router
              :to="sub.route"
            >
              <v-list-item-icon>
                <v-icon>{{ sub.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ sub.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-group>

        <div v-else>
          <v-list-item
            v-if="link.users.includes(user)"
            router
            :to="link.route"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "NavButtons",
  props: ["links", "user", "isMini"],
  data: () => ({
    activeBtn: "Dashboard",
  }),
  computed: {
    isMiniVariant() {
      return this.isMini;
    },
  },
  methods: {
    toggleActiveState: function (btnName) {
      this.activeBtn = btnName;
    },
  },
};
</script>
