<template>
    <div>
        Dashboard
    </div>
</template>

<script>
import jsonData from '../data/data.json';

export default {
  name: 'DashboardComponent',
  data() {
    return {
      items: jsonData.Items
    }
  }
}
</script>