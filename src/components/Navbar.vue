<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">مجالس العلم</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/" class="nav-link active">الصفحة الرئيسية</router-link> 
            </li>
            <li>
                <router-link to="/lectures" class="nav-link"> المحاضرات</router-link> 
            </li>
            <li>
                <router-link to="/lecturers" class="nav-link">المشايخ</router-link> 
            </li>
        </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>