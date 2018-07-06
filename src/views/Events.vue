<!-- This is the Events page view -->
<template>
  <div class="events-view">
    <div class="container is-fluid">
      <h1 class="is-size-3">Events</h1>
      <div class="tabs">
        <ul>
          <li
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="{ 'is-active': currentTab === tab }"
            v-on:click="currentTab = tab"
          ><a>{{ tab }}</a></li>
        </ul>
      </div>
      <!-- dynamic component. will load if tab is clicked or if searchParams event is detected -->
      <!-- also passes currentSearch object to components -->
      <component v-bind:is="currentTabComponent" v-on:searchParams="showTable" :sParams="currentSearch"></component>
    </div>
  </div>
</template>

<script>
import EventsConfig from '@/components/EventsConfig.vue'
import EventsTable from '@/components/EventsTable.vue'

export default {
  components: {
    EventsConfig,
    EventsTable
  },
  data () {
    return {
      currentTab: 'Config',
      tabs: ['Config', 'Table'],
      currentSearch: []
    }
  },
  computed: {
    currentTabComponent: function () {
      return 'events-' + this.currentTab.toLowerCase()
    }
  },
  methods: {
    showTable: function (sp) {
      this.currentSearch = sp
      this.currentTab = 'Table'
    }
  }
}
</script>
