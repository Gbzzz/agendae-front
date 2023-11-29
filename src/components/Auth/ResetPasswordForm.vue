<template>
  <form @submit="submit">
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Token</v-label>
        <v-text-field v-model="token" variant="outlined" type="text" :hide-details="!errors.token"
          :error-messages="errors.token" color="primary"></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Nova senha</v-label>
        <v-text-field v-model="password" variant="outlined" type="password" :hide-details="!errors.password"
          :error-messages="errors.password" color="primary"></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn type="submit" color="primary" size="large" block flat :disabled="isSubmitting"
          :loading="isSubmitting">Redefinir
          senha</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script setup>
import { useAuth } from '@/store/auth';
import messages from "@/utils/messages";
import { ref } from "vue";
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['after-reset'])

const router = useRouter()
const errorMessage = ref(null)
const authStore = useAuth()

const schema = yup.object({
  token: yup.string().required().label('Token'),
  password: yup.string().required('Por favor, insira sua nova senha').min(8, 'Sua senha deve ter no mínimo 8 caracteres')
    .test('uppercase', 'Sua senha deve conter pelo menos uma letra maiúscula', value =>
      /[A-Z]/.test(value)
    )
    .test('lowercase', 'Sua senha deve conter pelo menos uma letra minúscula', value =>
      /[a-z]/.test(value)
    )
    .test('specialCharacter', 'Sua senha deve conter pelo menos um caractere especial', value =>
      /[!@#$%¨&*()_-]/.test(value)
    )
    .label('Senha'),
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const errorAlert = () => {
  ElMessage({
    message: errorMessage.value,
    type: 'error'
  })
}

const submit = handleSubmit((values) => {
  errorMessage.value = null

  return authStore.resetPassword(values.token, values.password)
    .then(() => {
      emits('after-reset')
      router.push({ name: 'login' })
    }).catch((e) => {
      errorMessage.value = messages[e.response.data.error]
      errorAlert()
    })
})

const { value: token } = useField('token');
const { value: password } = useField('password');
</script>
