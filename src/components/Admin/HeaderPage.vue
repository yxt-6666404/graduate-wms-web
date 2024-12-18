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
            <span id="user_name">王小虎</span>
            <el-dropdown>
                <i class="el-icon-s-tools"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toAdminDetail">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="toAdminDetail">退出登录</el-dropdown-item>
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
        }
    },
    created() { 
        this.$router.push('/AdminSy')
    },
    methods: {
        toAdminDetail() {
            console.log('个人中心');
            this.$router.push('/AdminHome')
           // this.$router.push('/adminDetail')
        },
        collapse() {
            this.$emit('doCollapse')
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
