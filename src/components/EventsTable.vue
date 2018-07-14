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
            styleClass="vgt-table vueish-style"
        >
        <div slot="table-actions">
            <a class="button is-large is-info is-outlined">Export</a>
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
  created () {
    // lets make some fake rows
    let fakeDataSize = 20
    let fakeData = []
    for (let i = 0; i < fakeDataSize; i++) {
      fakeData.push({
        'oty': 'EVENT_LIST' + i,
        'new_state_text': 'State_' + i,
        'systime': '06/07/2018 15:16:51.989',
        'text': 'Some Event Happened with ID: ' + i,
        'station_id_text': 'STATION_' + i,
        'user_name': 'User_' + i,
        'reason': 'reason' + i,
        'type': 'Event Type: ' + i,
        'class': 'Event Class: ' + i
      })
    }
    this.$data.rows = fakeData
  },
  mounted () {
    // check that we have received new search parameters
    this.$el.querySelector('.vgt-input').classList.add('input')
    this.$el.querySelector('.vgt-input').classList.add('is-large')
    if (this.sParams.length > 0) {
      this.$data.stationName = this.sParams[0].value
      this.$data.startDate = this.sParams[1].value
      this.$data.endDate = this.sParams[2].value
      this.$data.textFilter = this.sParams[3].value
    }
  }
}
</script>

<style>
.vueish-style{
  background-color: #343434 !important;
  border: transparent !important;
}
.vueish-style tbody tr td{
  color:whitesmoke !important;
  border-bottom-color: #404040 !important;
}
.vgt-global-search, .vgt-wrap__footer, .vgt-table thead th, .vgt-table th.line-numbers, .vgt-table th.vgt-checkbox-col{
  border: transparent !important;
  background: #343538 !important;
  color: #b5b5b5 !important;
}
.vgt-table thead th.sorting-asc, .vgt-table thead th.sorting-desc {
    color: #f5f5f5 !important;
}
.magnifying-glass{
  height: 26px !important;
  width: 26px !important;
}
</style>
