<template>
  <div class="suggest-text-input">
    <input
      ref="input"
      class="input is-small"
      type="text"
      :placeholder="placeholder"
      :value="inputValue"
      @input="handleInput"
      @focus="openMenu"
      @blur="closeMenu"
      @keydown.down.prevent="moveActive(1)"
      @keydown.up.prevent="moveActive(-1)"
      @keydown.enter="handleEnter"
      @keydown.esc="closeMenu"
    />
    <div
      v-if="isOpen && visibleOptions.length > 0"
      class="suggest-text-input__menu"
    >
      <button
        v-for="(option, index) in visibleOptions"
        :key="`${option.value}-${option.label}`"
        type="button"
        class="suggest-text-input__option"
        :class="{ 'is-active': index === activeIndex }"
        @mousedown.prevent="selectOption(option.value)"
      >
        <span>{{ option.value }}</span>
        <span v-if="option.label" class="suggest-text-input__option-label">
          {{ option.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuggestTextInput",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
      activeIndex: -1,
      shouldFilter: false,
    };
  },
  computed: {
    inputValue() {
      if (this.value === null || this.value === undefined) {
        return "";
      }
      return String(this.value);
    },
    normalizedOptions() {
      return this.options.map(option => {
        if (typeof option === "string" || typeof option === "number") {
          return {
            value: String(option),
            label: "",
          };
        }

        return {
          value: String(option.value),
          label: option.label || "",
        };
      });
    },
    visibleOptions() {
      if (!this.shouldFilter || this.inputValue.length === 0) {
        return this.normalizedOptions;
      }

      const query = this.inputValue.toLowerCase();
      return this.normalizedOptions.filter(option => {
        return (
          option.value.toLowerCase().includes(query) ||
          option.label.toLowerCase().includes(query)
        );
      });
    },
  },
  watch: {
    visibleOptions() {
      this.resetActiveIndex();
    },
  },
  methods: {
    openMenu() {
      this.isOpen = true;
      this.shouldFilter = false;
      this.resetActiveIndex();
    },
    closeMenu() {
      this.isOpen = false;
      this.activeIndex = -1;
    },
    handleInput(event) {
      this.shouldFilter = true;
      this.isOpen = true;
      this.$emit("input", event.target.value);
      this.$nextTick(this.resetActiveIndex);
    },
    handleEnter(event) {
      if (!this.isOpen || this.activeIndex < 0) {
        return;
      }

      event.preventDefault();
      this.selectOption(this.visibleOptions[this.activeIndex].value);
    },
    moveActive(step) {
      if (!this.isOpen) {
        this.openMenu();
        return;
      }

      if (this.visibleOptions.length === 0) {
        this.activeIndex = -1;
        return;
      }

      const nextIndex = this.activeIndex + step;
      this.activeIndex =
        (nextIndex + this.visibleOptions.length) % this.visibleOptions.length;
    },
    resetActiveIndex() {
      this.activeIndex = this.visibleOptions.length > 0 ? 0 : -1;
    },
    selectOption(value) {
      this.$emit("input", value);
      this.closeMenu();
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style scoped>
.suggest-text-input {
  position: relative;
}

.suggest-text-input__menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 2px);
  right: 0;
  left: 0;
  max-height: 12rem;
  overflow-y: auto;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 16px rgba(10, 10, 10, 0.12);
}

.suggest-text-input__option {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border: 0;
  background: #fff;
  color: #363636;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1.3;
  padding: 0.35rem 0.5rem;
  text-align: left;
}

.suggest-text-input__option:hover,
.suggest-text-input__option.is-active {
  background: #f5f5f5;
}

.suggest-text-input__option-label {
  flex: 0 0 auto;
  color: #7a7a7a;
  font-size: 0.7rem;
}
</style>
