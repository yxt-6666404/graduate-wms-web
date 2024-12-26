<!-- crafman -->
<template>
    <div style="height: 100%">
      <div style="margin-bottom: 5px;margin-left: 5px; height: 5%">
        <el-input type="text" autofocus="true" placeholder="请输入手工艺人姓名" v-model="name" class="input-with-select" style="width: 200px" suffix-icon="el-icon-search" clearable size="small" 
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
        <el-button class="refresh" icon="el-icon-refresh" @click="refreshList" style="margin-left: 5px;" size="small">刷新</el-button>
  
        <el-button class="clearallfilter" @click="clearFilter" size="small">清除所有过滤器</el-button>
  
        <el-button type="warning" @click="addRecord" style="margin-left: 5px;" size="small">新增</el-button>
      </div>
      
      <el-table ref="multipleTable" :data="tableData" style="width: 100vw" height=620
        highlight-current-row :key="itemKey"
        :row-key="getRowKeys"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}" 
        @current-change="handleCurrentChange"  @selection-change="handleSelectionChange">
      <!-- max-height="100vh" 控制最多显示 -->
        <el-table-column prop="checkbox" width="45" type="selection" reserve-selection align="center">
        </el-table-column>
        <el-table-column prop="craftsmanId" label="编码" width="100" fixed sortable="true" align="center" column-key >
        </el-table-column>
        <el-table-column prop="craftsmanName" label="手工艺人姓名" width="120" fixed align="center">
        </el-table-column>
  
        <el-table-column prop="gender" label="性别" width="50" align="center">
        </el-table-column>
  
        <el-table-column prop="craftsmanshipType" label="手工艺人类型" width="130" 
          :filters="[{text: '初级手工艺人', value: '初级手工艺人'}, {text: '中级手工艺人', value: '中级手工艺人'}, {text: '高级手工艺人', value: '高级手工艺人'}]"  :filter-method="filterHandler">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.craftsmanshipType === '初级手工艺人' ? 'primary' : (scope.row.craftsmanshipType === '中级手工艺人' ? 'success' : 'danger')"
              disable-transitions>{{scope.row.craftsmanshipType}}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="birthDate" label="出生日期" width="120" sortable align="center">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="240" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码" width="140">
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
        <el-table-column prop="images" label="头像" width="100">
              <template slot-scope="scope">
                <div class="list-img">
                  <el-avatar size="large"  fit="fir" shape="square" :src="require('@/assets/photo/craftmenimage/'+scope.row.images+'.jpg')"></el-avatar>
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
  
        <el-dialog title="手工艺人详情" :visible.sync="dialogFormVisible" style="height: 95vh; overflow: hidden" width="53%" center  >
          <el-form :model="form" style="overflow-y: auto; height: 50vh;width: 50vw;">
             <el-form-item label="手工艺人编码" :label-width="formLabelWidth" required>
              <el-col :span="12">
                <el-input v-model="form.craftsmanId" autocomplete="true"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="手工艺人名称" :label-width="formLabelWidth" required>
              <el-col :span="12">
                <el-input v-model="form.craftsmanName" autocomplete="true"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" required>
              <el-col :span="12">
                <el-input v-model="form.password" type="password" show-password></el-input>
              </el-col>
            </el-form-item>                    
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="form.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.birthDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" required>
              <el-col :span="15" required>
               <el-input v-model="form.address" ></el-input>
              </el-col>
            </el-form-item>  
            <el-form-item label="电话号码" :label-width="formLabelWidth" required>
              <el-col :span="12" required>
               <el-input v-model="form.phoneNumber" ></el-input>
              </el-col>
            </el-form-item>  
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-col :span="12">
               <el-input v-model="form.email" ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth" required >
              <el-col :span="12">
              <el-input v-model="form.idnumber" placeholder="身份证号" type="password" required show-password></el-input>
            </el-col>
            </el-form-item>
            <el-form-item label="工作年限" :label-width="formLabelWidth">
            <el-col :span="8">
              <el-input v-model="form.workExperience" placeholder="工作年限"></el-input>
            </el-col>
            </el-form-item>
            <el-form-item label="手工艺人类型" :label-width="formLabelWidth" required>
                <el-radio-group v-model="form.craftsmanshipType">
                  <el-radio label="初级手工艺人">初级手工艺人</el-radio>
                  <el-radio label="中级手工艺人">中级手工艺人</el-radio>
                  <el-radio label="高级手工艺人">高级手工艺人</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth">
              <div class="list-img" style="width: 50px; height: 50px;">
                
                <el-avatar 
                  v-if="form.images"
                  size="large" 
                  fit="fir" 
                  shape="square" 
                  :src="require('@/assets/photo/craftmenimage/' + form.images + '.jpg')">
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
            <el-button type="primary" @click="newSave1">确 定</el-button>
          </div>
    </el-dialog>

    <el-dialog title="新增手工艺人" :visible.sync="dialogFormVisible2" style="height: 95vh; overflow: hidden" width="53%" center  >
        <el-form :model="form" style="overflow-y: auto; height: 50vh;width: 50vw;">
            <el-form-item label="手工艺人名称" :label-width="formLabelWidth" required>
              <el-col :span="12">
                <el-input v-model="form2.craftsmanName" ></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="密码" :label-width="formLabelWidth" required>
              <el-col :span="12">
                <el-input v-model="form2.password" type="password" show-password></el-input>
              </el-col>
            </el-form-item> 

            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="form2.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form2.birthDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="地址" :label-width="formLabelWidth" required>
              <el-col :span="15" required>
               <el-input v-model="form2.address" ></el-input>
              </el-col>
            </el-form-item>  

            <el-form-item label="电话号码" :label-width="formLabelWidth" required>
              <el-col :span="12" required>
               <el-input v-model="form2.phoneNumber" ></el-input>
              </el-col>
            </el-form-item>  

            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-col :span="12">
               <el-input v-model="form2.email" ></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="身份证号" :label-width="formLabelWidth" required >
              <el-col :span="12">
              <el-input v-model="form2.idnumber" placeholder="身份证号" type="password" required show-password></el-input>
            </el-col>
            </el-form-item>

            <el-form-item label="工作年限" :label-width="formLabelWidth">
            <el-col :span="8">
              <el-input v-model="form2.workExperience" placeholder="工作年限"></el-input>
            </el-col>
            </el-form-item>

            <el-form-item label="手工艺人类型" :label-width="formLabelWidth" required>
                <el-radio-group v-model="form2.craftsmanshipType">
                  <el-radio label="初级手工艺人">初级手工艺人</el-radio>
                  <el-radio label="中级手工艺人">中级手工艺人</el-radio>
                  <el-radio label="高级手工艺人">高级手工艺人</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="头像" :label-width="formLabelWidth">
              <div class="list-img" style="width: 50px; height: 50px;">
                
                <el-avatar 
                  v-if="form2.images"
                  size="large" 
                  fit="fir" 
                  shape="square" 
                  :src="require('@/assets/photo/craftmenimage/' + form2.images + '.jpg')">
                </el-avatar>
                <el-avatar 
                  v-else 
                  size="large" 
                  fit="fir" 
                  shape="square" 
                  :src="require('@/assets/photo/default.jpg')">
                </el-avatar>
              </div>
            </el-form-item> -->
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
    name: 'CraftmenMan',
    data() {
      return {
        itemKey: 0,
        shopId:JSON.parse(sessionStorage.getItem('CurUser')).shopId,
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
            craftsmanId:'',
            craftsmanName: '',
            password: '',
            gender: '',
            birthDate: '',
            address: '',
            phoneNumber: '',
            email: '',
            idnumber: '',
            workExperience: '',
            shopEvaluation:'',
            craftsmanshipType: '',
            images: '',
            certificateFilePath:'',
            shopId: '',
          },
          dialogFormVisible2: false,
          form2: {
            craftsmanName: '',
            password: '',
            gender: '',
            birthDate: '',
            address: '',
            phoneNumber: '',
            email: '',
            idnumber: '',
            workExperience: '',
            shopEvaluation:'',
            craftsmanshipType: '',
            images: '',
            certificateFilePath:'',
            shopId:this.shopId,
          },
          formLabelWidth: '120px',
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
      console.log("created",this.shopId);
      //this.loadCraftmenGetList();
      this.loadPostlistPageC1();
      this.loadAreasGetTree();
    },
    methods: {
      // loadCraftmenGetList() {
      //   this.$axios.get(this.$httpUrl+'/craftsmen/list').then(res => res.data).then(res =>{
      //     console.log("get",res);
      //   })
      // },
      //http://localhost:8098/areas/tree
      loadAreasGetTree() {
        this.$axios.get(this.$httpUrl+'/areas/tree').then(res => res.data).then(res =>{
          console.log("get",res);
          this.areasOptions = res;
        })
      },
      loadPostlistPageC1() {
        console.log("loadPostlistPageC1",this.shopId);
          this.$axios.post(this.$httpUrl+'/craftsmen/listPageC1',{
            "pageSize":this.pageSize,
            "pageNum":this.pageNum,
            "param":{
                "shopId":this.shopId,
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
          console.log("filterHandler",value, row, column);
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
        console.log(index, row,'row.craftsmanId',row.craftsmanId);
        this.$axios.get(this.$httpUrl+'/craftsmen/delete?craftsmanId='+row.craftsmanId,).then(res=>res.data).then(res=>{
          console.log(res);
          if(res.code=="200"){
            alert("删除成功");
            this.loadPostlistPageC1();
          }else{
            alert("状态码不为200！")
          }
        })
      },
      resetList() {
      this.employeeName = '';
      this.selectedOptions='';
      this. areasHolename= '';
      this.loadPostlistPageC1();
      this.itemKey=Math.random();
    },
    refreshList() {
      this.loadPostlistPageC1();
      this.itemKey=Math.random();
      alert("刷新成功");
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
      newSave1(){
          console.log('newSave',this.form);
          this.dialogFormVisible = false;
          this.$axios.post(this.$httpUrl + '/craftsmen/saveOrMod', this.form).then(res => {
          console.log(res);
          if (res.status == "200") {
            alert("修改成功");
            this.loadPostlistPageC1();
            this.itemKey=Math.random();

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
          this.itemKey=Math.random();

      },
      addRecord(){
          this.dialogFormVisible2 = true;
        },
        newSave2(){
      console.log('newSave2',this.form2);
        this.dialogFormVisible2 = false;
        const data={...this.form2,shopid:this.shopId,images: Math.floor(Math.random() * 14) + 1};
        this.$axios.post(this.$httpUrl + '/craftsmen/saveOrMod', data).then(res => {
        console.log(res);
        if (res.status == "200") {
          alert("新增成功");
          this.loadPostlistPageC1();
          this.itemKey=Math.random();
          // window.location.reload();
          this.form2={
            craftsmanName: '',
            password: '',
            gender: '',
            birthDate: '',
            address: '',
            phoneNumber: '',
            email: '',
            idnumber: '',
            workExperience: '',
            shopEvaluation:'',
            craftsmanshipType: '',
            images: '',
            certificateFilePath:''
          }
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
    },
  
    },
    
  }
  </script>
  
  <style  scoped>
  /deep/.el-table .el-table__cell{
    padding: 0px 0px;
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
  