<template>
    <div>
      <h1>Личный кабинет</h1>
      
      <!-- Проверка на загрузку данных -->
      <div v-if="user">
        <!-- Отображение данных пользователя -->
        <div class="user-profile">
          <p><strong>Имя:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Адрес:</strong> {{ user.address.street }}</p>
          <button @click="openEditModal">Редактировать данные</button>
        </div>
  
        <!-- Модальное окно для редактирования данных пользователя -->
        <div v-if="showEditModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeEditModal">&times;</span>
            <h2>Редактировать данные</h2>
            <label>
              Имя:
              <input v-model="editedUser.name" type="text" />
            </label>
            <label>
              Email:
              <input v-model="editedUser.email" type="email" />
            </label>
            <label>
              Адрес:
              <input v-model="editedUser.address.street" type="text" />
            </label>
            <button @click="saveChanges">Сохранить изменения</button>
          </div>
        </div>
      </div>
  
      <!-- Если данные еще загружаются -->
      <div v-else>
        <p>Загрузка данных...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserProfile',
    data() {
      return {
        user: null, // Инициализируем объект user как null, пока данные загружаются
        showEditModal: false,
        editedUser: null,
      };
    },
    mounted() {
      // Загружаем данные о пользователе из API
      fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then(data => {
          this.user = data; // После загрузки присваиваем данные в user
        });
    },
    methods: {
      openEditModal() {
        this.editedUser = { ...this.user }; // Создаем копию данных пользователя для редактирования
        this.showEditModal = true;
      },
      closeEditModal() {
        this.showEditModal = false;
      },
      saveChanges() {
        this.user = { ...this.editedUser }; // Обновляем оригинальные данные пользователя
        this.closeEditModal(); // Закрываем модальное окно
      },
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    border: 1px solid #42b983;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #35495e;
  }
  
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    max-width: 90%;
    text-align: center;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
  }
  </style>
  