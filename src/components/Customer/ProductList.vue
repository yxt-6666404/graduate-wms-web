<template>
    <div style="background-color: beige;">
        <el-container>
            <el-header style="background-color: aliceblue;">
                    <el-input type="text" autofocus="true" placeholder="请输入商品名称" v-model="name" class="input-with-select" style="width: 200px" suffix-icon="el-icon-search" clearable size="small" 
                    @keyup.enter.native="loadPostlistPageC1"></el-input>
                
                    <el-cascader clearable filterable placeholder="请选择/输入刺绣流派编码"
                        size="small"
                        v-model="selectedOptions1"
                        :options="casOptions1"
                        :props="OptionProps1" 
                        @change="handleCascaderChange1" 
                        @blur="handleCascaderBlur1(selectedOptions1)" 
                        @visible-change="handleCascaderBlur1(selectedOptions1)"
                        style="margin-left: 5px;">
                    </el-cascader>
            
                    <el-cascader clearable filterable placeholder="请选择/输入刺绣载体编码"
                        size="small"
                        v-model="selectedOptions3"
                        :options="casOptions3"
                        :props="OptionProps3" 
                        @change="handleCascaderChange3" 
                        @blur="handleCascaderBlur3(selectedOptions3)" 
                        @visible-change="handleCascaderBlur3(selectedOptions3)"
                        style="margin-left: 5px;">
                    </el-cascader>
            
                    <el-cascader clearable filterable placeholder="请选择/输入刺绣技法编码"
                        size="small"
                        v-model="selectedOptions2"
                        :options="casOptions2"
                        :props="OptionProps2" 
                        @change="handleCascaderChange2" 
                        @blur="handleCascaderBlur2(selectedOptions2)" 
                        @visible-change="handleCascaderBlur2(selectedOptions2)"
                        style="margin-left: 5px;">
                    </el-cascader>
    
        
                    <el-button type="primary" @click="loadPostlistPageC1" style="margin-left: 5px;" size="small" icon="el-icon-check">确定</el-button>
                    <el-button type="warning" @click="resetList" style="margin-left: 5px;" size="small" icon="el-icon-refresh-left">重置</el-button>
                    <el-button class="refresh" icon="el-icon-refresh" @click="refreshList" style="margin-left: 5px;" size="small">刷新</el-button>
            </el-header>

            <el-main style="background-color: white; height:auto; margin:10px">
            <el-row :gutter="5">
                <el-col :span="4" v-for="(o) in productTable" :key="o" >
                <el-card :body-style="{ padding: '0px',width:'200px' }">
                    <img :src="require('@/assets/photo/productimage/'+ o.image+'.jpg')" class="image" width="10px" height="200px">
                    <div style="padding: 14px;">
                        <div style="display: flex;flex-direction: row;"><span style="border: 1px solid red;color: red;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ o.categoryName }}</span>   
                            <span class="name-ellipsis">{{ o.productName }}</span>
                        </div>
                        
                        <div class="bottom clearfix">
                            <span class="name - ellipsis">￥{{ o.price }}</span>
                            <el-button type="text" class="button" @click="()=>handleRouteChange(o)">查看详情</el-button>
                        </div>
                    </div>
                </el-card>
                </el-col>
            </el-row>
            </el-main>
            <el-footer style="padding: 0;height: 5px;display: flex;justify-content: space-between;">
            <el-pagination class="fixed-pagination"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentPageChange"
                            :current-page="pageNum"
                            :page-sizes="[12, 24, 48, 96]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
            </el-pagination>

            </el-footer>
        </el-container>
    </div>
