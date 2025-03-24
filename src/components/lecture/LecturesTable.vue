<template>
    <!-- lecture table start -->
    <div class="lectures-table">
        <h4>قائمة المحاضرات</h4>
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
    </div>

    <!-- lecture table end -->
</template>

<script>
import { STATIC_FILES_URL } from "@/assets/js/constants";
import {findAllLectures} from "../../assets/js/lecture";

export default {
    data() {
        return {
            lectures: [],
            staticFilesUrl: STATIC_FILES_URL,
        }
    },
    methods: {
        async fecthLectures() {
            try {
                this.lectures = await findAllLectures();
            } catch (error) {
                console.log(error);
            }
        }
    },
    async created() {
        await this.fecthLectures();
    }
}
</script>

<style>

</style>