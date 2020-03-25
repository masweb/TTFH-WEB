<script lang="ts">

    import Vue from 'vue';
    import { mapState } from "vuex"

    import ClientContent from './views/ClientContent.vue'
    import Home from './views/Home.vue'
    import Config from './views/Config.vue'
    import NewCustomer from './views/NewCustomer.vue'
    import ModCustomer from './views/ModCustomer.vue'

    import TooBar from './components/ToolBar.vue'
    import Color from './components/Color.vue'


    export default Vue.extend({
        name: 'App',
        components: {
            ClientContent,
            Home,
            Config,
            TooBar,
            NewCustomer,
            ModCustomer,
            Color,
         },

        mounted(): void {
            setTimeout( () => {
                const checklang = localStorage.getItem('tthlang')
                if (checklang != null) this.$i18n.locale = localStorage.getItem('tthlang')
            }, 0)
            const checkcurr = localStorage.getItem('tthlang')
            if (checkcurr != null) {
                this.$i18n.locale = localStorage.getItem('ttcurrencie')
                this.$store.commit('setCurencie', localStorage.getItem('ttcurrencie'))
            } else {
                this.$store.commit('setCurencie', '€')
            }
            this.$store.commit('setClients')
        },

        computed: {
            ...mapState(['currentview', 'clients', 'activecustomer', 'lang']),
        },
        methods: {
            setcustomer(id: number) {
                this.$store.commit('setCurrentCustomer', id )
            },

        }

    })
</script>


<template>
    <div id="app">
        <div class="nav">
            <TooBar/>
            <color />
            <div v-for="c in clients" @click="setcustomer(c.id)" :key="c.id"
                 class="navitem btn" v-bind:class="{ active: c.id == activecustomer }">
                <span>{{c.name}}</span>
            </div>
        </div>
        <div class="content">
            <notifications group="app" />
            <component v-bind:is="currentview"></component>
        </div>
    </div>
</template>
