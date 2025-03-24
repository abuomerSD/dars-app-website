<template>
    <!-- Add Lecture Start -->
    <div class="add-lecture">
        <h4>إضافة محاضرة</h4>
        <form @submit.prevent="handleSave">
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
                    <input type="file" class="form-control" ref="image" />
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
import { saveLecture } from "../../assets/js/lecture";

export default {
    data() {
        return {
            lecture: {
                title: '',
                lecturer: '',
                date: '',
                location: '',
                description: '',
                image: '',
            },
            lectueres: [],
        }
    },
    methods: {
        async handleSave(e) {
            e.preventDefault();
            let formData = new FormData();
            formData.append('title', this.lecture.title);
            formData.append('lecturer', this.lecture.lecturer);
            formData.append('date', this.lecture.date);
            formData.append('location', this.lecture.location);
            formData.append('description', this.lecture.description);
            formData.append('image', this.$refs.image.files[0]);

            // this.lecture.image = this.$refs.image.files[0];
            // const stringified = JSON.stringify(this.lecture);
            const saved = await saveLecture(formData);
            // console.log(stringified);
            console.log(saved);
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