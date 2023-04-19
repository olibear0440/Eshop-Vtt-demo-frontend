<template>
  <div class="cart">
    <div class="cart-item" v-for="item in vttToCart" :key="item.id">
      {{ item.name }}
      <!--<img :src="item.imageUrl" alt="name" />
      <h3 class="vttTitle">{{ item.name }}</h3>
      <h4 class="vttPrice">{{ item.price }} €</h4>
      <h4 class="vttQty">{{ item.quantity }}</h4>
      <h4 class="total">{{ total }}</h4>-->
    </div>
    <p>Total: {{ total }}</p>

    <button class="cart-validation"></button>
  </div>
</template>
<script>
//import { mapState } from "vuex";
export default {
  name: "cart-page",
  
  methods: {
    //...mapMutations(["removeFromCart", "updateQuantity"]),
  },
};
</script>
<style scoped>
.cart cart-items{
  height: auto;
  width: auto;
}</style>
