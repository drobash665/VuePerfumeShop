<template>
  <DataTable
    :value="brands"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="brands_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="ID"/>
    <Column field="name" header="Наименование бренда"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore";

export default {
  name: "Brands",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    brands() {
      return this.dataStore.brands;
    },
    brands_total() {
      return this.dataStore.brands_total;
    }
  },
  mounted() {
    console.log('Brands component MOUNTED!');
    this.dataStore.get_brands();
    this.dataStore.get_brands_total();
    console.log('Brands=', this.brands);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_brands(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>
