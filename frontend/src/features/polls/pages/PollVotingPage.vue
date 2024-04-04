<template>
    <div>
        <h2>Question: {{ poll.question }}</h2>
        <form @submit.prevent="submitVote">
            <div v-for="(option, index) in poll.answers" :key="index">
                <input type="radio" :id="'option-' + index" v-model="vote.selectedItem" :value="option.answer.text">
                <label :for="'option-' + index">{{ option.answer.text }}</label>
            </div>
            <button type="submit">Submit Vote</button>
        </form>
    </div>
</template>

<script>
import pollService from '@/features/polls/services/pollService';
export default {
    data() {
        return {
            poll: {
                id: undefined,
                question: '',
                answers: [],
            },
            vote: {
                seletedItem: null
            }
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
            if(!this.poll.id) {
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
    created() {
        this.fetchPoll();
    }
};
</script>@/modules/polls/services/pollService