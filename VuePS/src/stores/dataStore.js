import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    brands: [],
    brands_total: null,
    fragrances: [],
    fragrances_total: null,
    items: [],
    errorMessage: "",
  }),
  actions: {
    async get_brands(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/brands', {
          params: {
            page: page,
            perpage: perpage
          }
        });
        this.brands = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
async get_brands_total() {
  this.errorMessage = "";
  try {
    const response = await axios.get(backendUrl + '/brands_total');
    this.brands_total = response.data;
  } catch (error) {
    if (error.response) {
      this.errorMessage = error.response.data.message;
      console.log(error);
    } else if (error.request) {
      this.errorMessage = error.message;
      console.log(error);
    } else {
      console.log(error);
    }
  }
},
    async get_fragrances(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/fragrances', {
          params: {
            page: page,
            perpage: perpage
          }
        });
        this.fragrances = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
async get_fragrances_total() {
  this.errorMessage = "";
  try {
    const response = await axios.get(backendUrl + '/fragrances_total');
    this.fragrances_total = response.data;
  } catch (error) {
    if (error.response) {
      this.errorMessage = error.response.data.message;
      console.log(error);
    } else if (error.request) {
      this.errorMessage = error.message;
      console.log(error);
    } else {
      console.log(error);
    }
  }
},

  },
});
