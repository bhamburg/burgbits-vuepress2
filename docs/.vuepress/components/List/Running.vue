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
        <td>{{ i.attributes.name }}</td>
        <td style="text-align:center">{{ i.attributes.dateRun }}</td>
        <td>{{ i.attributes.distance }}</td>
        <td style="text-align:right">{{ i.attributes.time }}</td>
        <td style="text-align:right">{{ i.attributes.pace }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import parseList from './api.js';

  let list = []
  
  export default {
    props: { 
      currently: Boolean,
      sortable: Boolean,
      year: Number
    },
    data () {
      return {
        sortKey: ['dateRun'],
        sortOrder: ['asc'],
        columns: [
          {key: 'name', name: 'Race Name'},
          {key: 'dateRun', name: 'Date'},
          {key: 'distance', name: 'Distance'},
          {key: 'time', name: 'Time'},
          {key: 'pace', name: 'Pace/Mile'},
        ],
        items: []
      }
    },
    async created() {
      try {
        list = await parseList('Run');
        if (this.year) {
          this.items = list.filter((run) => {
            return run.attributes.yearRun == this.year;
          });
        }
      } catch(error) {
        console.log(error);
      }
    },
    computed: {
      itemsSorted: function() {
        return this.items.sort((a, b) => {
          if (a.attributes[this.sortKey] && b.attributes[this.sortKey]) {
            if (typeof a.attributes[this.sortKey] === 'string') {
              return this.sortOrder === 'desc'
              ? b.attributes[this.sortKey].localeCompare(a.attributes[this.sortKey])
              : a.attributes[this.sortKey].localeCompare(b.attributes[this.sortKey]);
            } else {
              return this.sortOrder === 'asc'
              ? b.attributes[this.sortKey] - a.attributes[this.sortKey]
              : a.attributes[this.sortKey] - b.attributes[this.sortKey];
            }
          } else if (!a.attributes[this.sortKey]) {
            return this.sortOrder === 'desc' ? -1 : 1;
          } else if (!b.attributes[this.sortKey]) {
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