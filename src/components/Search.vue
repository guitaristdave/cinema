<template>
    <div class="search-container">
        <h2>{{ props.title }}</h2>
        <input type="text" placeholder="Enter movie name" v-model="movieName" @keyup.enter="search">
        <p v-if="error" class="error">{{ error }}</p>
        <button @click="search">Search</button>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px;
    max-width: 400px;
    background-color: white;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}

h2 {
    font-size: 2rem;
}
</style>
