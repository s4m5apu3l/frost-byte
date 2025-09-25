<script setup lang="ts">
const { locales, setLocale } = useI18n();
</script>

<template>
    <header>
        <nav class="flex gap-2">
            <nuxt-link to="/">home</nuxt-link>
            <nuxt-link to="/about">about</nuxt-link>
            <nuxt-link :to="$localePath('/about')">about with local</nuxt-link>
        </nav>

        <div>
            <button v-for="locale in locales" @click="setLocale(locale.code)">
                {{ locale.name }}
            </button>
        </div>
    </header>
</template>
