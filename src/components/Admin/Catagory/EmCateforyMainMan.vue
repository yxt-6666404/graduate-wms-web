<!--  -->
<template>
  <div style="height: 100%;">
    <div style="margin-bottom: 5px;margin-left: 5px; height: 6%">
      <el-cascader clearable filterable placeholder="请选择/输入刺绣流派编码"
          size="small"
          v-model="selectedOptions"
          :options="casOptions"
          :props="OptionProps" 
          @change="handleCascaderChange" 
          @blur="handleCascaderBlur(selectedOptions)" 
          @visible-change="handleCascaderBlur(selectedOptions)"
          style="margin-left: 5px;">
      </el-cascader>

      <el-input type="text" autofocus="true" placeholder="请输流派类别名称" v-model="categoryName" class="input-with-select" style="width: 200px;margin-left: 5px;" suffix-icon="el-icon-search" clearable size="small" 
      @keyup.enter.native="loadPostlistPageC1"></el-input>

      <el-button type="primary" @click="loadPostlistPageC1" icon="el-icon-check" style="margin-left: 5px;" size="small">确定</el-button>
      <el-button type="warning" @click="resetList" style="margin-left: 5px;" size="small" icon="el-icon-refresh-left">重置</el-button>
      <el-button class="refresh" icon="el-icon-refresh" @click="loadPostlistPageC1" style="margin-left: 5px;" size="small">刷新</el-button>

      

      <el-button class="add" @click="addRecord" size="small">新增刺绣流派</el-button>
      <el-button class="clearallfilter" @click="clearFilter" size="small">清除所有过滤器</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100vw;" height="492"
      :row-key="getRowKeys"
      border lazy
      default-expand-all
      :header-cell-style="{background:'#eef1f6',color:'#606266'}" 
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
       @current-change="handleCurrentChange"  @selection-change="handleSelectionChange">
      <el-table-column prop="checkbox" width="45" type="selection" reserve-selection align="center">
      </el-table-column>
      <el-table-column
        prop="categoryId"
        label="刺绣流派类别编码"
        sortable
        width="160">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="刺绣流派类别名称"
        width="140">
      </el-table-column>
      <el-table-column
        align="center"
        width="100"
        prop="parentnodeId"
        label="父节点编码">
      </el-table-column>
      <el-table-column
        header-align="center"
        width="120"
        prop="ancester"
        label="祖先类别">
      </el-table-column>
      <el-table-column
        width="120" align="center"
        sortable
        :filters="[{text:1, value:1}, {text:2, value:2}, {text:3, value:3}]"  :filter-method="filterLevel"
        column-key="level"
        prop="level"
        label="类别等级">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.level === 1 ? 'primary' : (scope.row.level === 2 ? 'warning' : 'danger')"
            disable-transitions>{{scope.row.level}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        width="150" align="center" 
        column-key="isparentflag"
        :filters="[{text: '是', value:1},{text:'否', value:0}]"  :filter-method="filteIsParentflag"
        prop="isparentflag"
        label="是否为父类别标志">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isparentflag === 1 ? 'primary' :'success'"
            disable-transitions>{{scope.row.isparentflag === 1 ? '是' : '否'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip width="240" 
        prop="note"
        label="简介">
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="150" fixed="right" align="center">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" type="success">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>


    <el-dialog title="刺绣流派详情" :visible.sync="dialogFormVisible1" style="height: 95vh; overflow: hidden" width="55%" center  >
        <el-form :model="form1" style="overflow-y: auto; height: 50vh;width: 50vw;">
          <el-form-item label="刺绣流派类别编码" :label-width="formLabelWidth" required>
            <el-col :span="8">
              <el-input v-model="form1.categoryId" :readonly="true" autocomplete="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="刺绣流派类别名称" :label-width="formLabelWidth" required>
            <el-col :span="8"> 
              <el-input v-model="form1.categoryName" :readonly="true"></el-input>
            </el-col>
          </el-form-item>                    
          <el-form-item label="父节点编码" :label-width="formLabelWidth" required>
            <el-col :span="12" required>
             <el-input v-model="form1.parentnodeId" ></el-input>
            </el-col>
          </el-form-item>  
          <el-form-item label="祖先类别" :label-width="formLabelWidth" required>
            <el-col :span="8" required>
             <el-input v-model="form1.ancester" :readonly="true"  ></el-input>
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
          <el-form-item label="简介" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input v-model="form1.note" type="textarea" rows="3"></el-input>
          </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="newSave1">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="刺绣流派详情" :visible.sync="dialogFormVisible2" style="height: 95vh; overflow: hidden" width="55%" center  >
        <el-form :model="form2" style="overflow-y: auto; height: 50vh;width: 50vw;">
          <el-form-item label="刺绣流派类别编码" :label-width="formLabelWidth" required>
            <el-col :span="8">
              <el-input v-model="form2.categoryId" autocomplete="true"  @blur="validateInput" ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="刺绣流派类别名称" :label-width="formLabelWidth" required>
            <el-col :span="8">
              <el-input v-model="form2.categoryName"></el-input>
            </el-col>
          </el-form-item>    
          <el-form-item label="父节点编码" :label-width="formLabelWidth" required>
            <el-cascader clearable filterable placeholder="请选择/输入父节点编码"
              size="small"
              v-model="form2.parentnodeId"
              :options="casOptions"
              :props="OptionProps"
              @change="handleCascaderChange2" 
              style="margin-left: 5px;">
            </el-cascader>
          </el-form-item>                  
          <el-form-item label="简介" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input v-model="form2.note" type="textarea" rows="3"></el-input>
          </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="newSave2">确 定</el-button>
        </div>
      </el-dialog>


  </div>


</template>

<script>
export default {
  name: 'EmCateforyMainMan',
  data () {
    return {
      tableData: [],
      categoryName:'',
      categoryId:'',
      casOptions:[],
      OptionProps: {
        value:"categoryId",
        label:"categoryId",
        children:"children",
        checkStrictly:true
      },
      selectedOptions:'',
      Holename:'',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form1: {
        categoryId: '',
        categoryName: '',
        note: '',
        parentnodeId: '',
        level: '',
        isparentflag: '',
        ancester: '',
      },
      form2: {
        categoryId: '',
        categoryName: '',
        parentnodeId: '',
        note: '',
      },
        formLabelWidth: '140px',
    }
  },
  created() {
    this.loadPostlistPageC1();
    this.loadGetCategory();
  },
  methods: {
    loadGetCategory(){
      // http://localhost:8098/embroidery-category/listPageC2
      this.$axios.get(this.$httpUrl+'/embroidery-category/listPageC2').then(res => res.data).then(res =>{
        console.log("get",res.data);
        if(res.code==200){
          this.casOptions = res.data;
        }
        else{
          alert('获取数据失败');
        }
        
      })

    },
    filterHandler(value, row, column) {
      console.log("filterHandler",value, row, column);
      const property = column['property'];
      console.log("property",property,row[property],row[property] === value);
      return row[property] === value;
    },
    filterLevel(value, row) {
      console.log("filterLevel",value, row);
      // 如果当前行的 level 与给定值相等，直接返回 true
      if (row.level === value) {
          return true;
      }
      // 如果当前行有子节点（假设子节点数组是 row.children），则递归检查子节点
      if (row.children && row.children.length > 0) {
          // 对每个子节点递归调用 filterLevel
          for (let child of row.children) {
              if (this.filterLevel(value, child)) {
                  return true; // 如果找到匹配的 level，返回 true
              }
          }
      }
      // 如果没有找到匹配的 level，返回 false
      return false;
    },
    filteIsParentflag(value, row) {
        return row.isparentflag === value;
    },
    clearFilter() {
        this.$refs.multipleTable.clearFilter();
    },
    getRowKeys(row) {
      return row.categoryId;
    },
    loadPostlistPageC1() {
        this.$axios.post(this.$httpUrl+'/embroidery-category/listPageC1',{
        categoryName:this.categoryName,
        categoryId:this.categoryId,
        }).then(res => res.data).then(res =>{
          console.log("post",res,res.data);
          if(res.code==200){
            this.tableData = res.data;
            this.total = res.total;
          }
          else{
            alert('获取数据失败');
          }
          
        })
    },
    resetList() {
      this.categoryName = '';
      this.loadPostlistPageC1();
      this.loadGetCategory();
    },
    handleCurrentChange(val) {//选中一行
      console.log("handleCurrentChange",val);
      this.currentRow = val;
    },
    handleSelectionChange(val) {//选中多行
      console.log("handleSelectionChange",val);
        this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log("handleEdit",index, row);
      this.form1=row;
      this.dialogFormVisible1 = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row,row.craftsmanId);
      this.$axios.get(this.$httpUrl+'/embroidery-category/delete?categoryId='+row.categoryId,).then(res=>res.data).then(res=>{
        console.log(res);
        if(res.code=="200"){
          alert("删除成功");
          this.loadPostlistPageC1();
        }else{
          alert("删除失败，状态码不为200！")
        }
      })
      this.loadPostlistPageC1();
      this.loadGetCategory();
    },
    newSave1(){
      console.log('newSave1',this.form1);
        this.dialogFormVisible1 = false;
        this.$axios.post(this.$httpUrl + '/embroidery-category/saveOrMod', this.form1).then(res => {
        console.log(res);
        if (res.status == "200") {
          alert("修改成功");
          this.loadPostlistPageC1();
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
    addRecord(){
        
        this.dialogFormVisible2 = true;
    },
    validateInput() {
      const value = this.form2.categoryId.trim(); // 获取输入的值并去除首尾空格
      console.log("validateInput", value);

      // 使用正则表达式检查第一个字符是否是大写字母
      const regex = /^[A-Z]/;

      // 如果第一个字符不是大写字母，显示错误信息
      if (!regex.test(value)) {
        alert('输入内容必须以大写字母开头');
      }
    },
    newSave2(){
      console.log('newSave2',this.form2);
        this.dialogFormVisible2 = false;
        this.$axios.post(this.$httpUrl + '/embroidery-category/saveOrMod2', this.form2).then(res => {
        console.log(res);
        if (res.status == "200") {
          alert("新增成功");
          this.loadPostlistPageC1();
          this.form2 = {
            categoryId: '',
            categoryName: '',
            parentnodeId: '',
            note: ''};
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
    handleCascaderChange(values) {
        // 使用 join 方法将数组中的元素用一个空格连接起来
        console.log(values);
         // 获取最后一个值
        const lastValue = values[values.length - 1];
        console.log('最后一个值:', lastValue);
        this.categoryId = lastValue;
      },
      handleCascaderBlur(values) {
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
        this.form2.parentnodeId = lastValue;
      },
  }
}
</script>

<style  scoped>
/deep/.el-table .el-table__cell{
  padding: 3px 0px;
}

.add {
  margin-left: 125px;
  color: #fff;
  background-color: rgba(205, 110, 55, 0.853);
  border-color: rgb(205, 110, 55,0.853);
}
.add:hover,
.add:focus {
  background: var(--el-button-hover-color);
  border-color: var(--el-button-hover-color);
  color: var(--el-button-font-color);
}


.clearallfilter {
  margin-left: 5px;
  color: #fff;
  background-color: rgba(137, 205, 55, 0.853);
  border-color: rgb(137, 205, 55, 0.853);
}
.clearallfilter:hover,
.clearallfilter:focus {
  background: var(--el-button-hover-color);
  border-color: var(--el-button-hover-color);
  color: var(--el-button-font-color);
}


.refresh {
  margin-left: 5px;
  color: #fff;
  background-color: rgba(49, 199, 134, 0.853);
  border-color: rgb(49, 199, 134, 0.853);
}
.refresh:hover,
.refresh:focus {
  background: var(--el-button-hover-color);
  border-color: var(--el-button-hover-color);
  color: var(--el-button-font-color);
}
</style>
