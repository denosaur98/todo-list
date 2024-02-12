<template>
  <div class="todo__page">
    <SignItem/>
    <h1 class="todo__title">TODO list</h1>
    <div class="todo__item">
      <div class="item__add-block">
        <p class="item__validate" v-if="failedValidate">введите название задачи</p>
        <div :class="failedValidate ? 'item__task-error' : 'item__task-create'">
          <div class="task__binding">
            <input class="item__input" :placeholder="failedValidate ? 'введите название задачи:' : 'что нужно сделать:'" v-model="taskTitle">
            <button class="item__add" @click="addTask">
              <FontAwesomeIcon :icon="faPlus"/>
            </button>
          </div>
          <textarea :class="taskTitle ? 'item__description' : 'item__description-none'" placeholder="описание задачи:" v-model="taskDescription"/>
        </div>
      </div>
    </div>
    <TaskItem/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SignItem from '~/components/SignItem.vue';
import TaskItem from '~/components/TaskItem.vue';
import store from '~/store/index';

const taskTitle = ref('')
const taskDescription = ref('')
const failedValidate = ref(false)
function addTask() {
  if(taskTitle.value === '') {
    failedValidate.value = true
  } else {
    const taskId = store.state.tasks.length + 1
    store.dispatch('addTask', {
      id: taskId,
      title: taskTitle.value,
      description: taskDescription.value,
      done: false
    })
    taskTitle.value = ''
    taskDescription.value = ''
    failedValidate.value = false
  }
}
</script>

<style lang="scss" scoped>
.todo__page {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);

  .todo__title {
    font-family: 'Honk';
    font-size: 100px;
    margin-bottom: 50px;
  }

  .todo__item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 900px;
    min-height: 230px;
    gap: 15px;
    margin-bottom: 70px;
    border-radius: 5px;

    .item__add-block {
      display: flex;
      flex-direction: column;
      width: 100%;

      .item__validate {
        display: flex;
        position: fixed;
        font-size: 15px;
        font-family: 'Exo';
        width: 100%;
        color: rgba(211, 0, 0, 0.8);
      }

      .item__task-create {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        width: 100%;
        box-shadow: 1px 1px 5px 1px #a1a1a1;
        border-radius: 5px;
        overflow: hidden;
      }

      .item__task-error {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 1px 1px 5px 2px rgba(158, 0, 0, 0.6);
      }

      .task__binding {
        display: flex;
        flex-direction: row;

        .item__input {
          outline: none;
          border: none;
          width: 100%;
          font-size: 20px;
          font-family: 'Exo';
          padding: 10px 20px;
          text-transform: uppercase;
          background: #fff;
        }

        .item__input-error {
          outline: none;
          border: none;
          box-shadow: 1px 1px 5px 2px rgba(194, 0, 0, 0.5);
          width: 100%;
          font-size: 20px;
          font-family: 'Exo';
          padding: 10px 20px;
          text-transform: uppercase;
        }

        .item__add {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          width: 60px;
          height: 60px;
          padding: 10px;
          background: #fff;
          border: none;
        }
      }

      .item__description {
        outline: none;
        border: none;
        resize: none;
        font-size: 20px;
        padding: 15px;
        width: 100%;
        min-height: 150px;
        background: #fff;
      }

      .item__description-none {
        display: none;
      }
    }
  }
}
</style>