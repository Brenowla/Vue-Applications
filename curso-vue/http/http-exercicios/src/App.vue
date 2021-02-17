<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="mensagem in mensagens"
		:key="mensagem.texto"
		:variant="mensagem.tipo">{{mensagem.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input size="lg" v-model="usuario.nome" placeholder="Informe o nome:"></b-form-input>
			</b-form-group>
			<b-form-group label="E-mail::">
				<b-form-input size="lg" v-model="usuario.email" placeholder="Informe o E-mail:"></b-form-input>
			</b-form-group>
			<hr>
			<b-button @click.prevent="salvar" size="lg" variant='primary'>Salvar</b-button>
			<b-button @click="obterUsuarios" size="lg" variant="success" class="ml-2">Obter Usuários</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario,id) in usuarios" :key="id">
				<h4><strong>Nome: </strong> {{usuario.nome}}</h4>
				<h4><strong>E-mail</strong> {{usuario.email}}</h4>
				<h4><strong>ID:</strong> {{usuario.id}}</h4>
				<b-button variant="warning" size='lg' @click="carregar(usuario.id)">Carregar</b-button>
				<b-button variant="danger" size="lg" class="ml-2" @click="excluir(usuario.id)">Excluir</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import Axios from 'axios'

export default {
	data() {
		return {
			usuarios: [],
			mensagens: [],
			id: null,
			usuario: {
				nome: '',
				email: ''
			}
		}
	},
	methods: {
		limpar() {
			this.usuario.nome = ""
			this.usuario.email = ""
			this.id = null,
			this.mensagens = []
		},
		carregar(id) {
			this.id = id
			this.usuario = {...this.usuarios[id]}
		},
		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`)
				.then(()=>this.limpar())
				.then(()=>this.obterUsuarios())
				.catch(()=>this.mensagens.push({
					texto: 'Problema para excluir!',
					tipo: 'danger'
				}))
				
		},
		salvar() {
			const metodo = this.id ? 'patch' : 'post'
			const finalUrl = this.id ? `/${this.id}.json` : '.json'
			Axios[metodo](`https://curso-vue-b7d91-default-rtdb.firebaseio.com/usuarios${finalUrl}`,this.usuario)
				.then(() => this.limpar())
				.then(()=>this.obterUsuarios())
				.then(()=>this.mensagens.push({
					texto: 'Operação realizada com sucesso!',
					tipo: 'success'
				}))
		},
		obterUsuarios() {
			this.$http.get('usuarios.json').then(res => {
				this.usuarios = res.data
			})
		}
	}
	// created() {
	// 	this.$http.post('usuarios.json',{
	// 		nome: 'Maria',
	// 		email: "maria@gmail.com",
	// 	}).then(res=>console.log(res))
	// }
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
