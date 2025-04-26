<template>
    <div class="wrapper">
        <div class="buttons">
            <button v-if="!screens.login && !screens.register" @click="logout" class="action-btn" title="Выход">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
            <button v-if="screens.kinoBox || screens.variants" @click="backToSearch" class="action-btn" title="Поиск">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
        <Login title="Авторизация" v-if="screens.login" @login-success="loginHandler"
            @registration="registrationHandler" />
        <Register @register-success="registerHandler" v-if="screens.register" />
        <Search title="Выбери фильм" v-if="screens.search" @search="searchHandler" />
        <Variants title="Выберите нужный вариант" v-if="screens.variants" :movies="movies"
            @kinopoiskId="kinopoiskHandler" />
        <KinoBox v-if="screens.kinoBox" :movieId="movieId" />
        <History v-if="!screens.login && !screens.register && !screens.kinoBox" @watchMovie="kinopoiskHandler" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Login from './Login.vue';
import Search from './Search.vue';
import KinoBox from './KinoBox.vue';
import Variants from './Variants.vue';
import Register from './Register.vue';
import { checkAuth } from '../api/mokky';
import History from './History.vue';


const screens = reactive({
    login: false,
    register: false,
    search: false,
    kinoBox: false,
    variants: false
})
const movies = ref([]);
const movieId = ref('');

const manageScreens = (screen) => {
    for (const key in screens) {
        screens[key] = key === screen;
    }
}

const loginHandler = () => {
    manageScreens('search')
}

const searchHandler = (movieList) => {
    movies.value = movieList;
    manageScreens('variants');
}

const kinopoiskHandler = (kinopoiskId) => {
    movieId.value = kinopoiskId.toString();
    manageScreens('kinoBox');
}

const logout = () => {
    manageScreens('login');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
}

const backToSearch = () => {
    manageScreens('search');
}

const registerHandler = () => {
    manageScreens('login');
}

const registrationHandler = () => {
    manageScreens('register');
}

onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
        checkAuth(token)
            .then(data => {
                if (data?.fullName) {
                    localStorage.setItem('user_id', data.id);
                    manageScreens('search'); // Открываем последний экран или поиск по умолчанию
                } else {
                    manageScreens('login'); // Если данные некорректные — отправляем на логин
                }
            })
            .catch(err => {
                console.error(err);
                manageScreens('login'); // В случае ошибки тоже отправляем на логин
            });
    } else {
        manageScreens('login'); // Если нет токена — показываем логин
    }
});


</script>

<style scoped>
.wrapper {
    max-width: 800px;
    margin: 50px auto;
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
