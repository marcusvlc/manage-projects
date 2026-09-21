<template>
  <form class="space-y-5" @submit.prevent="onFormSubmit">
    <CommonsFormField
      mandatory
      label="Nome do projeto"
      :error-message="getErrorMessage('name')"
    >
      <template #input>
        <CommonsTextInput
          v-model="createProjectFields.name"
          :error="isFieldInvalid('name')"
        />
      </template>
    </CommonsFormField>

    <CommonsFormField
      mandatory
      label="Cliente"
      :error-message="getErrorMessage('customer')"
    >
      <template #input>
        <CommonsTextInput
          v-model="createProjectFields.customer"
          :error="isFieldInvalid('customer')"
        />
      </template>
    </CommonsFormField>

    <div class="grid grid-cols-2 gap-4">
      <CommonsFormField
        class="w-full"
        mandatory
        label="Data de Início"
        :error-message="getErrorMessage('initDate')"
      >
        <template #input>
          <CommonsDateInput
            v-model="createProjectFields.initDate"
            :error="isFieldInvalid('initDate')"
            :-icon="CalendarArrowUp"
          />
        </template>
      </CommonsFormField>

      <CommonsFormField
        class="w-full"
        mandatory
        label="Data Final"
        :error-message="getErrorMessage('endDate')"
      >
        <template #input>
          <CommonsDateInput
            v-model="createProjectFields.endDate"
            :error="isFieldInvalid('endDate')"
            :-icon="CalendarArrowDown"
          />
        </template>
      </CommonsFormField>
    </div>

    <CommonsFormField class="w-full" label="Capa do projeto">
      <template #input>
        <CommonsAttachementInput
          v-model="createProjectFields.coverImage"
          @upload:start="fileUploading = true"
          @upload:end="fileUploading = false"
        />
      </template>
    </CommonsFormField>

    <CommonsButton
      :disabled="disableSubmit"
      class="w-full"
      label="Salvar projeto"
      type="submit"
    />
  </form>
</template>

<script lang="ts" setup>
import { CalendarArrowUp, CalendarArrowDown } from "lucide-vue-next";
import type { StoredProject } from "~/types/projects/project-types";

type CreateProjectFields = Omit<StoredProject, "initDate" | "endDate"> & {
  initDate: string | null;
  endDate: string | null;
};

const { minWords, required } = useFormValidations();
const { buildEmptyProject } = useProjectUtils();

const formSubmitted = ref(false);
const fileUploading = ref(false);
const createProjectFields = reactive<CreateProjectFields>(buildEmptyProject());

const disableSubmit = computed(
  () => (formSubmitted.value && formHasErrors()) || fileUploading.value,
);

type CreateFormFields = keyof typeof createProjectFields;

const availableValidations = (): Partial<
  Record<CreateFormFields, (value: unknown) => boolean>
> => ({
  name: (value: unknown) => minWords(value, 2),
  customer: required,
  initDate: required,
  endDate: required,
});

const fieldValidations = availableValidations();

const isFieldInvalid = (fieldName: CreateFormFields) => {
  const fieldValidation = fieldValidations[fieldName];

  if (!fieldValidation) return false;

  return (
    formSubmitted.value && !fieldValidation(createProjectFields[fieldName])
  );
};

const getErrorMessage = (fieldName: CreateFormFields): string | undefined => {
  if (!isFieldInvalid(fieldName)) return undefined;

  const errorMessages: Partial<Record<CreateFormFields, string>> = {
    name: "Por favor, digite ao menos duas palavras",
    customer: "Por favor, digite ao menos uma palavra",
    initDate: "Selecione uma data válida",
    endDate: "Selecione uma data válida",
  };

  return errorMessages[fieldName];
};

const formHasErrors = () => {
  return Object.keys(createProjectFields).some((formField) =>
    isFieldInvalid(formField as CreateFormFields),
  );
};

const clearForm = () => {
  formSubmitted.value = false;
  Object.assign(createProjectFields, buildEmptyProject());
};

const onFormSubmit = () => {
  formSubmitted.value = true;

  if (formHasErrors()) return;

  const { initDate, endDate } = createProjectFields;

  if (!initDate || !endDate) return;

  emit("submit", {
    ...createProjectFields,
    initDate,
    endDate,
  });

  clearForm();
};

const emit = defineEmits<{
  submit: [formData: StoredProject];
}>();
</script>
