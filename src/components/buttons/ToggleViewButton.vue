<template>
  <div class="toggle-view">
    <SelectButton v-model="view" :options="views" dataKey="value">
      <template #option="slotProps">
        <Icon :name="slotProps.option" size="16"></Icon>
      </template>
    </SelectButton>
  </div>

</template>

<script>
import SelectButton from 'primevue/selectbutton'
export default {
  name: 'ToggleViewButton',
  components: {
    SelectButton
  },
  data: function () {
    return {
      view: 'list',
      views: ['grid', 'list']
    }
  }

}
</script>

<style scoped>

</style>
