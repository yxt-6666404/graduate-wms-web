<!--  -->
<template>
    <div>
        <el-menu default-active="AdminSy" background-color="#545c64" text-color="#fff" active-text-color="#1C9399"
            active-text-sign="1.125rem" style="height: 100vh;" :collapse="isCollapse" :collapse-transition="false" router>

            <el-menu-item id="shouye" index="AdminSy">
                    <i class="el-icon-s-home"></i>
                    <span id="shouye_title" slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="userMan">
                <template slot="title">
                    <i class="el-icon-house"></i>
                    <span id="warehouse_title" slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="CustomerMan">客户管理</el-menu-item>
                    <el-menu-item index="ShopMan">店铺管理</el-menu-item>
                    <el-menu-item index="CraftmenMan">手工艺人管理</el-menu-item>
                    <el-menu-item index="SupplierMan">供应商管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>    
            
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span id="raw_materials_title" slot="title">类别管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="EmCateforyMainMan">
                        <template slot="title">刺绣类别管理</template>
                        <!-- <el-menu-item index="EmCateforyMainMan">刺绣元素类别管理</el-menu-item>
                        <el-menu-item index="EmCateforyMainMan">刺绣载体类别管理</el-menu-item> -->
                    </el-menu-item>                    
                    <el-menu-item index="RawMaterialsCateMan">原材料类别管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu> 

            <el-submenu index="CheckMainPage">
                <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span id="check_title" slot="title">审核中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="GoodCheck">商品上架审批</el-menu-item>
                    <el-menu-item index="FamousCheck">传承人/刺绣名家审批</el-menu-item>
                    <el-menu-item index="OtherCheck">其他审批</el-menu-item>
                </el-menu-item-group>
            </el-submenu>    

            <el-menu-item id="data_analysis" index="/DataAnlysisPage">
                <i class="el-icon-data-line"></i>
                <span id="data_analysis_title" slot="title">数据分析</span>
            </el-menu-item>

            <!-- <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-house"></i>
                    <span id="warehouse_title" slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
            </el-submenu> -->


        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'AsidePage',
    props: {
        isCollapse: Boolean
    },
    data () {
        return {
            //isCollapse: false
        }
    }
}
</script>

<style  scoped>
#shouye_title {
    font-size: 14px;
}
#warehouse_title {
    font-size: 14px;
}
#raw_materials_title {
    font-size: 14px;
}
#check_title {
    font-size: 14px;
}
#data_analysis_title {
    font-size: 14px;
}
.router-link-active {
  color: #c8de21;
}
</style>
