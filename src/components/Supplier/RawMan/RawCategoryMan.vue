<template>
    <div>
        <el-container style="height: 100%;">
        <el-header height="60px">
            <div style="margin-bottom: 5px;margin-left: 5px; height: 5%">
            <el-cascader clearable filterable placeholder="请选择/输入原材料编码"
                size="small"
                v-model="selectedOptions"
                :options="casOptions"
                :props="OptionProps" 
                @change="handleCascaderChange" 
                @blur="handleCascaderBlur(selectedOptions)" 
                @visible-change="handleCascaderBlur(selectedOptions)"
                style="margin-left: 5px;">
            </el-cascader>

            <el-input type="text" autofocus="true" placeholder="请输载体类别名称" v-model="mcategoryName" class="input-with-select" style="width: 200px;margin-left: 5px;" suffix-icon="el-icon-search" clearable size="small" 
            @keyup.enter.native="loadPostlistPageC1"></el-input>

            <el-select v-model="levelValue" filterable placeholder="请选择等级类别" clearable size="small" style="margin-left: 5px; width: 150px;" @change="filterLevel">
                <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <el-button type="primary" @click="loadPostlistPageC1" icon="el-icon-check" style="margin-left: 5px;" size="small">确定</el-button>
            <el-button type="warning" @click="resetList" style="margin-left: 5px;" size="small" icon="el-icon-refresh-left">重置</el-button>
            <el-button class="refresh" icon="el-icon-refresh" @click="refreshList" style="margin-left: 5px;" size="small">刷新</el-button>

            

            <el-button class="add" @click="addRecord" size="small">新增</el-button>
            <el-button class="edit" @click="handleEdit" size="small">编辑</el-button>
            <el-button class="delete" @click="handleDelete" size="small">删除</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="30%" style="height:100%;border-right: 1px solid #eee;">

                <el-tree :key="itemKey"
                :data="treeData"
                show-checkbox
                default-expand-all
                node-key="categoryId"
                ref="tree"
                highlight-current
                :props="defaultProps"
                @check="handleCheck"
                >
                </el-tree>
            </el-aside>
            <el-main>
                <el-form :model="form1" style="overflow-y: auto;">
                <el-form-item label="原材料类别编码" :label-width="formLabelWidth" required>
                    <el-col :span="8">
                    <el-input v-model="form1.mcategoryId" :readonly="readOnly" @blur="validateInput" autocomplete="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="原材料类别名称" :label-width="formLabelWidth" required>
                    <el-col :span="8"> 
                    <el-input v-model="form1.mcategoryName" :readonly="readOnly" ></el-input>
                    </el-col>
                </el-form-item>                    
                <el-form-item label="父节点编码" :label-width="formLabelWidth" required>
                    <el-col :span="12" required>
                    <el-input v-model="form1.parentnodeId" :readonly="readOnly" ></el-input>
                    </el-col>
                </el-form-item>  
                <el-form-item label="祖先类别" :label-width="formLabelWidth" required>
                    <el-col :span="8" required>
                    <el-input v-model="form1.ancestor" :readonly="true"  ></el-input>
                    </el-col>
                </el-form-item>  
                <el-form-item label="类别等级" :label-width="formLabelWidth">
                    <el-col :span="8">
                    <el-input v-model="form1.level" :readonly="true"  ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否为父类别标志" :label-width="formLabelWidth" required >
                    <el-col :span="8">
                    <el-input v-model="form1.isparentflag" :readonly="true" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否已审核" :label-width="formLabelWidth" v-if="this.isEdit === false"  >
                    <el-col :span="8">
                    <el-input v-model="form1.ischeck" :readonly="true" ></el-input>
                    </el-col>
                </el-form-item>
                <!-- 只有当 form1.ischeck 为 "未通过" 时，才显示以下表单项 -->
                <el-form-item label="未通过原因" :label-width="formLabelWidth" required v-if="form1.ischeck === '未通过'">
                <el-col :span="8">
                    <el-input v-model="form1.reason" :readonly="readOnly"></el-input>
                </el-col>
                </el-form-item>

                <el-form-item label="简介" :label-width="formLabelWidth">
                <el-col :span="20">
                    <el-input v-model="form1.note" type="textarea" rows="3" :readonly="readOnly"></el-input>
                </el-col>
                </el-form-item>
                </el-form>

                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="newSave2">确 定</el-button>
                </el-main>
        </el-container>
        
        </el-container>


        
    </div>
