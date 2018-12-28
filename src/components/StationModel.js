import { mapFields } from "vuex-map-fields";

export default {
  name: "StationModel",
  props: {
    entity: {
      type: Object
    },
    id: {
      type: [Number, String]
    }
  },
  computed: {
    ...mapFields(["connections", "connectionDraft"])
  },
  data() {
    return {
      data: this.entity || null
    };
  },
  methods: {
    create() {
      this.$store.dispatch("addConnection");
    },
    update() {
      this.connectionDraft = { ...this.connections[this.id] };
    },
    destroy() {
      const del = this.connections.splice(this.id, 1);
      this.connections = this.connections.filter(
        connection => connection != del
      );
    },
    makeDefault() {
      let connections = this.connections;
      const newActive = connections.splice(this.id, 1);
      connections.unshift(...newActive);
      this.connections = connections;
    },
    toggleFavorite() {
      let connections = this.connections;
      connections[this.id].isFavorite = !connections[this.id].isFavorite;
      this.connections = connections;
    }
  },
  render() {
    return this.$scopedSlots.default({
      create: this.create,
      data: this.data,
      destroy: this.destroy,
      update: this.update,
      makeDefault: this.makeDefault,
      toggleFavorite: this.toggleFavorite
    });
  }
};
