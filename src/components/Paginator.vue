<template>
    <div class="pagination">
        <button @click="changePage(modelValue - 1)" :disabled="modelValue === 1">Назад</button>
        <span>Страница {{ modelValue }} из {{ totalPages }}</span>
        <button @click="changePage(modelValue + 1)" :disabled="modelValue === totalPages">Вперед</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: { type: Number, required: true }, // Теперь это v-model
    totalPages: { type: Number, required: true }
});

const emit = defineEmits(['update:modelValue']);

const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= props.totalPages) {
        emit('update:modelValue', newPage);
    }
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

}
button {
    width: 20%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    text-align: left;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
}
</style>