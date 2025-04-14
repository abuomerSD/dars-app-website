<template>
    <div class="container">
        <div class="justify-content-center  align-items-center">
            <form class="form pt-5" @submit.prevent="login">
                <h3>تسجيل الدخول</h3>
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <input v-model="username" placeholder="اسم المستخدم" class="form-control m-2" value="" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <input v-model="password" type="password" placeholder="كلمة المرور" class="form-control m-2" vlaue=""/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4">
                        <button class="btn btn-success m-2">دخول</button>
                    </div>
                </div>
                <p>{{ error }}</p>
            </form>

        </div>
    </div>
</template>
<script>
import {login} from '@/assets/js/user.js';
export default {
    name: 'LoginView',
    data()
    {
        return {
            username: '',
            password: '',
            error: '',
            token: '',
        }
    },
    methods: {
        async login()
        {
            const response = await login(this.username, this.password);
            this.token = response.data.token;
            console.log('response', response);
            if (response.data.status === 'success')
            {
                this.$router.push({ name: 'home' });
                localStorage.setItem('token', this.token);
                console.log('logged');
            } else
            {
                alert(response.data.message);
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