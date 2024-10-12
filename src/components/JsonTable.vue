<template>
    <div>
      <h1>Список пользователей</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Имя пользователя</th>
            <th>Email</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <input v-model="user.name" />
            </td>
            <td>
              <input v-model="user.username" />
            </td>
            <td>
              <input v-model="user.email" />
            </td>
            <td>
              <button @click="saveUser(user.id)">Сохранить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [], // Здесь будут храниться данные пользователей
      };
    },
    created() {
      this.fetchUsers(); // Автоматически загружаем данные при создании компонента
    },
    methods: {
      fetchUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => {
            this.users = data; // Сохраняем полученные данные в состоянии компонента
          });
      },
      saveUser(id) {
        // Логика для сохранения изменений
        const user = this.users.find(user => user.id === id);
        console.log(`Сохраняем пользователя ${id} с новыми данными:`, user);
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  input {
    width: 100%;
  }
  </style>
  