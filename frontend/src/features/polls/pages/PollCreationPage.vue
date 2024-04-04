<template>
    <div>
        <h2>Create a New Poll</h2>
        <form @submit.prevent="submitPoll">
            <div>
                <label for="question">Question:</label>
                <input id="question" v-model="poll.question" required>
            </div>
            <div v-for="(option, index) in poll.options" :key="index">
                <label :for="'option-' + index">Option {{ index + 1 }}:</label>
                <input :id="'option-' + index" v-model="option.text" required>
            </div>

            <button @click="addOption">Add answer</button>
            <button type="submit">Create Poll</button>
        </form>
    </div>
</template>

<script>
import pollService from '@/features/polls/services/pollService';
export default {
    data() {
        return {
            poll: {
                question: '',
                options: [{ text: '' }, { text: '' }] // Start with 2 options
            }
        };
    },
    methods: {
        submitPoll() {
            // Here you would post to your backend
            // validate options and question

            pollService.createPoll({question: this.poll.question, answers: this.poll.options}).then((res) => {
                console.log('Poll created');
                this.$router.push(`/polls/${res.data.id}/vote`); // Navigate to voting page
            }).catch((error) => {
                console.error('Error creating poll', error);
            });
            console.log(this.poll);
        },
        addOption() {
            if(this.poll.options.length > 3) {
                alert("You can't have more than 4 options")
            } 
            this.poll.options.push({ text: '' });
        }
    }
};
</script>@/modules/polls/services/pollService