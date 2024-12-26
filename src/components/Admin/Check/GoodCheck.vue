<template>
  <div style="height:100%">
      <div style="margin-bottom: 5px;margin-left: 5px; height: 5%">
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
    
          <!-- <el-button type="warning" @click="addRecord" style="margin-left: 5px;" size="small">新增</el-button> -->
        </div>
  
      <el-table ref="multipleTable" :data="productTable" style="width: 100vw" height=620 :key="itemKey"
        highlight-current-row 
        :row-key="getRowKeys"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}" 
        @current-change="handleCurrentChange"  @selection-change="handleSelectionChange">
      <!-- max-height="100vh" 控制最多显示 -->
        <el-table-column prop="checkbox" width="45" type="selection" reserve-selection align="center">
        </el-table-column>
        <el-table-column prop="productId" label="商品编码" width="100" fixed sortable="true" align="center" column-key >
        </el-table-column>
        <el-table-column prop="image" label="商品图片" width="100">
              <template slot-scope="scope">
                <div class="list-img">
                  <el-avatar size="large"  fit="fir" shape="square" :src="require('@/assets/photo/productimage/'+scope.row.image+'.jpg')"></el-avatar>
                </div>
              </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" width="200" fixed align="center">
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="80" align="center">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="80" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="categoryName" label="刺绣流派类别" width="120" align="center">
        </el-table-column>
        <el-table-column prop="ccategoryName" label="载体类别" width="220" align="center"></el-table-column>
        <el-table-column prop="tcategoryName" label="技法类别" width="220" align="center"></el-table-column>
        <el-table-column prop="fabricName" label="所用面料" width="120" align="center">
        </el-table-column>
        <el-table-column prop="isCustomizable" label="可否定制化" width="120">
        <template slot-scope="scope">
              <span v-if="scope.row.isCustomizable">可定制</span>
              <span v-else>不可定制</span>
            </template>align="center">
        </el-table-column>
        <el-table-column prop="isChecked" label="审核状态" width="220" align="center">
          <template slot-scope="scope">
              <el-tag
                :type="scope.row.isChecked === '未审核' ? 'primary' : (scope.row.isChecked === '已审核' ? 'success' : 'danger')"
                disable-transitions>{{scope.row.isChecked}}
              </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="state" label="上架状态" width="220" align="center">
          <template slot-scope="scope">
              <el-switch v-model="scope.row.state" :active-value="'已上架'" :inactive-value="'未上架'"></el-switch>
          </template>
          
         </el-table-column>
  
        <el-table-column prop="operation" label="操作" width="141" fixed="right" align="center">
          <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" type="success">审核</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
  <!-- 新增 -->
       <el-dialog title="审核商品" :visible.sync="dialogFormVisible2" style="height: 95vh; overflow: hidden" width="53%" center  >
          <el-form :model="form2" style="overflow-y: auto; height: 50vh;width: 50vw;">
            <el-form-item label="商品编码" :label-width="formLabelWidth" required>
                <el-col :span="12">
                  <el-input v-model="form2.productId" ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="商品名称" :label-width="formLabelWidth" required>
                <el-col :span="12">
                  <el-input v-model="form2.productName" ></el-input>
                </el-col>
              </el-form-item>
  
              <el-form-item label="单位" :label-width="formLabelWidth" required>
                <el-col :span="12">
                  <el-input v-model="form2.unit" ></el-input>
                </el-col>
              </el-form-item>
  
              <el-form-item label="单价" :label-width="formLabelWidth" required>
                <el-col :span="12">
                  <el-input v-model="form2.price" ></el-input>
                </el-col>
              </el-form-item>
  
              <el-form-item label="刺绣流派类别" :label-width="formLabelWidth">
                  <el-cascader clearable filterable placeholder="请选择/输入节点编码"
                  size="small"
                  v-model="form2.embroideryCategoryId"
                  :options="casOptions1"
                  :props="OptionProps1"
                  @change="handleCascaderChange11" 
                  style="margin-left: 5px;">
                  </el-cascader>
              </el-form-item> 
  
              <el-form-item label="刺绣载体类别" :label-width="formLabelWidth">
              <el-cascader clearable filterable placeholder="请选择/输入节点编码"
                  size="small"
                  v-model="form2.carrierCategoryId"
                  :options="casOptions3"
                  :props="OptionProps3"
                  @change="handleCascaderChange33" 
                  style="margin-left: 5px;">
                  </el-cascader>
              </el-form-item>  
  
              <el-form-item label="刺绣技法类别" :label-width="formLabelWidth" required>
              <el-cascader clearable filterable placeholder="请选择/输入节点编码"
                size="small"
                v-model="form2.techniqueCategoryId"
                :options="casOptions2"
                :props="OptionProps2"
                @change="handleCascaderChange22" 
                style="margin-left: 5px;">
              </el-cascader>
            </el-form-item>   
            
              <el-form-item label="所用面料" :label-width="formLabelWidth" required>
                  <el-select v-model="form2.fabricId" filterable placeholder="请选择所用面料" clearable size="small" style="margin-left: 5px; width: 150px;" >
                      <el-option
                      v-for="item in fabricIdOptions"
                      :key="item.fabricId"
                      :label="item.fabricName"
                      :value="item.fabricId">
                      </el-option>
                  </el-select>
              </el-form-item>
  
              <el-form-item label="可否定制化" :label-width="formLabelWidth" required>
                  <el-radio-group v-model="form2.isCustomizable">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
              </el-form-item>
  
              <el-form-item label="是否上架" :label-width="formLabelWidth" required>
                  <el-switch v-model="form2.state"  active-value="已上架"
                  inactive-value="未上架"></el-switch>
              </el-form-item>
              
              <el-form-item label="简介" :label-width="formLabelWidth">
                  <el-col :span="20">
                      <el-input v-model="form2.description" type="textarea" rows="3"></el-input>
                  </el-col>
              </el-form-item>

              <el-form-item label="审核状态" :label-width="formLabelWidth">
                <el-radio-group v-model="form2.isChecked">
                  <el-radio label="未审核" index="0">未审核</el-radio>
                  <el-radio label="已审核" index="1">已审核</el-radio>
                  <el-radio label="不通过" index="2">不通过</el-radio>
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
      name: 'GoodsMan',
      computed: {
          
      },
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
              pageSize: 5,
              total: 0,
  
              dialogFormVisible2: false,
             
              form2: {
                  productName: '',
                  unit: '',
                  price: '',
                  description: '',
                  embroideryCategoryId: '',
                  carrierCategoryId: '',
                  fabricId: '',
                  techniqueCategoryId: '',
                  isCustomizable:false,
                  image: '',
                  state: '',
                  isChecked: '',
              },
              formLabelWidth: '140px',
          }
      },
      created() {
          this.loadGetCategory1();
          this.loadGetCategory2();
          this.loadGetCategory3();
          this.loadGetCategory4();
          this.loadPostlistPageC1();
      },
      methods: {
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
          getRowKeys(row) {
              return row.productId;
          },
          loadPostlistPageC1() {
              this.$axios.post(this.$httpUrl + '/products/list1',{
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
          handleCurrentChange(val) {//选中一行
          console.log("handleCurrentChange",val);
          this.currentRow = val;
          },
          handleSelectionChange(val) {//选中多行
              console.log("handleSelectionChange",val);
              this.multipleSelection = val;
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
          handleEdit(index, row) {
          this.form2=row;
          this.dialogFormVisible2 = true;
          console.log(index, row);
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
  
          addRecord(){
            this.dialogFormVisible2 = true;
          },
          newSave2(){
        console.log('newSave2',this.form2);
          this.dialogFormVisible2 = false;
          const data={...this.form2};
          this.$axios.post(this.$httpUrl + '/products/mod', data).then(res => {
          console.log(res);
          if (res.status == "200") {
            alert("审核成功");
            this.loadPostlistPageC1();
            this.itemKey=Math.random();
            // window.location.reload();
            this.form2={
              productId: '',
              productName: '',
                unit: '',
                price: '',
                description: '',
                embroideryCategoryId: '',
                carrierCategoryId: '',
                fabricId: '',
                techniqueCategoryId: '',
                isCustomizable: '',
                image: '',
                state: '',
                isChecked: '',
              }
              } else {
              alert("审核失败");
              }
              })
              .catch((error) => {
              console.log('请求出错:', error);
              alert('审核失败');
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