<template>
  <table v-if="currently && items">
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
        <td>
          <span v-if="!i.url">{{ i.title }}</span>
          <a v-if="i.url" :href="i.url" target="_blank" rel="noopener noreferrer">{{ i.title }}</a>
        </td>
        <td style="text-align:center">{{ i.platform }}</td>
        <td>{{ i.notes }}</td>
      </tr>
    </tbody>
  </table>
  <table v-if="!currently && itemsSorted">
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
        <td>
          <span v-if="!i.url">{{ i.title }}</span>
          <a v-if="i.url" :href="i.url" target="_blank" rel="noopener noreferrer">{{ i.title }}</a>
        </td>
        <td style="text-align:center">{{ i.platform }}</td>
        <td><span v-if="i.firstTime">✅</span></td>
        <td><span v-if="i.completed">💯</span></td>
        <td style="text-align:center">{{ i.dateFinished }}</td>
        <td>{{ i.notes }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import list from './data/games.json'
  export default {
    props: { 
      currently: Boolean,
      sortable: Boolean,
      year: Number,
    },
    data () {
      if (this.currently) {
        return {
          sortKey: ['title'],
          sortOrder: ['asc'],
          columns: [
            {key: 'title', name: 'Title'},
            {key: 'platform', name: 'Platform'},
            {key: 'notes', name: 'Notes'}
          ],
          items: list.filter((game) => {
            return !game.yearFinished
          })
        };
      } else if (this.year) {
        return {
          sortKey: ['dateFinished'],
          sortOrder: ['asc'],
          columns: [
            {key: 'title', name: 'Title'},
            {key: 'platform', name: 'Platform'},
            {key: 'firstTime', name: '✅'},
            {key: 'completed', name: '💯'},
            {key: 'dateFinished', name: 'Date Finished'},
            {key: 'notes', name: 'Notes'}
          ],
          items: list.filter((game) => {
            return game.yearFinished == this.year;
          })
        };
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