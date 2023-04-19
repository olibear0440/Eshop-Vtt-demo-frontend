<template>
  <div class="product-detail-page">
    <div class="vtts-item-details">
      <div class="vttImg">
        <img :src="vttDetails.imageUrl" alt="vttDetails.name" />
      </div>
      <div class="vttDetails">
        <h3 class="vttTitle">{{ vttDetails.name }}</h3>
        <h4 class="vttPrice">{{ vttDetails.price }} €</h4>
        <p class="vttDescription">{{ vttDetails.description }}</p>
        <p class="vttRating">Avis: {{ vttDetails.averageRating }}/5</p>
      </div>
    </div>
    <!--<router-link class="btnToCart" :to="`/cart`"
      ><button>Ajouter au panier</button></router-link
    >-->
    <button @click="addToCart(vttDetails._id)">Ajouter au panier</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters} from "vuex";
export default {
  name: "Product-detail",

  computed: {
    ...mapGetters(["vttDetails"]),
    
  },
  methods: {
    ...mapActions(["getVtt"]),

    
  },
  mounted() {
    this.getVtt(this.$route.params.id);
  },
};
</script>
<style scoped>
.product-detail-page {
  height: auto;
  width: 1440px;
  margin: 0 auto;
  padding: 30px;
  background: rgb(195, 243, 192);
  background: linear-gradient(
    90deg,
    rgba(195, 243, 192, 1) 0%,
    rgba(126, 224, 129, 1) 59%,
    rgba(71, 168, 81, 1) 100%
  );
}
.vtts-item-details {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: white;
  margin-bottom: 40px;
}
.vttImg {
  width: 70%;
  height: auto;
}
img {
  width: 100%;
  height: auto;
  padding: 40px 5px;
}
.vttDetails {
  width: 30%;
  height: 648px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.vttTitle {
  font-size: 2em;
  color: #0e9f56;
  margin-bottom: 80px;
  letter-spacing: 0.1rem;
  margin-top: 50px;
}
.vttPrice {
  font-size: 2em;
  margin-bottom: 40px;
  color: #0e9f56;
}
.vttDescription {
  font-size: 1.4em;
  margin-bottom: 20px;
  text-align: justify;
  padding: 15px;
  color: #7ee081;
}
.vttRating {
  font-size: 1.4em;
}
button {
  padding: 12px 23px;
  letter-spacing: 0.1rem;
}
</style>
