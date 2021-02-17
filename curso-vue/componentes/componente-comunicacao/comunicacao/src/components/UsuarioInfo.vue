<template>
    <div class="componente">
        <h2>As Informações de Usuário</h2>
        <p>Vários detalhes...</p>
        <p>Nome do Usuário: <strong>{{nome}}</strong>  - <strong>{{inverterNome()}}</strong></p>
        <p>Idade do usuário <strong>{{idade}}</strong></p>
        <button @click="reiniciarNome">Reiniciar</button>
        <button @click="reiniciarFn">Reiniciar Callback</button>
    </div>
</template>

<script>
import barramento from '@/barramento'

export default {
    props: {
        nome: {
            type: String,
            // required: true
            // default: 'Anônimo'
            default: function() {
                return "BláBlá"
            }
        },
        reiniciarFn: Function,
        idade: Number
    },
    methods: {
        inverterNome() {
            return this.nome.split('').reverse().join('')
        },
        reiniciarNome() {
            this.nome = "Pedro"
            this.$emit('nomeMudou', this.nome)
        }
    },
    created() {
        // barramento.$on('idadeMudou',(idade)=> {
        //     this.idade = idade
        // })
        barramento.quandoIdadeMudar((idade)=> {
            this.idade = idade
        })
    }
}
</script>

<style scoped>
    .componente {
        flex: 1;
        background-color: #ec485f;
        color: #fff;
    }
</style>
