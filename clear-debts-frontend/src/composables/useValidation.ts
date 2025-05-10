import { ref, computed } from 'vue';

export function useValidation(formRef: any) {
    const values = computed(() => formRef.value);
    const validationErrors = ref<any>({});
    const isValid = ref(true);

    const validate = () => {
        isValid.value = true;
        validationErrors.value = {};

        for(const key in values.value) {
            const value = values.value[key];

            if(!value) {
                validationErrors.value[key] = `${key} is required`;
                isValid.value = false;
            }
        }

        return isValid.value;
    }

    const setValue = (key: string, value: any) => {
        values.value[key] = value;
    }

    return {
        values,
        validationErrors,
        isValid,
        validate,
        setValue
    }
}