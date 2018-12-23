import { mapFields } from "vuex-map-fields";

export default {
  name: "SearchStationModel",
  computed: {
    ...mapFields({
      from: "connectionDraft.from",
      to: "connectionDraft.to"
    }),
    data() {
      return {
        from: this.from,
        to: this.to
      };
    },
    valid() {
      return this.from.station === null && this.to.station === null;
    }
  },
  methods: {
    initialize() {
      return {
        items: [],
        station: null
      };
    },
    add() {
      this.$store.dispatch("addConnection");
    },

    clear() {
      this.from = this.initialize();
      this.to = this.initialize();
    }
  },
  render() {
    return this.$scopedSlots.default({
      add: this.add,
      data: this.data,
      clear: this.clear,
      valid: this.valid
    });
  }
};
