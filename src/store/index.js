import Vue from 'vue'
import Vuex from 'vuex'
import { getCurrencyYears } from '@/lib/helpers';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    currencies: [],

    displaySwitcherValues: ['Spread', 'Yield', '3MLSpread'],

    selectedCurrency: null,
    selectedDisplaySwitcher: null,
    selectedYears: []
  },

  getters: {
    items: state => state.items,
    currencies: state => state.currencies,

    displaySwitcherValues: state => state.displaySwitcherValues,

    selectedCurrency: state => state.selectedCurrency,
    selectedDisplaySwitcher: state => state.selectedDisplaySwitcher,
    selectedYears: state => [...state.selectedYears].sort((a, b) => parseInt(a) - parseInt(b)),
    currencyYears: state => getCurrencyYears(state.items, state.selectedCurrency),
  },

  mutations: {
    setItems: (state, value) => state.items = value,
    setCurrencies: (state, value) => state.currencies = value,

    setSelectedCurrency: (state, value) => state.selectedCurrency = value,
    setSelectedDisplaySwitcher: (state, value) => state.selectedDisplaySwitcher = value,
    setSelectedYears: (state, value) => state.selectedYears = value,
  },

  actions: {
    setItems: ({commit}, value) => commit('setItems', value),
    setCurrencies: ({commit}, value) => commit('setCurrencies', value),

    setSelectedCurrency: ({getters, commit}, value) => {
      commit('setSelectedCurrency', value);
      commit('setSelectedYears', getters.currencyYears);
    },
    setSelectedDisplaySwitcher: ({commit}, value) => commit('setSelectedDisplaySwitcher', value),
    setSelectedYears: ({commit}, value) => commit('setSelectedYears', value),
  }
})
