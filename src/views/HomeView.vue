<template>
	<div>
		<form @submit.prevent="sendForm">
			<label for="firstname">Firstname: </label>
			<input type="text" id="firstname" v-model="form.firstname" />
			<label for="lastname">Lastname: </label>
			<input type="text" id="lastname" v-model="form.lastname" />
			<label for="age">Age: </label>
			<input type="number" id="age" v-model="form.age" />
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script>

export default {
  name: 'HomeView',
	data() {
		return {
			form: {
				firstname: '',
				lastname: '',
				age: ''
			}
		}
	},

	methods: {
		sendForm() {
			
			this.$airtable('Module').create([
				{
					"fields": {
						"Firstname": this.form.firstname,
						"Lastname": this.form.lastname,
						"Age": this.form.age
					}
				}
			], function(err, records) {
				if (err) {
					console.error(err)
					return
				}
				records.forEach(function (record) {
					console.log(record.getId())
				})
			})
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
