<template>
    <PageContent>
        <h1 class="text-3xl font-bold mb-4">Create a New Poll</h1>
        <form @submit.prevent="submitPoll" class="space-y-4">
            <div class="flex flex-col">
                <label for="question" class="font-bold">Question:</label>
                <input id="question" v-model="poll.question" required
                    class="mt-1 px-2 py-1 rounded border-2 border-gray-300">
            </div>
            <div v-for="(option, index) in poll.options" :key="index" class="flex flex-col">
                <label :for="'option-' + index" class="font-bold">Option {{ index + 1 }}:</label>
                <input :id="'option-' + index" v-model="option.answer" required
                    class="mt-1 px-2 py-1 rounded border-2 border-gray-300">
            </div>

            <div class="flex justify-between">
                <button @click="addOption" type="button"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add answer</button>
                <button type="submit"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Poll</button>
            </div>
        </form>
    </PageContent>
</template>

<script>
import pollService from '@/features/polls/services/pollService';
import PageContent from '@/shared/components/PageContent.vue';
import { reactive } from 'vue';
export default {
    components: {
        PageContent
    },
    setup() {
        const poll = reactive({
            question: '',
            options: [{ answer: '' }, { answer: '' }], // Start with 2 options
        });

        return {
            poll,
        };
    },
    methods: {
        submitPoll() {
            // Here you would post to your backend
            // validate options and question

            pollService.createPoll({ question: this.poll.question, answers: this.poll.options }).then((res) => {
                console.log('Poll created');
                this.$router.push(`/polls/${res.data.id}/vote`); // Navigate to voting page
            }).catch((error) => {
                console.error('Error creating poll', error);
            });
            console.log(this.poll);
        },
        addOption() {
            if (this.poll.options.length > 3) {
                alert("You can't have more than 4 options")
            }
            this.poll.options.push({ answer: '' });
        }
    }
};
</script>@/modules/polls/services/pollService