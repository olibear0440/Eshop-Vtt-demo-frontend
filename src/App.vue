<template>
  <nav>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1 class="logoTitle">ttesse</h1>
    <p class="logoIcone">r</p>
    <router-link class="homeLink" to="/">Accueil</router-link>
    <router-link class="cartLink" to="/cart">Panier</router-link>
    <div class="register-bloc">
      <router-link class="login" to="/register"
        ><button>Se connecter</button></router-link
      >
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "./assets/font/font-family.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #35495e;
}
.logoTitle {
  color: #41b883;
  margin-right: 50px;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-family: "Ddrags", Arial, sans-serif;
  font-weight: lighter;
  font-size: 35px;
  margin-right: 10px;
}
.logoIcone {
  font-family: "Cycling", Arial, sans-serif;
  font-size: 85px;
  margin-right: 100px;
  color: #35495e;
}

nav {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 1440px;
  height: 100px;
  padding: 10px 30px;

  a {
    font-weight: bold;
    color: #35495e;
    text-transform: uppercase;
    text-decoration: none;

    &.router-link-exact-active {
      color: #41b883;
      text-decoration: none;
    }
  }
}
img {
  width: 100px;
}
.homeLink,
.cartLink {
  margin-right: 30px;
  letter-spacing: 0.1rem;
}
.register-bloc {
  padding: 5px;
  width: 400px;
  text-align: end;
  margin-left: 400px;
}
.login,
button {
  width: 250px;
  padding: 12px 19px;
  background-color: #0e9f56;
  border: none;
  color: white;
  font-size: 15px;
  border-radius: 3px;
  cursor: pointer;
  letter-spacing: 0.1rem;
}

</style>
