<template>
<h1>المحاضرات</h1>
<div class="container">
    <!-- add lecture start -->
    <div class="add-lecture">
        <div class="row">
        <div class="col input-group mb-3">
            <label class="m-2" for="">عنوان المحاضرة</label>
            <input
            type="text"
            class="form-control"
            />
        </div>
        <div class="col input-group mb-3">
            <label class="m-2" for="">اسم المحاضر</label>
            <input
            type="search"
            list="lecturers-list"
            class="form-control"
            />
        </div>
        <div class="col input-group mb-3">
            <label class="m-2" for="">التاريخ</label>
            <input type="date" class="form-control">
        </div>
    </div>
    <div class="row">
        <div class="col input-group mb-3">
            <label class="m-2" for="">الصورة</label>
            <input type="file" class="">
        </div>
        <div class="col input-group mb-3">
            <label class="m-2" for="">الوصف</label>
            <input
            type="text"
            class="form-control"
            />
        </div>
        <div class="col input-group mb-3">
            <button type="file" class="btn btn-success">حفظ</button>
        </div>  
        
    </div>
    </div>
    <datalist id="lecturers-list">
        <option v-for="lecturer in lectueres" :key="lecturer.name" >{{ lecturer.name }}</option>
    </datalist>
</div>
</template>

<script setup>
    import { findAllLecturers } from "../assets/js/lecturer";
    import { onMounted, ref, watch } from "vue";
    import { useRoute } from "vue-router";

    let lectueres = ref([]);
    const test = ref([{name:"eltayeb", id:1}, {name:"ahmed", id:2}]);
    const route = useRoute();

    // watch(() => route.params.id, fetchData, { immediate: true });

    async function fetchLecturers() {
    try {
        lectueres.value = await findAllLecturers();
    } catch (error) {
        console.log(error);
    }
    }
    onMounted(async ()=> {
        await fetchLecturers();
    })
    



    
</script>

<style>

</style>
