<template>
    <div>
      <h1>Оформление заказа</h1>
      <div v-if="cart.length">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <h2>{{ item.name }}</h2>
          <p>Цена: {{ item.price }} ₽</p>
        </div>
        <p>Итого: {{ totalPrice }} ₽</p>
        <form @submit.prevent="processPayment">
          <input type="text" v-model="cardNumber" placeholder="Номер карты" required />
          <button type="submit">Оплатить</button>
        </form>
      </div>
      <p v-else>Корзина пуста</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Checkout',
    props: ['cart'],
    data() {
      return {
        cardNumber: '',
      };
    },
    computed: {
      totalPrice() {
        return this.cart.reduce((total, item) => total + item.price, 0);
      },
    },
    methods: {
      processPayment() {
        if (this.cardNumber.length === 16) {
          alert(`Оплата прошла успешно! Сумма: ${this.totalPrice} ₽`);
          this.$emit('clear-cart');
          this.$router.push('/');
        } else {
          alert('Неверный номер карты!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
  }
  </style>
  