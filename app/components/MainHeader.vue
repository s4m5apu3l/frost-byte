<script setup lang="ts">
const { locales, setLocale } = useI18n();

const localesCustom = computed(() => {
    return locales.value.map((locale) => {
        return {
            label: locale.name,
            onSelect: () => setLocale(locale.code),
        };
    });
});
</script>

<template>
    <UHeader :toggle="false">
        <template #title>
            <span>{{ $t("name") }}</span>
        </template>

        <template #right>
            <UDropdownMenu :items="localesCustom">
                <UIcon name="i-material-symbols-light:language" class="size-5" />
            </UDropdownMenu>
        </template>
    </UHeader>
</template>
