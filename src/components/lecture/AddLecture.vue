<template>
    <!-- Add Lecture Start -->
    <div class="add-lecture">
        <h4>إضافة محاضرة</h4>
        <form enctype="multipart/form-data" @submit.prevent="handleSave">
            <div class="row">
                <div class="col-lg-4 mb-3">
                    <label class="m-2" for="">عنوان المحاضرة</label>
                    <input
                    type="text"
                    class="form-control"
                    v-model="lecture.title"
                    />
                </div>
                <div class="col-lg-4 mb-3">
                    <label class="m-2" for="">اسم المحاضر</label>
                    <input
                    type="search"
                    list="lecturers-list"
                    class="form-control"
                    v-model="lecture.lecturer"
                    />
                </div>
                <div class="col-lg-4 mb-3">
                    <label class="m-2" for="">التاريخ</label>
                    <input type="date" class="form-control" v-model="lecture.date">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 mb-3">
                    <label class="m-2" for="">الصورة</label>
                    <input type="file" class="form-control">
                </div>
                <div class="col-lg-4 mb-3">
                    <label class="m-2" for="">المكان</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="lecture.location"
                    />
                </div>
                <div class="col-lg-4 mb-3">
                    <label class="m-2" for="">الوصف</label>
                    <textarea name="" id="" cols="30" rows="2" v-model="lecture.description"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col input-group mb-3">
                    <button class="btn btn-success" type="submit" @click="handleSave">حفظ</button>
                </div> 
            </div>
        </form>
        <!-- Add Lecture End -->
    </div>
    <!-- lectuerers data list -->
    <datalist id="lecturers-list">
        <option v-for="lecturer in lectueres" :key="lecturer.name" >{{ lecturer.name }}</option>
    </datalist>
</template>

<script>
import { findAllLecturers } from "../../assets/js/lecturer";
export default {
    data() {
        return {
            lecture: {
                title: '',
                lecturer: '',
                date: '',
                location: '',
                description: ''
            },
            lectueres: [],
        }
    },
    methods: {
        handleSave(e) {
            e.preventDefault();
            console.log(this.lecture);
        },
        async fetchLecturers() {
        try {
            this.lectueres = await findAllLecturers();
        } catch (error) {
            console.log(error);
        }   
    }

    },
    async created() {
        await this.fetchLecturers();
    }
    
}
</script>

<style>

</style>