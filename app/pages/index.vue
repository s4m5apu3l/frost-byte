<script setup></script>

<template>
    <div class="l-wrapper">
        <section class="h-screen">
            <div
                class="absolute bottom-0 flex justify-center w-full left-0"
                v-gsap.magnetic.strong
                v-gsap.entrance.slide-bottom
            >
                <h1 class="text-[20vw] leading-[110%] font-bold">{{ $t("name") }}</h1>
            </div>
        </section>

        <section
            class="h-screen flex items-center justify-center"
            v-gsap.whenVisible.from="{
                opacity: 0,
                start: 'top 50%',
                end: 'bottom 50%',
            }"
        >
            <FastGoodCheap />
        </section>
        <section class="h-screen flex items-center justify-center">
            <ContactForm />
        </section>
    </div>
</template>

<style scoped>

</style>
