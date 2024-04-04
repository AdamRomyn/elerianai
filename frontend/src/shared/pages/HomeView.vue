<template>
  <div class="home mt-4">
    <header>
      <h1 class="text-4xl font-bold text-gray-800">Welcome to a bowl full of polls</h1>
      <p>Before diving into the app here are two answers to questions in the task brief:</p>
      <br />
      <h2 class="text-xl font-bold ">Before diving into the app here are two answers to questions in the task brief:
      </h2>
    </header>
    <section>
      <div class="flex justify-center items-center mt-4">
        <div class="w-11/12 rounded-lg bg-gray-100 text-left p-4">

          <h3 class="text-xl"><strong>Question 1:</strong> How would you containerise the application?</h3>
          <p class="text-lg"><strong>Answer:</strong> Due to it having a back and front-end I would use two docker files which are supplied below. 
            <br/>
            I would also use docker-compose file for dev as I assume there would also be a db later added and maybe more services.

            <br /><br />
            For production it would be slighly different as the building in the docker files will have to change to build production ready builds. Also if the app would need to served using http-server or nginx so that can be added as a secondary build step</p>
          <code class="block bg-gray-200 p-2 rounded-lg mt-2">
            <pre>
              {{ `
FROM node:alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "serve"]` }}
            </pre>
          </code>

        </div>
      </div>

    </section>
  </div>
</template>

<script>

// fetch from api the polls

export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style lang="scss">
.home {
  img {
    margin: 0 auto;
  }
}
</style>
