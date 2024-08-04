<template lang="pug">
.container.mt-4.overflow-auto
    .row.mb-4
      .col-4
        ul.time-show-container(v-show="hours !== null && minutes !== null" class="time-display" style="margin-bottom: 0 !important; height: 100%;")
          li
            div {{ hours }}
          li
            div {{ minutes }}
      .col-4

            
      .col-4.flex-column.d-flex
        div.flex-grow-1
            .battery-status(v-show='batteryLevel !== null')
                div.d-flex.justify-content-end
                    .battery
                        .battery-level#batteryLevel
                        
            div(v-show='batteryLevel === null').
                Загрузка...

        div.d-flex.justify-content-end.flex-grow-1.gap-2(style="align-items: end;")
            span {{ _taskStore.task }}
            span :
            span {{ currentTaskLength }}
    .row
      .col-12.col-sm-6.col-md-4.mb-3(v-for="task in tasks", :key="task.id")
        .card.h-100
          .card-body.d-flex.justify-content-between.align-items-stretch.no-card-padding
            .flex-grow-1.p-3
                h5.card-title {{ task.title }}
                p.card-text {{ task.description }}
            button.btn.btn-primary.h-100(v-on:click="handleChangeTask(task.title)") Начать
            
  
</template>

<script setup>
import { ref } from 'vue';

import { taskStore } from '@/stores/task'


const batteryLevel = ref(null);

const _taskStore = taskStore()

function handleChangeTask(taskName) {
    _taskStore.setTask(taskName)
    updateTaskTime(); // Инициализируем время при монтировании компонента
    setInterval(updateTaskTime, 1000); // Обновляем время каждую минуту
}

function parseMillisecondsIntoReadableTime(milliseconds){
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
    
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
    
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
    
    
    return h + ':' + m + ':' + s;
}

const currentTaskLength = ref('');

const hours = ref('');
const minutes = ref('');

const tasks = ref([
  { id: 1, title: 'Task 1', description: 'Description for task 1' },
  { id: 2, title: 'Task 2', description: 'Description for task 2' },
  { id: 3, title: 'Task 3', description: 'Description for task 3' },
  { id: 4, title: 'Task 4', description: 'Description for task 4' },
  { id: 5, title: 'Task 5', description: 'Description for task 5' },
  { id: 6, title: 'Task 6', description: 'Description for task 6' },
  { id: 7, title: 'Task 4', description: 'Description for task 4' },
  { id: 8, title: 'Task 5', description: 'Description for task 5' },
  { id: 9, title: 'Task 6', description: 'Description for task 6' },
  { id: 7, title: 'Task 4', description: 'Description for task 4' },
  { id: 8, title: 'Task 5', description: 'Description for task 5' },
  { id: 9, title: 'Task 6', description: 'Description for task 6' },
  { id: 7, title: 'Task 4', description: 'Description for task 4' },
  { id: 8, title: 'Task 5', description: 'Description for task 5' },
  { id: 9, title: 'Task 6', description: 'Description for task 6' },
  // Добавьте больше задач по мере необходимости
]);

const updateTime = () => {
  const now = new Date();
  hours.value = now.getHours().toString().padStart(2, '0'); // Получаем часы
  minutes.value = now.getMinutes().toString().padStart(2, '0'); // Получаем минуты
};

const updateTaskTime = () => {
  const now = new Date();
  currentTaskLength.value = parseMillisecondsIntoReadableTime(now - _taskStore.start)
};

function updateBatteryStatus(battery) {
  batteryLevel.value = Math.round(battery.level * 100);
  const batteryLevelElement = document.getElementById('batteryLevel');
  batteryLevelElement.style.width = Math.round(battery.level * 100) + '%';
}

onMounted(() => {
    // Проверяем, поддерживается ли API Battery Status
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      // Обновляем значение batteryLevel при первой загрузке
      console.log('BATTAERY LOADED')
      updateBatteryStatus(battery);

      // Обновляем значение batteryLevel при изменении состояния батареи
      battery.addEventListener('levelchange', () => {
        updateBatteryStatus(battery);
      });
    });
  } else {
    batteryLevel.value = 'API Battery Status не поддерживается вашим браузером.';
  }
  updateTime(); // Инициализируем время при монтировании компонента
  setInterval(updateTime, 1000); // Обновляем время каждую минуту
});

</script>

<style scoped>

.no-card-padding {
  padding: 0 !important;
}

ul.time-show-container {
    list-style: none;
    display: flex;
    background-color: #ECE6F0;
    border-radius: 28px;
    justify-content: center;
    padding: 10px 0px;
    padding-left: 0 !important;
}
ul li {
    display: flex;
    align-items: center;
}
ul li > div {
    font-size: 48px;
    text-transform: uppercase;
    padding: 0 20px;
}
ul li:not(:last-child):after {
    content: ':';
    font-size: 30px;
    font-weight: bold;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.battery {
    width: 100px;
    height: 50px;
    border: 2px solid #000;
    position: relative;
    border-radius: 5px;
    background-color: #fff;
}

.battery-level {
height: 100%;
width: 0;
background-color: green;
border-radius: 2px;
transition: width 0.5s ease;
}

</style>