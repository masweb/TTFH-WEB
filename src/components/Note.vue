<script>
    import app from './../application'
    const tsk = new app.Task;


    export default {
        name: 'note',

        data() {
            return {
                textnote: null,
                showsave: true
            }
        },

        props: {
            taskId: {
                type: Number,
                default: null
            },
            note: {
                type: String,
                default: null
            },
        },

        mounted() {
            this.textnote = this.$t('message')
        },

        methods: {

            async savenote() {
                await tsk.saveNote( this.taskId, this.textnote )
                await this.$store.commit( 'setNote', { id: this.taskId, note: this.textnote })
                await this.$store.commit( 'switchNotes', this.taskId )
             },

            chelength() {
                if(this.textnote.length > 255) this.showsave = false
                else this.showsave = true
             }

        }
    }

</script>

<template>
    <div id="note">
        <textarea v-model="textnote" v-on:keyup="chelength"></textarea>
        <span @click="savenote" v-if="showsave" class="btne push">Guardar</span>
        <span  v-if="!showsave" style="margin-left: 20px" >Máximo 255</span>
    </div>
</template>
