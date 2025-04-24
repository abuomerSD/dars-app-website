<script>
import { STATIC_FILES_URL, API_URL, PAGE_LIMIT } from '@/assets/js/constants';
import { findAllLectures, saveLecture } from '@/assets/js/lecture';
// import { findAllLecturers } from '@/assets/js/lecturer';
import Navbar from '@/components/Navbar.vue';
import Multiselect from 'vue-multiselect';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import axios from 'axios';



export default {
    name: 'LectureView',
    data()
    {
        return {
            lectures: [],
            lecturers: [],
            lecturersNames: [],
            imgUrl: STATIC_FILES_URL,
            page: 1,
            total_lectures: 0,
            limit: PAGE_LIMIT,
            apiUrl: API_URL,
            lecture: { title: null, lecturer: null, date: null, location: null, image: null, description: null },
            selectedFile: null,
        }
    },
    components: {
        Navbar, Multiselect, ConfirmationModal,
    },
    methods: {
        async fetchLectures()
        {
            try
            {
                this.lectures = await findAllLectures();
                console.log('lectures', this.lectures)
            } catch (error)
            {
                console.log(error);
            }
        },
        async fetchLecturers() 
        {
            try
            {
                const response = await axios.get(`${this.apiUrl}lecturers?limit=${this.limit}`);
                const lecturers = response.data;
                this.lecturers = lecturers.data;
                this.lecturers.forEach(l => this.lecturersNames.push(l.name));
            } catch (error)
            {
                console.log(error);
            }
        },
        async updateLecture()
        {
            // validation
            if (!this.lecture.title || !this.lecture.lecturer || !this.lecture.date || !this.lecture.location || !this.lecture.description || !this.selectedFile)
            {
                this.$toast.error('يرجى ملء جميع الحقول')
                return
            }
            const formData = new FormData();
            formData.append('title', this.lecture.title)
            formData.append('lecturer', this.lecture.lecturer)
            formData.append('date', this.lecture.date)
            formData.append('location', this.lecture.location)
            formData.append('image', this.selectedFile)
            formData.append('description', this.lecture.description)

            await axios.put(`${this.apiUrl}lectures/${this.lecture._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(async res =>
            {
                this.$toast.success('تم تحديث المحاضرة بنجاح')
                this.lecture = { title: null, lecturer: null, date: null, location: null, image: null, description: null }
                this.selectedFile = null
                await this.paginate()
            })
        },
        async deleteLecture()
        {
            const id = this.lecture._id
            await axios.delete(`${this.apiUrl}lectures/${id}`).then(async res =>
            {
                this.$toast.success('تم حذف المحاضرة بنجاح')
                this.lecture = { title: null, lecturer: null, date: null, location: null, image: null, description: null }
                await this.paginate()
            })
        },
        async save()
        {
            // validation
            if (!this.lecture.title || !this.lecture.lecturer || !this.lecture.date || !this.lecture.location || !this.lecture.description || !this.selectedFile)
            {
                this.$toast.error('يرجى ملء جميع الحقول')
                return
            }
            const formData = new FormData();
            formData.append('title', this.lecture.title)
            formData.append('lecturer', this.lecture.lecturer)
            formData.append('date', this.lecture.date)
            formData.append('location', this.lecture.location)
            formData.append('image', this.selectedFile)
            formData.append('description', this.lecture.description)

            await axios.post(`${this.apiUrl}lectures`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(async res =>
            {
                this.$toast.success('تم اضافة المحاضرة بنجاح')
                this.lecture = { title: null, lecturer: null, date: null, location: null, image: null, description: null }
                this.selectedFile = null
                await this.paginate()
            })

        },
        handleFileChange(event)
        {
            this.selectedFile = event.target.files[0]
        },
        async paginate()
        {
            await axios.get(`${this.apiUrl}lectures?limit=${this.limit}&page=${this.page}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res =>
            {
                this.lectures = res.data.data;
                this.total_lectures = res.data.tot;
                console.log('lectures', this.lectures);
                console.log('total_lectures', this.total_lectures);
            }).catch(err =>
            {
                console.log(err);
            })
        },
        select(lecture)
        {
            this.lecture = lecture
            console.log('selected lecture', this.lecture);
        },
    },
    async mounted()
    {
        // await this.fetchLectures();
        await this.paginate();
        await this.fetchLecturers();
    },
    watch: {
        page: async function ()
        {
            await this.paginate();
        }
    },
}


</script>
<template>
    <Navbar />
    <div class="container">
        <hr>
        <div class="row">
            <div class="col-lg-11 col-sm-12"></div>
            <div class="col-lg-1 col-sm-12">
                <a href="javascrip:void(0)" data-bs-toggle="modal" data-bs-target="#addLectureModal"><i
                        class='bx bx-plus-medical bx-sm'></i></a>
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
                            <th scope="col">تعديل \ حذف</th>
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
                            <td><a href="javascript:void(0)" class="text-primary" @click="select(lecture)"
                                    data-bs-toggle="modal" data-bs-target="#editLectureModal"><i
                                        class="bx bx-edit bx-sm"></i></a>
                                <a href="javascript:void(0)" class="text-danger" @click="select(lecture)"
                                    data-bs-toggle="modal" data-bs-target="#deleteLectureModal"><i
                                        class="bx bx-trash bx-sm"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-pagination v-model="page" :total-rows="total_lectures" :per-page="limit" aria-controls="my-table"
                    class="m-2"></b-pagination>
            </div>
        </div>
        <!-- Modals Start -->
        <!-- add lecture modal start -->
        <div class="modal fade" id="addLectureModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">إضافة محاضرة</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="عنوان المحاضرة" class="form-control m-2"
                            v-model="lecture.title">
                        <multiselect v-model="lecture.lecturer" :options="lecturersNames">اسم المحاضر
                        </multiselect>
                        <input type="date" placeholder="التاريخ" class="form-control m-2" v-model="lecture.date">
                        <input type="text" placeholder="الموقع" class="form-control m-2" v-model="lecture.location">
                        <input type="text" placeholder="الوصف" class="form-control m-2" v-model="lecture.description">
                        <input type="file" placeholder="صورة الإعلان" class="form-control m-2"
                            @change="handleFileChange">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="save">حفظ</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- add lecture modal end -->
        <!-- edit lecture modal start -->
        <div class="modal fade" id="editLectureModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">تعديل محاضرة</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="عنوان المحاضرة" class="form-control m-2"
                            v-model="lecture.title">
                        <multiselect v-model="lecture.lecturer" :options="lecturersNames">اسم المحاضر
                        </multiselect>
                        <input type="date" placeholder="التاريخ" class="form-control m-2" v-model="lecture.date">
                        <input type="text" placeholder="الموقع" class="form-control m-2" v-model="lecture.location">
                        <input type="text" placeholder="الوصف" class="form-control m-2" v-model="lecture.description">
                        <input type="file" placeholder="صورة الإعلان" class="form-control m-2"
                            @change="handleFileChange">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="updateLecture">تحديث</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- edit lecture modal end -->
        <!-- delete lecture modal start -->
        <div class="modal fade" id="deleteLectureModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">تعديل محاضرة</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        هل تريد حذف المحاضرة {{ lecture.title }}؟
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="deleteLecture">حذف</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- delete lecture modal end -->

        <!-- <ConfirmationModal ref="confirmationModal" /> -->
        <!-- Modals End -->
    </div>
</template>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.lecture-image {
    width: 150px;
    height: 100px;
}
</style>