</template>
<script>
export default {
    name: 'ProductList',
   data() {
      return {
        name:'',
                casOptions1: [],
                OptionProps1: {
                    value: "categoryId",
                    label: "categoryName",
                    children: "children",
                    checkStrictly: true
                },
                selectedOptions1: '',
                Holename1: '',
    
                casOptions2: [],
                OptionProps2: {
                    value: "tcategoryId",
                    label: "tcategoryName",
                    children: "children",
                    checkStrictly: true
                },
                selectedOptions2: '',
                Holename2: '',
    
                casOptions3: [],
                OptionProps3: {
                    value: "ccategoryId",
                    label: "ccategoryName",
                    children: "children",
                    checkStrictly: true
                },
                selectedOptions3: '',
                Holename3: '',
    
                fabricIdSelected: '',
                fabricIdOptions: [],
    
                itemKey: 0,
                productTable: [],
                multipleSelection: [],
                pageNum: 1,
                pageSize: 12,
                total: 0,
                userMes:JSON.parse(sessionStorage.getItem('CurUser')),
      }
   },
   created(){
    this.loadGetCategory1();
    this.loadGetCategory2();
    this.loadGetCategory3();
    this.loadGetCategory4();
    this.loadPostlistPageC1();
   },
   computed:{
   },
   methods:{
        loadGetCategory1() {
                // http://localhost:8098/embroidery-category/listPageC2
                this.$axios.get(this.$httpUrl + '/embroidery-category/listPageC2').then(res => res.data).then(res => {
                    console.log("get", res.data);
                    if (res.code == 200) {
                        this.casOptions1 = res.data
                    } else {
                        alert('获取数据失败5');
                    }
    
                })
    
            },
            loadGetCategory2(){
            // http://localhost:8098/embroidery-techniques-category/listPageC2
            this.$axios.get(this.$httpUrl+'/embroidery-techniques-category/listPageC2').then(res => res.data).then(res =>{
                console.log("get",res.data);
                if(res.code==200){
                this.casOptions2 = res.data;
                }
                else{
                alert('获取数据失败4');
                }
                
            })
            },
            loadGetCategory3(){
            // http://localhost:8098/embroidery-carrier-categories/listPageC2
            this.$axios.get(this.$httpUrl+'/embroidery-carrier-categories/listPageC2').then(res => res.data).then(res =>{
                console.log("get",res.data);
                if(res.code==200){
                this.casOptions3 = res.data;
                }
                else{
                alert('获取数据失败3');
                }
                
            })
            },
            // /fabrics/list1
            loadGetCategory4(){
            // http://localhost:8098/embroidery-carrier-categories/listPageC2
            this.$axios.get(this.$httpUrl+'/fabrics/list1').then(res => res.data).then(res =>{
                console.log("get2",res.data);
                if(res.code==200){
                this.fabricIdOptions = res.data;
                console.log("fabricIdOptions",this.fabricIdOptions);
                }
                else{
                alert('获取数据失败2');
                }
                
            })
            },
                loadPostlistPageC1() {
                this.$axios.post(this.$httpUrl + '/products/list2',{
                    "pageSize": this.pageSize,
                    "pageNum": this.pageNum,
                    "param": {
                        "name": this.name,
                        "embroideryCategoryId": this.Holename1,
                        "carrierCategoryId": this.Holename2,
                        "techniqueCategoryId": this.Holename3,
                        "fabricId": this.fabricIdSelected,
                    }
                }).then(res => res.data).then(res => {
                    console.log("post", res, res.data);
                    if (res.code == 200) {
                        this.productTable = res.data
                        this.total = res.total;
                    } else {
                        alert('获取数据失败1');
                    }
                })
                console.log("productTable", this.productTable, this.total);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageNum=1;
                this.pageSize = val;
                this.loadPostlistPageC1();
            },
            handleCurrentPageChange(val) {
                console.log(`当前页: ${val}`);    
                this.pageNum = val;
                this.loadPostlistPageC1();
            },
            resetList() {
            this.name = '';
            this.Holename1='';
            this. Holename2= '';
            this. Holename3= '';
            this.loadPostlistPageC1();
            this.itemKey=Math.random();
            },
            refreshList() {
            this.loadPostlistPageC1();
            this.itemKey=Math.random();
            alert("刷新成功");
            },
            handleCascaderChange1(values) {
                // 使用 join 方法将数组中的元素用一个空格连接起来
                console.log(values);
                // 获取最后一个值
                const lastValue = values[values.length - 1];
                console.log('最后一个值:', lastValue);
                this.Holename1 = lastValue;
                this.loadPostlistPageC1();
                },
                handleCascaderBlur1(values) {
                    console.log('Cascader 失焦');
                    this.handleCascaderChange(values);
                    this.loadPostlistPageC1();
                },
                handleCascaderChange2(values) {
                // 使用 join 方法将数组中的元素用一个空格连接起来
                console.log(values);
                // 获取最后一个值
                const lastValue = values[values.length - 1];
                console.log('最后一个值:', lastValue);
                this.Holename2 = lastValue;
                this.loadPostlistPageC1();
                },
                handleCascaderBlur2(values) {
                    console.log('Cascader 失焦');
                    this.handleCascaderChange2(values);
                    this.loadPostlistPageC1();
                },
                handleCascaderChange3(values) {
                // 使用 join 方法将数组中的元素用一个空格连接起来
                console.log(values);
                // 获取最后一个值
                const lastValue = values[values.length - 1];
                console.log('最后一个值:', lastValue);
                this.Holename3 = lastValue;
                this.loadPostlistPageC1();
                },
                handleCascaderBlur3(values) {
                    console.log('Cascader 失焦');
                    this.handleCascaderChange3(values);
                    this.loadPostlistPageC1();
                },
                handleCascaderChange11(values) {
                // 使用 join 方法将数组中的元素用一个空格连接起来
                console.log(values);
                // 获取最后一个值
                const lastValue = values[values.length - 1];
                console.log('最后一个值:', lastValue);
                this.form2.embroideryCategoryId = lastValue;
                },
                handleCascaderChange22(values) {
                // 使用 join 方法将数组中的元素用一个空格连接起来
                console.log(values);
                // 获取最后一个值
                const lastValue = values[values.length - 1];
                console.log('最后一个值:', lastValue);
                this.form2.techniqueCategoryId = lastValue;
                },
                handleCascaderChange33(values) {
                // 使用 join 方法将数组中的元素用一个空格连接起来
                console.log(values);
                // 获取最后一个值
                const lastValue = values[values.length - 1];
                console.log('最后一个值:', lastValue);
                this.form2.carrierCategoryId = lastValue;
                },
                handleRouteChange(o){
                console.log(o,'00')
                this.$router.replace({
                    path:'/ProductDetail',
                    query:{
                        productId:o.productId,
                        referenId:o.referenid
                    }
                })
                }
    },
}
</script>
<style scoped>
    .time {
    font-size: 13px;
    color: #999;
    }

    .bottom {
    margin-top: 13px;
    line-height: 12px;
    }

    .button {
    padding: 0;
    float: right;
    }

    .image {
    width: 100%;
    display: block;
    }

    .clearfix:before,
    .clearfix:after {
    display: table;
    content: "";
    }

    .clearfix:after {
    clear: both
    }
    .fixed-pagination {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    z-index: 30;
    }
    .name-ellipsis {
        margin-left: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            }
</style>
