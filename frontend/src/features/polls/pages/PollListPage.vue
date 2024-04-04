<template>
    <div>
        <h2>Polls</h2>
        <router-link to="/polls/create">Create a New Poll</router-link>
        <div class="content">
            <ul class="polls-list">
                <li v-for="poll in polls" :key="poll.id">
                    <router-link :to="'/polls/' + poll.id + '/vote'">{{ poll.question }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import pollService from '@/features/polls/services/pollService';
import { ref } from 'vue';
export default {
    setup() {
        const polls = ref([]);
        return { polls }
    },
    mounted() {
        this.fetchPolls();
    },
    methods: {
        fetchPolls() {
            pollService.getAllPolls()
                .then(response => {
                    console.log(response);
                    this.polls = response.data;
                })
                .catch(error => {
                    console.error('Error fetching polls', error);
                });
        }
    }
};
</script>

<style lang="scss">
    .polls-list {
        li {
            list-style: none;
        }
    }
</style>