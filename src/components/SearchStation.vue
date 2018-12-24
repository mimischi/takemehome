<template lang="pug">
v-autocomplete(
  v-model="model"
  :items="items"
  :loading="loading"
  :search-input.sync="search"
  hide-no-data
  hide-selected
  item-text="name"
  item-value="extId"
  clearable
  clear-icon="cancel"
  :label="label"
  :placeholder="placeholder"
  persisted-hint
  :prepend-icon="prependIcon"
  @click:clear="clear"
  return-object
)
</template>

<script>
import axios from "axios";

export default {
  name: "StationSearch",
  props: {
    value: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: "Station name"
    },
    placeholder: {
      type: String,
      default: ""
    },
    prependIcon: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    reset: false,
    search: null
  }),
  methods: {
    clear() {
      this.loading = false;
      this.reset = true;
      this.$store.dispatch("clearItems", this.direction);
    }
  },
  computed: {
    model: {
      get() {
        return this.value.station;
      },
      set(value) {
        this.$emit("input", {
          ...this.value,
          station: value
        });
      }
    },
    items: {
      get() {
        return this.value.items;
      },
      set(value) {
        this.$emit("input", {
          ...this.value,
          items: value
        });
      }
    }
  },
  watch: {
    search(val) {
      // Value is empty
      if (val === null) return;

      // We just reset the input
      if (this.reset) {
        this.reset = false;
        return;
      }

      // Request already fired
      if (this.loading) return;

      this.loading = true;

      axios
        .post(process.env.VUE_APP_API_URL, {
          url: "location.name",
          params: {
            input: this.search,
            type: "S"
          }
        })
        .then(response => {
          const data = response.data;

          this.items = data.stopLocationOrCoordLocation.map(
            location => location.StopLocation
          );
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
