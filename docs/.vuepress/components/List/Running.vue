<template>
  <table v-if="items">
    <thead>
      <tr>
        <th>Race Name</th>
        <th>Date</th>
        <th>Distance</th>
        <th>Time</th>
        <th>Pace<br>(Per Mile)</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="i" v-for="i in items">
        <td>{{ i.name }}</td>
        <td style="text-align:center">{{ i.date }}</td>
        <td>{{ i.distance }}</td>
        <td style="text-align:right">{{ i.time }}</td>
        <td style="text-align:right">{{ i.pace }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import list from './data/runs.json'
  export default {
    props: { 
      currently: Boolean,
      year: Number
    },
    data () {
      let sortedList = list.sort((a, b) => {
        if (a.date && b.date) {
          return b.date.localeCompare(b.date)
        }
      })
      return {
        items: sortedList
      }
    }
  }
</script>