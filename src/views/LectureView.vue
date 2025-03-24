<template>
    <div class="container">
        <AddLecture />
        <LecturesTable />
    </div>
</template>

<script setup>
    import AddLecture from '../components/lecture/AddLecture.vue';
    import LecturesTable from "../components/lecture/LecturesTable.vue";

    // handlers 
    async function handleSave(e) {
        try {
            console.log(lecture);
            const savedLecture = await saveLecture(lecture);
            console.log(savedLecture);
            fecthLectures();
        } catch (error) {
            console.log(error);
        }
    }

</script>

<style>

</style>
