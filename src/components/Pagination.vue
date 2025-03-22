<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li v-for="page in pages" :key="page" class="page-item"><a href="" class="page-link">{{ page }}</a></li>
            <!-- <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li> -->
        </ul>
</nav>
</template>

<script>
import { PAGE_LIMIT } from '../assets/js/constants';
import { onMounted, ref } from 'vue';

export default {
    setup(props) {
        const data = props.data;
        const pageLimit = ref(PAGE_LIMIT);
        const pages = ref(10);
       
        // const pages = Math.ceil(data.length / pageLimit);
    }
}

</script>

<style>

</style>