<template>
  <div class="events-view">
    <div class="container">
      <h1 class="is-size-4">Events</h1>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number'
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY'
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage'
        }
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '2011-10-31 9:35 am', score: 0.03343 },
        { id: 2, name: 'Jane', age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id: 3, name: 'Susan', age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id: 4, name: 'Chris', age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id: 5, name: 'Dan', age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id: 6, name: 'John', age: 20, createdAt: '2011-10-31', score: 0.03343 },
        { id: 7, name: 'Blah', age: 22, createdAt: '2011-10-31', score: 0.02343 },
        { id: 8, name: '2321', age: 23, createdAt: '2011-10-31', score: 0.03353 },
        { id: 9, name: 'hvns', age: 43, createdAt: '2011-10-31', score: 0.23343 },
        { id: 10, name: '234dss', age: 32, createdAt: '2011-10-31', score: 0.13343 },
        { id: 11, name: 'sdfsdf23', age: 52, createdAt: '2011-10-31', score: 0.23343 }
      ]
    }
  }
}
</script>
