<!--  -->
<template>
    <div>
        <el-menu  background-color="#545c64" text-color="#fff" active-text-color="#1C9399"
            active-text-sign="1.125rem" style="height: 100vh;" :collapse="isCollapse" :collapse-transition="false" router>
<!-- admin -->
<!-- default-active="" -->
            <!-- <el-menu-item id="shouye" index="AdminHome" :v-show="this.role == 'Admin'">
                    <i class="el-icon-s-home"></i>
                    <span id="title" slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="userMan" :v-show="this.role == 'Admin'">
                <template slot="title">
                    <i class="el-icon-house"></i>
                    <span id="title" slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="CustomerMan">客户管理</el-menu-item>
                    <el-menu-item index="ShopMan">店铺管理</el-menu-item>
                    <el-menu-item index="CraftmenMan">手工艺人管理</el-menu-item>
                    <el-menu-item index="SupplierMan">供应商管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>    
            
            <el-submenu index="2" :v-show="this.role == 'Admin'">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span id="title" slot="title">类别管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="EmCateforyMainMan">
                        <template slot="title">刺绣流派类别管理</template>
                        </el-menu-item>   
                        <el-menu-item index="EmCateforyMainMan2">
                            <template slot="title">刺绣技法类别管理</template>
                        </el-menu-item>      
                        <el-menu-item index="EmCateforyMainMan3">
                            <template slot="title">刺绣载体类别管理</template>
                        </el-menu-item>  
                    
                    <el-menu-item index="RawMaterialsCateMan">原材料类别管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu> 

            <el-submenu index="CheckMainPage" :v-show="this.role == 'Admin'">
                <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span id="title" slot="title">审核中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="GoodCheck">商品上架审批</el-menu-item>
                    <el-menu-item index="FamousCheck">传承人/刺绣名家审批</el-menu-item>
                    <el-menu-item index="OtherCheck">其他审批</el-menu-item>
                </el-menu-item-group>
            </el-submenu>    

            <el-menu-item id="data_analysis" index="/DataAnlysisPage" :v-show="this.role == 'Admin'">
                <i class="el-icon-data-line"></i>
                <span id="title" slot="title">数据分析</span>
            </el-menu-item> -->
<!-- supplier
            <el-menu-item id="shouye" index="SupplierHome" :v-show="this.role == 'SP'">
                    <i class="el-icon-s-home"></i>
                    <span id="title" slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="Man" :v-show="this.role == 'SP'">
                <template slot="title">
                    <i class="el-icon-house"></i>
                    <span id="title" slot="title">原材料管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="RawCategoryMan">原材料类别管理</el-menu-item>
                    <el-menu-item index="RawMaterialMan">原材料库存管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>  

            <el-menu-item id="data_order" index="/RawOrders" :v-show="false">
                <i class="el-icon-data-line"></i>
                <span id="title" slot="title">订单管理</span>
            </el-menu-item>

            <el-menu-item id="data_analysis" index="/RawDataAnlysisPage" :v-show="this.role == 'SP'">
                <i class="el-icon-data-line"></i>
                <span id="title" slot="title">数据分析</span>
            </el-menu-item> -->

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

            <!-- <el-menu-item :index="'/'+item.menuclick" v-for="(item,i) in menu" :key="i">
                <i :class="item.menuicon"></i>
                <span id="title" slot="title">{{ item.menuname }}</span>
            </el-menu-item> -->
<!-- 
            动态生成菜单 
            <el-menu-item v-for="(item, index) in menu" :key="index" :index="item.menuclick">
                <i :class="item.menuicon"></i>
                <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>

            动态生成子菜单
            <el-submenu v-for="(submenu, index) in menu" v-if="submenu.children && submenu.children.length > 0" :key="index" :index="submenu.menuclick">
                <template slot="title">
                    <i :class="submenu.menuicon"></i>
                    <span slot="title">{{ submenu.menuName }}</span>
                </template>
                递归渲染子菜单
                <el-menu-item v-for="(child, childIndex) in submenu.children" :key="childIndex" :index="child.menuclick">
                    {{ child.menuName }}
                </el-menu-item>
            </el-submenu> -->

            <div v-for="item in treemenu" :key="item.id">
                <div v-if="item.children && item.children.length > 0">
                    <el-submenu :key="item.id" :index="item.menuclick">
                        <template slot="title">
                            <i :class="item.menuicon"></i>
                            <span slot="title">{{ item.menuname }}</span>
                        </template>
                        <div v-for="child in item.children" :key="child.id">
                            <el-menu-item :key="child.id" :index="child.menuclick">
                                {{ child.menuname }}
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </div>
                <div v-else>
                    <el-menu-item :key="item.id" :index="item.menuclick">
                        <i :class="item.menuicon"></i>
                        <span slot="title">{{ item.menuname }}</span>
                    </el-menu-item>
                </div>
              

            </div>


        </el-menu>

        
    </div>
</template>

<script>
export default {
    name: 'AsidePage',
    computed: {
        "menu":{
            get(){
                return this.$store.state.menu
            }
        },
    },
    props: {
        isCollapse: Boolean
    },
    data () {
        return {            
            user:JSON.parse(sessionStorage.getItem('CurUser')),
            role:sessionStorage.getItem('role'),
            treemenu:'',
            //isCollapse: false
            // menu:[
            //     {menuclick:'AdminHome', menuName:'首页',menuicon:'el-icon-s-home'},
            // ]
        }
    },
    created() {
        console.log("user",this.user,this.role);
        this.treemenu = this.convertToTree(this.menu);
        // const name = String(this.user.name);
        // if(name.slice(0, 2) =='CT'){
        //     this.role='CT';
        // }
        // else if(name.slice(0, 2) =='CF'){
        //     this.role='CF';
        // }
        // else if(name.slice(0, 2) =='SH'){
        //     this.role='SH';
        // }
        // else if(name.slice(0, 2) =='SP'){
        //     this.role='SP';
        // }else{
        //     this.role='Admin';
        // }
    },
    methods: {
        // 将扁平化数据转换为树形结构
        convertToTree(flatMenu) {
            const map = {};  // 用于存储每个菜单项的映射
            const tree = []; // 存储最终的树形结构
            
            // 1. 首先，创建每个菜单项的映射，初始化 children 数组
            flatMenu.forEach(item => {
                map[item.id] = { ...item, children: [] };
            });
            
            // 2. 然后，将子菜单项添加到父菜单的 children 数组中
            flatMenu.forEach(item => {
                if (item.menuparentcode) {
                    // 如果有父级菜单，将当前菜单项添加到父菜单的 children 数组
                    const parent = map[item.menuparentcode];  // 根据父菜单的 code 获取父菜单对象
                    if (parent) {
                        parent.children.push(map[item.id]);
                    }
                } else {
                    // 如果没有父菜单（即根菜单），直接加入到树形结构中
                    tree.push(map[item.id]);
                }
            });

            console.log("tree", tree);  // 输出最终的树形结构，便于调试
            return tree;  // 返回树形结构
        }

    }
}
</script>

<style  scoped>
#title {
    font-size: 14px;
}    
.router-link-active {
  color: #c8de21;
}
</style>
