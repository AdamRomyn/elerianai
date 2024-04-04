<template>
    <PageContent>
        <div class="block flex justify-between">
            <h1 class="text-3xl font-bold">Polls</h1>
            <router-link class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                to="/polls/create">+ Create a New Poll</router-link>
        </div>
        <ul class="polls-list">
            <li class="block mt-4 flex justify-between" v-for="poll in polls" :key="poll.id">
                <span>{{ poll.question }} </span>

                <div class="buttons flex justify-start gap-2">
                    <router-link class="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        :to="'/polls/' + poll.id + '/vote'">
                        Vote on poll
                    </router-link>
                    <router-link class="block bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                        :to="'/polls/' + poll.id + '/results'">
                        View Results
                    </router-link>
                </div>


            </li>
        </ul>
    </PageContent>
</template>

<script>
import pollService from '@/features/polls/services/pollService';
import PageContent from '@/shared/components/PageContent.vue';
import { ref } from 'vue';
export default {
    components: {
        PageContent
    },
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