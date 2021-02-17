import Vue from 'vue'
import Router from 'vue-router'

import Inicio from './components/Inicio'
// import Usuario from './components/usuario/Usuario'
// import UsuarioLista from './components/usuario/UsuarioLista'
// import UsuarioDetalhe from './components/usuario/UsuarioDetalhe'
// import UsuarioEditar from './components/usuario/UsuarioEditar'
import Menu from './components/template/Menu'

Vue.use(Router)

const Usuario = () => import(/* webpackChunkName: "usuario" */'./components/usuario/Usuario')
const UsuarioEditar = () => import(/* webpackChunkName: "usuario" */'./components/usuario/UsuarioEditar')
const UsuarioLista = () => import('./components/usuario/UsuarioLista')
const UsuarioDetalhe = () => import('./components/usuario/UsuarioDetalhe')

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition){
        if(savedPosition){
            return savedPosition
        }else if(to.hash){
            return {
                selector: to.hash
            }
        }else return {
            x:0,
            y:0
        }
        //return {x:0, y:1000}
    },
    routes: [{
        name: 'inicio',
        path: '/',
        //component: Inicio
        components: {
            default: Inicio,
            menu: Menu
        }
    }, {
        path: '/usuario',
        component: Usuario,
        props: true,
        children: [
            {path: '', component: UsuarioLista},
            {path: ':id', component: UsuarioDetalhe, props: true, beforeEnter: (to,from,next) =>{
                next()
            }},
            {path: ':id/editar', component: UsuarioEditar, props: true, name: 'editarUsuario'}
        ]
    },{
        path: '*',
        redirect: '/'
    }]
})

router.beforeEach((to, from, next) => {
    next()
})

export default router