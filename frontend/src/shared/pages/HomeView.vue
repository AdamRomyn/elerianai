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
          <p class="text-lg"><strong>Answer:</strong> Due to it having a back and front-end I would use two docker files which are supplied in the github repo I sent. 
            <br/>
            I would also use docker-compose file for dev as I assume there would also be a db later added and maybe more services. This would just help manage getting all the containers up and running quickly.

            <br /><br />
            For production it would be slighly different as files will have to change to build production ready builds. I have included two files in each folder of the two applications called Dockerfile.prod to showcase what I would do. Also the app would need to be served using http-server or nginx so that can be added as a secondary build step
            <br /><br />
            Lastly for production the way its dockerized would also depend on the cloud provider and also if one were to use docker compose in the cloud, standalone containers or kubernetes. Test cases could also be included and then you could include more build steps in the dockerfiles to run the tests before building the image.
          </p>
          

        </div>
      </div>
      <div class="flex justify-center items-center mt-4">
        <div class="w-11/12 rounded-lg bg-gray-100 text-left p-4">

          <h3 class="text-xl"><strong>Question 2:</strong> How would you add auth to this application?</h3>
          <p class="text-lg"><strong>Answer:</strong> For a small application like this I probably would just create a JWT on the server and store it in the browser's local storage. I would then use this token to authenticate requests to the server by passing it a bearer token from the client to the server. This would be done by injecting it before each axios request.
            If it were a long term project that would grow I would consider using samesite cookies. This would prevent XSS attacks from stealing the token and also just allow you to invalidate the user session more easily.
          </p>
          

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
