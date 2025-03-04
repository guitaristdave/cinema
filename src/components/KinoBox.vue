<template>
    <div class="kinobox_player"></div>
</template>

<script setup>

import { onMounted } from 'vue';

const props = defineProps({
    movieId: String // kinopoisk id
})

onMounted(async () => {
    await kbox(".kinobox_player", {
        search: {
            kinopoisk: props.movieId,
        }
    });
});

</script>

<style scoped>
.kinobox_player {
    width: 100%;
    height: 100%;
}
</style>