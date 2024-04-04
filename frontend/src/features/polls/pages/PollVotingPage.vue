<template>
    <PageContent>
        <div class="block flex justify-between">
            <h1 class="text-3xl font-bold">Vote on poll</h1>
            <router-link class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                :to="'/polls/' + poll.id + 'vote'">+ View Results</router-link>
        </div>

        <h2>Question: {{ poll.question }}</h2>
        <form @submit.prevent="submitVote">
            <div class="bg-gray-200 hover:bg-gray-400 hover:cursor-pointer rounded p-2 mt-4"
                v-for="(option, index) in poll.answers" :key="index" @click="selectOption(option)">
                <input class="form-radio mr-4 hover:cursor-pointer" type="radio" :id="'option-' + index"
                    v-model="vote.selectedItem" :value="option.answer">
                <label class="hover:cursor-pointer" :for="'option-' + index">{{ option.answer }}</label>
            </div>
            <div class="buttons flex justify-end mt-4">

                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">Submit Vote</button>
            </div>
        </form>
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
    created() {
        this.fetchPoll();
    },
    setup() {
        // Define reactive variables using ref()
        const poll = ref({
            id: undefined,
            question: '',
            answers: [],
        });

        const vote = ref({
            selectedItem: null,
        });

        // Return reactive variables
        return {
            poll,
            vote,
        };
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
                    console.log(this.poll);
                    console.log(response.data)
                    this.poll = { ...response.data.poll, selectedOptions: [] };
                })
                .catch(error => {
                    console.error('Error fetching poll', error);
                });
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
                    this.$router.push(`/polls/${this.poll.id}/results`);
                })
                .catch((error) => {
                    console.error('Error submitting vote', error);
                });
        },
        selectOption(option) {
            // Set the selected radio item when the div is clicked
            this.vote.selectedItem = option.answer;
        }
    }
};
</script>@/modules/polls/services/pollService