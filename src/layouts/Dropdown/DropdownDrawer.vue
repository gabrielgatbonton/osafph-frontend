<template>
  <v-list-group>
    <template v-slot:activator>
      <v-list-item-icon>
        <v-icon>{{ content.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ content.title }}</v-list-item-title>
      </v-list-item-content>
    </template>
    <v-list-item
      v-for="sublink in sublinks"
      :key="sublink.text"
      router
      :to="sublink.route"
    >
      <v-list-item-icon>
        <v-icon>{{ sublink.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ sublink.text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  props: {
    content: Object,
    sublinks: Array,
  },
};
</script>
