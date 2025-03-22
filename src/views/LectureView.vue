<template>
<h4>إضافة محاضرة</h4>
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
                <div class="row">
                    <div class="col input-group mb-3">
                        <label class="m-2" for="">الصورة</label>
                        <input type="file" class="form-control">
                    </div>
                    <div class="col-sm-3 input-group mb-3">
                        <label class="m-2" for="">الوصف</label>
                        <!-- <input
                        type="text"
                        class="form-control"
                        /> -->
                        <textarea name="" id="" cols="30" rows="2"></textarea>
                    </div>
              </div>
        <div class="row">
            <div class="col input-group mb-3">
                <button class="btn btn-success">حفظ</button>
            </div>  
    </div>
    <!-- add lecture end -->
    <hr>
    <h4>قائمة المحاضرات</h4>
    <!-- lecture table start -->
    <div class="lecture-table">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">العنوان</th>
                <th scope="col">المحاضر</th>
                <th scope="col">التاريخ</th>
                <th scope="col">المكان</th>
                <th scope="col">الوصف</th>
                <th scope="col">الصورة</th>
                <th scope="col">تعديل\ حذف</th>
                </tr>
            </thead>
            <tbody>
                
                <div hidden>{{ row = 1}}</div>
                <tr v-for="lecture in lectures" :key="lecture.title">
                    <th scope="row">{{ row }}</th>
                    <td>{{ lecture.title }}</td>
                    <td>{{ lecture.lecturer }}</td>
                    <td>{{ lecture.date }}</td>
                    <td>{{ lecture.location }}</td>
                    <td>{{ lecture.description }}</td>
                    <td><img :src="staticFilesUrl + lecture.image" alt="صورة" class="table-image"></td>
                    <td><button class="btn btn-primary m-2">تعديل</button><button class="btn btn-danger">حذف</button></td>
                    <div hidden>{{ row++ }}</div>
                </tr>
            </tbody>
        </table>
        <!-- pagination -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <div hidden>{{ number = 0 }}}</div>
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" :href="paginationUrl">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    </div>
    <!-- lecture table end -->
</div>
<!-- lectureres list -->
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
    import { findAllLectures } from "../assets/js/lecture";
    import { API_URL, STATIC_FILES_URL } from "../assets/js/constants";


    const pageNumber = ref(1);
    const pageLimit = ref(5);
    const paginationUrl = ref(`/page=${pageNumber}&limit=${pageLimit}`)
    const lectures = ref([]);
    const lectueres = ref([]);
    const staticFilesUrl = ref(STATIC_FILES_URL);
    const apiUrl = ref(API_URL);
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

    async function fecthLectures() {
        try {
            lectures.value = await findAllLectures();
        } catch (error) {
            console.log(error);
        }
    }

    // on mount hook
    onMounted(async ()=> {
        await fetchLecturers();
        await fecthLectures();
    });
    



    
</script>

<style>

</style>
