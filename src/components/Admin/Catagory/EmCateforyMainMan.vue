<!--  -->
<template>
  <div style="height: 100%;">
    <div style="margin-bottom: 5px;margin-left: 5px; height: 6%">
      <el-input type="text" autofocus="true" placeholder="请输流派类别名称" v-model="categoryName" class="input-with-select" style="width: 200px" suffix-icon="el-icon-search" clearable size="small" 
      @keyup.enter.native="loadCraftmenPostlistPageC1"></el-input>

      <el-button type="primary" @click="loadCraftmenPostlistPageC1" style="margin-left: 5px;" size="small">确定</el-button>
      <el-button type="warning" @click="resetList" style="margin-left: 5px;" size="small">重置</el-button>
      <el-button @click="clearFilter" size="small">清除所有过滤器</el-button>

      <!-- <el-button type="warning" @click="addRecord" style="margin-left: 5px;" size="small">新增</el-button> -->
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100vw;" height="524"
      :row-key="getRowKeys"
      border
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
        prop="SS"
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
        :filters="[{text:1, value:1}, {text:2, value:2}, {text:3, value:3}]"  :filter-method="filterHandler"
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
  </div>
</template>

<script>
export default {
  name: 'EmCateforyMainMan',
  data () {
    return {
       tableData: [],
       categoryName:'',
              dialogFormVisible: false,
        form: {
          categoryId: '',
          categoryName: '',
          note: '',
          parentnodeId: '',
          level: '',
          isparentflag: '',
          ancestors: '',
        },
        formLabelWidth: '120px',
    }
  },
  created() {
    this.loadPostlistPageC1();
  },
  methods: {
      filterHandler(value, row, column) {
        console.log("filterHandler",value, row, column);
        const property = column['property'];
        console.log("property",property,row[property],row[property] === value);
        return row[property] === value;
      },
    filterLevel(value, row) {
        console.log("filterLevel",value, row,row.level=== value);
        return row.level === value;
    },
    filteIsParentflag(value, row) {
        console.log("filteIsParentflag",value, row,row.isparentflag === value);
        return row.isparentflag === value;
    },
    clearFilter() {
        this.$refs.multipleTable.clearFilter();
    },
    getRowKeys(row) {
      return row.categoryId;
    },
    loadPostlistPageC1() {
        this.$axios.post(this.$httpUrl+'/embroidery-category/listPageC1',{categoryName:this.categoryName}).then(res => res.data).then(res =>{
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
    handleCurrentChange(val) {//选中一行
      console.log("handleCurrentChange",val);
      this.currentRow = val;
    },
    handleSelectionChange(val) {//选中多行
      console.log("handleSelectionChange",val);
        this.multipleSelection = val;
    },
    handleEdit(index, row) {
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
    },
  }
}
</script>

<style  scoped>
/deep/.el-table .el-table__cell{
  padding: 3px 0px;
}

</style>
