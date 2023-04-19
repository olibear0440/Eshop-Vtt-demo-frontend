<template>
  <div class="home">
    <div class="productsContent">
      <div class="vtts-item" v-for="vtt in vtts" :key="vtt.id">
        <h3 class="vttTitle">{{ vtt.name }}</h3>
        <img :src="vtt.imageUrl" alt="vtt.name" />
        <h4 class="vttPrice">{{ vtt.price }} €</h4>
        <router-link class="btnToDetails" :to="`/vtt/${vtt._id}`">
          <button>Voir le detail</button>
        </router-link>
      </div>
      <router-view />
    </div>

    <div class="createProduct">
      <form
        action="/upload"
        method="POST"
        name="createProductForm"
        class="formBloc"
        enctype="multipart/form-data"
      >
        <div class="formControl">
          <input
            type="text"
            v-model="name"
            placeholder="nom du produit"
            id="name"
            name="name"
            aria-label="nom du produit"
            required
          />
          <input
            type="number"
            v-model="price"
            placeholder="prix du produit"
            id="price"
            name="price"
            aria-label="prix du produit"
            required
          />
          <textarea
            v-model="description"
            placeholder="description du produit"
            id="description"
            name="description"
            aria-label="description du produit"
            required
          ></textarea>
          <input
            type="number"
            v-model="averageRating"
            min="1"
            max="5"
            placeholder="classement du produit"
            id="averageRating"
            name="averageRating"
            aria-label="classement du produit"
            required
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            id="imageUrl"
            ref="myFiles"
            @change="uploadFile()"
            name="imageUrl"
            aria-label="photo du produit"
            required
          />
          <span id="createProductError"></span>
          <button
            type="button"
            @click="btnCreateProduct()"
            id="createProduct"
            name="createProduct"
            class="createProduct"
          >
            ajouter un produit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  data: () => {
    return {
      name: "",
      price: "",
      file: "",
      description: "",
      averageRating: "",
    };
  },

  created() {
    this.getAllVtts();
  },
  computed: {
    ...mapGetters(["vtts"]),
  },
  methods: {
    ...mapActions(["getAllVtts"]),
    uploadFile() {
      this.file = this.$refs.myFiles.files[0];
    },

    btnCreateProduct() {
      const createProductError = document.getElementById("createProductError");
      createProductError.innerHTML = "";
      if (
        !this.name ||
        !this.description ||
        !this.price ||
        !this.averageRating
      ) {
        createProductError.innerHTML =
          "Veuillez renseigner au minimum un titre, une description, un prix et un classement ";
        return;
      }
      this.$store.dispatch("btnCreateProduct");
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.home {
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
.productsContent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.vtts-item {
  width: 300px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  background: #ffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.vtts-item:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.vttTitle,
.vttPrice,
img {
  width: 90%;
  height: auto;
  padding: 5px;
}

.btnToDetails {
  width: 90%;
}
button {
  letter-spacing: 0.1rem;
  width: 90%;
  padding: 10px 5px;
  border-radius: 5px;
  border: none;
  background: rgb(195, 243, 192);
  background: linear-gradient(
    90deg,
    rgba(195, 243, 192, 1) 0%,
    rgba(126, 224, 129, 1) 39%,
    rgba(14, 159, 86, 1) 100%
  );
  cursor: pointer;
}
</style>
