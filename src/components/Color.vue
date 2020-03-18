<script lang="ts">

    import {mapState} from "vuex";
    import Vue from "vue";

    export default Vue.extend({
        name: 'color',

        data() {
            return {
                enabled: false,
                dark: {
                    'fondo':  '#222222',
                    'texto':  '#eeeeee',
                    'color':  '#d29f32',
                    'gris':   '#3b3b3b',
                    'hgris':  '#2d2d2d',
                    'hgrisb': '#181818',
                    'active': '#cfe4b6',
                },
                light: {
                    'fondo':  '#eeeeee',
                    'texto':  '#555555',
                    'color':  '#af4a00',
                    'gris':   '#999',
                    'hgris':  '#f7f7f7',
                    'hgrisb': '#dbdbdb',
                    'active': '#15841d',
                },
            }
        },

        mounted() {
            this.checktheme()
        },
        computed: {
            ...mapState(['theme']),
        },

        watch: {
            theme() {
                if (this.theme == 'light'){
                    this.$store.commit('setTheme', 'light')
                    localStorage.setItem('themelabel', 'light' )
                    this.tolight()
                } else {
                    this.$store.commit('setTheme', 'dark')
                    localStorage.setItem('themelabel', 'dark' )
                    this.todark()
                }
            }
        },

        methods: {
            checktheme() {
                const themelabel = localStorage.getItem('themelabel')
                if (themelabel != null)
                    this.$store.commit('setTheme', themelabel)
                else {
                    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
                    if(isDarkMode) {
                        this.$store.commit('setTheme', 'dark')
                        localStorage.setItem('themelabel', 'dark' )
                    } else {
                        this.$store.commit('setTheme', 'light')
                        localStorage.setItem('themelabel', 'light' )
                    }
                }
            },

            todark() {
                const bodyStyles = document.body.style
                bodyStyles.setProperty('--fondo', this.dark.fondo)
                bodyStyles.setProperty('--texto', this.dark.texto)
                bodyStyles.setProperty('--color', this.dark.color)
                bodyStyles.setProperty('--gris', this.dark.gris)
                bodyStyles.setProperty('--hgris', this.dark.hgris)
                bodyStyles.setProperty('--hgrisb', this.dark.hgrisb)
                bodyStyles.setProperty('--active', this.dark.active)
            },

            tolight() {
                const bodyStyles = document.body.style
                bodyStyles.setProperty('--fondo', this.light.fondo)
                bodyStyles.setProperty('--texto', this.light.texto)
                bodyStyles.setProperty('--color', this.light.color)
                bodyStyles.setProperty('--gris', this.light.gris)
                bodyStyles.setProperty('--hgris', this.light.hgris)
                bodyStyles.setProperty('--hgrisb', this.light.hgrisb)
                bodyStyles.setProperty('--active', this.light.active)
            }

        }
    });

</script>

<template>
    <div></div>
</template>

<style lang="scss">
    body, html {
        color: var(--texto)!important;
        background-color: var(--fondo)!important;
    }

    .btn, .expimp {
        cursor: pointer;
        color: var(--texto);
        &:hover { background-color: var(--hgris) }
        &.active {
            background-color: var(--hgrisb);
            color: var(--texto);
        }
    }

    .expimp {
        border: 1px solid var(--gris);
    }


    .active {
        color: var(--active) ;
    }
    #app {
        .nav {
            .toolbar {
                border-bottom: 1px solid var(--gris);
                .btn {
                    border-right: 1px solid var(--gris);
                }
            }
            border-right: 1px solid var(--gris);
            .navitem {
                border-bottom: 1px solid var(--gris);
            }
        }

        .content {

            .bar {
                border-bottom: 1px solid  var(--gris);
                .dows {
                    border-left: 1px solid  var(--gris);
                }
            }

            .inputgroup {
                .labelinput {
                    border: 1px solid var(--gris);
                    border-top: 0px solid var(--gris);
                    border-left: 0px solid var(--gris);
                }
                input.inpuntnewtask {
                    background-color: var(--fondo);
                    border: 1px solid var(--gris);
                    border-left: 0px solid var(--gris);
                    border-top: 0px solid var(--gris);
                    border-right: 0px solid var(--gris);
                    color: var(--texto)!important;
                }

            }


            .taskgroup {
                background-color: var(--gris);
                .task {
                    background-color: var(--fondo);
                    border-bottom: 1px solid var(--gris);
                    .player {
                        border-right: 1px solid var(--gris);
                    }
                    .openhistory {
                        border-left: 1px solid var(--gris);
                        /*border-right: 1px solid var(--gris);*/
                    }
                    .ratechanger {
                        border-left: 1px solid var(--gris);
                        /*border-right: 1px solid var(--gris);*/
                    }
                }

                .note {
                    background-color: var(--fondo);
                    border-bottom: 1px solid var(--gris);
                }


                .detail {
                    .itemdetail {
                        background-color: var(--fondo);
                        border-bottom: 1px solid var(--gris);
                    }
                }

                .totals {
                    background-color:var(--fondo);
                    border-bottom: 3px solid var(--gris);
                }

            }
        }

    }
    #note {
        textarea {
            background-color:var(--fondo);
            color:var(--texto);
            border: 0px solid var(--gris)!important;
            border-right: 1px solid var(--gris)!important;

        }
        .btne {
            /*border-left: 1px solid var(--gris)!important;*/

            &:hover { background-color: var(--hgris) }
            &.active {
                background-color: var(--hgrisb);
                color: var(--texto);
            }
        }
    }

        #modcustomer {

        .btne {
            border-bottom: 1px solid var(--gris)!important;

            &:hover { background-color: var(--hgris) }
            &.active {
                background-color: var(--hgrisb);
                color: var(--texto);
            }
        }
    }



    textarea:focus, input:focus{
        outline: none;
    }

    #hourlytask {
        input {
            background-color:var(--fondo);
            color:var(--texto);
            border: 0px solid var(--gris)!important;
            font-size: 15px;
            height: 30px;
            width: 70px;
         }
    }

    .v-switch-label  {
        color:var(--fondo)!important;
    }

     .dg-main-content {
         background-color: var(--fondo)!important;
         color: var(--texto)!important;
     }
    .dg-btn--cancel, .dg-btn--ok {
        color: var(--texto)!important;
        background-color: var(--fondo)!important;
        border-color: var(--fondo)!important;
    }

    input.configinput {
        background-color: var(--fondo);
        border : 1px solid var(--gris);
        color: var(--texto)!important;
    }

    .v--modal {
        background-color: var(--fondo)!important;
        color: var(--texto);
        box-shadow: 0 20px 60px -2px  var(--hgrisb)!important;
    }

    .vue-dialog-button {
        &:hover {
            background-color: var(--hgris)!important;;
        }
    }
    input.inpuntnametask {
        background-color: var(--fondo);
        border: 1px solid var(--gris);
        border-left: 0px solid var(--gris);
        border-top: 0px solid var(--gris);
        border-right: 0px solid var(--gris);
        color: var(--texto)!important;
    }

    .select-css {
        background-color: var(--fondo);
        border: 1px solid var(--gris);
        color: var(--texto);
        &:focus {
            color: var(--texto);

        }
    }
</style>


















