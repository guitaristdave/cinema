<template>
    <div class="login-container" >
        <h2>{{ props.title }}</h2>
        <input type="text" placeholder="Login" v-model="login" @keyup.enter="submit">
        <input type="password" placeholder="Password" v-model="password" @keyup.enter="submit">
        <p class="error" v-if="error">{{ error }}</p>
        <button @click="submit">Login</button>
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

.login-container{
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


</style>