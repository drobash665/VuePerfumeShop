<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {useDataStore} from "@/stores/dataStore.js";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";

export default {
  name: "CreateFragrance",
  components: {InputText, Button, Toast, Dropdown},
  data() {
    return {
      dataStore: useDataStore(),
      FragranceBrand_id: '',
      FragranceName: '',
      FragranceDescription: '',
      FragranceGender: '',
      FragranceYear: '',
      FragrancePrice: '',
      FragranceImage: null,
    }
  },
  computed: {
    brands() {
      return this.dataStore.brands;
    },
    brandOptions() {
      return this.brands.map(brand => ({
        id: brand.id,
        name: brand.name
      }));
    },
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    },
    isEdit() {
      return !!this.$route.params.id;
    },
    fragranceId() {
      return this.$route.params.id;
    },
  },
  watch: {
    fragranceId: {
      handler(newId) {
        if (newId) {
          const fragrance = this.dataStore.fragrances.find(f => f.id == newId);
          if (fragrance) {
            this.FragranceBrand_id = fragrance.brand_id;
            this.FragranceName = fragrance.name;
            this.FragranceGender = fragrance.gender;
            this.FragranceYear = fragrance.year;
            this.FragrancePrice = fragrance.price;
            this.FragranceDescription = fragrance.description;
            this.FragranceImage = null;
          }
        } else {
          this.FragranceName = '';
          this.FragranceImage = null;
        }
      },
      immediate: true
    }
  },

  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.FragranceImage = file;
      } else {
        document.getElementById('file-label').innerHtml = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.FragranceImage = null;
      }
    },

    async createFragrance() {
      const formData = new FormData();
      formData.append('brand_id', this.FragranceBrand_id);
      formData.append('name', this.FragranceName);
      formData.append('year', this.FragranceYear);
      formData.append('description', this.FragranceDescription);
      formData.append('price', this.FragrancePrice);
      formData.append('gender', this.FragranceGender);
      if (this.FragranceImage) {
        formData.append('image', this.FragranceImage);
      }
      if (this.isEdit) {
        await this.dataStore.update_fragrance(formData, this.fragranceId);
      } else {
        await this.dataStore.create_fragrance(formData);
      }


      if (this.errorCode > 0)
        this.$toast.add({
          severity: 'error',
          summary: "Ошибка добавления данных",
          detail: this.errorMessage,
          life: 4000
        });
      else
        this.$toast.add({
          severity: 'success',
          summary: 'Данные успешно добавлены',
          detail: this.errorMessage,
          life: 4000
        });
    }
  },
  async mounted() {
    await this.dataStore.get_brands();

    if (this.isEdit) {
      let fragrance = this.dataStore.fragrances.find(f => f.id == this.fragranceId);

      if (!fragrance) {
        await this.dataStore.get_fragrances();
        fragrance = this.dataStore.fragrances.find(f => f.id == this.fragranceId);
      }

      if (fragrance) {
        this.FragranceName = fragrance.name;
        this.FragranceBrand_id = fragrance.brand_id;
        this.FragrancePrice = fragrance.price;
      }
    }
  }
}
</script>

<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createFragrance" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgray">
        {{ isEdit ? 'Редактирование' : 'Добавление' }} аромата</h2>
      <div class="flex flex-col mt-4">
        <Dropdown v-model="FragranceBrand_id" :options="brandOptions" option-label="name"
                  option-value="id" placeholder="Выберите бренд" class="w-full"/>
      </div>
      <div class="flex flex-col mt-4">
        <InputText type="text" placeholder="Введите название аромата" v-model="this.FragranceName"/>
      </div>
      <div class="flex flex-col mt-4">
        <InputText type="text" placeholder="Введите пол" v-model="this.FragranceGender"/>
      </div>
      <div class="flex flex-col mt-4">
        <InputText type="text" placeholder="Введите описание аромата"
                   v-model="this.FragranceDescription"/>
      </div>
      <div class="flex flex-col mt-4">
        <InputText type="text" placeholder="Введите год создания" v-model="this.FragranceYear"/>
      </div>
      <div class="flex flex-col mt-4">
        <InputText type="text" placeholder="Введите цену" v-model="this.FragrancePrice"/>
      </div>

      <div class="mt-4">
        <div class="mb-4 mt-4">
          <label for="file" id="file-label"
                 class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
            <span class="pi pi-upload mx-3"></span>Выбрать изображение</label>
          <input type="file" hidden id="file" name="file" v-on:change="changeCaption"
                 :required="!isEdit"
                 accept="image/*">
        </div>
        <div class="flex flex-col mt-6">
          <Button type="submit" :label="isEdit ? 'Сохранить' : 'Создать' "></Button>
        </div>
      </div>
    </form>
  </div>
  <Toast position="bottom-right"/>
</template>

<style scoped>

</style>
