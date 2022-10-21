<template>
  <div v-if="loaded" class="module">
    <h1>{{ module.Name }}</h1>
		<span>{{ module.UE.Label }}</span>
		<div class="time">
			<p>{{ module.__Nb_jour_5h_ou_7h }} jours</p> |
			<p>{{ module.__Heures_TD }} h</p>
		</div>

		<form @submit.prevent="sendForm()">
			<label for="objectifs_pedagogiques">Objectifs Pédagogiques :</label>
			<textarea @input="emitSocket()" id="objectifs_pedagogiques" v-model="form.Objectifs_Pedagogiques"></textarea>
			<input v-if="!submit" type="submit" value="Enregistrer" class="btn notsubmit">
			<input v-else value="Enregistré" class="btn submit">
		</form>
  </div>
</template>

<script>
	export default {
		name: 'ModuleView',
		data() {
			return {
				form: {
					Objectifs_Pedagogiques: ''
				},
				module: null,
				loaded: false,
				submit: false
			}
		},
		methods: {
			sendForm() {
				this.$airtable(process.env.VUE_APP_AIRTABLE_MODULE_TABLE).update([
					{
						"id": this.module.module_id,
						"fields": {
							"Objectifs Pedagogiques": this.form.Objectifs_Pedagogiques
						}
					}
				]),
				this.submit = true
			},
			emitSocket() {
				console.log('emitted')
				this.$socket.emit('obj', this.form.Objectifs_Pedagogiques)
			},
		},
		created() {
			this.$airtable(process.env.VUE_APP_AIRTABLE_MODULE_TABLE).find(this.$route.params.id, (err, record) => {
				if (err) { console.error(err); return; }
				this.module = record.fields
				
				for (var key in this.module) {
					this.module[key.replace(/[^a-zA-Z0-9]/g, '_')] = this.module[key]
				}

				this.form.Objectifs_Pedagogiques = this.module.Objectifs_Pedagogiques
				
				this.$airtable(process.env.VUE_APP_AIRTABLE_UE_TABLE).find(this.module.UE, (err, record) => {
					if (err) { console.error(err); return; }
					this.module.UE = record.fields
				});

				
				this.loaded = true

				this.$socket.on('data', (data) => {
					console.log(data)
					this.form.Objectifs_Pedagogiques = data
				})
			});
		},
	}
</script>

<style>
	span {
		background-color: aliceblue;
		padding: 0.5rem;
		border-radius: 20px;
	}

	textarea {
		border-radius: 10px;
		padding: 20px;
		box-shadow: 4px 8px 8px;
		width: 100%;
		resize: none;
		height: 40vh;
	}

	form {
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
	}
	
	form label {
		align-self: flex-start;
		padding: 20px 0;
	}

	.btn {
		width: 30vw;
		margin-top: 20px;
		padding: 10px;
		border-radius: 10px;
		border: none;
		text-align: center;
	}

	.submit {
		background-color: #4CAF50;
		color: white;
	}

	.notsubmit {
		background-color: #2196F3;
		color: white;
	}

	.time {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}
</style>