import { ref } from 'vue';

export function useValidation(initialValues: any) {
    const values = ref({...initialValues});
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