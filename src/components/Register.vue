<template>
    <div class="register-container">
        <h2>Регистрация</h2>
        <div class="register-form">
            <input v-model="name" type="text" placeholder="Имя" required>
            <input v-model="email" type="email" placeholder="E-mail" required>
            <input v-model="password" type="password" placeholder="Пароль" required>
            <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" required>
            <p v-if="message">{{ message }}</p>
            <button @click="sendRegistration">Зарегистрироваться</button>
        </div>
    </div>
</template>

<script setup>
import { register } from '../api/mokky';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const message = ref(null);



const prepareData = () => {
    console.log(password.value, confirmPassword.value);
    if (password.value !== confirmPassword.value) {
        message.value = 'Пароли не совпадают';
        return null;
    }
    if (!name.value || !email.value || !password.value) {
        message.value = 'Заполните все поля';
        return null;
    }
    const data = {
        fullName: name.value,
        email: email.value,
        password: password.value
    };
    return data;
}

const emit = defineEmits(['register-success']);


const sendRegistration = async () => {
    const data = prepareData();
    if (!data) return;
    try {
        const response = await register(data);

        localStorage.setItem('token', response.token); 

        message.value = 'Успешная регистрация';
        emit('register-success');
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        message.value = 'Произошла ошибка при регистрации';
    }
};



</script>

<style scoped>
.register-container {
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

.register-form input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

.register-form input:focus {
    border-color: #007bff;
    outline: none;
}

input:focus::placeholder {
    color: transparent;
}

p {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}

button {
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

button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
}

@media (max-width: 500px) {
    .register-container {
        margin: 20px;
        padding: 15px;
    }
}
</style>