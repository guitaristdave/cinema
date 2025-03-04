<template>
    <div class="wrapper">
        <div class="buttons">
            <button v-if="showKinoBox" @click="backToSearch">Поиск</button>
            <button v-if="!showLogin" @click="logout">Выход</button>
        </div>
        <Login title="Войдите" v-if="showLogin" @login-success="loginHandler" />
        <Search title="Search" v-if="showSearch" @search="searchHandler" />
        <Variants title="Выбери нужный вариант" v-if="showVariants" :movies="movies" @kinopoiskId="kinopoiskHandler" />
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #f5e9e9;
}

.buttons {
    display: flex;
    gap: 20px;
    position: absolute;
    top: 0;
    padding: 5px;
}
</style>