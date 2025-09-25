<script setup></script>

<template>
    <div class="l-wrapper">
        <section class="h-screen">
            <div class="absolute bottom-0 flex justify-center w-full left-0">
                <h1 class="text-[200px] font-bold">{{ $t("name") }}</h1>
            </div>
        </section>

        <section>
            <FastGoodCheap />
        </section>
    </div>
</template>
