<template>
    <div class="variants-container">
        <h2>{{ props.title }}</h2>
        <ol class="movie-list">
            <li v-for="movie in props.movies" :key="movie.id" class="movie-item">
                <button @click="$emit('kinopoiskId', movie.id); addHistory(movie)" class="movie-btn">
                    {{ movie.name }} ({{ movie.year }})
                </button>
                <p class="description" :title="movie.description">{{ movie.description }}</p>
            </li>
        </ol>
    </div>
</template>

<script setup>
import { addToHistory } from '../api/mokky';
const props = defineProps({
    title: String,
    movies: Array
})

const emit = defineEmits([
    'kinopoiskId',
])

const addHistory = async (movie) => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
        await addToHistory(userId, movie.id, movie.name);
    }
}
</script>

<style scoped>
.variants-container {
    width: 100%;
    max-width: 600px;
    margin: 40px auto;
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

.movie-list {
    list-style-type: none;
    padding: 0;
}

.movie-item {
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
}

.movie-btn {
    width: 100%;
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
}

.movie-btn:hover {
    background-color: #0056b3;
}

.movie-btn:focus {
    outline: none;
}

.description {
    font-size: 14px;
    color: #555;
    margin-top: 5px;
    line-height: 1.4;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.description:hover {
    cursor: pointer;
    text-decoration: underline;
}

@media (max-width: 500px) {
    .variants-container {
        margin: 20px;
        padding: 15px;
    }
}
</style>
