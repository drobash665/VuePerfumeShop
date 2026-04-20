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
    <Column field="id" header="№"/>
    <Column field="brand_id" header="Бренд"/>
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
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from "@/stores/dataStore";
import Button from "primevue/button";

export default {
  name: "Fragrances",
  components: {DataTable, Column, Button},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    fragrances() {
      return this.dataStore.fragrances;
    },
    fragrances_total() {
      return this.dataStore.fragrances_total;
    }
  },
  mounted() {
    console.log('fragrances component MOUNTED!');
    this.dataStore.get_fragrances();
    this.dataStore.get_fragrances_total();
    console.log('Fragrances=', this.fragrances);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_fragrances(this.offset / this.perpage, this.perpage);
    }
  }
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
