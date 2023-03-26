<template>
  <div class="filters flex flex-row items-center space-x-10">

    <div class="border border-primary rounded-md divide-x divide-primary overflow-hidden">
      <SwitchButton v-for="(currency, index) in currencies" :key="index" :label="currency" @clicked="setSelectedCurrency(currency)" :active="selectedCurrency == currency" />
    </div>

    <div class="border border-primary rounded-md overflow-hidden">
      <SwitchButton v-for="(year, index) in currencyYears" :key="index" :label="year" label-suffix="YRS" @clicked="toggleYears" :active="selectedYears.indexOf(year) >= 0" :class="['border-r last:border-0', selectedYears.indexOf(year) >= 0 ? 'border-white' : 'border-primary']" />
    </div>

    <div class="border border-primary rounded-md divide-x divide-primary overflow-hidden">
      <SwitchButton v-for="(value, index) in displaySwitcherValues" :key="index" :label="value" @clicked="setSelectedDisplaySwitcher(value)" :active="selectedDisplaySwitcher == value" />
    </div>

  </div>
</template>

<script>
import SwitchButton from './SwitchButton.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'currencies',
      'displaySwitcherValues',
      'selectedDisplaySwitcher',
      'selectedCurrency',
      'selectedYears',
      'currencyYears',
    ]),
  },
  methods: {
    ...mapActions([
      'setSelectedDisplaySwitcher',
      'setSelectedCurrency',
      'setSelectedYears',
    ]),
    toggleYears(value) {
      const selectedYears = [...this.selectedYears];
      if (this.selectedYears.indexOf(value) >= 0) {
        selectedYears.splice(selectedYears.indexOf(value), 1);
        this.setSelectedYears(selectedYears);
      } else {
        selectedYears.push(value);
        this.setSelectedYears(selectedYears);
      }
    }
  },
  components: {
    SwitchButton,
  }
}
</script>
