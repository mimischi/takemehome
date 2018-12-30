import { mapFields } from "vuex-map-fields";

export default {
  name: "ConnectionModel",
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data: () => ({
    connection: null
  }),
  created() {
    this.connection =
      this.connections.find(connection => connection.uuid === this.id) ||
      this.initialize();
  },
  computed: {
    ...mapFields(["connections"]),
    index() {
      return this.connections.findIndex(
        connection => connection.uuid === this.id
      );
    },
    remainingConnections() {
      return this.connections.filter(connection => connection.uuid !== this.id);
    }
  },
  methods: {
    initialize() {
      return {
        lastUsed: null,
        isDefault: false,
        isFavorite: false,
        provider: "RMV",
        to: {
          items: [],
          station: null
        },
        from: {
          items: [],
          station: null
        }
      };
    },
    create() {
      this.$store.dispatch("addConnection", this.connection);
    },
    update() {
      this.connections[this.index] = this.connection;
    },
    destroy() {
      this.connections = this.remainingConnections;
    },
    makeDefault() {
      this.connections = [this.connection, ...this.remainingConnections];
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
      data: this.connection,
      destroy: this.destroy,
      update: this.update,
      makeDefault: this.makeDefault,
      toggleFavorite: this.toggleFavorite
    });
  }
};
