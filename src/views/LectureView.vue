<template>
<h1>المحاضرات</h1>
<div class="container">
    <div class="row">
    <div class="col input-group mb-3">
        <label class="m-2" for="">عنوان المحاضرة</label>
        <input
        type="text"
        class="form-control"
        aria-label="Dollar amount (with dot and two decimal places)"
        />
    </div>
    <div class="col input-group mb-3">
        <label class="m-2" for="">اسم المحاضر</label>
        <input
        type="search"
        list="lecturers-list"
        class="form-control"
        aria-label="Dollar amount (with dot and two decimal places)"
        />
    </div>
    </div>
    <!-- <datalist id="lecturers-list" v-for="lecturer in lectueres">
    <option value="{{ lecturer }}">{{ lecturer }}</option>
    </datalist> -->
</div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { useRoute } from "vue-router";

    const lectueres = ref([]);
    const route = useRoute();

    watch(() => route.params.id, fetchData, { immediate: true });

    async function fetchData() {
    try {
        
    } catch (error) {
        console.log(error);
    }
    }
</script>

<style>

</style>
