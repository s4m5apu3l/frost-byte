<script setup lang="ts">
const form = ref({
    name: '',
    email: '',
    message: ''
});

const isSubmitting = ref(false);

const submitForm = async () => {
    isSubmitting.value = true;
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Очистка формы после отправки
    form.value = {
        name: '',
        email: '',
        message: ''
    };
    
    isSubmitting.value = false;
};
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-8 max-w-[520px] w-full">
        <div class="form-field">
            <UInput 
                v-model="form.email"
                :placeholder="$t('form.mail')"
                required
                class="w-full"
            />
        </div>
    
        
        <div class="form-field">
            <UTextarea 
                v-model="form.message"
                :placeholder="$t('form.message')"
                class="w-full"
                :rows="4"
                required
            />
        </div>
        
        <div class="form-field">
            <UButton 
                type="submit"
                :loading="isSubmitting"
                variant="outline"
                class="justify-center cursor-pointer w-full py-4 text-lg font-light border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 "
            >
                {{ $t('form.submit') }}
            </UButton>
        </div>
    </form>
</template>