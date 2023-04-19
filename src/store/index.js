import { createStore } from "vuex";
const axios = require("axios");

//import url de l'api par axios
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

//verification du user dans le localstorage
let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}
/*********************************state************************ */
const state = {
 
  vtts: null,
  vttDetails: {},
  file: "",
  status: "",
  user: user,
};



/************************************getters******************** */
const getters = {
  vtts: (state) => state.vtts,
  vttDetails: (state) => state.vttDetails,
  //vttToCart: (state)=> state.vttToCart,
};


/***********************************mutations********************** */
const mutations = {
  
  


  SET_STATUS(state, status) {
    state.status = status;
  },
  //recuperer header token et enregistrer dans localstorage le user
  LOG_USER(state, user) {
    instance.defaults.headers.common["Authorization"] = user.token;
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  SET_VTTS(state, vtts) {
    state.vtts = vtts;
  },

  GET_VTT(state, vttDetails) {
    state.vttDetails = vttDetails;
  },
  
};


/**********************************************actions************************ */
const actions = {















  //appel api sur le btn "connexion" pour le login du compte
  btnLoginAccount: ({ commit }, infoUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      instance
        .post("/users/loginUser", infoUser)
        .then(function (response) {
          commit("SET_STATUS", "login");
          commit("LOG_USER", response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit("SET_STATUS", "error_login");
          reject(error);
        });
    });
  },

  //appel api sur le btn "creer mon compte" pour la creation du compte
  btnCreateAccount: ({ commit }, newUser) => {
    commit("SET_STATUS", "loading");
    return new Promise((resolve, reject) => {
      instance
        .post("/users/createUser", newUser)
        .then(function (response) {
          commit("SET_STATUS", "created");
          resolve(response);
        })
        .catch(function (error) {
          commit("SET_STATUS", "error_create");
          reject(error);
        });
    });
  },

  getAllVtts({ commit }) {
    instance
      .get("/vtts")
      .then((res) => commit("SET_VTTS", res.data))
      .catch((err) => console.log(err));
  },

  btnCreateProduct({ commit }) {
    if (window.confirm("Veuillez valider l'ajout de ce produit ") != true) {
      return;
    }
    //recuperer le formulaire html
    const form = document.forms["createProductForm"];
    //rechercher l'id correspondant au selecteur
    const myFiles = document.querySelector("#imageUrl");
    //creer un nouvel objet formData et integrer les champs du formulaire (clé/valeur)
    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("price", form.price.value);
    formData.append("averageRating", form.averageRating.value);
    formData.append("description", form.description.value);
    formData.append("imageUrl", myFiles.files[0]);
    //appel api pour la creation du post
    instance
      .post("/vtts/createVtt", formData)
      .then((response) => {
        commit("LOG_NEWVTT", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getVtt({ commit }, id) {
    //console.log(id);
    const token = JSON.parse(localStorage.getItem("user")).token;
    instance
      .get("/vtts/" + id, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        commit("GET_VTT", response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
