<template>
    <div class="wrapper">
        <div class="buttons">
        
            <button v-if="!showLogin" @click="logout" class="action-btn">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            <button v-if="showKinoBox || showVariants" @click="backToSearch" class="action-btn">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
        <Login title="Авторизация" v-if="showLogin" @login-success="loginHandler" />
        <Search title="Выберите фильм" v-if="showSearch" @search="searchHandler" />
        <Variants title="Выберите нужный вариант" v-if="showVariants" :movies="movies" @kinopoiskId="kinopoiskHandler" />
        <KinoBox v-if="showKinoBox" :movieId="movieId" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Login from './Login.vue';
import Search from './Search.vue';
import KinoBox from './KinoBox.vue';
import Variants from './Variants.vue';

const showLogin = ref(true);
const showSearch = ref(false);
const showKinoBox = ref(false);
const showVariants = ref(false);
const movies = ref([]);
const movieId = ref('');

const loginHandler = () => {
    showLogin.value = false;
    showSearch.value = true;
}

const searchHandler = (movieList) => {
    movies.value = movieList;
    showSearch.value = false;
    showVariants.value = true;
}

const kinopoiskHandler = (kinopoiskId) => {
    movieId.value = kinopoiskId.toString();
    showVariants.value = false;
    showKinoBox.value = true;
}

const logout = () => {
    showLogin.value = true;
    showSearch.value = false;
    showKinoBox.value = false;
    showVariants.value = false;
    localStorage.removeItem('logged');
}

const backToSearch = () => {
    showSearch.value = true;
    showKinoBox.value = false;
    showVariants.value = false;
    showLogin.value = false;
}
</script>

<style scoped>
.wrapper {
    max-width: 800px;
    margin: 300px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.action-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.action-btn:hover {
    background-color: #0056b3;
}

.action-btn:focus {
    outline: none;
}

@media (max-width: 600px) {
    .wrapper {
        margin: 20px;
        padding: 15px;
    }

    .buttons {
        flex-direction: column;
        align-items: center;
    }

    .action-btn {
        margin-bottom: 10px;
        width: 100%;
    }
}
</style>
