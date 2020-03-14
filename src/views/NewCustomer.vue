<script lang="ts">
    import Vue from "vue";
    import app from './../application'

    export default Vue.extend({
        name: 'newcustomer',
        data() {
            return {
                name: '',
                hourlyRate: 0,
                error: '',
            }
        },
        created(): void {
            this.$nextTick( () => ( this.$refs["inpuntnewtask"] as HTMLElement ).focus() )
        },

        methods: {
             async newcustomer() {
                 if(this.name=='') {
                     this.error = 'Nombre de Cliente necesario'
                     return
                 }
                 if(this.hourlyRate==0) {
                     this.error = 'Euros por hora necesario '
                     return
                 }
                 const cli = new app.Client
                 await cli.create(this.name, this.hourlyRate)
                 await this.$store.commit('setClients')
                 await this.$store.commit('setView', 'config' )
             },


        },
    });
</script>


<template>
    <div id="newcustomer" class="hello">
        <div class="inputgroup">
            <div class="labelinput">+ cliente:</div>
            <input v-model="name" type="text"  v-on:keyup.enter="newcustomer"  class="inpuntnewtask" ref="inpuntnewtask">
        </div>
        <div class="inputgroup">
            <div class="labelinput">€/h:</div>
            <input v-model.number="hourlyRate" v-on:keyup.enter="newcustomer" type="number" step=".1" class="inpuntnewtask"  >
        </div>
       <div class="error">{{error}}</div>

    </div>
</template>

