<template>
    <div v-if="totalPages > 0" class="history">
        <h2>История просмотра</h2>
        <ol>
            <li v-for="movie in history">
                <div class="buttons">
                    <button class="movieBtn" @click="watchMovie(movie.kinopoisk_id)">{{ movie.movie_name }}</button>
                    <button class="deleteBtn" @click="deleteHistoryItem(movie.id)">❌</button>
                </div>
                <p>{{ dateFormatter(movie.date) }}</p>
            </li>
        </ol>

        <Paginator v-model="currentPage" :totalPages="totalPages" />
    </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import { getHistory, deleteHistoryItem } from '../api/mokky';
import Paginator from './Paginator.vue';

const history = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const emit = defineEmits(['watchMovie']);

const dateFormatter = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
}

const fetchHistory = async () => {
    const userId = localStorage.getItem('user_id')?.toString();
    if (!userId) return;

    try {
        const response = await getHistory(userId, currentPage.value);
        if (response && response.items) {
            history.value = response.items;
            totalPages.value = response.meta.total_pages;
        } else {
            history.value = [];
            totalPages.value = 1;
        }
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
};

const watchMovie = (movieId) => {
    emit('watchMovie', movieId);
}

watch(currentPage, fetchHistory);
watch(history, () => {
    fetchHistory();
})
onMounted(fetchHistory);

</script>


<style scoped>
.history {
    width: 100%;
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
}

ol {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 12px 0;
    border-bottom: 1px solid #ddd;

}

.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.movieBtn {
    width: 50%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.deleteBtn {
    border: none;
    background-color: transparent;
}

.deleteBtn:hover {
    cursor: pointer;
}

.movieBtn:hover {
    background-color: #0056b3;
}

.movieBtn:focus {
    outline: none;
}
</style>