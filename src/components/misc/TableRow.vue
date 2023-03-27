<template>
  <div style="display: contents" class="text-sm">

    <tr class="border-b border-gray-300">
      <td class="align-middle select-none">
        <div @click="isColapsed = !isColapsed" v-show="rowData.Quote != null && rowData.Quote.length > 0">
          <ChevronIcon :class="['w-3 h-3 cursor-pointer transition', isColapsed ? 'rotate-90' : '']" />
        </div>
      </td>
      <td>{{ formatDate(rowData.DateSent) }}</td>
      <td :class="['font-bold', rowData.Quote == null || rowData.Quote.length == 0 ? 'text-gray-400' : '']">{{ rowData.Company }}</td>
      <template v-for="(year, index) in selectedYears">
        <td :key="`fix-${index}`" :class="['w-20 text-center', isHighlited(year, getCellValue('FIX', year, selectedDisplaySwitcher)) ? 'bg-yellow-100' : '']">
          {{ getCellValue('FIX', year, selectedDisplaySwitcher) | formatValue(selectedDisplaySwitcher) }}
        </td>
        <td :key="`frn-${index}`" class="w-20 text-center">
          {{ getCellValue('FRN', year, selectedDisplaySwitcher) | formatValue(selectedDisplaySwitcher) }}
        </td>
      </template>
    </tr>

    <tr v-for="(switcherValue, index) in displaySwitcherValues.filter(v => v != selectedDisplaySwitcher)" :key="index" class="border-b border-gray-300" v-show="isColapsed">
      <td></td>
      <td></td>
      <td>{{ switcherValue }}</td>
      <template v-for="(year, index) in selectedYears">
        <td :key="`fix-${index}`" class="w-20 text-center">
          {{ getCellValue('FIX', year, switcherValue) | formatValue(switcherValue) }}
        </td>
        <td :key="`frn-${index}`" class="w-20 text-center">
          {{ getCellValue('FRN', year, switcherValue) | formatValue(switcherValue) }}
        </td>
      </template>
    </tr>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { dateFormatter } from '../../lib/helpers';
import ChevronIcon from '../icons/ChevronIcon.vue';

export default {
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    minValuesPerYear: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      isColapsed: false
    }
  },
  computed: {
    ...mapGetters([
    'selectedYears',
    'selectedCurrency',
    'displaySwitcherValues',
    'selectedDisplaySwitcher',
    ]),
  },
  methods: {
    formatDate: input => dateFormatter(input),
    getCellValue(type, year, displayValue) {
      const val = this.rowData.Quote?.find(item => item.Years == year && item.CouponType == type && item.Currency == this.selectedCurrency)?.[displayValue];

      return val;
    },
    isHighlited(year, value) {
      return this.minValuesPerYear[year] == value;
    }
  },
  filters: {
    formatValue(value, type) {
      if (typeof value == 'undefined' || value == null) {
        return '';
      }

      if (type == 'Yield') {
        return `${parseFloat(value).toFixed(3)}%`;
      } else {
        return `${value > 0 ? '+' : ''}${value}bp`;
      }
    }
  },
  components: {
    ChevronIcon,
  }
}
</script>
