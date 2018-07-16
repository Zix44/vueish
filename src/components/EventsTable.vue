<!-- This is the events table component currently it has some default search params
if the user has come from the config component then it should receive parameters from it.<style>
Currently using props and emit but maybe should transistion to vuex -->
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
      stationNames: [{station_id_text: 'All Stations'}], // Default is all.
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
        },
        pagination: {
          edge: true
        }
      },
      tableData: [] // we will fetch row data
    }
  },
  created () {
    // get some fake data
    let vm = this // get the view model
    let eventDataUrl = 'http://localhost:3000/evt_data' // URL for event data
    // now lets fetch data
    fetch(eventDataUrl)
      .then(response => {
        if (!response.ok) {
          // fetch only fails if network error
          // this will catch other errors and pass them to
          // the catch function below
          throw new Error()
        }
        return response.json()
      })
      .then(function (data) {
        vm.tableData = data.data
      }).catch(error => {
        console.log('Error: ' + error)
      })
  },
  mounted () {
    if (this.sParams.length > 0) {
      this.$data.stationNames = this.sParams[0].value
      this.$data.textFilter = this.sParams[1].value
      this.$data.startDate = this.sParams[2].value
      this.$data.endDate = this.sParams[3].value
    }
    /* Lets try hijack the global search div since we aren't using it */
    let stationList = ' | '
    this.$data.stationNames.forEach((e, i) => {
      stationList += e.station_id_text + ' | '
    })
    let spText = `
      <div class="columns is-gapless is-multiline">      
        <div class="sParamsInfoLabel column is-full">      
          <label class="label is-fullwidth">Search Parameters:</label>      
        </div>      
        <div class="sParamsInfo column is-full">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-medium is-dark">Station(s)</span>
                <span class="tag is-medium is-light">${stationList}</span>
              </div>
            </div>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-medium is-dark">Start Date</span>
                <span class="tag is-medium is-light">${this.$data.startDate}</span>
              </div>
            </div>
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-medium is-dark">End Date</span>
                <span class="tag is-medium is-light">${this.$data.endDate}</span>
              </div>
            </div>`
    if (this.$data.textFilter.length > 0) {
      spText += `      
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-medium is-dark">Filter String</span>
                <span class="tag is-medium is-light">${this.$data.textFilter}</span>
              </div>
            </div>`
    }
    spText += `
          </div>
        </div>
      </div>`
    this.$el.querySelector('.VueTables__search').innerHTML = spText
  }
}
</script>

<style>
  .VueTables__sortable{
    cursor: pointer;
  }
  tr td:nth-child(1) {
    min-width: 200px;
  }
  tr td:nth-child(4) {
    min-width: 400px;
  }
  /* since we're not using glypicons. creating own arrows */
  .glyphicon-chevron-up {
    border: solid #00ccFF;
    border-width: 0 3px 3px 0;
    margin-top:8px;
    display: inline-block;
    padding: 3px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
  .glyphicon-chevron-down {
    border: solid #00ccFF;
    border-width: 0 3px 3px 0;
    margin-top:10px;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  .pagination-link {
    background-color: #404040;
    color: #b5b5b5 !important;
    border:transparent !important;
  }
  .pagination-link:hover {
    background-color: #505050;
  }
  .sParamsInfo{
    margin-top: 6px !important;
  }
</style>
