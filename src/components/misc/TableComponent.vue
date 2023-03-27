<template>
  <div class="max-w-5xl">
    <div class="flex flex-row items-center justify-end">
      <div v-for="(year, index) in selectedYears" :key="index" class="w-40 text-center text-xs font-bold px-2 leading-loose">
        <div class="w-full border-b border-gray-300">{{ year }} YRS</div>
      </div>
    </div>

    <table class="table-auto w-full border-collapse border-spacing-y-2">
      <thead>
        <tr class="font-normal text-gray-700 text-base border-b border-gray-300 align-bottom">
          <th class="w-6"></th>
          <th class="text-left w-40">
            <div class="flex flex-row items-center space-x-2 cursor-pointer select-none" @click="sortBy('date')">
              <span class="uppercase">Date sent</span>
              <div :class="['w-2 h-auto', sort.find(i => i.parameter == 'date') ? 'text-black' : 'text-gray-400', sort.find(i => i.parameter == 'date')?.direction == 'asc' ? 'rotate-180' : '']">
                <CaretIcon />
              </div>
            </div>
          </th>
          <th class="text-left">
            <div class="flex flex-row items-center space-x-2 cursor-pointer select-none" @click="sortBy('company')">
              <span class="uppercase">Company</span>
              <div :class="['w-2 h-auto', sort.find(i => i.parameter == 'company') ? 'text-black' : 'text-gray-400', sort.find(i => i.parameter == 'company')?.direction == 'asc' ? 'rotate-180' : '']">
                <CaretIcon />
              </div>
            </div>
          </th>
          <template v-for="(year, index) in selectedYears">
            <th :key="`fix-${index}`" class="w-20">
              FIX
            </th>
            <th :key="`frn-${index}`" class="w-20">
              FRN
            </th>
          </template>
        </tr>
      </thead>

      <tbody>
        <TableRow v-for="companyItem in filteredItems" :key="companyItem.Company" :row-data="companyItem" />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableRow from './TableRow.vue'
import { mapGetters } from 'vuex';
import { filterItems } from '../../lib/helpers';
import { applySorting } from '../../lib/sort';
import CaretIcon from '../icons/CaretIcon.vue';

export default {
  data() {
    return {
      sort: [
        {parameter: 'date', direction: 'desc'},
        {parameter: 'preffered', direction: 'desc'},
      ]
    }
  },
  computed: {
    ...mapGetters([
      'items',
      // 'filteredItems',
      'selectedYears',
      'currencyYears',
      'selectedCurrency',
    ]),
    filteredItems() {
      let filtered = filterItems(this.items, this.selectedCurrency, this.selectedYears);
      this.sort.forEach(option => {
        filtered = applySorting(filtered, option.parameter, option.direction);
      })

      return filtered;
    }
  },
  methods: {
    sortBy(sortParemeter) {
      if (this.sort.find(i => i.parameter == sortParemeter)) {
        // already sorted, just change direction
        const direction = this.sort.find(i => i.parameter == sortParemeter).direction;
        this.sort = [{parameter: sortParemeter, direction: direction == 'asc' ? 'desc' : 'asc'}];
      } else {
        this.sort = [{parameter: sortParemeter, direction: 'asc'}];
      }
    }
  },
  components: {
    TableRow,
    CaretIcon,
  }
}
</script>
