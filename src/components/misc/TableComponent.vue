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
            <div>
              <span class="uppercase">Date sent</span>
            </div>
          </th>
          <th class="text-left">
            <div>
              <span class="uppercase">Company</span>
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
        <TableRow v-for="companyItem in items" :key="companyItem.Company" :row-data="companyItem" />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableRow from './TableRow.vue'
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'items',
      'selectedYears',
    ]),
  },
  methods: {
    //
  },
  components: {
    TableRow
  }
}
</script>
