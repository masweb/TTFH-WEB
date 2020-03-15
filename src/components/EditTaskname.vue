<script lang="ts">
    import Vue from 'vue';
    import app from "@/application";
    const tsk = new app.Task

    export default Vue.extend({
        name: 'edittaskname',
        data() {
            return {
                showedit: false,
                newtext: '',
            }
        },
        props: {
            taskId: { type: Number },
            task: { type: String },
        },
        mounted(): void {
            this.newtext = this.task
        },
        methods: {

            async changetaskname() {
                await tsk.changeTaskName( this.taskId, this.newtext)
                await this.$store.commit('changeTaskName', { id: this.taskId, task: this.newtext } )
                await this.tofalse()
            },

            tofalse() {
                this.showedit = false
            },

            shoeditm() {
                this.showedit = true
                this.$nextTick(() => this.$refs.editname.focus())
            }
        }
    });
</script>


<template>
    <div id="edittaskname">
        <div @click="shoeditm" v-if="!showedit" class="name">{{task}}</div>
        <input v-model="newtext" v-if="showedit" v-on:keyup.enter="changetaskname"   v-on:keyup.esc="tofalse" ref="editname" type="text" class="inpuntnametask" >
    </div>
</template>
