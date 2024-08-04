<template lang="pug">
  nav.navbar.navbar-expand-lg.bg-light
    .container
      #navbarNav.collapse.navbar-collapse.d-flex.justify-content-around.navbar-expand-sm
        ul.navbar-nav.d-flex.justify-content-around.w-100
          li.nav-item
            a.nav-link(:class="{ active: isActive('home') }", @click="setActive('home')", href="#") Запись времени
          li.nav-item
            a.nav-link(:class="{ active: isActive('features') }", @click="setActive('features')", href="#") Сохраненные записи
        .navbar-icon.ms-auto.d-flex.gap-2
          i.fas.fa-cog
            img(src="@/assets/gear.svg")
          i.fas.fa-cog
            img(src="@/assets/fullscreen.svg" @click="toggleFullscreen")

  TimeTraker

</template>

<script setup>
import { ref } from 'vue';

const activeItem = ref('home');

const setActive = (item) => {
  activeItem.value = item;
};

const isActive = (item) => {
  return activeItem.value === item;
};

const toggleFullscreen = () => {
  const appElement = document.getElementById('nuxt-root');

  if (!document.fullscreenElement) {
    appElement.requestFullscreen().catch(err => {
      console.error(`Ошибка при попытке перейти в полноэкранный режим: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
};

</script>


<script>

import TimeTraker from '@/components/TimeTraker'


</script>

<style scoped>

.fa-cog img{
  width: 25px;
}

.nav-link {
  position: relative;
  padding-bottom: 5px; /* Отступ снизу для подчеркивания */
}

.nav-link.active {
  font-weight: bold; /* Увеличение жирности текста */
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 50%; /* Центрируем подчеркивание */
  bottom: 0; /* Располагаем подчеркивание под текстом */
  height: 2px; /* Толщина подчеркивания */
  background-color: #007bff; /* Цвет подчеркивания */
  width: 80%; /* Ширина подчеркивания будет равна ширине текста */
  transform: translateX(-50%); /* Сдвиг влево на 50% для центрирования */
}

</style>