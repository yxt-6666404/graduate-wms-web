    <template>
        <div class="shopping-cart">
        <!-- 购物车标题 -->
       
        <div v-if="ispay == false">
            <h1>购物车</h1>
            <!-- 显示购物车商品列表 -->
            <div v-if="productTable.length > 0">
                <div v-for="(product, index) in productTable" :key="product.productId" class="cart-item">
                    <div class="product-info">
                        <input type="checkbox" v-model="product.selected" @change="checkboxclick(index)" />
                        <img :src="require('@/assets/photo/productimage/' + product.image + '.jpg')" alt="Product Image" class="product-image" />
                        <div class="product-details">
                            <p class="product-name">{{ product.productName }}</p>
                            <p class="product-price">单价：¥{{ product.perprice }}</p>
                        </div>
                    </div>
            
                    <!-- 商品数量和删除操作 -->
                    <div class="quantity-actions">
                        <button @click="changeQuantity(index, -1)" :disabled="product.quantity <= 1">-</button>
                        <input type="number" v-model="product.quantity" readonly class="product-quantity" />
                        <button @click="changeQuantity(index, 1)">+</button>
                        <span style="padding-left: 50px;">总计：¥{{ product.totalprice }}</span>
                    </div>
                    <button @click="removeProduct(index)" class="remove-btn">删除</button>
                </div>
            </div>

            <!-- 购物车为空时的提示 -->
            <div v-else>
                <p>您的购物车是空的。</p>
            </div>

            <!-- 购物车总价 -->
            <div class="cart-summary">
                <p>总金额：¥{{ totalAmount }}</p>
                <button @click="checkout" class="checkout-btn">结算</button>
            </div>
        </div>

        <div v-else>
            <p>您的订单已成功提交，请尽快结算。</p>
            <img src="@/assets/photo/erweima.png" width="400px" height="400px" alt="二维码" @click="erweimaClick"/>
            <img src="@/assets/photo/vxsaoyisao.png" width="400px" height="400px" alt="二维码" />

        </div>

        </div>
    </template>
    
    <script>
    export default {
        name: 'gouWuChe',
        data() {
        return {
            customer:'',
            productTable: [],
            totalAmount: 0, // 总金额
            ispay: false,
            cur_product:{},
        };
        },
        created() {
    
        },
        beforeMount() {
            var curUserStr = sessionStorage.getItem('CurUser');
            let rs = JSON.parse(curUserStr);
            this.customer = rs;
            console.log("gowuche",this.customer);
            this.loadPostlistPageC1();

        },
        methods: {
        // 获取购物车商品列表
        loadPostlistPageC1() {
            console.log("customerId",this.customer, this.customer.customerId);
            this.$axios
            .post(this.$httpUrl + '/shopping-cart/list1', {
                "param": {
                "customerId": this.customer.customerId,
                },
            })
            .then(res => res.data).then(res => {
                console.log("购物车商品列表",res,res.data);
                if (res.code === 200) {
                this.productTable = res.data;
                console.log("购物车商品列表productTable",this.productTable);
                this.calculateTotalAmount(); // 获取商品后计算总金额
                } else {
                alert('获取购物车商品数据失败');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('请求失败，请重试');
            });
        },
            
        // 删除商品
        removeProduct(index) {
            const cartId = this.productTable[index].cartId;

            console.log(index, this.productTable[index]);
            this.$axios.get(this.$httpUrl+'/shopping-cart/delete?cartId='+cartId).then(res=>res.data).then(res=>{
                if (res.code === 200) {
                this.productTable.splice(index, 1); // 从数组中删除该商品
                this.calculateTotalAmount(); // 更新总金额
                this.loadPostlistPageC1();
                } else {
                alert('删除商品失败');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('请求失败，请重试');
            });
            this.calculateTotalAmount(); // 更新总金额

        },
    
        // 更新商品数量
        changeQuantity(index, delta) {
            const product = this.productTable[index];
            console.log('333',product);
            if (product.quantity + delta > 0) {
                console.log('111',product.quantity, delta);
            product.quantity += delta;
            console.log('222',product.quantity, delta);
            this.$axios.post(this.$httpUrl+'/shopping-cart/mod',{
                    "cartId":product.cartId,
                    "quantity":product.quantity
                }).then(res => res.data).then(res => {
                    console.log(res);
                    if (res.code == "200") {
                    console.log("修改成功");
                    this.loadPostlistPageC1();
                    } else {
                    alert("修改失败");
                    }
                    })
            .catch((error) => {
            console.log('请求出错:', error);
            alert('添加失败');
            if (error.response && error.response.status === 400) {
                // 这里可以根据具体的400错误情况进行更详细的处理
                console.log('400错误:', error.response.data);
            }
            });
            // this.calculateTotalAmount(); // 每次修改数量后重新计算总金额
            }
        },
    
        // 计算购物车总金额
        calculateTotalAmount() {
    this.productTable.forEach((product) => {
        if(product.selected){
            console.log("product", product);

            this.totalAmount = this.totalAmount + product.totalprice;
            console.log("totalAmount", this.totalAmount);
                }
            
            });
        },
        checkboxclick(index) {
        const product = this.productTable[index];
        this.cur_product=product;
        console.log("updateTotalAmount-product1", this.cur_product);
        console.log("updateTotalAmount-product2", product.selected);
        this.$axios.post(this.$httpUrl+'/shopping-cart/mod',{
                        "cartId":product.cartId,
                        "selected":product.selected
                    }).then(res => res.data).then(res => {
                        console.log(res);
                        if (res.code == "200") {
                        console.log("成功");
                        console.log("updateTotalAmount-product3", product.selected);
                        if(product.selected){
                                this.totalAmount = this.totalAmount + product.totalprice;
                            }else{
                                this.totalAmount = this.totalAmount - product.totalprice;
                            }
                        // this.loadPostlistPageC1();
                        } else {
                        alert("失败");
                        }
                        })
                .catch((error) => {
                console.log('请求出错:', error);
                alert('添加失败');
                if (error.response && error.response.status === 400) {
                    // 这里可以根据具体的400错误情况进行更详细的处理
                    console.log('400错误:', error.response.data);
                }
                });
        
        
        },
        // 结算
        checkout() {
            if (this.productTable.length === 0) {
            alert('购物车为空，无法结算');
            return;
            }
            else {
                const selectedProducts = this.productTable.filter(product => product.selected);
                if (selectedProducts.length === 0) {
                    alert('请选择要结算的商品');
                    return;
                }
                else{
                    this.ispay=true;
        console.log("updateTotalAmount-product2", this.cur_product);
        this.$axios.post(this.$httpUrl+'/shopping-cart/mod',{
                        "cartId":this.cur_product.cartId,
                        "isOrdered":"结算中"
                    }).then(res => res.data).then(res => {
                        console.log(res);
                        if (res.code == "200") {
                        console.log("成功");
                       
                        // this.loadPostlistPageC1();
                        } else {
                        alert("失败");
                        }
                        })
                .catch((error) => {
                console.log('请求出错:', error);
                alert('添加失败');
                if (error.response && error.response.status === 400) {
                    // 这里可以根据具体的400错误情况进行更详细的处理
                    console.log('400错误:', error.response.data);
                }
                });
                }
            }
    
            // this.$router.push({ name: 'checkout', query: { customerId: this.customerId } });
        },
        erweimaClick() {
            this.ispay=false;
        console.log("updateTotalAmount-product2", this.cur_product,this.customer);
        this.$axios.post(this.$httpUrl+'/shopping-cart/mod',{
                        "cartId":this.cur_product.cartId,
                        "isOrdered":"已结算"
                    }).then(res => res.data).then(res => {
                        console.log(res);
                        if (res.code == "200") {
                        alert("支付成功");
                         //订单增加
                         console.log("updateTotalAmount-product2", this.cur_product.referenid,this.customer);
                         this.$axios.post(this.$httpUrl+'/customer-orders/save',{
                            "customerId":this.customer.customerId,
                            "referenid":this.cur_product.referenid,
                            "orderAt":new Date(),
                            "totalprice":this.cur_product.totalprice,
                            "paymentStatus":"已支付",
                            "updatedAt":new Date(),
                            "deliveryAddress":this.customer.address,
                            "isCustomized":0,
                            "productId":this.cur_product.productId,
                            "quantity":this.cur_product.quantity,
                            "unitprice":this.cur_product.perprice
                             
                         }).then(res => res.data).then(res => {
                            console.log(res);
                            if (res.code == "200"){
                                alert("订单已生产");
                            }else {
                                alert("失败");
                            }
                         })
                        this.loadPostlistPageC1();
                        } else {
                        alert("支付失败");
                        }
                        })
                .catch((error) => {
                console.log('请求出错:', error);
                alert('添加失败');
                if (error.response && error.response.status === 400) {
                    // 这里可以根据具体的400错误情况进行更详细的处理
                    console.log('400错误:', error.response.data);
                }
                });
        }
    },
    };
    </script>
    
    <style scoped>
    .shopping-cart {
        padding: 20px;
        background-color: #f9f9f9;
    
        h1 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        }
    
        .cart-item {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: #fff;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    
        .product-info {
            display: flex;
            .product-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            margin-right: 10px;
            }
            .product-details {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .product-name {
                font-size: 16px;
            }
            .product-price {
                color: #f56c6c;
                font-size: 14px;
            }
            }
        }
    
        .quantity-actions {
            display: flex;
            align-items: center;
            button {
            padding: 5px 10px;
            font-size: 16px;
            cursor: pointer;
            }
            .product-quantity {
            width: 40px;
            text-align: center;
            font-size: 16px;
            }
        }
    
        .remove-btn {
            background-color: #f56c6c;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
        }
        }
    
        .cart-summary {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        font-size: 18px;
    
        .checkout-btn {
            background-color: #409eff;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
        }
        }
    }
    </style>
    