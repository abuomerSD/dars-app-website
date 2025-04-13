<template>
    <div class="container">
        <div class="justify-content-center  align-items-center">
            <form class="form pt-5  ">
                <h3>تسجيل الدخول</h3>
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <input v-model="username" placeholder="اسم المستخدم" class="form-control m-2" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <input v-model="password" type="password" placeholder="كلمة المرور" class="form-control m-2" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <button @click="login" class="btn btn-success m-2">دخول</button>
                    </div>
                </div>
                <p>{{ error }}</p>
            </form>

        </div>
    </div>
</template>
<script>
import login from '@/assets/js/user.js';
export default {
    name: 'LoginView',
    data()
    {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async login()
        {
            const response = await login(this.username, this.password);
            const token = response.data.token;
            localStorage.setItem('token', token);
            // this.$router.push({ name: 'home' });
            if (this.username === 'admin' && this.password === 'admin')
            {
                this.$router.push({ name: 'home' });
            } else
            {
                this.error = 'اسم المستخدم أو كلمة المرور غير صحيحة';
            }
        }
    }
}
</script>
<style>
.form {
    height: 200px;
    /* display: flex; */
    align-items: center;
    justify-content: center;
}
</style>