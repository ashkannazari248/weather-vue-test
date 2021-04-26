<template>
  <div class="home">
    <label for="city_name">City name:</label>
    <input v-model="cityName" id="city_name" type="text">
    <br>
    <label for="date">date:</label>
    <input v-model="date" :min="min" id="date" type="date">
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>City</th>
        <th>Wind speed</th>
        <th>Humidity</th>
        <th>Pressure</th>
        <th>Temp</th>
        <th>Temp min</th>
        <th>Temp max</th>
        <th>Lon</th>
        <th>Lat</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,i) in paginated" :key="`paginated-${i}`">
        <td v-text="(indexStart+1)+i"/>
        <td v-text="item.name"/>
        <td v-text="item.wind.speed"/>
        <td v-text="item.main.humidity"/>
        <td v-text="item.main.pressure"/>
        <td v-text="">
          <font-awesome-icon v-if="Math.round(item.main.temp)<4" class="cold-icon" icon="temperature-low"/>
          <font-awesome-icon v-else-if="Math.round(item.main.temp)>30" class="hot-icon" icon="temperature-high"/>
          <span v-text="Math.round(item.main.temp)"/>
        </td>
        <td v-text="Math.round(item.main.temp_min)"/>
        <td v-text="Math.round(item.main.temp_max)"/>
        <td v-text="item.coord.lon"/>
        <td v-text="item.coord.lat"/>
        <td v-text="item.weather[0].description"/>
      </tr>
      <tr v-for="i in paginated && paginated.length?pageSize-paginated.length:0" :key="`empty-${i}`">
        <td class="empty-td" v-for="j in 11"/>
      </tr>
      <tr v-if="!paginated || !paginated.length">
        <td colspan="11">not found</td>
      </tr>
      </tbody>
    </table>

    <router-link v-if="pages>1" v-for="i in pages" :key="`page-${i}`" :to="{name:'Home',query:{page:i}}"
                 class="paginate" :class="{'paginate-active':i===page}" v-text="i"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from 'moment';

export default {
  name: 'Home',
  async mounted() {
    await this.fetchCityWeather()
    let date = new Date()
    this.min = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()

  },
  data() {
    return {
      pageSize: 10,
      cityName: '',
      date: '',
      min: '',
    }
  },
  computed: {
    getCityWeather() {
      let cityWeather = this.$store.getters['weather/cityWeather'];
      return cityWeather.filter(e =>
          (this.cityName ? e.name.toLowerCase().match(this.cityName.toLowerCase()) : true) &&
          (this.date ? this.convertDate(e.sys.sunrise) === this.date : true)
      )
    },
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    pages() {
      return Math.ceil(this.getCityWeather.length / 10)
    },
    indexStart() {
      return (this.page - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    paginated() {
      let getCityWeather = this.getCityWeather.slice(this.indexStart, this.indexEnd)
      if (!getCityWeather.length && this.page > 1)
        this.$router.push({name: 'Home', query: {page: this.page - 1}})
      return getCityWeather
    }
  },
  methods: {
    ...mapActions({
      fetchCityWeather: 'weather/cityWeather'
    }),
    convertDate(timestamp) {
      return moment(new Date(timestamp * 1000)).locale('es').locale(false).format('YYYY-MM-DD');
    }
  }
}
</script>
<style scoped lang="scss">
table {
  color: #fff;
  background-color: #212529;
  border-collapse: collapse;

  & > thead {
    & > tr {
      border-top: 1px solid #dee2e6;
      border-bottom: 1px solid #dee2e6;

      & > th {
        padding: 15px 20px;
      }
    }
  }

  & > tbody {
    & > tr {
      border-bottom: 1px solid #dee2e6;

      &:nth-of-type(odd) {
        background-color: rgba(255, 255, 255, .05);
      }

      & > td {
        padding: 15px 20px;

        &.empty-td {
          filter: blur(6px);
          -webkit-filter: blur(6px);

          &:after {
            content: 'weather';
          }
        }
      }
    }
  }
}

.paginate {
  margin: 5px 5px 5px 0;
  width: 30px;
  height: 30px;
  padding: 5px;
  display: inline-block;
  border: #7e7878 solid 1px;
  background-color: white;
  color: black;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.paginate-active {
  padding: 5px;
  border: #82c4d0 solid 1px;
  background-color: blue;
  color: white;
}

.cold-icon {
  font-size: 16px;
  color: blue;
}

.hot-icon {
  font-size: 16px;
  color: red;
}

label {
  width: 100px;
  display: inline-block;
  margin-bottom: 10px;
}

input {
  width: 300px;
  display: inline-block;
  margin-bottom: 10px;
}

*, ::after, ::before {
  box-sizing: border-box;
}
</style>
