<template>
  <div class="sign__page">
    <div class="sign__btn-block">
      <button class="sign__btn">
        <FontAwesomeIcon :icon="faUser" class="sign__icon"/>
      </button>
      <div class="autorization__btns-block">
        <button class="autorization__btn" @click="toggleModal('login')">Вход</button>
        <button class="autorization__btn" @click="toggleModal('register')">Регистрация</button>
      </div>
    </div>
    <div class="sign__overlay" v-if="loginModalVisible || registerModalVisible" @click="toggleModal(loginModalVisible ? 'login' : 'register')"></div>
    <div class="sign__modal" v-if="loginModalVisible">
      <h1 class="modal__title">Вход</h1>
      <div class="modal__inputs">
        <input class="input__user" placeholder="введите адрес эл.почты:">
        <input class="input__password" placeholder="введите пароль:" type="password">
      </div>
      <button class="modal__submit">Войти</button>
    </div>
    <div class="sign__modal" v-if="registerModalVisible">
      <h1 class="modal__title">Регистрация</h1>
      <div class="modal__inputs">
        <div class="input__wrapper">
          <p class="input__validate" v-if="validateErrorName">{{ validateErrorName }}</p>
          <input class="input__user" placeholder="введите адрес эл.почты:" v-model="registerMail">
        </div>
        <div class="input__wrapper">
          <p class="input__validate" v-if="validateErrorPass">{{ validateErrorPass }}</p>
          <input
            class="input__password"
            :placeholder="registerPassword !== registerPasswordAgain ? 'пароли не совпадают' : 'введите пароль:'"
            type="password"
            v-model="registerPassword"
          >
        </div>
        <div class="input__wrapper">
          <p class="input__validate" v-if="validateErrorPass">{{ validateErrorPass }}</p>
          <input
            class="input__password"
            :placeholder="registerPassword !== registerPasswordAgain ? 'пароли не совпадают' : 'введите пароль:'"
            type="password"
            v-model="registerPasswordAgain"
          >
        </div>
      </div>
      <button class="modal__submit" @click="createUser">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import store from '~/store';

const loginModalVisible = ref(false)
const registerModalVisible = ref(false)
const registerMail = ref('')
const registerPassword = ref('')
const registerPasswordAgain = ref('')
const validateErrorName = ref('')
const validateErrorPass = ref('')
function toggleModal(modal) {
  if (modal === 'login') {
    loginModalVisible.value = !loginModalVisible.value
  } else {
    registerModalVisible.value = !registerModalVisible.value
    registerMail.value = ''
    registerPassword.value = ''
    registerPasswordAgain.value = ''
    validateErrorName.value = ''
    validateErrorPass.value = ''
  }
}
function createUser() {
  const findUser = store.state.users.find(n => n.userName === registerMail.value)
  if(registerPassword.value !== registerPasswordAgain.value) {
    validateErrorPass.value = 'пароли не совпадают'
  } else if(findUser) {
    validateErrorName.value = 'пользователь с таким именем уже существует'
  } else {
    const userId = store.state.users.length + 1
    store.dispatch('createUser', {
      id: userId,
      userName: registerMail.value,
      userPassword: registerPassword.value
    })
    registerMail.value = ''
    registerPassword.value = ''
    registerPasswordAgain.value = ''
    validateErrorName.value = ''
    validateErrorPass.value = ''
    registerModalVisible.value = false
    console.log(store.state.users)
  }
}
</script>

<style lang="scss" scoped>
.sign__page {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px 40px;
  width: 100%;

  .sign__btn-block {
    display: flex;
    align-items: center;
    width: 150px;
    gap: 10px;

    .sign__btn {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: none;
      border: 2px solid #646464;
      border-radius: 50%;
      padding: 10px;

      .sign__icon {
        width: 20px;
        height: 20px;
        color: #646464;
      }
    }

    .autorization__btns-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;

      .autorization__btn {
        cursor: pointer;
        background: none;
        font-size: 15px;
        border: none;
        color: #2c2c2c;

        &:hover {
          transition: 0.3s;
          color: #646464;
        }
      }
    }
  }

  .sign__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(0, 0, 0, 0.5);
    z-index: 999;
  }

  .sign__modal {
    position: fixed;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 500px;
    background: #ffffff;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    .modal__title {
      font-family: 'ExoBold';
      margin-top: 50px;
      font-size: 40px;
    }

    .modal__inputs {
      display: flex;
      flex-direction: column;
      gap: 25px;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 60px;

      .input__wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;

        .input__validate {
          margin-right: auto;
          color: rgba(211, 0, 0, 0.8);
          font-size: 15px;
          font-family: 'Exo';
          text-align: left;
          position: absolute;
          margin-top: -20px;
        }

        .input__user, .input__password {
          border: none;
          outline: none;
          padding: 10px;
          box-shadow: 1px 1px 5px 2px #8d8d8d;
          width: 100%;
          border-radius: 5px;
          font-size: 20px;
        }
      }
    }

    .modal__submit {
      cursor: pointer;
      padding: 10px;
      font-size: 25px;
      font-family: 'ExoBold';
      border: none;
      box-shadow: 1px 1px 5px 2px #8d8d8d;
      background: none;
      margin-top: 40px;
      border-radius: 5px;
    }
  }
}
</style>