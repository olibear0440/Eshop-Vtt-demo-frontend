<template>
  <div class="createAccount">
    <div id="formTitre">
      <h1 v-if="mode == 'loginAccount'">Connexion</h1>
      <h1 v-else>Inscription</h1>
    </div>
    <form class="formSignup" id="formSignup">
      <div class="formControl">
        <p class="switchLogin" v-if="mode == 'loginAccount'">
          Si vous n'avez pas encore de compte ?
          <span @click="switchToCreateAccount()">Creer un compte</span>
        </p>
        <p class="switchLogin" v-else>
          Vous avez déjà un compte ?
          <span @click="switchToLoginAccount()">Se connecter </span>
        </p>

        <div class="createAccountField" v-if="mode == 'createAccount'">
          <input
            v-model="nom"
            type="text"
            placeholder="Nom"
            id="nom"
            name="nom"
            aria-required="true"
            required
          /><br />
          <input
            v-model="prenom"
            type="text"
            placeholder="Prénom"
            id="prenom"
            name="prenom"
            aria-required="true"
            required
          /><br />
          <input
            v-model="pseudo"
            type="text"
            placeholder="pseudo"
            id="pseudo"
            name="pseudo"
            aria-required="true"
            required
          /><br />
        </div>
        <div class="loginAccountField">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            aria-required="true"
            aria-label="email"
            required
          /><br />
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            id="password"
            name="password"
            aria-required="true"
            aria-label="mot de passe"
            required
          />
        </div>

        <p
          class="errorLogin"
          v-if="mode == 'loginAccount' && status == 'error_login'"
        >
          Email et/ou mot de passe non valide
        </p>

        <p
          class="errorLogin"
          v-if="mode == 'createAccount' && status == 'error_create'"
        >
          Identifiants de connexion non valide ou adresse mail déjà utilisée
        </p>
        <p id="errorRegxMdp"></p>

        <button
          @click="btnLoginAccount()"
          v-if="mode == 'loginAccount'"
          id="confirmForm"
          class="confirmForm"
          type="button"
          name="confirmForm"
        >
          <span class="btnLoading" v-if="status == 'loading'"
            >Connexion en cours...</span
          >
          <span class="btnValidated" v-else>Se connecter</span>
        </button>
        <button
          @click="btnCreateAccount()"
          v-else
          id="confirmForm"
          class="confirmForm"
          type="button"
          name="confirmForm"
        >
          <span class="btnLoading" v-if="status == 'loading'"
            >Création en cours...</span
          >
          <span class="btnValidated" v-else>Creer mon compte</span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "signup-page",
  data: () => {
    return {
      mode: "loginAccount",
      nom: "",
      prenom: "",
      pseudo: "",
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "createAccount";
    },
    switchToLoginAccount: function () {
      this.mode = "loginAccount";
    },
    btnLoginAccount: function () {
      let self = this;
      this.$store
        .dispatch("btnLoginAccount", {
          //recuperer les parametres: email et password de la bd et les relier au data du frontend
          email: this.email,
          password: this.password,
        })
        .then(function () {
          self.$router.push("/");
        }),
        function (error) {
          console.log(error);
        };
    },
    btnCreateAccount: function () {
      /*
      document.getElementById("password").classList.remove("inputError");
      const errorMdp = document.getElementById("errorRegxMdp");
      const regexs = [
        /^.{8,}$/, //min 8 caractères
        /[A-Z]/, //min 1 lettres majuscules
        /[a-z]/, //min 1 lettres minuscules
        /\d/, //min 1 chiffre
        /[@%#^&*]/, //caracteres speciaux acceptés
      ];
      errorMdp.innerHTML = "";
      if (regexs.some((regex) => !regex.test(this.password))) {
        document.getElementById("password").classList.add("inputError");
        errorMdp.innerHTML =
          "Le mot de passe doit contenir au minimum, 8 caractères, une majuscule, une minuscule, un chiffre et un symbole";
        return;
      }
      */
      let self = this;
      this.$store
        .dispatch("btnCreateAccount", {
          nom: this.nom,
          prenom: this.prenom,
          pseudo: this.pseudo,
          email: this.email,
          password: this.password,
        })
        .then(function () {
          //self.btnLoginAccount();
          self.$router.push("/");
        }),
        function (error) {
          console.log(error);
        };
    },
  },
};
</script>
<style scoped>
.registerBloc {
  font-family: Arial, Helvetica, sans-serif;
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;
}
.mainTitle {
  color: white;
  width: 100%;
  font-size: 3em;
  margin: 50px 0;
}
.createAccount {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#formTitre {
  background-color: #47a851;
  border-bottom: 1px solid #47a851;
  padding: 20px 40px;
  width: auto;
}
#formTitre h1 {
  margin: 0;
  color: white;
}
.formSignup {
  padding: 20px 40px;
  width: auto;
}
.formControl {
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 10px;
  padding-bottom: 20px;
}
.switchLogin {
  font-size: 14px;
  text-align: center;
  color: #2c3e50;
}
span {
  color: #0e9f56;
  text-decoration-line: underline;
  cursor: pointer;
}
.createAccountField,
.loginAccountField {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
#email,
#password,
#pseudo,
#prenom,
#nom {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  padding: 10px;
  width: auto;
}
input:focus {
  outline: none !important;
  border: 1px solid red;
  box-shadow: 0 0 10px #7ee081;
}
.btnLoading,
.btnValidated {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-family: inherit;
}
.errorLogin {
  font-size: 14px;
  color: red;
}
#errorRegxMdp {
  color: rgb(51, 103, 214);
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.confirmForm {
  background-color: #0e9f56;
  border: 2px solid #0e9f56;
  color: white;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
}
@media screen and (min-width: 375px) and (max-width: 720px) {
  .registerBloc {
    width: auto;
    padding-top: 0px;
    padding-left: 5px;
    padding-right: 5px;
    height: auto;
  }
  .mainTitle {
    margin-bottom: 20px;
  }
  .createAccount {
    top: 100px;
  }
  #formTitre {
    padding-left: 10px;
    padding-right: 10px;
  }
  h1 {
    margin: 0;
  }
  .formSignup {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
