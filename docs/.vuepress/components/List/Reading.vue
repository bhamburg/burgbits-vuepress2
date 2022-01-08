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
      <tr v-bind:key="i" v-for="i in itemsSorted">
        <td>{{ i.title }}</td>
        <td>
          {{ i.author }}<span v-if="i.addAuthors">, {{ i.addAuthors }}</span>
        </td>
      </tr>
    </tbody>
  </table>
  <table v-if="!currently && items">
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
      <tr v-bind:key="i" v-for="i in itemsSorted">
        <td>{{ i.title }}</td>
        <td>
          {{ i.author }}<span v-if="i.addAuthors">, {{ i.addAuthors }}</span>
        </td>
        <td style="text-align:center">
          {{ i.dateRead }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import list from './data/books.json'
  export default {
    props: { 
      currently: Boolean,
      sortable: Boolean,
      year: Number,
    },
    data () {
      if (this.currently) {
        return {
          sortKey: ['authorLastFirst'],
          sortOrder: ['asc'],
          columns: [
            {key: 'title', name: 'Title'},
            {key: 'authorlastFirst', name: 'Author(s)'},
          ],
          items: list.filter((book) => {
            return !book.dateRead;
          })
        };
      } else if (this.year) {
        return {
          sortKey: ['dateRead'],
          sortOrder: ['asc'],
          columns: [
            {key: 'title', name: 'Title'},
            {key: 'authorLastFirst', name: 'Author(s)'},
            {key: 'dateRead', name: 'Date Finished'},
          ],
          items: list.filter((book) => {
            return book.yearRead == this.year;
          }).sort((a, b) => {
            if (a.dateRead && b.dateRead) {
              return a.dateRead.localeCompare(b.dateRead);
            }
          })
        }
      };
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