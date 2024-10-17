<template>
  <div>
    <h1>Товары</h1>
    <!-- Кнопка поиска -->
    <button @click="showSearch = !showSearch">
      {{ showSearch ? 'Скрыть поиск' : 'Показать поиск' }}
    </button>
    <!-- Секция поиска с фильтром по категориям и сортировкой -->
    <div v-if="showSearch" class="search-container">
      <label>
        Поиск по названию:
        <input type="text" v-model="searchQuery" placeholder="Введите название" />
      </label>
      <!-- Фильтр по категориям в виде чекбоксов -->
      <div>
        <h3>Категория:</h3>
        <div v-for="category in uniqueCategories" :key="category">
          <label>
            <input
              type="checkbox"
              :value="category"
              v-model="selectedCategories"
            />
            {{ category }}
          </label>
        </div>
      </div>
      <!-- Сортировка -->
      <label>
        Сортировать:
        <select v-model="sortKey">
          <option value="title">По имени</option>
          <option value="price">По цене</option>
        </select>
      </label>
    </div>
    <!-- Отображение карточек товаров -->
    <div class="products-container">
      <div class="product-card" v-for="product in filteredAndSortedProducts" :key="product.id" @click="openProductModal(product)">
        <img :src="product.thumbnail" alt="Product image" class="product-image" />
        <div class="product-info">
          <h2 class="product-name">{{ product.title }}</h2>
          <p class="product-price">{{ product.price }} Тг</p>
          <button @click="addToCart(product)">Добавить в корзину</button>
        </div>
      </div>
    </div>

     <!-- Модальное окно для показа выбранного товара -->
     <div v-if="selectedProduct" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeProductModal">&times;</span>
        <img :src="selectedProduct.thumbnail" alt="Product image" class="modal-product-image" />
        <div class="modal-product-info">
          <h2>{{ selectedProduct.title }}</h2>
          <p>{{ selectedProduct.price }} Тг</p>
          <p>{{ selectedProduct.description }}</p>
          <button @click="addToCart(selectedProduct)">Добавить в корзину</button>
        </div>
      </div>
    </div>

    <h2>Корзина</h2>
    <div v-for="item in cart" :key="item.id">
      <p>{{ item.title }} - {{ item.price }} Тг (кол-во: {{ item.quantity }})</p>
      <button @click="removeFromCart(item.id)">Удалить</button>
    </div>
    <p v-if="cart.length > 0">Сумма заказа: {{ totalPrice }} Тг</p>
    <!-- Оформление заказа появляется, если есть товары в корзине -->
    <div v-if="cart.length > 0">
      <form @submit.prevent="submitOrder">
        <h2>Оформление заказа</h2>
        <label for="name">Имя:</label>
        <input
          v-model="order.name"
          type="text"
          id="name"
          :class="{ 'input-error': !order.name && formSubmitted }"
        />
        <label for="address">Адрес:</label>
        <input
          v-model="order.address"
          type="text"
          id="address"
          :class="{ 'input-error': !order.address && formSubmitted }"
        />
        <button type="submit">Оформить заказ</button>
      </form>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'Home',
  props: ['products', 'cart'],
  data() {
    return {
      selectedCategories: [],
      sortKey: 'title',
      searchQuery: '',
      showSearch: false,
      order: {
        name: '',
        address: '',
      },
      formSubmitted: false,
      selectedProduct: null
    };
  },
  computed: {
    uniqueCategories() {
      const categories = this.products.map(product => product.category);
      return [...new Set(categories)];
    },
    filteredAndSortedProducts() {
      let filtered = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(product =>
          this.selectedCategories.includes(product.category)
        );
      }

      return filtered.sort((a, b) => {
        if (this.sortKey === 'title') {
          return a.title.localeCompare(b.title);
        } else if (this.sortKey === 'price') {
          return a.price - b.price;
        }
      });
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.$emit('add-to-cart', { ...product, quantity: 1 });
      }
    },
    removeFromCart(id) {
      this.$emit('remove-from-cart', id);
    },
    submitOrder() {
      this.formSubmitted = true;

      if (!this.order.name || !this.order.address) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }

      alert(`Заказ оформлен на имя ${this.order.name}, адрес: ${this.order.address}. Сумма заказа: ${this.totalPrice} ₽.`);
      this.order.name = '';
      this.order.address = '';
      this.formSubmitted = false;
      this.$emit('clear-cart');
    },
    openProductModal(product) {
      this.selectedProduct = product;
    },
    closeProductModal() {
      this.selectedProduct = null;
    },
  },
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #42b983;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  border: 1px solid #42b983;
  padding: 20px;
  width: 200px;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-name {
  flex: 1;
}

.product-price {
  margin-top: auto;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #35495e;
}

form {
  margin-top: 20px;
}

.input-error {
  border: 2px solid red;
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

.modal-product-image {
  max-width: 100%;
  height: auto;
}

.modal-product-info {
  margin-top: 20px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #35495e;
}
</style>

