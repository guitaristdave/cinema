<template>
    <div class="login-container">
        <h2>{{ props.title }}</h2>
        <input type="text" placeholder="Логин" v-model="login" @keyup.enter="submit" class="input-field">
        <input type="password" placeholder="Пароль" v-model="password" @keyup.enter="submit" class="input-field">
        <p class="error" v-if="error">{{ error }}</p>
        <button @click="submit" class="submit-btn">Войти</button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { LOGIN, PASSWORD } from '../data/creds';

const props = defineProps({
    title: String
});

const emit = defineEmits([
    'login-success'
]);

const login = ref('');
const password = ref('');
const error = ref(null);

const submit = () => {
    if (login.value === LOGIN && password.value === PASSWORD) {
        error.value = null;
        emit('login-success');
        localStorage.setItem('logged', 'true');
    } else {
        error.value = 'Invalid login or password';
        login.value = '';
        password.value = '';
    }
};

onMounted(() => {
    if (localStorage.getItem('logged') === 'true') {
        emit('login-success');
    }
});
</script>

<style scoped>
.login-container {
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

.submit-btn {
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

.submit-btn:hover {
    background-color: #0056b3;
}

.submit-btn:focus {
    outline: none;
}

@media (max-width: 500px) {
    .login-container {
        margin: 20px;
        padding: 15px;
    }
}
</style>
