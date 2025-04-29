<template>
    <Navbar />
    <div class="container">
        <hr>
        <div class="row">
            <div class="col-lg-11 col-sm-12"></div>
            <div class="col-lg-1 col-sm-12">
                <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addUserModal"
                    style="color: #169976">
                    <i class="bx bx-plus-medical bx-sm"></i>
                </a>
            </div>
        </div>
        <div class="row">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">اسم المستخدم</th>
                            <th scope="col">تعديل \ حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="index">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ user.username }}</td>
                            <td>
                                <a href="javascript:void(0)" class="text-primary" @click="select(user)"
                                    data-bs-toggle="modal" data-bs-target="#editUserModal">
                                    <i class="bx bx-edit bx-sm"></i>
                                </a>
                                <a href="javascript:void(0)" class="text-danger" @click="select(user)"
                                    data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                                    <i class="bx bx-trash bx-sm"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modals -->
        <!-- Add User Modal -->
        <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">إضافة مستخدم جديد</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveUser">
                            <div class="mb-3">
                                <label for="userName" class="form-label">اسم المستخدم</label>
                                <input type="text" class="form-control" id="userName" v-model="user.username" required>
                            </div>
                            <div class="mb-3">
                                <label for="userPassword" class="form-label">كلمة المرور</label>
                                <input type="password" class="form-control" id="userPassword" v-model="user.password"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">حفظ</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit User Modal -->
        <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">تعديل المستخدم</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateUser">
                            <div class="mb-3">
                                <label for="editUserName" class="form-label">اسم المستخدم</label>
                                <input type="text" class="form-control" id="editUserName" v-model="user.username"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="editUserPassword" class="form-label">كلمة المرور</label>
                                <input type="password" class="form-control" id="editUserPassword"
                                    v-model="user.password" required>
                            </div>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">تحديث</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete User Modal -->
        <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">حذف المستخدم</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>هل أنت متأكد أنك تريد حذف هذا المستخدم؟</p>
                        <button type="button" class="btn btn-danger" @click="deleteUser" data-bs-dismiss="modal">حذف</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import { API_URL } from '@/assets/js/constants';

export default {
    name: 'UsersView',
    components: {
        Navbar,
    },
    data()
    {
        return {
            users: [],
            user: { username: '', password: '' },
            apiUrl: API_URL,
        };
    },
    methods: {
        async fetchUsers()
        {
            try
            {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${this.apiUrl}users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.users = response.data.data;
            } catch (error)
            {
                console.error('Error fetching users:', error);
            }
        },
        async saveUser()
        {
            try
            {
                const token = localStorage.getItem('token');
                await axios.post(`${this.apiUrl}users`, this.user, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.$toast.success('تم إضافة المستخدم بنجاح');
                this.user = { username: '', password: '' };
                await this.fetchUsers();
            } catch (error)
            {
                console.error('Error saving user:', error);
                this.$toast.error('حدث خطأ أثناء إضافة المستخدم');
            }
        },
        async updateUser()
        {
            try
            {
                const token = localStorage.getItem('token');
                await axios.put(`${this.apiUrl}users/${this.user._id}`, this.user, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.$toast.success('تم تحديث المستخدم بنجاح');
                this.user = { username: '', password: '' };
                await this.fetchUsers();
            } catch (error)
            {
                console.error('Error updating user:', error);
                this.$toast.error('حدث خطأ أثناء تحديث المستخدم');
            }
        },
        async deleteUser()
        {
            try
            {
                const token = localStorage.getItem('token');
                await axios.delete(`${this.apiUrl}users/${this.user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.$toast.success('تم حذف المستخدم بنجاح');
                this.user = { username: '', password: '' };
                await this.fetchUsers();
            } catch (error)
            {
                console.error('Error deleting user:', error);
                this.$toast.error('حدث خطأ أثناء حذف المستخدم');
            }
        },
        select(user)
        {
            this.user = { ...user };
        },
    },
    async mounted()
    {
        await this.fetchUsers();
    },
};
</script>

<style scoped>
.table-responsive {
    margin-top: 20px;
}
</style>