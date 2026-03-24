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
    <Column field="id" header="ID"/>
    <Column field="name" header="Наименование аромата"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore";

export default {
  name: "Fragrances",
  components: {DataTable, Column},
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
