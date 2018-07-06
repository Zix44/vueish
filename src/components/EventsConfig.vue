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
            <label class="label">{{formInput.ilabel}}</label>
            <div class="control">
                <input v-model="formInput.value" class="input" type="text" :placeholder="formInput.iPlaceholder">
            </div>
        </div>
        <div class="control">
            <!-- when button is clicked emit event called searchParams containing the formInputs object -->
            <button v-on:click="$emit('searchParams', formInputs)" class="button is-primary">Submit</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'events-config', // name of this component
  props: ['sParams'], // receive parameters from parent
  data () {
    return {
      /* rather than writing all the html markup, using this object to assist in
      generating the elements. we will bind the input data to value
      when the user submits the form we send this object so they get the values
      */
      formInputs: [
        { id: 1, ilabel: 'Station(s):', iPlaceholder: 'All Stations', value: '' },
        { id: 2, ilabel: 'Start Date:', iPlaceholder: 'Select start date', value: '' },
        { id: 3, ilabel: 'End Date: ', iPlaceholder: 'Select end date', value: '' },
        { id: 4, ilabel: 'Additonal text filter', iPlaceholder: 'e.g. EA01Q00. use % as wildcard - e.g. 66kV%Alm', value: '' }
      ]
    }
  },
  mounted () {
    // check if we have received any search parameters
    // this would happen if we have previously searched for something
    if (this.sParams.length > 0) {
      this.sParams.forEach((e, i) => {
        this.$data.formInputs[i].value = e.value
      })
    }
  }
}
</script>
