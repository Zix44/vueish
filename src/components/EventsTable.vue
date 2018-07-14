<template>
    <div>
        <h1 class="is-size-4">Retrieved Data</h1>
        <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
    </div>
</template>

<script>
let d = new Date() // get current date
export default {
  name: 'events-table',
  props: ['sParams'],
  data () {
    return {
      stationName: 'All Stations', // Default is all
      startDate: d.setDate(d.getDate() - 1), // Default is 1 day ago
      endDate: new Date(), // Default is now
      textFilter: '', // Default is no filter
      columns: [
        'systime',
        'oty',
        'station_id_text',
        'text',
        'new_state_text',
        'reason',
        'type',
        'class',
        'user_name'
      ],
      options: {
        filterByColumn: true,
        headings: {
          oty: 'TABLE',
          new_state_text: 'STATE TEXT',
          systime: 'TIME',
          text: 'MESSAGE',
          station_id_text: 'STATION',
          user_name: 'USER NAME',
          reason: 'EVENT REASON',
          type: 'EVENT TYPE',
          class: 'POINT CLASS'
        }
      },
      tableData: [] // we will fetch row data
    }
  },
  created () {
    // lets make some fake rows
    let fakeDataSize = 500
    let fakeData = []
    for (let i = 0; i < fakeDataSize; i++) {
      fakeData.push({
        'oty': 'EVENT_LIST' + i,
        'new_state_text': 'State_' + (i * 2),
        'systime': '06/07/2018 15:16:51.989',
        'text': 'Some Event Happened with ID: ' + i,
        'station_id_text': 'STATION_' + i,
        'user_name': 'User_' + i,
        'reason': 'reason' + i,
        'type': 'Event Type: ' + i,
        'class': 'Event Class: ' + i
      })
    }
    this.$data.tableData = fakeData
  },
  mounted () {
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
  .VueTables__sortable{
    cursor: pointer;
  }
</style>
