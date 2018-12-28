import { mapFields } from "vuex-map-fields";

export default {
  name: "ConnectionModel",
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
      this.connectionDraft = {
        ...this.connections.filter(connection => connection.uuid === this.id)
      };
    },
    destroy() {
      const index = this.connections.findIndex(
        connection => connection.uuid === this.id
      );
      const del = this.connections.splice(index, 1);
      this.connections = this.connections.filter(
        connection => connection != del
      );
    },
    makeDefault() {
      const newDefault = this.connections.filter(
        connection => connection.uuid === this.id
      );
      const remainingConnections = this.connections.filter(
        connection => connection.uuid !== this.id
      );
      this.connections = [...newDefault, ...remainingConnections];
    },
    toggleFavorite() {
      let connections = this.connections;

      const index = connections.findIndex(
        connection => connection.uuid === this.id
      );
      connections[index].isFavorite = !connections[index].isFavorite;
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
