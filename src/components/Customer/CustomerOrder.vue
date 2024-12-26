<template>
    <div class="order-list-container">
      <div v-if="ordertable.length === 0" class="empty-orders">
        <p>暂无订单记录</p>
      </div>
      <div v-else>
        <div v-for="(order) in ordertable" :key="order.customerOrderId" class="order-item">
            <div class="order-products">
            <p><strong>订单商品:</strong></p>
            <div class="product-item">
              <img  :src="require('@/assets/photo/productimage/'+ order.image+ '.jpg')" class="product-image" />
              <div class="product-details">
                <p>商品名称: {{ order.productName }}</p>
                <p>单价: ¥{{ order.perprice }}</p>
                <p>数量: {{ order.quantity }}</p>
              </div>
            </div>
          </div>
          <div class="order-header">
            <span class="order-id">订单ID: {{ order.customerOrderId }}</span>
            <span class="order-time">下单时间: {{ formatDate(order.orderAt) }}</span>
          </div>
          <div class="order-info">
            <div class="order-status">
              <p>支付状态: <strong>{{ order.paymentStatus || '待支付' }}</strong></p>
              <p>发货状态: <strong>{{ order.deliveryStatus || '待发货' }}</strong></p>
            </div>
            <div class="order-summary">
              <p>总金额: ¥{{ order.totalprice }}</p>
              <p>配送地址: {{ order.deliveryAddress }}</p>
            </div>
          </div>
          <div class="order-actions">
            <button @click="viewOrderDetails(order.customerOrderId)">查看订单详情</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomerOrder',
    data() {
      return {
        customer: '',
        ordertable: [],
      };
    },
    created() {
      var curUserStr = sessionStorage.getItem('CurUser');
      let rs = JSON.parse(curUserStr);
      this.customer = rs;
      this.loadPostlistPageC1();
    },
    methods: {
      loadPostlistPageC1() {
        console.log("customerOrder - Load order list", this.customer.customerId);
        this.$axios.post(this.$httpUrl + '/customer-orders/list1', {
          "param": {
            "customerId": this.customer.customerId,
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
      formatDate(dateStr) {
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      },
      viewOrderDetails(orderId) {
        // 跳转到订单详情页面
        console.log("customerOrder - View order details", orderId);
      }
    }
  }
  </script>
  
  <style scoped>
  .order-list-container {
    padding: 20px;
  }
  
  .empty-orders {
    text-align: center;
    font-size: 16px;
    color: #888;
  }
  
  .order-item {
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
  }
  
  .order-id {
    font-weight: bold;
  }
  
  .order-time {
    color: #666;
  }
  
  .order-info {
    margin-top: 10px;
  }
  
  .order-status p {
    margin: 5px 0;
  }
  
  .order-summary p {
    margin: 5px 0;
  }
  
  .order-actions {
    margin-top: 10px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #005bb5;
  }
  .order-products {
  margin-top: 20px;
}
.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.product-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 4px;
}

.product-details p {
  margin: 3px 0;
}
  </style>
  