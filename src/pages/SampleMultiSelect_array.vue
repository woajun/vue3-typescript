<template>
  <div>
    {{ searchItem }}<br />
    <c-multi-select :selects="selects" v-model="searchItem" />
  </div>
</template>
<script setup lang="ts">
import CMultiSelect from "@/components/search/conditions/CMultiSelect.vue";
import { computed, reactive } from "vue";

const searchItem = reactive({
  slt1: "",
  slt2: "",
  slt3: "",
});

const dataOne = [
  { description: "users", value: "users" },
  { description: "comments", value: "comments" },
  { description: "error", value: "error" },
];

const dataTwo = computed(() => {
  const result = searchItem.slt1
    ? searchFor(`https://jsonplaceholder.typicode.com/${searchItem.slt1}`)
    : [];
  return result;

  async function searchFor(url: string) {
    const resp = await fetch(url);
    return await resp.json();
  }
});

const dataThree = computed(() => {
  if (!searchItem.slt2) return [];
  switch (searchItem.slt1) {
    case "users":
      return [
        { value: "male", description: "male" },
        { value: "female", description: "female" },
      ];
    case "comments":
      return [
        { value: "전체공개", description: "전체공개" },
        { value: "주인공개", description: "주인공개" },
        { value: "비공개", description: "비공개" },
      ];
    default:
      return [];
  }
});

const selects = reactive([
  {
    field: "slt1",
    data: dataOne,
    label: "선택",
    placeholder: "선택1",
  },
  {
    valueKey: "id",
    descriptionKey: "name",
    field: "slt2",
    data: dataTwo,
    placeholder: "선택2",
    dependsOnField: "slt1",
  },
  {
    field: "slt3",
    data: dataThree,
    placeholder: "선택3",
    dependsOnField: "slt2",
  },
]);
</script>
