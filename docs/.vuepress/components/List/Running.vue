<template>
  <table v-if="items">
    <thead>
      <tr>
        <th :key="column" 
          v-for="column in columns" 
          v-on:click="sortBy(column.key)" 
          :class="[{sortable: sortable}, {active: column.key == sortKey}, sortOrder]"
        >
          <span>{{ column.name }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr :key="i" v-for="i in itemsSorted">
        <td>{{ i.name }}</td>
        <td style="text-align:center">{{ i.date }}</td>
        <td>{{ i.miles }}</td>
        <td style="text-align:right">{{ i.time }}</td>
        <td style="text-align:right">{{ i.pace }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import parseSheet from './GoogleSheetsAPI.js'

  let list = []
  
  export default {
    props: { 
      sortable: Boolean,
      year: Number
    },
    data () {
      return {
        sortKey: 'date',
        sortOrder: 'desc',
        columns: [
          {key: 'name', name: 'Race Name'},
          {key: 'date', name: 'Date'},
          {key: 'miles', name: 'Miles'},
          {key: 'time', name: 'Time'},
          {key: 'pace', name: 'Pace/Mile'},
        ],
        items: []
      }
    },
    async created() {
      try {
        this.items = await parseSheet('Runs');
      } catch(error) {
        console.log(error);
      }
    },
    computed: {
      itemsSorted: function() {
        return this.items.sort((a, b) => {
          if (a[this.sortKey] && b[this.sortKey]) {
            return this.sortOrder === 'desc'
            ? b[this.sortKey].localeCompare(a[this.sortKey])
            : a[this.sortKey].localeCompare(b[this.sortKey]);
          } else if (!a[this.sortKey]) {
            return this.sortOrder === 'desc' ? -1 : 1;
          } else if (!b[this.sortKey]) {
            return this.sortOrder === 'desc' ? 1 : -1;
          }
        })
      },
    },
    methods: {
      sortBy: function(key) {
        if (this.sortable) {
          if (key == this.sortKey) {
            this.sortOrder = (this.sortOrder == 'asc') ? 'desc' : 'asc';
          } else {
            this.sortKey = key;
            this.sortOrder = 'asc';
          }
        }
      },
    }
  }
</script>