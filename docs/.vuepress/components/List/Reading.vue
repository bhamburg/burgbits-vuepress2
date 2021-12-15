<template>
  <table v-if="currently && items">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author(s)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-bind:key="i" v-for="i in items">
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
        <th>Title</th>
        <th>Author(s)</th>
        <th>Date Finished</th>
      </tr>
    </thead>
    <tbody>
      <tr v-bind:key="i" v-for="i in items">
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
      year: Number
    },
    data () {
      let sortedList = list.sort((a, b) => {
        if (a.dateRead && b.dateRead) {
          return a.dateRead.localeCompare(b.dateRead)
        }
      })
      if (this.currently) {
        return {
          items: sortedList.filter((book) => {
            return !book.yearRead
          })
        }
      } else if (this.year) {
        return {
          items: sortedList.filter((book) => {
            return book.yearRead == this.year
          })
        }
      }
    }
  }
</script>