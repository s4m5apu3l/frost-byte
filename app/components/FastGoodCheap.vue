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
    <div class="toggles space-y-3">
        <label class="flex items-center gap-3 cursor-pointer">
            <USwitch v-model="fast" color="neutral" />
            <span>{{ $t("toggle.fast") }}</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
            <USwitch v-model="good" color="neutral" />
            <span>{{ $t("toggle.good") }}</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
            <USwitch v-model="cheap" color="neutral" />
            <span>{{ $t("toggle.cheap") }}</span>
        </label>
    </div>
</template>
