<template>
	<div v-if="loaded" class="module">
		<h1>{{ module.Name }}</h1>
		<span>{{ module.UE.Label }}</span>
		<div class="time">
			<p>{{ module.__Nb_jour_5h_ou_7h }} jours</p>
			|
			<p>{{ module.__Heures_TD }} h</p>
		</div>

		<form @submit.prevent="sendForm()">
			<!-- Obj Gén -->
			<div v-show="menu_status == 'obj_gen'">
				<label for="objectif_general">Objectif Général :</label>
				<textarea
					@input="emitSocket()"
					id="objectif_general"
					v-model="form.objectif_general"
				></textarea>
			</div>

			<!-- Obj Pédago -->
			<div v-show="menu_status == 'obj_peda'">
				<label for="objectifs_pedagogiques">Contenu :</label>
				<textarea
					@input="emitSocket()"
					id="objectifs_pedagogiques"
					v-model="form.objectifs_pedagogiques"
				></textarea>
			</div>

			<!-- Pré-requis -->
			<div v-show="menu_status == 'requis'">
				<label for="pre_requis">Pré-requis :</label>
				<textarea
					@input="emitSocket()"
					id="pre_requis"
					v-model="form.pre_requis"
				></textarea>
			</div>

			<!-- Biblio -->
			<div v-show="menu_status == 'biblio'">
				<label for="bibliographie">Bibliographie :</label>
				<textarea
					@input="emitSocket()"
					id="bibliographie"
					v-model="form.bibliographie"
				></textarea>
			</div>

			<!-- Compétences Visées -->
			<div v-show="menu_status == 'competences'">
				<label for="competences_visees">Compétences Visées :</label>
				<textarea
					@input="emitSocket()"
					id="competences_visees"
					v-model="form.competences_visees"
				></textarea>
			</div>

			<!-- Méthodes Pédagogiques -->
			<div v-show="menu_status == 'method'">
				<label for="methodes_pedagogiques">Méthodes Pédagogiques :</label>
				<div class="checkboxes">
					<label>
						<input
							type="checkbox"
							value="Enseignement en face à face"
							v-model="form.methodes_pedagogiques"
							@change="emitSocket()"
						/>
						Enseignement en face à face
					</label>
					<label>
						<input
							type="checkbox"
							value="Pédagogie par projets"
							v-model="form.methodes_pedagogiques"
							@change="emitSocket()"
						/>
						Pédagogie par projets
					</label>
					<label>
						<input
							type="checkbox"
							value="Pédagogie inversée"
							v-model="form.methodes_pedagogiques"
							@change="emitSocket()"
						/>
						Pédagogie inversée
					</label>
					<label>
						<input
							type="checkbox"
							value="Blended Learning"
							v-model="form.methodes_pedagogiques"
							@change="emitSocket()"
						/>
						Blended Learning
					</label>
					<label>
						<input
							type="checkbox"
							value="100% en ligne"
							v-model="form.methodes_pedagogiques"
							@change="emitSocket()"
						/>
						100% en ligne
					</label>
					<label>
						<input
							type="checkbox"
							value="Autre"
							v-model="form.methodes_pedagogiques"
							@change="emitSocket()"
						/>
						Autre
					</label>
				</div>
				<div v-if="form.methodes_pedagogiques?.includes('Autre')">
					<label for="autre">Autre :</label>
					<textarea
						@input="emitSocket()"
						id="autre"
						v-model="form.autre"
					></textarea>
				</div>
			</div>
			<div v-show="menu_status == 'seance'" class="seances">
				<div
					v-for="seance in form.seances"
					:key="seance.id"
					class="seance"
					@input="emitSocket()"
				>
					<label for="num_seance">Numéro de la séance :</label>
					<input
						@input="emitSocket()"
						type="number"
						id="num_seance"
						v-model="seance.NumeroSeance"
					/>
					<label for="duration_seance">Durée de la séance :</label>
					<input
						@input="emitSocket()"
						type="text"
						id="duration_seance"
						v-model="seance.Durée"
					/>
					<label for="personal_work">Travail personnel :</label>
					<input
						@input="emitSocket()"
						type="text"
						id="personal_work"
						v-model="seance.TravailPersonnel"
					/>
					<label for="themes">Thèmes</label>
					<textarea
						@input="emitSocket()"
						id="themes"
						v-model="seance.Thèmes"
					></textarea>
					<label for="actions">Actions: </label>
					<textarea
						@input="emitSocket()"
						id="actions"
						v-model="seance.Actions"
					></textarea>
					<!-- new seance button -->
					<!-- delete seance button -->
					<button
						type="button"
						@click="deleteSeance(seance.id), emitSocket()"
						class="delete_seance"
					>
						-
					</button>
				</div>
				<button
					type="button"
					@click="addSeance(), emitSocket()"
					class="add_seance"
				>
					+
				</button>
			</div>

			<!-- Boutons -->
			<div class="buttons">
				<button
					type="button"
					@click="changeMenuStatus('obj_gen')"
					:class="{ active: menu_status == 'obj_gen' }"
				>
					Objectif Général
				</button>
				<button
					type="button"
					@click="changeMenuStatus('obj_peda')"
					:class="{ active: menu_status == 'obj_peda' }"
				>
					Contenu
				</button>
				<button
					type="button"
					@click="changeMenuStatus('requis')"
					:class="{ active: menu_status == 'requis' }"
				>
					Pré-requis
				</button>
				<button
					type="button"
					@click="changeMenuStatus('biblio')"
					:class="{ active: menu_status == 'biblio' }"
				>
					Bibliographie
				</button>
				<button
					type="button"
					@click="changeMenuStatus('competences')"
					:class="{ active: menu_status == 'competences' }"
				>
					Compétences Visées
				</button>
				<button
					type="button"
					@click="changeMenuStatus('method')"
					:class="{ active: menu_status == 'method' }"
				>
					Méthodes Pédagogiques
				</button>
				<button
					type="button"
					@click="changeMenuStatus('seance')"
					:class="{ active: menu_status == 'seance' }"
				>
					Déroulement du module
				</button>
			</div>

			<!-- Send Button -->
			<div>
				<input
					v-if="!submit"
					type="submit"
					value="Enregistrer"
					class="btn notsubmit"
				/>
				<input v-else value="Enregistré" class="btn submit" />
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'ModuleView',
		data() {
			return {
				menu_status: 'seance',
				form: {
					methodes_pedagogiques: [],
					seances: [],
				},
				module: null,
				loaded: false,
				submit: false,
			}
		},
		methods: {
			sendForm() {
				this.$airtable(process.env.VUE_APP_AIRTABLE_MODULE_TABLE).update([
					{
						id: this.module.module_id,
						fields: {
							'Objectifs Pedagogiques': this.form.objectifs_pedagogiques,
							'Objectif General': this.form.objectif_general,
							'Pre-requis': this.form.pre_requis,
							'Bibliographie': this.form.bibliographie,
							'Competences Visees': this.form.competences_visees,
							'Methodes Pedagogiques': this.form.methodes_pedagogiques,
							'Autre Methode Pedagogique':
								this.form.methodes_pedagogiques?.includes('Autre')
									? this.form.autre
									: null,
						},
					},
				])
					// Send seances
					if(this.module.seances) {
						this.module.seances.forEach((db_seance) => {
						if (
							!this.form.seances.some(
								(form_seance) => form_seance.id == db_seance.id
							)
						) {
							this.$airtable(process.env.VUE_APP_AIRTABLE_SEANCES_TABLE).destroy([db_seance.id])
							this.module.seances = this.module.seances.filter(
								(seance) => seance.id != db_seance.id
							)
						}
					})
					}
					this.form.seances.forEach((seance) => {
						if (seance.New) {
							this.$airtable(process.env.VUE_APP_AIRTABLE_SEANCES_TABLE).create(
								[
									{
										fields: {
											NumeroSeance: seance.NumeroSeance,
											Durée: seance.Durée,
											TravailPersonnel: seance.TravailPersonnel,
											Thèmes: seance.Thèmes,
											Actions: seance.Actions,
											Module: [this.module.module_id],
										},
									},
								]
							)
						} else {
							this.$airtable(process.env.VUE_APP_AIRTABLE_SEANCES_TABLE).update(
								[
									{
										id: seance.id,
										fields: {
											NumeroSeance: seance.NumeroSeance,
											Durée: seance.Durée,
											TravailPersonnel: seance.TravailPersonnel,
											Thèmes: seance.Thèmes,
											Actions: seance.Actions,
										},
									},
								]
							)
						}
					})

				this.submit = true
			},
			emitSocket() {
				this.submit = false
				this.$socket.emit('obj', this.form)
			},
			changeMenuStatus(status) {
				this.menu_status = status
			},
			addSeance() {
				this.form.seances.push({
					id: Math.random().toString(36).substring(7),
					NumeroSeance: '',
					Durée: '',
					TravailPersonnel: '',
					Thèmes: '',
					Actions: '',
					New: true,
				})
			},
			deleteSeance(id) {
				console.log(id)
				this.form.seances = this.form.seances.filter((seance) => seance.id != id)
			},
		},
		async created() {
			// Get module
			this.$airtable(process.env.VUE_APP_AIRTABLE_MODULE_TABLE).find(
				this.$route.params.id,
				(err, record) => {
					if (err) {
						console.error(err)
						return
					}
					this.module = record.fields

					for (var key in this.module) {
						// replace all spaces and special chars by underscores and lowercase
						this.module[key.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()] =
							this.module[key]
					}

					// Put data in form
					Object.keys(this.module).forEach((key) => {
						this.form[key] = this.module[key]
					})

					// Get UE
					this.$airtable(process.env.VUE_APP_AIRTABLE_UE_TABLE).find(
						this.module.UE,
						(err, record) => {
							if (err) {
								console.error(err)
								return
							}
							this.module.UE = record.fields
						}
					)

					let seances = this.module.seances ?? []
					seances.forEach((seance) => {
						this.$airtable(process.env.VUE_APP_AIRTABLE_SEANCES_TABLE).find(
							seance,
							(err, record) => {
								if (err) {
									console.error(err)
									return
								}
								if(!record || !record.fields) return
								record.fields.id = record.id
								this.module.seances.push(record.fields)
								this.module.seances.splice(
									this.module.seances.indexOf(seance),
									1
								)
							}
						)
					})
					

					// Finish Loader
					setTimeout(() => {
						if(this.module.seance) {
							this.module.seances.sort((a, b) => a.NumeroSeance - b.NumeroSeance)
						}
						this.loaded = true
					}, 2000)

					this.$socket.on('data', (data) => {
						Object.keys(data).forEach((key) => {
							this.form[key] = data[key]
						})
					})
				}
			)
		},
	}
</script>

<style>
	.active {
		background-color: #2c3e50;
		color: white;
	}

	div {
		width: 100%;
	}
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

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.buttons button {
		width: calc(100% / 6);
		padding: 10px;
		border-radius: 10px;
		background-color: #f2f2f2;
		border: none;
	}

	form label {
		align-self: flex-start;
		padding: 20px 0;
	}

	.checkboxes {
		/* 2 per row checkboxes aligned to the left */
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px;
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
		background-color: #4caf50;
		color: white;
	}

	.notsubmit {
		background-color: #2196f3;
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

	.seance {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;
		border-radius: 10px;
		padding: 20px;
		width: 100%;
		margin-bottom: 500px;
	}
</style>
