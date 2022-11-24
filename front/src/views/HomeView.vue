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
