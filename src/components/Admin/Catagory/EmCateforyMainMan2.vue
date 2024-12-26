<!--  -->
<template>
  <div style="height: 100%;">
    <div style="margin-bottom: 5px;margin-left: 5px; height: 5%">
      <el-cascader clearable filterable placeholder="请选择/输入刺绣技法编码"
          size="small"
          v-model="selectedOptions"
          :options="casOptions"
          :props="OptionProps" 
          @change="handleCascaderChange" 
          @blur="handleCascaderBlur(selectedOptions)" 
          @visible-change="handleCascaderBlur(selectedOptions)"
          style="margin-left: 5px;">
      </el-cascader>

      <el-input type="text" autofocus="true" placeholder="请输刺绣技法类别名称" v-model="tcategoryName" class="input-with-select" style="width: 200px;margin-left: 5px;" suffix-icon="el-icon-search" clearable size="small" 
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

      

      <el-button class="add" @click="addRecord" size="small">新增刺绣技法</el-button>
      <el-button class="isexpand" @click="toggleRowExpansion" size="small">
      收缩全部节点
    </el-button>
    <!-- <el-button class="clearallfilter" @click="clearFilter" size="small">清除所有过滤器
    </el-button> -->
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      style="width: 100vw;" height=650
      :row-key="getRowKeys"
      border lazy
      :key="itemKey"
      :default-expand-all=false
      :header-cell-style="{background:'#eef1f6',color:'#606266'}" 
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :load="treeLoad"
      @expand-change="handleExpandChange"
      @row-click="getOpenDetail"
      @current-change="handleCurrentChange"
      >
      <!-- @row-click="getOpenDetail"
      @current-change="handleCurrentChange"  @selection-change="handleSelectionChange" -->
      <el-table-column prop="checkbox" width="45" type="selection" reserve-selection align="center">
      </el-table-column>
      <el-table-column
        prop="tcategoryId"
        label="刺绣技法类别编码"
        sortable
        width="160">
      </el-table-column>
      <el-table-column
        prop="tcategoryName"
        label="刺绣技法类别名称"
        width="140">
      </el-table-column>
      <el-table-column
        align="center"
        width="100"
        prop="parentnodeId"
        label="父节点编码">
        <template slot-scope="scope">
          <span>{{ scope.row.parentnodeId !=='null' ? scope.row.parentnodeId : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        width="120"
        prop="ancestor"
        label="祖先类别">
        <template slot-scope="scope">
          <span>{{ scope.row.ancestor !=='null' ? scope.row.ancestor : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120" align="center"
        sortable
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


    <el-dialog title="刺绣技法详情" :visible.sync="dialogFormVisible1" style="height: 95vh; overflow: hidden" width="55%" center  >
        <el-form :model="form1" style="overflow-y: auto; height: 50vh;width: 50vw;">
          <el-form-item label="刺绣技法类别编码" :label-width="formLabelWidth" required>
            <el-col :span="8">
              <el-input v-model="form1.tcategoryId" :readonly="true" autocomplete="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="刺绣技法类别名称" :label-width="formLabelWidth" required>
            <el-col :span="8"> 
              <el-input v-model="form1.tcategoryName"></el-input>
            </el-col>
          </el-form-item>                    
          <el-form-item label="父节点编码" :label-width="formLabelWidth" required>
            <el-col :span="12" required>
             <el-input v-model="form1.parentnodeId" ></el-input>
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
          <el-form-item label="是否为父类别标志" :label-width="formLabelWidth">
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

      <el-dialog title="刺绣技法详情" :visible.sync="dialogFormVisible2" style="height: 95vh; overflow: hidden" width="55%" center  >
        <el-form :model="form2" style="overflow-y: auto; height: 50vh;width: 50vw;">
          <el-form-item label="刺绣技法类别编码" :label-width="formLabelWidth" required>
            <el-col :span="8">
              <el-input v-model="form2.tcategoryId" autocomplete="true"  @blur="validateInput" ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="刺绣技法类别名称" :label-width="formLabelWidth" required>
            <el-col :span="8">
              <el-input v-model="form2.tcategoryName"></el-input>
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
  name: 'EmCateforyMainMan2',
  data () {
    return {
      activeName: 'first',
      itemKey:Math.random(),
      isExpansion: false,
      currentParentId: null,
      tableTreeRefreshTool: {},
      tableData: [],
      tcategoryName:'',
      tcategoryId:'',
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
        value:"tcategoryId",
        label:"tcategoryId",
        children:"children",
        checkStrictly:true
      },
      selectedOptions:'',
      Holename:'',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form1: {
        tcategoryId: '',
        tcategoryName: '',
        note: '',
        parentnodeId: '',
        level: '',
        isparentflag: '',
        ancestor: '',
      },
      form2: {
        tcategoryId: '',
        tcategoryName: '',
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
      // http://localhost:8098/embroidery-techniques-category/listPageC2
      this.$axios.get(this.$httpUrl+'/embroidery-techniques-category/listPageC2').then(res => res.data).then(res =>{
        console.log("get",res.data);
        if(res.code==200){
          this.casOptions = res.data;
        }
        else{
          alert('获取数据失败');
        }
        
      })

    },
    getRowKeys(row) {
      return row.tcategoryId;
    },
    loadPostlistPageC1() {
      if(this.tableData==[]){
        this.parentnodeId='null';
      }
      else{
        this.parentnodeId='';
      }
      this.loading = true;
      this.$axios.post(this.$httpUrl+'/embroidery-techniques-category/listPageC1',{
        tcategoryName:this.tcategoryName,
        tcategoryId:this.tcategoryId,
        parentnodeId:this.parentnodeId,
        level:this.levelValue,
      }).then(res => res.data).then(res =>{
        console.log("post",res,res.data);
        if(res.code==200){
          this.tableData = res.data.map((item) => {
          return {
            ...item,
            hasChildren: item.isparentflag === 1 ? true : false  // Add or update the 'hasChildren' property
          };
        });
          this.total = res.total;
          this.loading = false;
          console.log("tableData",this.tableData,this.total);
          
        }
        else{
          alert('获取数据失败');
        }
        
      })
    },
      // 树形动态加载表单数据：
      treeLoad(tree, treeNode, resolve) {
        // 保存父级id，在你需要刷新子级数据的地方可以用到
        this.currentParentId = tree.tcategoryId
    // 在之前声明的全局变量中，增加一个key为 本条数据的id，id可替换为你数据中的任意唯一值
        this.tableTreeRefreshTool[tree.tcategoryId] = {}
      // 重要！保存resolve方法，以便后续使用
        this.tableTreeRefreshTool[tree.tcategoryId].resolve = resolve
      // 记录展开次数，具体作用后续介绍
        this.tableTreeRefreshTool[tree.tcategoryId].expandCount = 0
        setTimeout(() => {
          console.log("treeLoad",this.tcategoryId,this.tcategoryName,tree, treeNode, resolve);
          this.$axios.post(this.$httpUrl+'/embroidery-techniques-category/listPageC1',{
            tcategoryName:this.tcategoryName,
            tcategoryId:this.tcategoryId,
            parentnodeId:tree.tcategoryId,
            level:this.levelValue,
        }).then(res => res.data).then(res =>{
          console.log("post",res,res.data);
          if(res.code==200){
            resolve(res.data.map((item) => {
            return {
              ...item,  // Spread the rest of the properties
              hasChildren: item.isparentflag === 1 ? true : false  // Add or update the 'hasChildren' property
            };
            }));
            console.log("resolve",resolve.treeData,this.tableData,this.$refs.multipleTable.data);
          }
          else{
            alert('获取数据失败');
          }
          
        })
        }, 222);
    },
     // 点击展开节点
      getOpenDetail(row, column, event) {
        console.log("getOpenDetail",row, column, event);
      if (event.currentTarget.querySelector(".el-table__expand-icon")) {
        event.currentTarget.querySelector(".el-table__expand-icon").click();
      }
    },
    handleExpandChange (row, expanded) {
      console.log("handleExpandChange",row, expanded);
      // 获取到之前保存的全局变量
      const curr = this.tableTreeRefreshTool[row.tcategoryId]
      // 展开次数 +1
      curr.expandCount++
      // 如果是展开状态，且展开次数大于1，且上一次的状态为折叠，则请求api数据，更新子菜单
      if (expanded && curr.expandCount > 1 && !curr.prevStatus) {
          // api请求
          setTimeout(() => {
          console.log("handleExpandChange",row, expanded);
          this.$axios.post(this.$httpUrl+'/embroidery-techniques-category/listPageC1',{
            tcategoryName:this.tcategoryName,
          tcategoryId:this.tcategoryId,
          parentnodeId:row.tcategoryId,
        }).then(res => res.data).then(res =>{
          console.log("post",res,res.data);
          if(res.code==200){
            curr.resolve(res.data.map((item) => {
            return {
              ...item,  // Spread the rest of the properties
              hasChildren: item.isparentflag === 1 ? true : false  // Add or update the 'hasChildren' property
            };
          }));
          }
          else{
            alert('获取数据失败');
          }
          
        })
        }, 222);
      }
      // 保存本次的展开或折叠状态，用于下次判断
      curr.prevStatus = expanded
    },  
    toggleRowExpansion(){
      this.loadPostlistPageC1();
      this.tableData.forEach(row => {
        // this.treeLoad(row)
        this.$refs.multipleTable.toggleRowExpansion(row,false);
      })
    },
    resetList() {
      this.tcategoryName = '';
      this.selectedOptions='';
      this.tcategoryId = '';
      this.levelValue='';
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
    handleCurrentChange(val, event) {//选中一行
      console.log("handleCurrentChange",val);
      this.currentRow = val;
      this.getOpenDetail(val, null, event);
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
      console.log('handleDelete',index, row,row.tcategoryId);
      this.$axios.get(this.$httpUrl+'/embroidery-techniques-category/delete?tcategoryId='+row.tcategoryId,).then(res=>res.data).then(res=>{
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
        this.$axios.post(this.$httpUrl + '/embroidery-techniques-category/saveOrMod', this.form1).then(res => {
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
    //新增
    addRecord(){
        this.dialogFormVisible2 = true;
    },
    validateInput() {
      const value = this.form2.tcategoryId.trim(); // 获取输入的值并去除首尾空格
      console.log("validateInput", value);

      // 使用正则表达式检查第一个字符是否是大写字母
      const regex = /^T[A-Z]/;

      // 如果第一个字符不是大写字母，显示错误信息
      if (!regex.test(value)) {
        alert('输入内容必须以"T"并加上一个大写字母为开头');
      }
    },
    newSave2(){
      console.log('newSave2',this.form2);
        this.dialogFormVisible2 = false;
        this.$axios.post(this.$httpUrl + '/embroidery-techniques-category/saveOrMod2', this.form2).then(res => {
        console.log(res);
        if (res.status == "200") {
          alert("新增成功");
          this.loadPostlistPageC1();
          this.loadGetCategory();
          this.itemKey=Math.random();
          this.form2 = {
            tcategoryId: '',
            tcategoryName: '',
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
        this.tcategoryId = lastValue;
        this.parentnodeId='';
        this.loadPostlistPageC1();
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
      filterLevel(values) {
      console.log("filterLevel",values);
      this.levelValue=values;
      this.loadPostlistPageC1();
    },
  }
}
</script>

<style  scoped>
/deep/.el-table .el-table__cell{
  padding: 3px 0px;
}

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



/* .clearallfilter {
  margin-left: .3125rem;
  color: #fff;
  background-color: rgba(137, 205, 55, 0.853);
  border-color: rgb(137, 205, 55, 0.853);
}
.clearallfilter:hover,
.clearallfilter:focus {
  color: #fff;
  background-color: rgba(137, 205, 55, 0.653);
  border-color: rgb(137, 205, 55, 0.653);
  box-shadow: 0 0 8px rgba(255, 255, 255); 
 } */

.isexpand {
  margin-left: .3125rem;
  color: #fff;
  background-color: rgba(187, 125, 225, 0.863);
  border-color: rgba(187, 125, 225, 0.863);
}
.isexpand:hover,
.isexpand:focus {
  color: #fff;
  background-color: rgba(187, 125, 225, 0.663);
  border-color: rgba(187, 125, 225, 0.663);
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
