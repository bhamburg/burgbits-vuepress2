<template>
  <table v-if="currently && items">
    <thead>
      <tr>
        <th>Title</th>
        <th>Platform</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="i" v-for="i in items">
        <td>{{ i.title }}</td>
        <td style="text-align:center">{{ i.platform }}</td>
        <td>{{ i.notes }}</td>
      </tr>
    </tbody>
  </table>
  <table v-if="!currently && items">
    <thead>
      <tr>
        <th>Title</th>
        <th>Platform</th>
        <th>✅</th>
        <th>💯</th>
        <th>Date Finished</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="i" v-for="i in items">
        <td>{{ i.title }}</td>
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
      year: Number
    },
    data () {
      if (this.currently) {
        return {
          items: list.filter((game) => {
            return !game.yearFinished
          })
        }
      } else if (this.year) {
        return {
          items: list.filter((game) => {
            return game.yearFinished == this.year
          }).sort((a, b) => {
            if (a.dateFinished && b.dateFinished) {
              return a.dateFinished.localeCompare(b.dateFinished);
            }
          })
        }
      }
    }
  }
</script>