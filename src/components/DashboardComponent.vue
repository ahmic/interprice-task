<template>
    <div class="my-10">

      <FilterComponent />

      <div class="mt-6">
        <TableComponent />
      </div>
    </div>
</template>

<script>
import jsonData from '../data/data.json';
import TableComponent from './misc/TableComponent.vue';
import { mapActions, mapGetters } from 'vuex';
import { getAvailableCurrencies } from '@/lib/helpers';
import FilterComponent from './misc/FilterComponent.vue';

export default {
  name: 'DashboardComponent',
  data() {
    return {
      //
    }
  },
  created() {
    this.setupStore();
  },
  computed: {
    ...mapGetters([
      'items',
      'currencies',
      'displaySwitcherValues',
    ]),
  },
  methods: {
    ...mapActions([
      'setItems',
      'setCurrencies',
      'setSelectedCurrency',
      'setSelectedDisplaySwitcher',
    ]),
    setupStore() {
      this.setItems(jsonData.Items);
      this.setCurrencies(getAvailableCurrencies(jsonData.Items));
      this.setSelectedCurrency(this.currencies[0]);
      this.setSelectedDisplaySwitcher(this.displaySwitcherValues[0]);
    },
  },
  components: {
    TableComponent,
    FilterComponent,
  }
}
</script>
