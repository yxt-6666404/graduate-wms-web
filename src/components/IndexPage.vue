<!--  -->
<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee ;overflow: hidden; /* IE and Edge */
">
            <el-aside width="auto"
                style="background-color: rgb(238, 241, 246); height: 100vh;color: #333; margin-left: -1px; border-right: #D6D6D6 0.0625rem solid;">
                <AsidePage :isCollapse="isCollapse" />
            </el-aside>

            <el-container style="height: 100vh;width: auto;">
                <el-header style="text-align: right;font-size: 0.75rem; border-bottom: #D6D6D6 0.0625rem solid;">
                    <HeaderPage @doCollapse="doCollapse" :collapseIcon="collapseIcon"/>
                </el-header>

                <el-main style="height: 100vh; padding: 0.3125rem;">
                    <router-view></router-view>
                    <!-- <CraftmenMan /> -->
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
import AsidePage from './AsidePage.vue';
import HeaderPage from './HeaderPage.vue';

export default {
    name: 'IndexPage',
    components: {
        AsidePage,
        HeaderPage,
    },
    data() {
        return {
            isCollapse: false,
            collapseIcon:"el-icon-s-fold"
        }
    },
    methods: {
        doCollapse(){
            console.log('this.isCollapse',this.isCollapse);
            this.isCollapse = !this.isCollapse;
            if(!this.isCollapse){//当前aside是展开的
                this.collapseIcon = "el-icon-s-fold";
            }
            else{//收起
                this.collapseIcon = "el-icon-s-unfold";
            }
        }
    }
}
</script>

<style>
.el-header {
    background-color: #dadada;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
