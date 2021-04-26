<template>
  <div>
    <DataTable :value="milestones" responsiveLayout="scroll">
      <Column field="name" header="Milestone"></Column>
      <Column field="state" header="State">
        <template #body="slotProps">
          {{ getTime(slotProps.data.dueTo) }}
        </template>
      </Column>
      <Column field="predictors" header="Predictors">
        <template #body="slotProps">
          {{slotProps.data.predictors}}
        </template>
      </Column>
      <Column field="action" header="Action">
        <template #body="slotProps">
          <Button
            label="predict now"
            iconPos="right"
            icon="pi pi-angle-right"
            class="btn-primary"
            :action="slotProps.data.name">
          </Button>
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<script>
import moment from 'moment'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  name: 'MilestoneList',
  components: {
    DataTable,
    Column
  },
  props: {
    milestones: Array
  },
  methods: {
    getTime: function (time) {
      return moment.unix(time).format('MMMM YYYY')
    }
  }
}
</script>

<style scoped>

</style>
