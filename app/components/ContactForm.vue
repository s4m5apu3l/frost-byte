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
    <form @submit.prevent="submitForm" class="space-y-8">
        <div class="form-field">
            <UInput 
                v-model="form.name"
                :placeholder="$t('form.name')"
                variant="none"
                class="w-full border-b border-white bg-transparent text-white placeholder-gray-400 pb-2 text-lg font-light"
                required
            />
        </div>
        
        <div class="form-field">
            <UInput 
                v-model="form.email"
                type="email"
                :placeholder="$t('form.email')"
                variant="none"
                class="w-full border-b border-white bg-transparent text-white placeholder-gray-400 pb-2 text-lg font-light"
                required
            />
        </div>
        
        <div class="form-field">
            <UTextarea 
                v-model="form.message"
                :placeholder="$t('form.message')"
                variant="none"
                class="w-full border-b border-white bg-transparent text-white placeholder-gray-400 pb-2 resize-none text-lg font-light"
                :rows="4"
                required
            />
        </div>
        
        <div class="form-field">
            <UButton 
                type="submit"
                :loading="isSubmitting"
                variant="outline"
                color="neutral"
                class="w-full py-4 text-lg font-light border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 tracking-widest"
            >
                {{ $t('form.submit') }}
            </UButton>
        </div>
    </form>
</template>