<template>
  <div v-if="loaded" class="module">
    <h1>{{ module.Name }}</h1>
		<span>{{ module.UE.Label }}</span>
		<div class="time">
			<p>{{ module.__Nb_jour_5h_ou_7h }} jours</p> |
			<p>{{ module.__Heures_TD }} h</p>
		</div>

		<form @submit.prevent="sendForm()">
			<!-- Obj Gén -->
			<label for="objectif_general">Objectif Général :</label>
			<textarea @input="emitSocket()" id="objectif_general" v-model="form.objectif_general"></textarea>
			<!-- Obj Pédago -->
			<label for="objectifs_pedagogiques">Contenu :</label>
			<textarea @input="emitSocket()" id="objectifs_pedagogiques" v-model="form.objectifs_pedagogiques"></textarea>
			<!-- Pré-requis -->
			<label for="pre_requis">Pré-requis :</label>
			<textarea @input="emitSocket()" id="pre_requis" v-model="form.pre_requis"></textarea>
			<!-- Biblio -->
			<label for="bibliographie">Bibliographie :</label>
			<textarea @input="emitSocket()" id="bibliographie" v-model="form.bibliographie"></textarea>
			
			<!-- Skills -->
			<div v-if="this.competences" class="skills">
				<div v-for="competence in this.module.CompetencesVisees" :key="competence.id">
					<div class="skill">
						<span @click="deleteSkill(competence)">x</span>
						<p>{{ competence.Competence }}</p>
					</div>
				</div>
			</div>
			<!-- New skill -->
			<button v-if="!newSkill" @click="this.newSkill = true" class="btn add-skill">Ajouter une compétence</button>
			<form @submit.prevent="addSkill()">
				<textarea v-if="newSkill" v-model="newSkillContent"></textarea>
				<button type="submit" v-if="newSkill && !skillSubmit" class="btn add-skill">Ajouter</button>
				<input v-if="skillSubmit" value="Ajouté" class="btn submit">
			</form>
			
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
				form: {},
				module: null,
				loaded: false,
				submit: false,
				newSkill: false,
				newSkillContent: null,
				skillSubmit: false,

				competences: [],
			}
		},
		methods: {
			sendForm() {
				this.$airtable(process.env.VUE_APP_AIRTABLE_MODULE_TABLE).update([
					{
						"id": this.module.module_id,
						"fields": {
							"Objectifs Pedagogiques": this.form.objectifs_pedagogiques,
							"Objectif General": this.form.objectif_general,
							"Pre-requis": this.form.pre_requis,
							"Bibliographie": this.form.bibliographie
						}
					}
				]),
				this.submit = true
			},
			emitSocket() {
				this.submit = false
				
				this.$socket.emit('obj', this.form)
			},
			getCompetences() {
				// Get Competences
				let arr = []
				this.competences?.forEach(competence => {
					this.$airtable(process.env.VUE_APP_AIRTABLE_COMPETENCES_TABLE).find(competence, (err, record) => {
						
						if (err) { console.error(err); return; }
						record.fields['id'] = record.id
						arr.push(record.fields)

						this.module.CompetencesVisees = arr
					});
				});
			},
			deleteSkill(competence) {
				this.$airtable(process.env.VUE_APP_AIRTABLE_COMPETENCES_TABLE).destroy(competence.id)
				this.getCompetences()
			},
			addSkill() {
				this.$airtable(process.env.VUE_APP_AIRTABLE_COMPETENCES_TABLE).create([
					{
						"fields": {
							"Module": [this.module.module_id],
							"Competence": this.newSkillContent
						}
					}
				])
				this.getCompetences()
				this.skillSubmit = true
			},
		},
		created() {
			// Get module
			this.$airtable(process.env.VUE_APP_AIRTABLE_MODULE_TABLE).find(this.$route.params.id, (err, record) => {
				if (err) { console.error(err); return; }
				this.module = record.fields
				
				for (var key in this.module) {
					// replace all spaces and special chars by underscores and lowercase
					this.module[key.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()] = this.module[key]
				}

				// Get competences visées
				this.competences = this.module.CompetencesVisees


				// Put data in form
				Object.keys(this.module).forEach(key => {
					this.form[key] = this.module[key]
				})

				// Get UE
				this.$airtable(process.env.VUE_APP_AIRTABLE_UE_TABLE).find(this.module.UE, (err, record) => {
					if (err) { console.error(err); return; }
					this.module.UE = record.fields
				});
				

				this.getCompetences()
				
				// Finish Loader
				setTimeout(() => {
					this.loaded = true
				}, 1000);

				this.$socket.on('data', (data) => {
					Object.keys(data).forEach(key => {
						this.form[key] = data[key]
					})
				})
			});
		},
	}
</script>

<style>
	span {
		background-color: aliceblue;
		padding: 0.5rem;
		border-radius: 10px;
	}

	textarea {
		border-radius: 10px;
		padding: 20px;
		box-shadow: 4px 8px 8px;
		width: 100%;
		resize: none;
		height: 20vh;
		margin-bottom: 50px;
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

	.skills {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 4px 8px 8px;
		width: 100%;
		height: 20vh;
		margin-bottom: 50px;
	}

	.skill {
		display: flex;
		gap: 20px;
		align-items: center;
	}

	.skill span {
		cursor: pointer;
	}

	.skill p {
		margin: 0;

	}

	.add-skill {
		margin: 50px 0 100px 0;
	}
</style>