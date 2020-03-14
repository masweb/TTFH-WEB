<script>
    import {mapState} from "vuex"
    import Vue from "vue"

    import app from './../application'
    const cli = new app.Client
    const tsk = new app.Task
    const det = new app.TimeDetail

    export default Vue.extend({
        name: 'ConfigDB',
        computed: {
            ...mapState([ 'years', 'months', 'currentyear', 'currentmonth' ])
        },
        methods: {

            importar() {
                this.$refs.uploader.click()
            },

            answerdelete() {
                this.$modal.show('dialog', {
                    title: 'Borrar',
                    text:  '¿ Quiere borrar toda la base de datos ?, si no ha exportado los datos, estos se perderán para siempre.' ,
                    buttons: [
                        { title: 'Cerrar' },
                        { title: 'Aceptar', handler: () => { this.deleteaction() } }
                    ]
                })
            },

            onFileChange() {
                const file = this.$refs.uploader.files[0]
                console.log('file', file)
                const reader = new FileReader()
                reader.readAsText(file, "UTF-8")
                reader.onload =  evt => {
                    if (/^[\],:{}\s]*$/.test(evt.target.result.replace(/\\["\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                        this.eljson = JSON.parse(evt.target.result)
                        // eslint-disable-next-line no-prototype-builtins
                        if(this.eljson.hasOwnProperty('clients')) { this.answerload( )
                        } else { this.$notify({ group: 'app', type: 'error',  title: 'Error', text: 'Datos incorrectos' })  }
                    } else {
                        this.$notify({ group: 'app', type: 'error', title: 'Error', text: 'Error en el fichero' })
                    }
                }
            },

            async exportar() {

                const clients = await cli.all()
                const tasks = await tsk.all()
                const timedetail = await det.all()

                const ttfh = {
                    clients: clients,
                    tasks: tasks,
                    timedetail: timedetail,
                }
                const ano = this.getyear(this.currentyear)
                const mes = this.getmonth(this.currentmonth)
                const str =  'ttfh-' + mes + '-' + ano + '.json'
                const blob = new Blob([ JSON.stringify(ttfh) ], { type: 'json' });

                const a = document.createElement('a');
                a.download = str
                a.href = URL.createObjectURL(blob);
                a.dataset.downloadurl = [ 'json', a.download, a.href].join(':');
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout( () => { URL.revokeObjectURL(a.href); }, 1500);

            },

            async loadDBdata() {
                await cli.clear()
                await tsk.clear()
                await det.clear()
                await cli.loadData( this.eljson.clients )
                await tsk.loadData( this.eljson.tasks )
                await det.loadData( this.eljson.timedetail )
                await location.reload()
            },

            answerload() {
                 this.$modal.show('dialog', {
                    title: 'Importar',
                    text:  '¿ Quiere importar el contenido de la exportación ?, los datos actuales de la aplicación serán sustituidos por estos, si no los has exportado, se perderán para siempre.' ,
                    buttons: [
                        { title: 'Cerrar' },
                        { title: 'Aceptar', handler: () => { this.loadDBdata() } }
                    ]
                })
            },

            async deleteaction() {
                await cli.clear()
                await tsk.clear()
                await det.clear()
                await location.reload()
            },

            getmonth(month) {
                return this.months.find(m => m.id === month).name
            },

            getyear(year) {
                return this.years.find(y => y.id === year).name
            },

        }
    })

</script>





<template>
    <div id="configdb">
        <v-dialog/>
        <h1>Importar / Exportar / Borrar DB</h1>
        <div style="margin-bottom: 20px">Para importar o exportar es necesario que todas las tareas estén paradas.</div>
        <span @click="importar" class="btn expimp">Importar</span>
        <span @click="exportar" class="btn expimp">Exportar</span>
        <span @click="answerdelete" class="btn expimp">Borrar</span>
        <input type="file" @change="onFileChange"  id="selectFile"  style="opacity: .0" ref="uploader">
    </div>

</template>
