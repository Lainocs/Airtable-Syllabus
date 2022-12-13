<template>
  <router-view/>
</template>

<script>
	export default {
		name: 'App',
	}
</script>

<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d6dade;
}

body {
	background-color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #d6dade;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
