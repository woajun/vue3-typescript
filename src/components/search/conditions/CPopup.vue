<template>
  <div>
    <template v-if="label"> {{ label }} : </template>
    <input type="text" :placeholder="placeholder" v-model="value" />
    <button @click.prevent="showModal = true">🔍</button>
    <template v-for="df in displayFields" :key="df">
      <input type="text" disabled :value="selected[df]" />
    </template>
    <Modal
      v-bind="modal"
      :data="data"
      v-model:showModal="showModal"
      :selected="selected"
      @update:selected="modalSelected"
    ></Modal>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  computed,
  ref,
  reactive,
  WritableComputedRef,
} from "vue";
import Modal from "./CPopupModal.vue";
import { PopupModal } from "./Condition";

const props = defineProps<{
  kind: "popup";
  width?: string;
  label?: string;
  field: string;
  valueField?: string;
  initialValue?: string;
  placeholder?: string;
  displayFields?: string[];
  modal: PopupModal;
  data?: Array<Record<string, string>>;

  searchItem: Record<string, any>;
}>();
const emit = defineEmits(["update:searchItem"]);
const showModal = ref(false);
const selected: Record<string, string> = reactive({});
const valueField = props.valueField ?? props.field;
const value: WritableComputedRef<string | undefined> = computed({
  get() {
    return props.searchItem[props.field];
  },
  set(value) {
    assignSelected(search(value));
    emit("update:searchItem", props.field, value);

    function search(value: string | undefined) {
      if (value) {
        return props.data?.find((e) => e[valueField] === value);
      }
      return undefined;
    }

    function assignSelected(object: Record<string, any> | undefined) {
      emptyObj(selected);
      if (object) Object.assign(selected, object);

      function emptyObj(obj: Record<string, any>) {
        for (const key in obj) {
          delete obj[key];
        }
      }
    }
  },
});

function modalSelected(aSelected: Record<string, string>) {
  for (const key in aSelected) {
    if (valueField === key) {
      value.value = aSelected[key];
    }
  }
}

value.value = props.initialValue ?? value.value;
</script>
