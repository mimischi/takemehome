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
    ...mapFields(["connections", "connectionDraft"]),
    index() {
      return this.connections.findIndex(
        connection => connection.uuid === this.id
      );
    },
    connection() {
      return this.connections.filter(connection => connection.uuid === this.id);
    },
    remainingConnections() {
      return this.connections.filter(connection => connection.uuid !== this.id);
    }
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
        ...this.connection
      };
    },
    destroy() {
      this.connections = this.remainingConnections;
    },
    makeDefault() {
      this.connections = [...this.connection, ...this.remainingConnections];
    },
    toggleFavorite() {
      let connections = this.connections;
      connections[this.index].isFavorite = !connections[this.index].isFavorite;
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
