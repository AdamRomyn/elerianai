<template>
  <div class="w-100vw h-48 header-bg">
    <div class="flex justify-center items-center">
      <img class="logo mt-8 w-48 h-48 rounded-lg" alt="PollBowl" src="@/assets/logo.webp">
    </div>
  </div>
  <nav id="navigation">
    <router-link to="/">Home</router-link> |
    <router-link to="/polls/create">Create Poll</router-link> |
    <router-link to="/polls">Polls</router-link>
  </nav>
  <div class="content">

  </div>

  <router-view />
</template>

<style lang="scss">
$logo-spacing: 80px;

#navigation {
  margin-top: $logo-spacing + 20;
  padding: 10px;

}

.logo {
  position: absolute;
  bottom: -$logo-spacing;
}

.header-bg {
  background-color: #a8e29a;
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
