<template>
    <div>
        <h1 class="is-size-4">Retrieved Data</h1>
        <vue-good-table
            :columns="columns"
            :rows="rows"
            :lineNumbers="true"
            :search-options="{
                enabled: true,
                placeholder: 'Search this table'
            }"
            :pagination-options="{
                enabled: true
            }"
        >
        <div slot="table-actions">
            <a class="button">Export</a>
        </div>
        </vue-good-table>
    </div>
</template>

<script>
let d = new Date() // get current date
export default {
  name: 'events-table',
  props: ['sParams'],
  data () {
    return {
      stationName: 'All Stations',
      startDate: d.setDate(d.getDate() - 1),
      endDate: new Date(),
      textFilter: '',
      columns: [
        // label is the column name, field is the json key in the row data.
        {
          label: 'TIME',
          field: 'systime'
        },
        {
          label: 'TABLE',
          field: 'oty'
        },
        {
          label: 'SUBSTATION',
          field: 'station_id_text'
        },
        {
          label: 'MESSAGE',
          field: 'text'
        },
        {
          label: 'STATE TEXT',
          field: 'new_state_text'
        },
        {
          label: 'EVENT REASON',
          field: 'reason'
        },
        {
          label: 'EVENT TYPE',
          field: 'type'
        },
        {
          label: 'POINT CLASS',
          field: 'class'
        },
        {
          label: 'USER NAME',
          field: 'user_name'
        }
      ],
      rows: [] // we will fetch row data
    }
  },
  mounted () {
    // check that we have received new search parameters
    if (this.sParams.length > 0) {
      this.$data.stationName = this.sParams[0].value
      this.$data.startDate = this.sParams[1].value
      this.$data.endDate = this.sParams[2].value
      this.$data.textFilter = this.sParams[3].value
    }
  }
}
</script>
