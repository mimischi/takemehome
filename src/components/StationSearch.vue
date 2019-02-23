<template lang="pug">
v-autocomplete(
  v-model="model"
  :items="items"
  :label="label"
  :loading="loading"
  :search-input.sync="search"
  :placeholder="placeholder"
  :prepend-icon="prependIcon"
  @click:clear="clear"
  hide-no-data
  :hint="hint"
  persistent-hint
  item-text="name"
  item-value="extId"
  outline
  return-object
)
</template>

<script>
import axios from "axios";
import debounce from "lodash/debounce";

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
    hint: {
      type: String,
      default: undefined
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
    },
    apiCall: debounce(
      function() {
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
          });
        this.loading = false;
      },
      150,
      { maxWait: 200 }
    )
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

      this.apiCall();
    }
  }
};
</script>
