<template>
    <div class="section">
        <div class="section-wrapper">
            <div class="title main-font">
                <h1>지난 3년간 커트라인</h1>
            </div>
            <div class="title-explain caption-font">
                <p>그룹 별 메리트 점수 합격 하한선에 대한 정보입니다.</p>
            </div>
            <div class="graph-wrapper">
                <div class="graph">
                    <Line v-if="loaded" :data="chartData" :options="chartOptions"></Line>
                </div>
                <div class="button-wrapper">
                    <button type="button" class="btn btn-secondary" @click="changeToRound1()">라운드 1</button>
                    <button type="button" class="btn btn-secondary" @click="changeToRound2()">라운드 2</button>
                </div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="section-wrapper">
            <div class="title main-font">
                <h1>그룹별 합격률</h1>
            </div>
            <div class="title-explain caption-font">
                <p>그룹 별 지원자별 선수강 요건을 충족한 학생 중 학과에 합격된 학생들의 비율입니다.</p>
            </div>
            <div class="graph-wrapper">
                <div class="graph">
                    <Bar v-if="loaded2" :data="chartData2" :options="chartOptions2"></Bar>
                </div>
                <div class="button-wrapper">
                    <button type="button" class="btn btn-secondary" @click="changeToRound1()">라운드 1</button>
                    <button type="button" class="btn btn-secondary" @click="changeToRound2()">라운드 2</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.section {
    display: flex;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
}

.title {
    display: flex;
    justify-content: center;
}

.title-explain {
    display: flex;
    justify-content: center;
}

.graph-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1em;
}

.graph {
    height: 40em;
    width: 70em;
    border-radius: 2em;
}

.button-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 8em;
}
</style>

<script>
import { Line, Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, BarElement } from 'chart.js'
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'Chart',
  components: { Line, Bar },

  data() {
    return {
      loaded: false,
      loaded2: false,
      chartData: {
        labels: [],
        datasets: []
      },
      chartData2: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: '년도'
            }
          },
          y: {
            title: {
              display: true,
              text: '최소 합격 점수'
            }
          }
        }
      },
      chartOptions2: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: '년도'
            }
          },
          y: {
            title: {
              display: true,
              text: '학생수'
            }
          }
        }
      },
      round: 'round1',
      allStats: [],
    }
  },

  methods: {
    changeToRound1() {
        this.round = 'round1';
        this.updateChartData();
        this.updateChartData2();
    },
    changeToRound2() {
        this.round = 'round2';
        this.updateChartData();
        this.updateChartData2();
    },
    async fetchStatistics() {
        try {
            const programName = this.$route.params.programName;
            const response = await axios.get(`https://swediversity.norwayeast.cloudapp.azure.com/api/records/name/${programName}`);
            this.allStats = response.data.records

            this.updateChartData();
            this.updateChartData2();
            this.loaded = true;
            this.loaded2 = true;
        } catch (err) {
            console.error(err);
        }
    },
    updateChartData() {
        const filteredStats = this.allStats.filter(item => item.round === this.round);

        const years = [...new Set(filteredStats.map(item => item.year))];
        this.chartData.labels = years;

        const groupedData = filteredStats.reduce((acc, item) => {
            if (!acc[item.selectionGroup]) {
                acc[item.selectionGroup] = [];
            }
            acc[item.selectionGroup].push(item);
            return acc;
        }, {});

        const datasets = Object.keys(groupedData).map(group => {
            return {
                label: `Group ${group}`,
                data: years.map(year => {
                    const item = groupedData[group].find(i => i.year === year);
                    return item ? item.minScore : null;
                }),
                borderColor: this.getGroupColor(group),
                fill: false
            };
        });

        this.chartData = {
            labels: years,
            datasets: datasets
        };
    },
    updateChartData2() {
        const filteredStats = this.allStats.filter(item => item.round === this.round);

        const years = [...new Set(filteredStats.map(item => item.year))];
        this.chartData2.labels = years;

        const groupedData = filteredStats.reduce((acc, item) => {
            if (!acc[item.selectionGroup]) {
                acc[item.selectionGroup] = [];
            }
            acc[item.selectionGroup].push(item);
            return acc;
        }, {});

        const datasets = Object.keys(groupedData).flatMap(group => {
            return [
                {
                    label: `Qualified - Group ${group}`,
                    data: years.map(year => {
                        const item = groupedData[group].find(i => i.year === year);
                        return item ? item.numOfQualified - item.acceptedApplicants : 0;
                    }),
                    backgroundColor: this.getGroupColor(group),
                    stack: group,
                },
                {
                    label: `Admitted - Group ${group}`,
                    data: years.map(year => {
                        const item = groupedData[group].find(i => i.year === year);
                        return item ? item.acceptedApplicants : 0;
                    }),
                    backgroundColor: this.getHighlightColor(group),
                    stack: group,
                }
            ];
        });

        this.chartData2 = {
            labels: years,
            datasets: datasets
        };
    },
    getGroupColor(group) {
        const colors = {
            B1: '#495057',
            B2: '#6C757D',
            B1AV: '#495057',
            B1BF: '#343A40',
            B2AV: '#6C757D',
            B2BF: '#595959'
        };
        return colors[group] || '#999999';
    },
    getHighlightColor(group) {
        return '#ADB5BD';
    }
  },

  watch: {
    round(newRound) {
        this.updateChartData();
        this.updateChartData2();
    }
  },

  mounted() {
    this.loaded = false;
    this.loaded2 = false;
    this.fetchStatistics();
  }
}
</script>
