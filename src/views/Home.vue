<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'home',
        props: {},
        methods: {}
    });
</script>


<template>
    <div id="home" >
        <div class="container">
            <div class="imcontainer">
                <h1>Tasks Timer for Humans</h1>
                <img src="../assets/logo-ttfh.png">
                <h5> Si trabajas con ordenador, esta es la solución gratuita para controlar tu tiempo y tus ganancias. </h5>
                <h5> Sencilla aplicación offline para controlar el tiempo y el coste de todas las tareas de tus clientes. Exporta a CVS y genera informes mensuales detallados en PDF con  encabezado personalizado. Base de datos local IndexDB, importación y exportación JSON. </h5>
            </div>
            <h4>Funcionalidades:</h4>

            <div class="row">
                <div class="col-6">
                    <ul>
                        <li>Idiomas: Castellano, Inglés.</li>
                        <li>Monedas: €, &, $, ¥, Kr, Fr, ₩.</li>
                        <li>Exportación detallada de PDF con encabezado personalizado.</li>
                        <li>Exportación CSV.</li>
                        <li>Tema claro u oscuro.</li>
                        <li>Cliente: crear, modificar y borrar, nombre y coste por hora.</li>
                        <li>Tarea: crear, modificar y borrar, nombre y coste por hora.</li>
                        <li>Comentario por tarea: crear, modificar y borrar, texto.</li>
                     </ul>
                </div>
                <div class="col-6">
                    <ul>
                        <li>Registro automático de los fragmentos de tiempo de cada tarea, posibilidad de borrado selectivo.</li>
                        <li>Visualización del tiempo y el coste de cada tarea en tiempo real.</li>
                        <li>Recálculo sobre la marcha del coste, basado en el coste por hora de tarea y/o cliente.</li>
                        <li>Navegación de histórico por meses.</li>
                        <li>Exportación de la base de datos en JSON.</li>
                        <li>Importar base de datos en JSON.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

