<!--  -->
<template>
  <div style="height: 100%">
    <div style="margin-bottom: 5px;margin-left: 5px; height: 5%">
      <el-input type="text" autofocus="true" placeholder="请输入公司名称" v-model="name" class="input-with-select" style="width: 200px" suffix-icon="el-icon-search" clearable size="small" 
      @keyup.enter.native="loadPostlistPageC1"></el-input>

      <el-cascader clearable filterable placeholder="请选择/输入地区"
          size="small"
          v-model="areasSelectedOptions"
          :options="areasOptions"
          :props="areasOptionProps" 
          @change="handleCascaderChange" 
          @blur="handleCascaderBlur(areasSelectedOptions)" 
          @visible-change="handleCascaderBlur(areasSelectedOptions)"
          style="margin-left: 5px;">
      </el-cascader>

      <el-button type="primary" @click="loadPostlistPageC1" style="margin-left: 5px;" size="small" icon="el-icon-check">确定</el-button>
      <el-button type="warning" @click="resetList" style="margin-left: 5px;" size="small" icon="el-icon-refresh-left">重置</el-button>
      <el-button class="refresh" icon="el-icon-refresh" @click="loadPostlistPageC1" style="margin-left: 5px;" size="small">刷新</el-button>

      <!-- <el-button class="clearallfilter" @click="clearFilter" size="small">清除所有过滤器</el-button> -->

      <!-- <el-button type="warning" @click="addRecord" style="margin-left: 5px;" size="small">新增</el-button> -->
    </div>
    
    <el-table ref="multipleTable" :data="tableData" style="width: 100vw" height=620
      highlight-current-row 
      :row-key="getRowKeys"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}" 
      @current-change="handleCurrentChange"  @selection-change="handleSelectionChange">
    <!-- max-height="100vh" 控制最多显示 -->
      <el-table-column prop="checkbox" width="45" type="selection" reserve-selection align="center">
      </el-table-column>
      <el-table-column prop="supplierId" label="供应商公司编码" width="150" fixed sortable="true" align="center" column-key >
      </el-table-column>
      <el-table-column prop="companyName" label="供应商公司名称" width="200" fixed align="center">
      </el-table-column>
      <el-table-column prop="createDate" label="成立日期" width="120" sortable align="center">
      </el-table-column>
      <el-table-column prop="contactPersonName" label="负责人名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="contactPersonGender" label="性别" width="50" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="phoneNumber" label="电话号码" width="120" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="password" label="密码" width="130" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.showPassword">{{ scope.row.password ? '********' : '无' }}</span>
          <span v-else>{{ scope.row.password }}</span>
          <el-button type="text" @click="togglePassword(scope.row)">
            <i class="el-icon-view"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="images" label="供应商公司照片" width="150" align="center">
            <template slot-scope="scope">
              <div class="list-img">
                <el-avatar size="large"  fit="fir" shape="square" :src="require('@/assets/photo/supplierphoto/'+scope.row.images+'.jpg')"></el-avatar>
              </div>
            </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="141" fixed="right" align="center">
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
    <div class="paginationClass">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 15, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      >
      </el-pagination>
    </div>

      <el-dialog title="供应商公司详情" :visible.sync="dialogFormVisible" style="height: 95vh; overflow: hidden" width="53%" center  >
        <el-form :model="form" style="overflow-y: auto; height: 50vh;width: 50vw;">
          <el-form-item label="店供应商公司编码" :label-width="formLabelWidth" required>
            <el-col :span="12">
              <el-input v-model="form.supplierId" autocomplete="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="供应商公司名称" :label-width="formLabelWidth" required>
            <el-col :span="12">
              <el-input v-model="form.companyName" autocomplete="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="成立日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.createDate"
              type="date"
              placeholder="成立日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="负责人名称" :label-width="formLabelWidth" required>
            <el-col :span="12">
              <el-input v-model="form.contactPersonName" autocomplete="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="负责人身份证号码" :label-width="formLabelWidth" required show-password>
            <el-col :span="12">
              <el-input v-model="form.contactPersonId" autocomplete="true" type="password" ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="form.contactPersonGender">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth" required>
            <el-col :span="12" required>
             <el-input v-model="form.phoneNumber" ></el-input>
            </el-col>
          </el-form-item> 
          <el-form-item label="地址" :label-width="formLabelWidth" required>
            <el-col :span="20" required>
             <el-input v-model="form.address" ></el-input>
            </el-col>
          </el-form-item> 
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-col :span="12">
             <el-input v-model="form.email" ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" required>
            <el-col :span="12">
              <el-input v-model="form.password" type="password" show-password></el-input>
            </el-col>
          </el-form-item> 
          <el-form-item label="供应商公司照片" :label-width="formLabelWidth">
            <div class="list-img">
              <el-avatar 
                v-if="form.images"
                size="900" 
                fit="fir" 
                shape="square" 
                :src="require('@/assets/photo/supplierphoto/' + form.images + '.jpg')">
              </el-avatar>
              <el-avatar 
                v-else 
                size="large" 
                fit="fir" 
                shape="square" 
                :src="require('@/assets/photo/default.jpg')">
              </el-avatar>
            </div>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="newSave">确 定</el-button>
        </div>
  </el-dialog>
    
  </div>
