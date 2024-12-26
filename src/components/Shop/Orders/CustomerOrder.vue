<template>
    <div>
        <el-table ref="multipleTable" :data="ordertable" style="width: 100vw" height=620 :key="itemKey"
      highlight-current-row 
      :row-key="getRowKeys"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}" 
      @current-change="handleCurrentChange"  @selection-change="handleSelectionChange">
    <!-- max-height="100vh" 控制最多显示 -->
      <el-table-column prop="checkbox" width="45" type="selection" reserve-selection align="center">
      </el-table-column>
      <el-table-column prop="customerOrderId" label="订单编号" width="100" fixed sortable="true" align="center" column-key>
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
      <!-- <el-table-column prop="unit" label="单位" width="80" align="center">
      </el-table-column> -->
      <el-table-column prop="unitprice" label="单价" width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" width="80" show-overflow-tooltip>
    </el-table-column>
      <el-table-column prop="totalprice" label="总价" width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="orderAt" label="下单时间" width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="paymentStatus" label="支付状态" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="deliveryStatus" label="发货状态" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="updateAt" label="更新时间" width="160" show-overflow-tooltip></el-table-column>

      <el-table-column prop="operation" label="操作" width="141" fixed="right" align="center">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" type="success">查看</el-button>
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" type="success">编辑</el-button>
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
    </div>
</template>
<script>
export default {
    name: 'CustomerOrder',
   data() {
      return {
        user: {},
        ordertable: [],
        
        itemKey: 0,
            multipleSelection: [],
            pageNum: 1,
            pageSize: 5,
            total: 0,
      }
   },
   created(){
    var curUserStr = sessionStorage.getItem('CurUser');
      let rs = JSON.parse(curUserStr);
      this.user = rs;
      this.loadPostlistPageC1();
   },
   computed:{
   },
   methods:{
    loadPostlistPageC1() {
        console.log("customerOrder - Load order list", this.user.shopId);
        this.$axios.post(this.$httpUrl + '/customer-orders/list2', {
          "param": {
            "shopId": this.user.shopId,
          },
        })
          .then(res => res.data)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.ordertable = res.data;
            } else {
              alert('获取订单数据失败');
            }
          })
          .catch(error => {
            console.error(error);
            alert('请求失败，请重试');
          });
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
   },
}
</script>
<style scoped>

</style>
