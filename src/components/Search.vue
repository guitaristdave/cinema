<template>
    <div class="search-container">
        <h2>{{ props.title }}</h2>
        <input type="text" placeholder="Название фильма" v-model="movieName" @keyup.enter="search" class="input-field">
        <p v-if="error" class="error">{{ error }}</p>
        <button @click="search" class="search-btn">Search</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { searchIds } from '../api/kinopoisk';

const props = defineProps({
    title: String
});

const emit = defineEmits(['search']);

const movieName = ref('');
const movies = ref([]);
const error = ref(null);

const search = async () => {
    if (!movieName.value) {
        error.value = 'Введите название фильма';
        return;
    }
    movies.value = await searchIds(movieName.value); // Ожидаем завершения запроса
    emit('search', movies.value);
    movieName.value = '';
};
</script>

<style scoped>
.search-container {
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #333;
}

.input-field {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

.input-field:focus {
    border-color: #007bff;
    outline: none;
}

.error {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}

.search-btn {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-btn:hover {
    background-color: #0056b3;
}

.search-btn:focus {
    outline: none;
}

@media (max-width: 500px) {
    .search-container {
        margin: 20px;
        padding: 15px;
    }
}
</style>
