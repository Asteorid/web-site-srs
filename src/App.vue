<template>
  <div>
    <Header />
    <router-view
      :products="products"
      :cart="cart"
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
      @clear-cart="clearCart"
    />
    </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      products: [],
      cart: [],
      showModal: false,
      selectedProduct: {},
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        this.products = data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(item => item.id !== id);
    },
    clearCart() {
      this.cart = [];
    },
    openModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedProduct = {};
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}
</style>
