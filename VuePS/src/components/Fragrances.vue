<template>
  <DataTable
    :value="fragrances"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="fragrances_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <template #header>
      <InputText
        v-model="search"
        type="text" id="search"
        required
        placeholder="Наименование"
        class="m-2 sm:w-auto"/>
      <Button type="button"
              @click="onPushSearchButton()"
              icon="pi pi-search"
              label="Найти"/>
    </template>
    <Column class="w-24 !text-end" header="Действия">
      <template #body="{ data }">
        <div class="flex justify-between gap-2">
          <Button icon="pi pi-times-circle" @click="openPopupConfirm($event, data)"
                  severity="secondary" rounded></Button>
          <Button icon="pi pi-file-edit" @click="selectRow(data)" severity="secondary"
                  rounded></Button>
        </div>
      </template>
    </Column>
    <Column field="id" header="№"/>
    <Column header="Бренд">
      <template #body="{ data }">
        {{ getBrandName(data.brand_id) }}
      </template>
    </Column>
    <Column field="name" header="Название аромата"/>
    <Column field="gender" header="Пол"/>
    <Column field="year" header="Год выпуска"/>
    <Column field="description" header="Описание аромата"/>
    <Column field="price" header="Цена"/>
    <Column field="image" header="Фото">
      <template #body="slotProps">
        <div class="image-wrapper">
          <img
            v-if="slotProps.data.image"
            :src="slotProps.data.image"
            class="fragrance-image"
          />
        </div>

      </template>
    </Column>
    <template #footer>
      <div class="text-end">
        <Button type="button" @click="this.$router.push('/createFragrance')" icon="pi pi-plus"
                label="Добавить аромат"/>
      </div>
    </template>
  </DataTable>
  <ConfirmPopup></ConfirmPopup>
  <Toast></Toast>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/dataStore";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";

export default {
  name: "Fragrances",
  components: {DataTable, Column, Button, InputText, Toast, ConfirmPopup},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
      search: "",
    }
  },
  computed: {
    fragrances() {
      return this.dataStore.fragrances;
    },
    fragrances_total() {
      return this.dataStore.fragrances_total;
    },
    error_code() {
      return this.dataStore.errorCode;
    },
    error_message() {
      return this.dataStore.errorMessage;
    },
    brands() {
      return this.dataStore.brands;
    },
  },
  mounted() {
    console.log('fragrances component MOUNTED!');
    this.dataStore.get_fragrances();
    this.dataStore.get_fragrances_total();
    this.dataStore.get_brands();
    console.log('Fragrances=', this.fragrances);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_fragrances(this.offset / this.perpage, this.perpage);
    },
    onPushSearchButton() {
      this.dataStore.get_fragrances_total(this.search);
      this.dataStore.get_fragrances(undefined, undefined, this.search);
    },
    openPopupConfirm(event, data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить запись ' + data.id + '?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: () => {
          this.deleteFragrance(data.id);
        },
      })
    },
    selectRow(data){
      this.$router.push('/createFragrance/' + data.id);
    },
    async deleteFragrance(id) {
      await this.dataStore.delete_fragrance(id);
      if (this.error_code > 0)
        this.$toast.add({
          severity: 'error', summary: "Ошибка удаления аромата " +
            id, detail: this.error_message + " " + this.error_code, life: 4000
        });
      else
        this.$toast.add({
          severity: 'success', summary: 'Аромат ' + id +
            " успешно удален", detail: this.error_message, life: 4000
        });
      this.dataStore.get_fragrances(this.offset / this.perpage, this.perpage, this.search);
    },
    getBrandName(brandId) {
      const brand = this.brands.find(brand => brand.id == brandId);
      return brand ? brand.name : 'Неизвестный бренд';
    }
  },
}
</script>

<style scoped>
.image-wrapper {
  width: 140px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  background-color: #f7f7f7;
}

.fragrance-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  font-size: 12px;
  color: #777;
}
</style>
