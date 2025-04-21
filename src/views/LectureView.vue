<script>
import { STATIC_FILES_URL } from '@/assets/js/constants';
import { findAllLectures, saveLecture } from '@/assets/js/lecture';
import { findAllLecturers } from '@/assets/js/lecturer';
import Navbar from '@/components/Navbar.vue';
import Multiselect from 'vue-multiselect';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';


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
            rows: null,
            limit: 10,
            selectedLecturer: null,
            selectedLecture: { title: null, lecturer: null, date: null, location: null, image: null, description: null },
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
                this.lecturers = await findAllLecturers();
                console.log('lecturers', this.lecturers);
                this.lecturers.forEach(l => this.lecturersNames.push(l.name));
            } catch (error)
            {
                console.log(error);
            }
        },
        preUpdateLecture(lecture)
        {
            this.selectedLecture = lecture
            this.$refs.confirmationModal.show({
                title: 'تأكيد',
                message: `هل تريد تعديل المحاضرة ${lecture.title}`,
                onConfirm: this.updateLecture
            })
        },
        updateLecture()
        {
            console.log(`update ${this.selectedLecture.title}`)
        },
        preDeleteLecture(lecture)
        {
            this.selectedLecture = lecture
            this.$refs.confirmationModal.show({
                title: 'تأكيد',
                message: `هل تريد حذف المحاضرة ${lecture.title}`,
                onConfirm: this.deleteLecture
            })
        },
        deleteLecture()
        {
            console.log(`delete ${this.selectedLecture.title}`)
        },
        async save()
        {
            // validation
            if (!this.selectedLecture.title || this.selectedLecture.lecturer || his.selectedLecture.date || this.selectedLecture.location || this.selectedLecture.description)
            {

            }
            const formData = new FormData();
            formData.append('title', this.selectedLecture.title)
            formData.append('lecturer', this.selectedLecture.lecturer)
            formData.append('date', this.selectedLecture.date)
            formData.append('location', this.selectedLecture.location)
            formData.append('file', this.selectedFile)
            formData.append('description', this.selectedLecture.description)

            await saveLecture(formData).then(res =>
            {
                console.log('res', res)
                this.$toast.success('تم اضافة المحاضرة بنجاح')
            })

        },
        handleFileChange(event)
        {
            this.selectedFile = event.target.files[0]
        },
    },
    async mounted()
    {
        await this.fetchLectures();
        await this.fetchLecturers();
        this.rows = this.lectures.length;
    }
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
                            <td><button class="btn btn-primary" @click="preUpdateLecture(lecture)">تعديل</button>
                                <button class="btn btn-danger" @click="deleteLecture()">حذف</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-pagination v-model="page" :total-rows="rows" :per-page="limit" aria-controls="my-table"
                    class="m-2"></b-pagination>
            </div>
        </div>
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
                            v-model="selectedLecture.title">
                        <multiselect v-model="selectedLecture.lecturer" :options="lecturersNames">اسم المحاضر
                        </multiselect>
                        <input type="date" placeholder="التاريخ" class="form-control m-2"
                            v-model="selectedLecture.date">
                        <input type="text" placeholder="الموقع" class="form-control m-2"
                            v-model="selectedLecture.location">
                        <input type="text" placeholder="الوصف" class="form-control m-2"
                            v-model="selectedLecture.description">
                        <input type="file" placeholder="صورة الإعلان" class="form-control m-2"
                            @change="handleFileChange">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="save">حفظ</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- add lecture modal end -->
        <ConfirmationModal ref="confirmationModal" />
    </div>
</template>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.lecture-image {
    width: 150px;
    height: 100px;
}
</style>
