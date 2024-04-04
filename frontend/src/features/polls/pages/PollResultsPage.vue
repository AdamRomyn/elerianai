<template>
    <PageContent>
        <div class="block flex justify-between">
            <h1 class="text-3xl font-bold">Poll Results</h1>
        </div>
        <h2>Question: {{ poll.question }}</h2>
        <h3>Results</h3>
        <div class="flex">
            <div class="w-1/2">

                <Pie v-if="loaded" :data="pieChart.data" />
            </div>
        </div>
    </PageContent>
</template>

<script>
import pollService from '@/features/polls/services/pollService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { ref } from 'vue'
import PageContent from '@/shared/components/PageContent.vue'


ChartJS.register(ArcElement, Tooltip, Legend)
export default {
    name: 'PieChart',
    components: {
        Pie,
        PageContent
    },
    setup() {
        const loaded = ref(false);
        const poll = ref({
            id: undefined,
            question: '',
            answers: [],
        });
        const pieChart = ref({
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false
            }
        });

        return { poll, pieChart, loaded }
    },
    methods: {
        fetchPoll() {
            const pollId = this.$route.params.id;
            if (!pollId) {
                console.error('Poll ID not set');
                // navigate to home page
                this.$router.push('/');
                return;
            }
            pollService.getPoll(pollId)
                .then(response => {
                    this.poll = response.data.poll;
                    const pieChart = this.pieChart;
                    this.poll.answers.forEach((answer) => {
                        console.log(answer);
                        pieChart.data.labels.push(answer.answer);
                        pieChart.data.datasets[0].data.push(answer.votes);
                        const color = this.getRandomColor();
                        pieChart.data.datasets[0].backgroundColor.push(color);
                        pieChart.data.datasets[0].hoverBackgroundColor.push(this.makeColorDarker(color));
                    });
                    this.pieChart = pieChart;
                    this.loaded = true;
                })
                .catch(error => {
                    console.error('Error fetching poll', error);
                });
        },
        getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        makeColorDarker(color) {
            let r = parseInt(color.substring(1, 3), 16);
            let g = parseInt(color.substring(3, 5), 16);
            let b = parseInt(color.substring(5, 7), 16);
            r = Math.floor(r * 0.8);
            g = Math.floor(g * 0.8);
            b = Math.floor(b * 0.8);
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
        },
        submitVote() {
            if (!this.poll.id) {
                alert("There was an error submitting your vote. Please try again later or contact support.");
                return;
            }
            // Here you would submit the selected options
            console.log('Selected options:', this.vote.selectedItem);
            // Example of submitting vote - adjust according to your API
            pollService.submitVote(this.poll.id, this.vote.selectedItem)
                .then(() => {
                    console.log('Vote submitted');
                    this.$router.push(`/poll/${this.poll.id}/results`);
                })
                .catch((error) => {
                    console.error('Error submitting vote', error);
                });
        }
    },
    mounted() {
        this.fetchPoll();
    }
};
</script>@/modules/polls/services/pollService