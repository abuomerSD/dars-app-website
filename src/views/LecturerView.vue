<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import { API_URL, PAGE_LIMIT } from '../assets/js/constants';

const apiUrl = API_URL;

export default {
    components: { Navbar },
    data()
    {
        return {
            lecturer: { name: null, nationality: null, image: null },
            lecturers: [],
            file: null,
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
            formData.append('file', this.file)

            await axios.post(`${apiUrl}lecturers`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(res =>
            {
                console.log('res', res)
                this.$toast.success('تم اضافة الشيخ بنجاح')
            })
        },
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
    <h5>lecturer</h5>
    <div class="modals">
        <!-- add lecturer modal start -->
        <!-- Modal -->
        <div class="modal fade" id="add-lecturer-modal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
    </div>
</template>