</template>

<script>


export default {
  name: 'SupplierMan',
  data() {
    return {
      tableData:[],
      currentRow: null,
      multipleSelection: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      name: '',
      areasOptions:[],
      areasOptionProps: {
        value:"areaName",
        label:"areaName",
        children:"children",
        checkStrictly:true
      },
      areasSelectedOptions:'',
      areasHolename:'',
       dialogFormVisible: false,
        form: {
          supplierId: '',
          companyName: '',
          createDate:'',
          contactPersonName: '',
          contactPersonGender: '',
          contactPersonId:'',
          phoneNumber: '',
          email: '',
          password: '',
          images: '',
        },
        formLabelWidth: '150px',
        imageUrl: '',
        fileList: [],
        dialogVisible: false,
        previewUrl: ''
    }
  },
  computed: {
    // 计算属性
    // 计算当前页的数据
    computedTableData() {
      const start = (this.pageNum - 1) * this.pageSize
      const end = start + this.pageSize
      return this.tableData.slice(start, end)
    }
  },
  components: {},
  props: {},
  created () {
    //this.loadCraftmenGetList();
    this.loadPostlistPageC1();
    this.loadAreasGetTree();
  },
  methods: {
    loadAreasGetTree() {
      this.$axios.get(this.$httpUrl+'/areas/tree').then(res => res.data).then(res =>{
        console.log("get",res);
        this.areasOptions = res;
      })
    },
    loadPostlistPageC1() {
      console.log("loadPostlistPageC1",this.name);
        this.$axios.post(this.$httpUrl+'/suppliers/listPageC1',{
          "pageSize":this.pageSize,
          "pageNum":this.pageNum,
          "param":{
            "name":this.name,
            "areaname":this.areasHolename
          }
        }).then(res => res.data).then(res =>{
          console.log("post",res,res.data);
          if(res.code==200){
            this.tableData = res.data.map(item => ({
            ...item,
            // images: `D:\\Saved Pictures\\${item.images}.jpg`,
            showPassword: false
            }));
            this.total = res.total;
          }
          else{
            alert('获取数据失败');
          }
          
        })
    },
    togglePassword(row) {
      row.showPassword = !row.showPassword;
    },
    getRowKeys(row) {
      return row.craftsmanId;
    },
    handleCurrentChange(val) {//选中一行
      console.log("handleCurrentChange",val);
      this.currentRow = val;
    },
    handleSelectionChange(val) {//选中多行
      console.log("handleSelectionChange",val);
        this.multipleSelection = val;
    },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
    },
    clearFilter() {
        this.$refs.multipleTable.clearFilter();
    },
    handleEdit(index, row) {
      this.form=row;
      this.dialogFormVisible = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$axios.get(this.$httpUrl+'/suppliers/delete?supplierId='+row.supplierId).then(res=>res.data).then(res=>{
        console.log(res);
        if(res.code=="200"){
          alert("删除成功");
          this.loadPostlistPageC1();
        }else{
          alert("删除失败，该店铺为外部有依赖")
        }
      })
      .catch((error) => {
          alert("删除失败，该店铺为外部有依赖")
          console.log('请求出错:', error);
          if (error.response && error.response.status === 400) {
            // 这里可以根据具体的400错误情况进行更详细的处理
            console.log('400错误:', error.response.data);
          }
        });
    },
    resetList() {
      this.name = '';
      this.areasSelectedOptions = '';
      this.areasHolename = '';
      this.loadPostlistPageC1();
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
      handleCascaderChange(values) {
      // 使用 join 方法将数组中的元素用一个空格连接起来
        const concatenatedString = values.join('');
        console.log(values,this.areasSelectedOptions)
      // 输出拼接后的结果
        this.areasHolename = concatenatedString;
        console.log(concatenatedString, this.areasHolename);
        
      },
      handleCascaderBlur(values) {
        console.log('Cascader 失焦');
        this.handleCascaderChange(values);
        this.loadPostlistPageC1();
      },
      addRecord(){
        this.dialogFormVisible = true;
      },
      newSave(){
        console.log('newSave',this.form);
        this.dialogFormVisible = false;
        this.$axios.post(this.$httpUrl + '/suppliers/saveOrMod', this.form).then(res => {
        console.log(res);
        if (res.status == "200") {
          alert("修改成功");
          this.loadPostlistPageC1();
        } else {
          alert("修改失败");
        }
        })
        .catch((error) => {
          alert("修改成功");
          console.log('请求出错:', error);
          if (error.response && error.response.status === 400) {
            // 这里可以根据具体的400错误情况进行更详细的处理
            console.log('400错误:', error.response.data);
          }
        });
        this.loadPostlistPageC1();
    }

  },
  
}
</script>

<style  scoped>
/deep/.el-table .el-table__cell{
  padding: 0px 0px;
}
/deep/ .el-table .tr{
  height: 50px;
}

.paginationClass {
    position: fixed;
    bottom: 0;
    height: 32px;
    width: 100%;
    text-align: left;
    background-color: #ffffff;
}


.clearallfilter {
  margin-left: 28rem;
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
