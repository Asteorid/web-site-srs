<template>
    <div>
      <h1>Корзина</h1>
      <div v-if="cart.length">
        <div class="cart-item" v-for="item in cart" :key="item.id">
          <h2>{{ item.name }}</h2>
          <p>{{ item.price }} Тг</p>
          <button @click="removeFromCart(item.id)">Удалить</button>
        </div>
        <button @click="clearCart">Очистить корзину</button>
      </div>
      <p v-else>Ваша корзина пуста.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cart',
    props: ['cart'],
    methods: {
      removeFromCart(id) {
        this.$emit('remove-from-cart', id);
      },
      clearCart() {
        this.$emit('clear-cart');
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
    border: 1px solid #42b983;
    padding: 20px;
    margin: 20px;
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
  </style>
  