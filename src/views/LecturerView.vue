<template>
    <h4>إضافة شيخ</h4>
    <div class="container">
        <!-- add lecturer start -->
        <div class="row">
            <div class="col input-group">
                <label for="" class="m-2">اسم الشيخ</label>
                <input type="text" class="form-control">
            </div>
            <div class="col input-group">
                <label for="" class="m-2">البلد/الجنسية</label>
                <input type="text" class="form-control">
            </div>
            <div class="col input-group">
                <label for="" class="m-2">الصورة</label>
                <input type="file" class="form-control">
            </div>
            <div class="row">
                <div class="col input-group m-2">
                    <button class="btn btn-success">حفظ</button>
                </div>
            </div>
        </div>
        <!-- add lecturer end -->
        <hr>
        <!-- lecturers list start -->
        <div class="lecturer-table">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">اسم الشيخ</th>
                        <th scope="col">البلد/الجنسية</th>
                        <th scope="col">الصورة</th>
                        <th scope="col">تعديل/حذف</th>
                    </tr>
                </thead>
                <tbody>
                    <div hidden>{{ row = 1 }}</div>
                    <tr v-for="lecturer in lecturers" :key="lecturer.name">
                        <th scope="row">{{ row }}</th>
                        <td>{{ lecturer.name }}</td>
                        <td>{{ lecturer.nationality }}</td>
                        <td><img :src="staticFilesUrl + lecturer.image" alt="" class="table-image"></td>
                        <td><button class="btn btn-primary m-2">تعديل</button><button class="btn btn-danger">حذف</button></td>
                        <div hidden>{{ row++ }}</div>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- lecturers list end -->
    </div>
</template>

<script setup>
import { findAllLecturers } from "../assets/js/lecturer";
import { onMounted, ref } from "vue";
import { STATIC_FILES_URL } from "../assets/js/constants";

const lecturers = ref([]);
const staticFilesUrl = ref(STATIC_FILES_URL);

async function fetchLecturers() {
    try {
        lecturers.value = await findAllLecturers();
    } catch (error) {
        console.log(error);
    }
}

// on mounted

onMounted(async() => {
    await fetchLecturers();
});
</script>

<style></style>
