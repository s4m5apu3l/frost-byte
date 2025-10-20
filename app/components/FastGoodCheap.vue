<script setup lang="ts">
const fast = ref(false);
const good = ref(false);
const cheap = ref(false);

// Логика: можно выбрать максимум 2, при выборе третьего - выключается первый выбранный
watch(fast, (newVal) => {
    if (newVal && good.value && cheap.value) {
        good.value = false;
    }
});

watch(good, (newVal) => {
    if (newVal && fast.value && cheap.value) {
        cheap.value = false;
    }
});

watch(cheap, (newVal) => {
    if (newVal && fast.value && good.value) {
        fast.value = false;
    }
});
</script>

<template>
    <div class="toggles space-y-8">
        <label class="toggle-item flex items-center justify-between cursor-pointer group w-80">
            <span class="text-2xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300 text-white">
                {{ $t("toggle.fast") }}
            </span>
            <USwitch 
                v-model="fast" 
                color="neutral"
                class="scale-125"
            />
        </label>

        <label class="toggle-item flex items-center justify-between cursor-pointer group w-80">
            <span class="text-2xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300 text-white">
                {{ $t("toggle.good") }}
            </span>
            <USwitch 
                v-model="good" 
                color="neutral"
                class="scale-125"
            />
        </label>

        <label class="toggle-item flex items-center justify-between cursor-pointer group w-80">
            <span class="text-2xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300 text-white">
                {{ $t("toggle.cheap") }}
            </span>
            <USwitch 
                v-model="cheap" 
                color="neutral"
                class="scale-125"
            />
        </label>
    </div>
</template>
