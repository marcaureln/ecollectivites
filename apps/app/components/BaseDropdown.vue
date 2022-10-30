<template>
  <div class="dropdown">
    <button class="dropdown-btn" @click.prevent="showDropdown()">
      {{ label }}
    </button>
    <div :id="dropdownContentId" class="dropdown-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    // Classes must be registered globally (in main.scss file, or not scoped in parent SFC style)
    classList: {
      type: Array,
      default: () => ["dropdown-btn-default"],
    },
  },
  data() {
    return {
      dropdownContentId: null,
    };
  },
  mounted() {
    this.dropdownContentId = nanoid();

    if (this.classList) {
      const dropdownBtn = this.$el.querySelector(".dropdown-btn");

      this.classList.forEach((className) => {
        dropdownBtn.classList.add(className);
      });
    }

    if (window.onclick === null) {
      window.onclick = closeDropdowns;
    }

    function closeDropdowns(event) {
      if (!event.target.matches(".dropdown-btn")) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (const dropdown of dropdowns) {
          if (dropdown.classList.contains("show-dropdown")) {
            dropdown.classList.remove("show-dropdown");
          }
        }
      }
    }
  },
  methods: {
    showDropdown() {
      const dropdowns = document.getElementsByClassName("dropdown-content");

      for (const dropdown of dropdowns) {
        if (dropdown.id !== this.dropdownContentId && dropdown.classList.contains("show-dropdown")) {
          dropdown.classList.remove("show-dropdown");
        }
      }

      document.getElementById(this.dropdownContentId).classList.toggle("show-dropdown");
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: inline-block;

  &:hover {
    .dropdown-content {
      display: block;
    }
  }
}

.dropdown-btn {
  &:hover {
    cursor: pointer;
  }
}

.dropdown-btn-default {
  @include button();
}

.dropdown-content {
  display: none;
  position: absolute;
  left: -50%;
  min-width: 300px;
  padding: 1rem;
  border-radius: 3px;
  background-color: $background;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.show-dropdown {
  display: block;
}
</style>