</template>
<script>
export default {
    name: 'RawCategoryMan',
   data() {
        return {
            isEdit: false,
            itemKey: 0,
            readOnly: true,
            activeName: 'first',
            treeData: [],
            defaultProps:{
            label:"mcategoryName",
            value:"mcategoryId",
            children:"children"},
            mcategoryName:'',
            mcategoryId:'',
            parentnodeId:'',
            levelValue:'',
            levelOptions: [{
            value: 1,
            label: 1
            }, {
            value: 2,
            label: 2
            }, {
            value: 3,
            label: 3
            }],
        casOptions:[],
        OptionProps: {
            value:"mcategoryId",
            label:"mcategoryId",
            children:"children",
            checkStrictly:true
        },
        selectedOptions:'',
            form1: {
                mcategoryId: '',
                mcategoryName: '',
                note: '',
                parentnodeId: '',
                level: '',
                isparentflag: '',
                ancestor: '',
                ischeck:'',
                reason:''
            },    
            formLabelWidth: '140px',
        }
    },
    created(){
        this.loadPostlistPageC1();
    },
    computed:{
    },
    methods:{
        loadGetCategory(){
      // http://localhost:8098/raw-materials-category/listPageC2
            this.$axios.get(this.$httpUrl+'/raw-materials-category/listPageC2').then(res => res.data).then(res =>{
                console.log("get",res.data);
                if(res.code==200){
                this.casOptions = res.data;
                }
                else{
                alert('获取数据失败');
                }
                
            })

            },
        loadPostlistPageC1() {
            this.$axios.post(this.$httpUrl+'/raw-materials-category/listPageC1',{
            mcategoryName:this.mcategoryName,
            mcategoryId:this.mcategoryId,
            level:this.levelValue,
            }).then(res => res.data).then(res =>{
                console.log("post",res,res.data);
                if(res.code==200){
                this.treeData = res.data;
                console.log("treeData",this.treeData);
                }
                else{
                alert('获取数据失败');
                }
                
            })
        },
        tabshandleClick(tab, event) {
            console.log(tab, event);
        },
        handleCheck(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
            this.form1=data;
        },   
        resetList() {
            this.mcategoryName = '';
            this.selectedOptions='';
            this.mcategoryId = '';
            this.levelValue=''
            this.loadPostlistPageC1();
            this.loadGetCategory();
            this.itemKey=Math.random();
            },
        refreshList() {
            this.loadPostlistPageC1();
            this.loadGetCategory();
            this.itemKey=Math.random();
            alert("刷新成功");
            }, 
        cancel(){
            this.form1={
                mcategoryId: '',
                mcategoryName: '',
                note: '',
                parentnodeId: '',
                level: '',
                isparentflag: '',
                ancestor: '',
                ischeck:'',
                reason:''
            };
            this.readOnly=true;
        },
        //新增
        addRecord(){
            this.form1={
                mcategoryId: '',
                mcategoryName: '',
                note: '',
                parentnodeId: '',
                level: '',
                isparentflag: '',
                ancestor: '',
                ischeck:'',
                reason:''
            };
            this.readOnly=false;
            this.isEdit=true;
        },
        validateInput() {
        const value = this.form2.mcategoryId.trim(); // 获取输入的值并去除首尾空格
        console.log("validateInput", value);

        // 使用正则表达式检查第一个字符是否是大写字母
        const regex = /^M[A-Z]/;

        // 如果第一个字符不是大写字母，显示错误信息
        if (!regex.test(value)) {
            alert('输入内容必须以"M"并加上一个大写字母为开头');
        }
        },
        newSave2(){
        console.log('newSave2',this.form1);
        this.$axios.post(this.$httpUrl + '/raw-materials-category/saveOrMod2', this.form2).then(res => {
        console.log(res);
        if (res.status == "200") {
            alert("新增成功");
            this.loadPostlistPageC1();
            this.itemKey=Math.random();
            this.form1={
                mcategoryId: '',
                mcategoryName: '',
                note: '',
                parentnodeId: '',
                level: '',
                isparentflag: '',
                ancestor: '',
                ischeck:'',
                reason:''
            };
            } else {
            alert("新增失败");
            }
            })
            .catch((error) => {
            console.log('请求出错:', error);
            alert('新增失败');
            if (error.response && error.response.status === 400) {
                // 这里可以根据具体的400错误情况进行更详细的处理
                console.log('400错误:', error.response.data);
            }
            });
        this.loadPostlistPageC1();
        this.loadGetCategory();    
        },
        handleEdit(index, row) {
            console.log("handleEdit",index, row);
            this.isEdit="true"
            this.readOnly=false;
            },
            handleDelete(index, row) {
            console.log(index, row,row.craftsmanId);
            this.$axios.get(this.$httpUrl+'/raw-materials-category/delete?mcategoryId='+row.mcategoryId,).then(res=>res.data).then(res=>{
                console.log(res);
                if(res.code=="200"){
                alert("删除成功");
                this.loadPostlistPageC1();
                this.loadGetCategory();
                this.itemKey=Math.random();
                }else{
                alert("删除失败，状态码不为200！")
                }
            })
            this.loadPostlistPageC1();
            this.loadGetCategory();
            },
            //编辑 修改
            newSave1(){
            console.log('newSave1',this.form1);
                this.dialogFormVisible1 = false;
                this.$axios.post(this.$httpUrl + '/raw-materials-category/saveOrMod', this.form1).then(res => {
                console.log(res);
                if (res.status == "200") {
                alert("修改成功");
                this.loadPostlistPageC1();
                this.loadGetCategory();
                } else {
                alert("修改失败");
                }
                })
                .catch((error) => {
                console.log('请求出错:', error);
                if (error.response && error.response.status === 400) {
                    // 这里可以根据具体的400错误情况进行更详细的处理
                    console.log('400错误:', error.response.data);
                }
                });
                this.loadPostlistPageC1();
                this.loadGetCategory();
            },
    },
}
</script>
<style scoped>
.add {
  margin-left: 12rem;
  color: #fff;
  background-color: rgba(205, 110, 55, 0.853);
  border-color: rgb(205, 110, 55, 0.853);
  transition: box-shadow 0.3s ease; /* 为过渡效果添加平滑的transition */
}

.add:hover,
.add:focus {
  background: rgba(205, 110, 55, 0.65); /* 可微调背景颜色以达到浅白色效果 */
  border-color: rgba(205, 110, 55, 0.65); /* 可微调边框颜色 */
  color: #fff; /* 保持文字颜色 */
  box-shadow: 0 0 8px rgba(255, 255, 255); /* 添加浅白色阴影效果 */
}
.refresh {
  margin-left: 5px;
  color: #fff;
  background-color: rgba(49, 199, 134, 0.853);
  border-color: rgb(49, 199, 134, 0.853);
}
.refresh:hover,
.refresh:focus {
  color: #fff;
  background-color: rgba(49, 199, 134, 0.653);
  border-color: rgb(49, 199, 134, 0.653);
  box-shadow: 0 0 8px rgba(255, 255, 255); /* 添加浅白色阴影效果 */
}
</style>
