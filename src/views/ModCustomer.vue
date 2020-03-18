<script>
    import {mapState} from "vuex";
    import app from './../application'
    const cli = new app.Client

    export default {

        name: 'modcustomer',

        data() {
            return {
                customertext: null,
                customerhourlyrate: 0,
                error: null,
            }
        },

        computed: {
            ...mapState(['client', 'currencie']),

        },

        created() {
            this.customertext = this.client.name
            this.customerhourlyrate = this.client.hourlyRate
            this.$nextTick(() => this.$refs.inpuntnewtask.focus())
        },

        methods: {
            async modcustomer() {
                if(this.customertext=='') {
                    this.error = 'Nombre de Cliente necesario'
                    return
                }
                if(this.customerhourlyrate=='') {
                    this.error = 'Euros por hora necesario '
                    return
                }
                  await cli.modClient(this.client.id, this.customertext,  parseInt(this.customerhourlyrate) )
                  await this.$store.commit('setModCustomer', {  name:  this.customertext, hourlyRate: parseInt( this.customerhourlyrate ) } )
                  await this.$store.commit('setCurrentCustomer',  this.client.id )
            },

            async deleteclient() {
                this.$modal.show('dialog', {
                    title: 'Eliminar Cliente',
                    text:  '¿ Quiere eliminar este Cliente y todos sus datos ?' ,
                    buttons: [
                        { title: 'Cerrar' },
                        { title: 'Aceptar', handler: () => { this.actiondeleteclient() } }
                    ]
                })


            },

            async actiondeleteclient() {
                await cli.deleteClient(this.client.id)
                await this.$store.commit('setView', 'home')
                await this.$store.commit('setClients')

            }

        },

    }
</script>


<template>
    <div id="modcustomer" class="hello">
        <v-dialog/>

        <div class="inputgroup">
            <div class="labelinput">{{$t('Client')}}:</div>
            <input v-model="customertext" type="text" v-on:keyup.enter="modcustomer" class="inpuntnewtask" ref="inpuntnewtask">
        </div>

        <div class="inputgroup">
            <div class="labelinput">{{currencie}}/h:</div>
            <input v-model="customerhourlyrate" v-on:keyup.enter="modcustomer" type="number" class="inpuntnewtask">
        </div>


        <div @click="deleteclient" class="btne">{{$t('Delete Client')}}</div>
        <div class="error">{{error}}</div>

    </div>
</template>

