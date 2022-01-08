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
        <td>
          <span v-if="!i.url">{{ i.title }}</span>
          <a v-if="i.url" :href="i.url" target="_blank" rel="noopener noreferrer">
            {{ i.title }}<span><svg class="icon outbound" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg><!--[--><span class="sr-only">open in new window</span><!--]--></span>
          </a>
        </td>
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
        <td>
          <span v-if="!i.url">{{ i.title }}</span>
          <a v-if="i.url" :href="i.url" target="_blank" rel="noopener noreferrer">
            {{ i.title }}<span><svg class="icon outbound" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg><!--[--><span class="sr-only">open in new window</span><!--]--></span>
          </a>
        </td>
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
            {key: 'authorLastFirst', name: 'Author(s)'},
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