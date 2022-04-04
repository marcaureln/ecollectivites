<template>
  <div :id="modalId" class="modal" :style="display" @click="dismiss">
    <div class="modal-content" :style="contentWidth">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      default: "250px",
    },
  },
  data() {
    return {
      modalId: null,
    };
  },
  mounted() {
    this.modalId = nanoid();
  },
  methods: {
    dismiss(event) {
      if (event.target.matches(".modal")) {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
  computed: {
    display() {
      return `display: ${this.isActive ? "block" : "none"};`;
    },
    contentWidth() {
      return `width: ${this.width};`;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border-radius: 3px;
}
</style>
