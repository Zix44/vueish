<!-- This template is the for the event search parameters form -->
<!-- When the Search button is clicked it emits an event back to the parent -->
<template>
    <div>
        <h1 class="is-size-4">Event Search Parameters</h1>
        <!-- loop through formInputs object to generate form -->
        <div
            v-for="formInput in formInputs"
            :key="formInput.id"
            class="field"
            >
            <label class="label is-large">{{formInput.ilabel}}</label>
            <div class="control">
                <!-- using v-if on the id. need to use flatpickr component for date selection -->
                <multiselect class="input is-large"
                  v-if="formInput.id === 1"
                  v-model="formInput.value"
                  :options="stations"
                  :multiple="true"
                  :hide-selected="true"
                  track-by="station_id_text"
                  label="station_id_text">
                  <template slot="tag" slot-scope="props">
                    <span class="tag is-black tag-margin is-large">
                      <span>{{ props.option.station_id_text }}</span>
                      <button class="delete is small" @click="props.remove(props.option)"></button>
                    </span>
                  </template>
                </multiselect>
                <input v-else-if="formInput.id === 2" v-model="formInput.value" class="input is-large" type="text" :placeholder="formInput.iPlaceholder">
                <flat-pickr v-else class="input is-large" v-model="formInput.value" :config="fpconfig"></flat-pickr>
            </div>
        </div>
        <div class="control">
            <!-- when button is clicked emit event called searchParams containing the formInputs object -->
            <!-- updating this to use store. when clicked call a method to save params to store -->
            <button v-on:click="saveSearch" class="button is-success is-large">Submit</button>
        </div>
    </div>
</template>

<script>
// Import flatpickr component for datetime selection
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import '../assets/fp-darker.css' // make flatpickr suite site style
// Import Multiselect component for station selection
import Multiselect from 'vue-multiselect'

export default {
  name: 'events-config', // name of this component
  data () {
    let d = new Date()
    return {
      // flatpickrconfig
      fpconfig: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      /* rather than writing all the html markup, using this object to assist in
      generating the elements. we will bind the input data to value
      when the user submits the form we send this object so they get the values
      */
      formInputs: [
        { id: 1, ilabel: 'Station(s):', iPlaceholder: 'All Stations', value: {station_id_text: 'All Stations'} },
        { id: 2, ilabel: 'Additonal text filter', iPlaceholder: 'e.g. EA01Q00. use % as wildcard - e.g. 66kV%Alm', value: '' },
        { id: 3, ilabel: 'Start Date:', iPlaceholder: 'Select start date', value: d.setHours(d.getHours() - 1) },
        { id: 4, ilabel: 'End Date: ', iPlaceholder: 'Select end date', value: new Date() }
      ],
      stations: []
    }
  },
  created () {
    let vm = this // get the view model
    let stationDataUrl = 'http://localhost:3000/stations' // URL for station data
    // now lets fetch data
    fetch(stationDataUrl)
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
        vm.stations = data.data
      }).catch(error => {
        console.log('Error: ' + error)
        let errMsg = 'Failed to retrieve stations'
        this.$el.querySelector('.multiselect__input').placeholder = errMsg
        vm.stations = [
          {'station_id_text': 'FAKE STATION'},
          {'station_id_text': 'ALSO FAKE'}
        ]
      })
  },
  mounted () {
    // when first mounted we want to get search parameters from the store
    let sParams = this.$store.state.searchParameters
    this.$data.formInputs[0].value = sParams.stationList
    this.$data.formInputs[1].value = sParams.searchFilter
    this.$data.formInputs[2].value = sParams.seachStart
    this.$data.formInputs[3].value = sParams.searchEnd
  },
  methods: {
    saveSearch: function () {
      // get the current search values
      let searchParameters = {
        stationList: this.$data.formInputs[0].value,
        searchFilter: this.$data.formInputs[1].value,
        seachStart: this.$data.formInputs[2].value,
        searchEnd: this.$data.formInputs[3].value
      }
      // update the store
      this.$store.commit('updateSearch', searchParameters)
      // emit event to parent causing navigation to table
      this.$emit('runSearch')
    }
  },
  components: {
    flatPickr,
    Multiselect
  }
}
</script>

<style>
  /* styling the multiselect */
  .tag-margin{
    margin-right: 5px;
  }
  .multiselect__tags{
    border: 0px;
  }
  .multiselect__input:focus{
    outline: none;
    border: 0px;
    background-color: #363636;
    color:whitesmoke;
    font-size:1.5rem;
  }
  .multiselect__tags-wrap{
    float: left;
  }
 .multiselect__content-wrapper{
   z-index: 1;
   width: 100%;
   overflow-y: scroll;
   background-color: #4a4a4a;
   color:whitesmoke;
   position: absolute;
   top:55px;
   left:0px;
 }
 .multiselect__option{
   font-size: 20px;
 }
 .multiselect__element{
   cursor: pointer;
   padding-left:10px;
   padding-right:10px;
 }
</style>
