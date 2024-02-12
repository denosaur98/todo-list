<template>
  <div class="task__page">
    <h1 class="page__title" v-if="store.state.tasks.length > 0">Задачи</h1>
    <div :class="[isChecked(task.id) ? 'task__element-done' : 'task__element']" class="task__element" v-for="task in store.state.tasks" :key="task.id">
      <div class="task__title-block">
        <h1 class="task__title" v-if="!isEditing[task.id]">{{ task.title }}</h1>
        <input class="task__title-edit" v-else :value="editTitle[task.id]" @input="editTitle[task.id] = $event.target.value">
        <div class="task__btns">
          <div :class="[isChecked(task.id) ? 'checked' : 'checkbox']" @click="toggleCheckbox(task.id)">
            <FontAwesomeIcon :icon="faCheck" class="checkbox__checkmark"/>
          </div>
          <button class="task__edit" @click="toggleEdit(task.id)">
            <FontAwesomeIcon :icon="faEdit" v-if="!isEditing[task.id]"/>
            <FontAwesomeIcon :icon="faCheck" v-else/>
          </button>
          <button class="task__remove" v-if="!isEditing[task.id]" @click="removeTask(task.id)">
            <FontAwesomeIcon :icon="faRemove"/>
          </button>
          <button class="task__remove" v-else @click="cancelTaskEdit(task.id)">
            <FontAwesomeIcon class="arrow__back" :icon="faArrowRotateLeft"/>
          </button>
        </div>
      </div>
      <p class="data__description" v-if="!isEditing[task.id]">{{ task.description }}</p>
      <textarea class="data__description-edit" placeholder="введите описание задачи" v-else :value="editDescription[task.id]" @input="editDescription[task.id] = $event.target.value"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRemove, faCheck, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import store from '../store/index';

function removeTask(id) {
  store.commit('removeTask', id);
}

const isEditing = ref({})
const editTitle = ref({})
const editDescription = ref({})
function toggleEdit(id) {
  if(isEditing.value[id]) {
    saveTask(id)
  } else {
    startEdit(id)
  }
  isEditing.value[id] = !isEditing.value[id]
}
function startEdit(id) {
  const task = store.state.tasks.find(t => t.id === id)
  editTitle.value[id] = task.title
  editDescription.value[id] = task.description
}
function saveTask(id) {
  store.commit('updateTask', { id, title: editTitle.value[id], description: editDescription.value[id] })
}
function cancelTaskEdit(id) {
  isEditing.value[id] = false
}
function isChecked(id) {
  const task = store.state.tasks.find(task => task.id === id)
  return task ? task.done : false
}
function toggleCheckbox(id) {
  store.commit('toggleCheckbox', id)
}
</script>

<style lang="scss" scoped>
.task__page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  .page__title {
    font-family: 'ExoBold';
    font-size: 40px;
    font-weight: 900;
    margin-bottom: 20px;
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 7px;
    text-decoration-thickness: 3px;
  }

  .task__element {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    box-shadow: 1px 1px 5px 2px #8d8d8d;
    border-radius: 5px;
    min-height: 150px;
    width: 900px;
    padding: 15px;
    box-sizing: border-box;


    .task__title-block {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      .task__title {
        font-size: 20px;
        font-family: 'Exo';
        margin-bottom: 20px;
        max-width: 650px;
        text-transform: uppercase;
      }

      .task__title-edit {
        font-size: 20px;
        font-family: 'Exo';
        margin-bottom: 20px;
        max-width: 650px;
        text-transform: uppercase;
        font-size: 15px;
        border: none;
        box-shadow: 1px 1px 5px 1px #8d8d8d;
        border-radius: 5px;
        padding: 5px 10px;
        outline: none;
      }

      .task__btns {
        display: flex;
        align-items: flex-start;
        gap: 10px;

        .checkbox {
          cursor: pointer;
          display: flex;
          padding: 2px;
          width: 21px;
          height: 21px;
          background: none;
          border: 1px solid #8d8d8d;
          border-radius: 5px;

          .checkbox__checkmark {
            display: none;
          }
        }

        .checked {
          background: #000;
          cursor: pointer;
          display: flex;
          padding: 2px;
          width: 20px;
          height: 20px;
          border: 1px solid #8d8d8d;
          color: #fff;
          border-radius: 5px;
        }

        .task__edit {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: none;
          border: none;
          margin-left: auto;
          font-size: 20px;
        }

        .task__remove {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          background: none;
          border: none;
          margin-left: auto;
          font-size: 24px;

          .arrow__back {
            font-size: 18px;
          }
        }
      }
    }

    .data__description {
      width: 100%;
      font-family: 'Exo';
      font-size: 18px;
    }

    .data__description-edit {
      width: 100%;
      font-family: 'Exo';
      font-size: 18px;
      resize: none;
      height: 100%;
      border: none;
      box-shadow: 1px 1px 5px 1px #8d8d8d;
      border-radius: 5px;
      padding: 5px 10px;
      outline: none;
    }
  }

  .task__element-done {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    box-shadow: 1px 1px 5px 2px #8d8d8d;
    border-radius: 5px;
    min-height: 150px;
    width: 900px;
    padding: 15px;
    box-sizing: border-box;
    background: rgb(181,238,174);
    background: radial-gradient(circle, rgba(181,238,174,0.8) 0%, rgba(191,233,148,0.8) 100%);
  }
}
</style>