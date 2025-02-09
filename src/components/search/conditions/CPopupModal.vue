<template>
  <Teleport to="body">
    <DefaultModal :show="showModal" @close="closeModal">
      <template #header>
        <template v-if="conditions">
          <Search
            :conditions="conditions"
            :search-item="searchItem"
            @update:search-item="addSearchItem"
            :id="formId"
          ></Search>
        </template>
      </template>
      <template #body>
        <Table
          :headers="headers"
          :data="filtered"
          v-model:selected="modalSelected"
          @update:dblClkRow="dblSlkRowEvent"
        ></Table>
      </template>
      <template #footer>
        <button class="modal-default-button" @click.prevent="selectBtn">
          선택
        </button>
        <button class="modal-default-button" @click.prevent="closeModal">
          닫기
        </button>
        {{ modalSelected }}
      </template>
    </DefaultModal>
  </Teleport>
</template>

<script setup lang="ts">
import DefaultModal from "@/components/common/DefaultModal.vue";
import Search from "@/components/search/Search.vue";
import Table from "@/components/list/Table.vue";
import { defineProps, defineEmits, onMounted, reactive, ref } from "vue";
import { Header } from "@/components/list/tableSetting";
import Condition from "@/components/search/conditions/Condition";

const props = defineProps<{
  conditions?: Array<Condition>;
  headers: Array<Header>;
  data?: Array<Record<string, string>>;
  showModal: boolean;
  selected?: Record<string, any>;
}>();

const formId = "id" + Math.random().toString(16).slice(2);
const searchItem: Record<string, string> = reactive({});
const filtered = ref();
const modalSelected = ref();

const emit = defineEmits(["update:selected", "update:showModal"]);

function dblSlkRowEvent(row: Record<string, any>) {
  modalSelected.value = row;
  selectBtn();
}

function selectBtn() {
  emit("update:selected", modalSelected.value);
  closeModal();
}

function closeModal() {
  emit("update:showModal", false);
}

function addSearchItem(key: string, value: string) {
  searchItem[key] = value;
  if (props.data) {
    filtered.value = filtering(props.data, searchItem);
  }
}

function filtering(
  target: Array<Record<string, any>>,
  searchItem: Record<string, any>
) {
  const result = target.filter((e) => {
    let flag = true;
    for (const key in searchItem) {
      flag = flag && isInclude(e[key], searchItem[key]);
    }
    if (flag) return e;
  });
  return result;

  function isInclude(target: string, search: string): boolean {
    if (target.includes(search)) {
      return true;
    }
    return false;
  }
}

onMounted(() => {
  modalSelected.value = props.selected;
  if (props.data) {
    filtered.value = filtering(props.data, searchItem);
  }
});
</script>
