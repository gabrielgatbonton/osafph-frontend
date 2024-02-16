<template>
  <v-list nav dense>
    <div v-for="(link, index) in links" :key="index">
      <v-list-group v-if="link.dropdown && link.subroutes">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>{{ link.dropdown.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.dropdown.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
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
      </v-list-group>
      <v-list-item v-else router :to="link.route" color="primary">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "LinkComponent",
  props: ["links"]
};
</script>
