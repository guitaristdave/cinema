<template>
    <div class="variants-container">
        <h2>{{ props.title }}</h2>
        <ol>
            <li v-for="movie in props.movies" :key="movie.id">
                <button @click="$emit('kinopoiskId', movie.id)">{{ movie.name }} ({{ movie.year }})</button>
                <p class="description" :title="movie.description">{{ movie.description }}</p>
            </li>
        </ol>
    </div>
</template>

<script setup>


const props = defineProps({
    title: String,
    movies: Array
})

const emit = defineEmits([
    'kinopoiskId',
])
</script>

<style scoped>
.variants-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    max-width: 800px;
}

.description {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Ограничение в 2 строки */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* Позволяет перенос строк */
    max-width: 100%; /* Чтобы работало с разными размерами */
}

ol {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

li {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>