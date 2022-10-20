<template>
  <div v-if="loaded" class="module">
    <h1>{{ module.Name }}</h1>
		<span>{{ module.UE.Label }}</span>

		<form @submit.prevent="sendForm()">
			<label for="objectifs_pedagogiques">Objectifs Pédagogiques</label>
			<textarea id="objectifs_pedagogiques" v-model="form.Objectifs_Pedagogiques"></textarea>
			<input type="submit" value="Enregistrer">
		</form>
		<p>{{ module.__Nb_jour_5h_ou_7h }} jours</p>
		<p>{{ module.__Heures_TD }} h</p>
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
				])
			}
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
			});

		}
	}
</script>