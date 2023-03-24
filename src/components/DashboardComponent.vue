<template>
    <div class="my-10">
      <div class="flex flex-row items-center space-x-10">
        <div class="border border-primary rounded-md divide-x divide-primary overflow-hidden">
          <SwitchButton v-for="(currency, index) in currencies" :key="index" :label="currency" @clicked="selectedCurrency = currency" :active="selectedCurrency == currency" />
        </div>

        <div class="border border-primary rounded-md overflow-hidden">
          <SwitchButton v-for="(year, index) in currencyYears" :key="index" :label="year" label-suffix="YRS" @clicked="toggleYears" :active="selectedYears.indexOf(year) >= 0" :class="['border-r last:border-0', selectedYears.indexOf(year) >= 0 ? 'border-white' : 'border-primary']" />
        </div>

        <div class="border border-primary rounded-md divide-x divide-primary overflow-hidden">
          <SwitchButton label="Spread" @clicked="displaySwitcher = 'Spread'" :active="displaySwitcher == 'Spread'" />
          <SwitchButton label="Yield" @clicked="displaySwitcher = 'Yield'" :active="displaySwitcher == 'Yield'" />
          <SwitchButton label="3ML Spread" @clicked="displaySwitcher = '3ML Spread'" :active="displaySwitcher == '3ML Spread'" />
        </div>

      </div>
    </div>
</template>

<script>
import jsonData from '../data/data.json';
import SwitchButton from './misc/SwitchButton.vue';

export default {
  name: 'DashboardComponent',
  data() {
    return {
      items: jsonData.Items,
      selectedCurrency: null,
      displaySwitcher: 'Spread',
      selectedYears: [],
    }
  },
  computed: {
    currencies() {
      return this.items.map(item => {
        return item['Quote']?.map(quote => quote['Currency']);
      })
      .flat()
      .filter(c => typeof c !== 'undefined')
      .filter((item, i, ar) => ar.indexOf(item) === i);
    },
    currencyYears() {
      return this.items.map(item => {
        return item['Quote']?.filter(quote => quote['Currency'] == this.selectedCurrency);
      })
      .flat()
      .filter(c => typeof c !== 'undefined')
      .map(item => item.Years)
      .filter((item, i, ar) => ar.indexOf(item) === i)
      .sort((a, b) => parseInt(a) > parseInt(b));
    },
  },
  mounted() {
    this.selectedCurrency = this.currencies[0];
  },
  watch: {
    selectedCurrency() {
      this.selectedYears = [...this.currencyYears]
    }
  },
  methods: {
    toggleYears(value) {
      if (this.selectedYears.indexOf(value) >= 0) {
        this.selectedYears.splice(this.selectedYears.indexOf(value), 1);
      } else {
        this.selectedYears.push(value);
      }
    }
  },
  components: {
    SwitchButton,
  }
}
</script>
