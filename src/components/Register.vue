<template>
    <div>
      <h1>Регистрация</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Имя</label>
          <input v-model="name" type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="email">Эл. почта</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        email: '',
      };
    },
    methods: {
      register() {
        alert(`Регистрация успешна: ${this.name}, ${this.email}`);
        this.name = '';
        this.email = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
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
  </style>
  