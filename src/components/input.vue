<template>
  <div class="wrapper" :class="{ error }">
    <y-icon
      v-if="icon !== ''"
      :icon="icon"
      :class="classes"
      @click.native="handleClear"
    ></y-icon>
    <input
      :placeholder="placeholder"
      :value="value"
      :type="type"
      :class="disable"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    />
    <y-icon
      v-if="clearable && value"
      icon="y-icon-quxiao"
      class="input-clearable"
      @click.native="handleClear"
    ></y-icon>

    <template v-if="error" class="error">
      <y-icon icon="y-icon-error" class="icon-error"></y-icon>
      <span class="message-error">{{ error }}</span>
    </template>
  </div>
</template>

<script>
import YIcon from "./icon.vue";
export default {
  name: "YInput",
  components: {
    YIcon,
  },
  mounted() {
    // console.log(this.placeholder);
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconPosition: {
      type: String,
      default: "left",
    },
    error: {
      type: String,
    },
  },
  computed: {
    classes() {
      return {
        [`icon-left`]: this.icon !== "" && this.iconPosition === "left",
        [`icon-right`]: this.icon !== "" && this.iconPosition === "right",
      };
    },
    disable() {
      return {
        ["disabled"]: this.disabled,
        [`inline-icon-${this.iconPosition}`]: this.icon !== "",
      };
    },
  },
  methods: {
    handleClear() {
      this.$emit("input", "");
    },
  },
};
</script>

<style lang= "scss" scoped>
.wrapper {
  height: 32px;
  > input {
    border: 1px solid rgb(235, 230, 230);
    border-radius: 3px;
    height: 32px;
    padding-left: 15px;
    &:hover {
      border: 1px solid rgb(172, 166, 166);
    }
    &:focus {
      outline: none;
      border: 1px solid rgb(16, 119, 216);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }
    &.inline-icon-left {
      padding-left: 2em;
    }
  }
  .input-clearable {
    position: relative;
    top: 4px;
    left: -25px;
  }
  .icon-left {
    position: relative;
    top: 20%;
    width: 17px;
    left: 22px;
  }
  .icon-right {
    position: relative;
    top: 15%;
    right: -130px;
    width: 17px;
  }

  &.error {
    > input {
      border-color: red;
    }
    .icon-error {
      position: relative;
      top: 15%;
      width: 15px;
      fill: red;
    }
    .message-error {
      color: red;
      font-size: 13px;
    }
  }
}
</style>