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
        <td :key="`fix-${index}`" class="w-20 text-center">
          {{ getCellValue('FIX', year, selectedDisplaySwitcher) }}
        </td>
        <td :key="`frn-${index}`" class="w-20 text-center">
          {{ getCellValue('FRN', year, selectedDisplaySwitcher) }}
        </td>
      </template>
    </tr>

    <tr v-for="(switcherValue, index) in displaySwitcherValues.filter(v => v != selectedDisplaySwitcher)" :key="index" class="border-b border-gray-300" v-show="isColapsed">
      <td></td>
      <td></td>
      <td>{{ switcherValue }}</td>
      <template v-for="(year, index) in selectedYears">
        <td :key="`fix-${index}`" class="w-20 text-center">
          {{ getCellValue('FIX', year, switcherValue) }}
        </td>
        <td :key="`frn-${index}`" class="w-20 text-center">
          {{ getCellValue('FRN', year, switcherValue) }}
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

      if (typeof val == 'undefined' || val == null) {
        return '';
      }

      if (displayValue == 'Yield') {
        return `${parseFloat(val).toFixed(3)}%`;
      } else {
        return `${val > 0 ? '+' : ''}${val}bp`;
      }
    }
  },
  components: {
    ChevronIcon,
  }
}
</script>
