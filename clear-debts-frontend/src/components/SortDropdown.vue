<template>
    <div>
        <label for="">{{ label }}</label>
        <select class="dropdown" v-model="sortValue" @change="updateValue">
            <option v-for="option in options" :value="option.value" :key="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface Option {
    label: string;
    value: string;
}

const props = defineProps<{
    label?: string;
    options: Option[];
    modelValue: string;
}>();

const sortValue = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

function updateValue(event: Event) {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
}
</script>