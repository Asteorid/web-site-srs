<template>
  <div class="user-list-container">
    <h1 class="title">Список пользователей</h1>
    <table class="user-table">
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
            <input v-model="user.name" class="user-input" />
          </td>
          <td>
            <input v-model="user.username" class="user-input" />
          </td>
          <td>
            <input v-model="user.email" class="user-input" />
          </td>
          <td>
            <button @click="saveUser(user.id)" class="save-btn">Сохранить</button>
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
        .then((response) => response.json())
        .then((data) => {
          this.users = data; // Сохраняем полученные данные в состоянии компонента
        });
    },
    saveUser(id) {
      // Логика для сохранения изменений
      const user = this.users.find((user) => user.id === id);
      console.log(`Сохраняем пользователя ${id} с новыми данными:`, user);
    },
  },
};
</script>

<style scoped>
.user-list-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #35495e;
  margin-bottom: 20px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden
}

thead {
  background-color: #42b983;
  color: white;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}


.user-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.user-input:focus {
  border-color: #42b983;
  outline: none;
}

.save-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.save-btn:hover {
  background-color: #35495e;
}

.save-btn:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .user-list-container {
    padding: 10px;
  }

  .title {
    font-size: 1.5rem;
  }

  th, td {
    padding: 8px 10px;
  }

  .save-btn {
    padding: 8px 15px;
  }
}
</style>
