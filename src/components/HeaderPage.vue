<!--  -->
<template>
    <div id="header_container">
        <!-- left -->
        <div id="left_section">
            <i :class="collapseIcon" @click="collapse"></i>
        </div>

        <div id="title_section">
            <strong>刺绣智汇平台后台管理中心</strong>
        </div>
        <!-- right -->
        <div id="right_section">
            <span id="user_name">{{user.name}}</span>
            <el-dropdown>
                <i class="el-icon-s-tools"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toAdminHome">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

    </div>
</template>

<script>
export default {
    name: 'HeaderPage',
    props: {
        collapseIcon:String
    },
    data() {
        return {
            user:JSON.parse(sessionStorage.getItem('CurUser')),
            role:sessionStorage.getItem('role'),
        }
    },
    created() { 
        // const name = String(this.user.name);
        // console.log(name,name.slice(0, 2));
        // if(name.slice(0, 2) =='CT'){
        //     this.$router.push('/CusHome')
        // }
        // else if(name.slice(0, 2) =='CF'){
        //     this.$router.push('/CraHome')
        // }
        // else if(name.slice(0, 2) =='SH'){
        //     this.$router.push('/ShopHome')
        // }
        // else if(name.slice(0, 2) =='SP'){
        //     this.$router.push('/SupplierHome')
        // }else{
        //     this.$router.push('/AdminHome')
        // }
    },
    methods: {
        toAdminHome() {
            const name = String(this.user.name);
            console.log('个人中心');
            if(name.slice(0, 2) =='CT'){
            this.$router.push('/CusHome')
        }
        else if(name.slice(0, 2) =='CF'){
            this.$router.push('/CraHome')
        }
        else if(name.slice(0, 2) =='SH'){
            this.$router.push('/ShopHome')
        }
        else if(name.slice(0, 2) =='SP'){
            this.$router.push('/SupplierHome')
        }else{
            this.$router.push('/AdminHome')
        }
        },
        collapse() {
            this.$emit('doCollapse')
        },
        logout() {
            this.$confirm('是否退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                sessionStorage.removeItem('CurUser')
                this.$router.push('/login')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });          
            });
        }
    },
}
</script>

<style scoped>
#header_container {
    display: flex;
    line-height: 3.75rem;
    flex-direction: row;
    align-items: baseline;
    /* Ensure the items are aligned vertically in the center */
}

#left_section {
    font-size: 15px;
    line-height: 3.75rem;
}

#title_section {
    flex: 1;
    align-items: center;
    text-align: left;
    font-size: 18px;
    margin-left: 10px;
    line-height: 3.75rem;
}

#right_section {
    line-height: 3.75rem;
}

#user_name {
    font-size: 15px;
    line-height: 3.75rem;
}

.el-dropdown i {
    font-size: 15px;
    margin-left: 15px;
    line-height: 3.75rem;
    color: #333;
}
</style>
