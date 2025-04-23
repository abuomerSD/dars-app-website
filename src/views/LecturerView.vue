<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import { API_URL, PAGE_LIMIT } from '../assets/js/constants';
import { STATIC_FILES_URL } from '../assets/js/constants';


export default {
    components: { Navbar },
    data()
    {
        return {
            lecturer: { name: null, nationality: null, image: null },
            lecturers: [],
            file: null,
            apiUrl: API_URL,
            filesUrl: STATIC_FILES_URL,
            page: 1,
            limit: PAGE_LIMIT,
            total_lecturers: 0,
        }
    },
    methods: {
        selectFile(event)
        {
            this.file = event.target.files[0]
        },
        async save()
        {
            const formData = new FormData()
            formData.append('name', this.lecturer.name)
            formData.append('nationality', this.lecturer.nationality)
            formData.append('image', this.file)

            await axios.post(`${this.apiUrl}lecturers`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(async res =>
            {
                console.log('res', res)
                this.$toast.success('تم اضافة الشيخ بنجاح')
                this.lecturer = { name: null, nationality: null, image: null }
                await this.paginate()
            })
        },
        async paginate()
        {
            await axios.get(`${this.apiUrl}lecturers?limit=${this.limit}&page=${this.page}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res =>
            {
                this.lecturers = res.data.data;
                this.total_lecturers = res.data.tot;
                console.log('lecturers', this.lecturers);
                console.log('total_lecturers', this.total_lecturers);
            }).catch(err =>
            {
                console.log(err);
            })
        },
        async update()
        {
            const formData = new FormData()
            formData.append('name', this.lecturer.name)
            formData.append('nationality', this.lecturer.nationality)
            formData.append('image', this.file)
            const id = this.lecturer._id

            await axios.put(`${this.apiUrl}lecturers/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(async res =>
            {
                console.log('res', res)
                this.$toast.success('تم تعديل بيانات الشيخ بنجاح')
                this.lecturer = { name: null, nationality: null, image: null }
                await this.paginate()
            })
        },
        async deleteLecturer()
        {
            console.log('lecturer', this.lecturer)
            const id = this.lecturer._id
            await axios.delete(`${this.apiUrl}lecturers/${id}`).then(async res =>
            {
                console.log('res', res)
                this.$toast.success('تم حذف بيانات الشيخ بنجاح')
                this.lecturer = { name: null, nationality: null, image: null }
                await this.paginate()
            })
        },
        select(lecturer)
        {
            this.lecturer = lecturer
        },
    },
    async mounted()
    {
        await this.paginate();
    },
    watch: {
        page: async function ()
        {
            await this.paginate()
        }
    }
}
</script>
<template>
    <Navbar />
    <div class="row">
        <div class="col-lg-11"></div>
        <div class="col-lg-1"><a href="javascript:void(0)" data-bs-toggle="modal"
                data-bs-target="#add-lecturer-modal"><i class="bx bx-plus-medical bx-sm"></i></a></div>
    </div>
    <h5 class="text-center">المشايخ</h5>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">اسم الشيخ</th>
                    <th scope="col">البلد</th>
                    <th scope="col">الصورة</th>
                    <th scope="col">العمليات</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lecturer, index) in lecturers" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ lecturer.name }}</td>
                    <td>{{ lecturer.nationality }}</td>
                    <td><img :src="`${filesUrl}${lecturer.image}`" alt="image" class="img"></td>
                    <td>
                        <a href="javascript:void(0)" class="text-primary" @click="select(lecturer)"
                            data-bs-toggle="modal" data-bs-target="#edit-lecturer-modal"><i
                                class="bx bx-edit bx-sm"></i></a>
                        <a href="javascript:void(0)" class="text-danger" @click="select(lecturer)"
                            data-bs-toggle="modal" data-bs-target="#delete-lecturer-modal"><i
                                class="bx bx-trash bx-sm"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-pagination v-model="page" :total-rows="total_lecturers" :per-page="limit"
            aria-controls="my-table"></b-pagination>
    </div>

    <!-- Modals -->
    <div class="modals">
        <!-- add lecturer modal start -->
        <!-- Modal -->
        <div class="modal fade" id="add-lecturer-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">إضافة شيخ</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row m-2">
                            <input type="text" v-model="lecturer.name" placeholder="اسم الشيخ" class="form-control">
                        </div>
                        <div class="row m-2">
                            <input type="text" v-model="lecturer.nationality" placeholder="البلد" class="form-control">
                        </div>
                        <div class="row m-2">
                            <input type="file" class="form-control" @change="selectFile">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">الغاء</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="save">حفظ</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- add lecturer modal end -->
        <!-- edit lecturer modal start -->
        <!-- Modal -->
        <div class="modal fade" id="edit-lecturer-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">تعديل بيانات الشيخ</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row m-2">
                            <input type="text" v-model="lecturer.name" placeholder="اسم الشيخ" class="form-control">
                        </div>
                        <div class="row m-2">
                            <input type="text" v-model="lecturer.nationality" placeholder="البلد" class="form-control">
                        </div>
                        <div class="row m-2">
                            <input type="file" class="form-control" @change="selectFile">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">الغاء</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="update">تعديل</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- edit lecturer modal end -->
        <!-- delete lecturer modal start -->
        <!-- Modal -->
        <div class="modal fade" id="delete-lecturer-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">حذف شيخ</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <strong>هل انت متأكد من حذف بيانات الشيخ {{ lecturer.name }}؟</strong>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-danger" @click="deleteLecturer"
                            data-bs-dismiss="modal">حذف</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- delete lecturer modal end -->
    </div>
</template>

<style scoped>
.img {
    width: 150px;
    height: 100px;
}
</style>