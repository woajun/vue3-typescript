<template>
  <template v-if="label"> {{ label }} : </template>
  <select v-model="selected">
    <option v-if="placeholder" disabled value="">
      {{ placeholder }}
    </option>
    <template v-for="option in data" :key="option[value]">
      <option :value="option[value]">
        {{ option[description] }}
      </option>
    </template>
  </select>
  <template v-if="nestedSelect">
    <CSelect
      :data="nestData"
      :placeholder="nestedSelect.placeholder"
      :value="nestedSelect.value"
      :description="nestedSelect.description"
      :nestedSelect="nestedSelect.nestedSelect"
      :searchItem="searchItem"
      :field="nestedSelect.field"
      @update:search-item="(f, v) => emit('update:searchItem', f, v)"
    ></CSelect>
  </template>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, watch, ref } from "vue";
import { NestedSelect, Data } from "./Condition";

const nestData = ref([]);

const props = defineProps<{
  kind?: "select";
  label?: string;
  placeholder?: string;
  initialValue?: string;
  data?: Data;
  value: string;
  description: string;
  nestedSelect?: NestedSelect;
  searchItem: Record<string, any>;
  field: string;
}>();

const emit = defineEmits(["update:searchItem"]);

const selected = computed({
  get() {
    return props.searchItem[props.field];
  },
  set(value) {
    emit("update:searchItem", props.field, value);
  },
});

watch(selected, (newSelected) => {
  changeNestOptions(newSelected);
  removeNestSelectValue();

  function changeNestOptions(newSelected: any) {
    const selectedObject = props.data?.find(
      (e) => e[props.value] === newSelected
    );
    if (props.nestedSelect && selectedObject) {
      nestData.value = selectedObject[props.nestedSelect.data];
    } else {
      nestData.value = [];
    }
  }

  function removeNestSelectValue() {
    if (props.nestedSelect) {
      emit("update:searchItem", props.nestedSelect.field, "");
    }
  }
});

if (typeof props.initialValue === "string") {
  selected.value = props.initialValue ?? "";
} else if (!selected.value) {
  selected.value = "";
}
</script>
