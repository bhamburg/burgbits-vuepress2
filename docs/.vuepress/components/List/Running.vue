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
        <td>{{ i.attributes.name }}</td>
        <td style="text-align:center">{{ i.attributes.date }}</td>
        <td>{{ i.attributes.distance }}</td>
        <td style="text-align:right">{{ i.attributes.time }}</td>
        <td style="text-align:right">{{ i.attributes.pace }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import Parse from 'parse/dist/parse.min.js';

  Parse.initialize('nXKjWFWz0noFDDV5kX101uKB4nImJyIDSjqoVPFG', 'TyfKd1IfKTYN6UZrQx9nDOU97maRlaNmt0ClVE85');
  Parse.serverURL = "https://parseapi.back4app.com/";

  const Run = Parse.Object.extend("Run")
  const query = new Parse.Query(Run)
  query.limit(9999)

  let list = []
  
  export default {
    props: { 
      currently: Boolean,
      year: Number
    },
    data () {
      return {
        items: []
      }
    },
    async created() {
      try {
        list = await query.find()
        this.items = list.sort((a, b) => {
          if (a.attributes.date && b.attributes.date) {
            return b.attributes.date.localeCompare(b.attributes.date)
          }
        })
      } catch(error) {
        console.log(error)
      }
    }
  }
</script>