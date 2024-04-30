<template>
  <div>
    <v-app-bar>
      <v-toolbar-title class="text-center text-subtitle-1 text-uppercase font-weight-medium">{{ $t("WaitList.subscribedUsersLast15Days") }}</v-toolbar-title>
    </v-app-bar>
    <v-container fluid class="pa-0" style="max-width: 1200px; margin: auto; height: 350px;">
      <Line :data="chartData" :options="chartOptions" />
    </v-container>
  </div>
  <v-footer class=" text-center d-flex flex-column">
      

      <div class="d-flex justify-center">
          <v-row justify="center">
              <v-col>
                      <span class="text-overline">{{ $t("WaitList.totalUsersOnWaitlist") }}</span>
                      <span class="text-orange-accent-2 font-weight-bold ml-1">{{ this.totalUsers }}</span>
              </v-col>
          </v-row>
      </div>


  </v-footer>
</template>


<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import api from "@/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'App',
  components: {
    Line
  },
  data() {
    return {
      totalUsers: 0,
      chartData: {
        labels: ['01-30', '02-01', '02-02', '02-03', '02-04', '02-05', '02-06', '02-07', '02-08', '02-09', '02-10', '02-11', '02-12', '02-13', '02-14'],
        datasets: [
          {
            label: '',
            backgroundColor: '#FFAB40',
            borderColor: '#FFAB40',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#FFAB40' // Texto blanco para el eje X
            },
            grid: {
              color: '#757575' // Líneas de cuadrícula más claras
            }
          },
          y: {
            ticks: {
              color: '#FFAB40' // Texto blanco para el eje Y
            },
            grid: {
              color: '#757575' // Líneas de cuadrícula más claras
            }
          }
        },
        plugins: {
        legend: {
          labels: {
            color: '#FFAB40' // Texto blanco para la leyenda
          }
        }
      }
      }
    }
  },
  mounted() {
    this.fetchWaitlistStats();
  },
  methods: {
    async fetchWaitlistStats() {
      try {
        const response = await api.getWaitlistStats();
        console.log(response);
        const dates = Object.keys(response);
        const data = Object.values(response);
        console.log(dates);
        console.log(data);
        console.log("last data", data[data.length - 1]);

        // Actualizar el total de usuarios
        this.totalUsers = data[data.length - 1];

        // Crear un nuevo objeto de datos para el gráfico
        this.chartData = {
          labels: dates,
          datasets: [
            {
              label: 'users',
              backgroundColor: '#FFAB40',
              borderColor: '#FFAB40',
              data: data
            }
          ]
        };
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
<style>

</style>