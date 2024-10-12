<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/register">Регистрация</router-link>
      <router-link to="/json-table">Json Данные</router-link>
      <router-link to="/about">О нас</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
header {
  background-color: #42b983;
  padding: 10px 0;
}
nav {
  display: flex;
  justify-content: center;
  gap: 50px; /* Увеличиваем расстояние между ссылками */
}
a {
  color: #ffffff; /* Изменяем цвет текста */
  text-decoration: none; /* Убираем подчеркивание */
  font-weight: bold;
}
a:hover {
  color: #b3b6b5; /* Изменяем цвет текста при наведении */
}
</style>
