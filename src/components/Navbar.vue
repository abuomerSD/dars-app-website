<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="../../public//logo.png" alt="الشعار" class="logo"> مجالس العلم
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li>
                        <router-link to="/lectures" class="nav-link"> المحاضرات</router-link>
                    </li>
                    <li>
                        <router-link to="/lecturers" class="nav-link">المشايخ</router-link>
                    </li>
                    <li>
                        <router-link to="/users" class="nav-link">إدارة المشرفين</router-link>
                    </li>
                </ul>
            </div>
            <button class="btn btn-outline-danger" @click="logout">تسجيل الخروج</button>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout()
        {
            localStorage.removeItem('token'); // أو أي اسم تستخدمه للتوكن
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.logo {
    height: 40px;
    margin-left: 10px;
}
</style>