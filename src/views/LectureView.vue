<template>
    <Navbar />
    <div class="container">
        <hr>
        <div class="row">
            <div class="col-lg-11 col-sm-12"></div>
            <div class="col-lg-1 col-sm-12">
                <a href="javascrip:void(0)"><i class='bx bx-plus-medical bx-sm'></i></a>
            </div>
        </div>
        <div class="row">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">عنوان المحاضرة</th>
                            <th scope="col">اسم المحاضر / الشيخ</th>
                            <th scope="col">التاريخ</th>
                            <th scope="col">الموقع</th>
                            <th scope="col">الوصف</th>
                            <th scope="col">صورة الاعلان</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(lecture, index) in lectures" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ lecture.title }}</td>
                            <td>{{ lecture.lecturer }}</td>
                            <td>{{ lecture.date }}</td>
                            <td>{{ lecture.location }}</td>
                            <td>{{ lecture.description }}</td>
                            <td><img :src="imgUrl + lecture.image" alt="image" class="lecture-image"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- add lecture modal start -->
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- add lecture modal end -->
    </div>
</template>

<script>
import { STATIC_FILES_URL } from '@/assets/js/constants';
import { findAllLectures } from '@/assets/js/lecture';
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'LectureView',
    data()
    {
        return {
            lectures: [],
            imgUrl: STATIC_FILES_URL,
        }
    },
    components: {
        Navbar
    },
    methods: {
        async fetchLectures()
        {
            try
            {
                this.lectures = await findAllLectures();
            } catch (error)
            {
                console.log(error);
            }
        }
    },
    async mounted()
    {
        await this.fetchLectures();
    }
}


</script>

<style>
.lecture-image {
    width: 150px;
    height: 100px;
}
</style>
