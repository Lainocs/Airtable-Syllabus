<template>
	<div>
		<h1>Les Modules</h1>
		<p>Chaque module de cours a son ID propre</p>
		<p>Pour y accéder, il faut se rendre sur: <u>{{getUrl()}}modules/:IdDuModule</u></p>
	</div>
</template>

<script>

export default {
  name: 'HomeView',
	methods: {
		getUrl() {
			return window.location.href;
		}
	},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
