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
          <span v-if="!i.attributes.url">{{ i.attributes.title }}</span>
          <a v-if="i.attributes.url" :href="i.attributes.url" target="_blank" rel="noopener noreferrer">
            {{ i.attributes.title }}<span><svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg><span class="sr-only">open in new window</span></span>
          </a>
        </td>
        <td style="text-align:center">{{ i.attributes.platform }}</td>
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
        <td style="width: 50%">
          <span v-if="!i.attributes.url">{{ i.attributes.title }}</span>
          <a v-if="i.attributes.url" :href="i.attributes.url" target="_blank" rel="noopener noreferrer">
            {{ i.attributes.title }}<span><svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg><span class="sr-only">open in new window</span></span>
          </a>
        </td>
        <td style="text-align:center">{{ i.attributes.platform }}</td>
        <td style="text-align:center">{{ i.attributes.dateFinished }}</td>
        <td style="text-align:center; font-size:1.5em;">
          <span v-if="i.attributes.firstTime === 'yes'" title="first playthrough">✓</span>
        </td>
        <td style="text-align:center; font-size:1.5em;">
          <span v-if="i.attributes.completed === 'yes'" title="completed 100%">💯</span>
        </td>
        <td style="text-align:center; font-size:2em;">
          <span v-if="i.attributes.rating == 5" title="5/5 stars, loved it">🤩</span>
          <span v-if="i.attributes.rating == 4" title="4/5 stars, liked it">😄</span>
          <span v-if="i.attributes.rating == 3" title="3/5 stars, it was fine">🙂</span>
          <span v-if="i.attributes.rating == 2" title="2/5 stars, didn't like it">😒</span>
          <span v-if="i.attributes.rating == 1" title="1/5 stars, hated it">😡</span>
          <span v-if="!i.attributes.rating" title="didn't rate it">🤔</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Parse from 'parse/dist/parse.min.js';

  Parse.initialize('nXKjWFWz0noFDDV5kX101uKB4nImJyIDSjqoVPFG', 'TyfKd1IfKTYN6UZrQx9nDOU97maRlaNmt0ClVE85')
  Parse.serverURL = "https://parseapi.back4app.com/"

  const Game = Parse.Object.extend("Game")
  const query = new Parse.Query(Game)
  query.limit(9999)

  let list = []
  
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
          ],
          items: []
        };
      } else if (this.year) {
        return {
          sortKey: ['dateFinished'],
          sortOrder: ['asc'],
          columns: [
            {key: 'title', name: 'Title'},
            {key: 'platform', name: 'Platform'},
            {key: 'dateFinished', name: 'Date Finished'},
            {key: 'firstTime', name: 'First Time'},
            {key: 'completed', name: '100%'},
            {key: 'rating', name: "My Rating"},
          ],
          items: []
        };
      }
    },
    async created() {
      try {
        list = await query.find()
        if (this.currently) {
          this.items = list.filter((game) => {
            return !game.attributes.yearFinished
          })
        } else if (this.year) {
          this.items = list.filter((game) => {
            return game.attributes.yearFinished == this.year;
          })
        }
      } catch(error) {
        console.log(error)
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