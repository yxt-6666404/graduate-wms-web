<template>
    <div>
        <el-container>
            <el-header style="background-color: #F2F6FC;margin-bottom: 10px; height:160px">
            <el-row :gutter="10">
                <el-col :span="3">
                <div style="margin-top: 20px;">
                    <el-image
                        style="width: 150px; height: 120px"
                        :src="require('@/assets/photo/productimage/'+ shopTable[0].images+ '.jpg')"
                        fit="fit">
                    </el-image>
                </div>
                </el-col>
                <el-col :span="7">
                <div style="padding:20px">
                    <h4>{{shopTable[0].shopName}}</h4>
                    <span style="margin-top: 30px">地址：{{shopTable[0].address}}</span>
                </div>
                </el-col>
                <el-col :span="18">
                <div style="padding:10px">
                    <p>商家简介:     {{shopTable[0].shopDescription}}</p>
                    <div style="position: absolute;bottom: 40px;right: 70px">
                    <el-button round>进入店铺</el-button>
                    </div>
                </div>
                </el-col>
            </el-row>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width=170px style="background-color:beige;margin-right:10px;height: 100%;">
                <div style="padding: 30px; display: flex;flex-direction: column;">
                    <h4 style="margin-bottom: 10px">店铺其他商品</h4>
                        <div v-for="(o) in ReferenProductTable" :key="o" style="background-color: aliceblue;margin-top: 10px;display: flex;flex-direction: column;width: 130px;height: 115px;">
                        
                            <img :src="require('@/assets/photo/productimage/'+ o.image+'.jpg')" class="image" width="100px" height="70px">
                            <div style="padding: 5px;">
                                <div style="display: flex;flex-direction: row;"><span style="border: 1px solid red;color: red;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 12px;">{{ o.categoryName }}</span>   
                                    <span class="name-ellipsis">{{ o.productName }}</span>
                                </div>
                                
                                <div class="bottom clearfix">
                                    <span style="font-size: 12px;">￥{{ o.price }}</span>
                                    <el-button type="text" class="button" @click="()=>handleRouteChange(o)">查看详情</el-button>
                                </div>
                            </div>
                    </div>
                    
                </div>
            </el-aside>

            <el-main style="background-color: #F2F6FC;">
                <el-row>
                    <h2>商品信息</h2>
                  <el-col :span="10">
                    <div style="margin-top: 20px;">
                        <el-image
                            style="width: 400px; height: 400px"
                            :src="require('@/assets/photo/productimage/'+ productTable[0].image+'.jpg')"
                            fit="fit">
                        </el-image>
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <div style="padding: 20px;">
                        <h3>{{productTable[0].productName}} {{ productTable[0].description }}</h3>
                        <div  style="margin-top: 30px">
                            <span>价格：￥{{productTable[0].price}}</span>
                            <span>/{{productTable[0].unit}}</span>
                        </div>
                        <div  style="margin-top: 30px">
                            <span>配送：{{shopTable[0].address}}</span>
                            <span> 送至 {{user.address}}</span>
                        </div>
                        <div  style="margin-top: 30px">
                            <span>类别：{{productTable[0].categoryName}}</span>
                            <span>/{{productTable[0].tcategoryName}}</span>
                        </div>
                        <div  style="margin-top: 30px">
                            <span>类型：{{productTable[0].ccategoryName}}</span>
                            <span>/{{productTable[0].fabricName}}</span>
                        </div>
                    </div>
                    <div style="margin-top:30px">
                            <h3>款式</h3>
                            <div v-if="productTable[0].size == '标准规格'">
                                <span>标准准规格</span>
                            </div>
                            <div v-else>
                                <el-radio-group v-model="productTable[0].size">
                                    <el-radio-button label="小" >小号</el-radio-button>
                                    <el-radio-button label="中" >中号</el-radio-button>
                                    <el-radio-button label="大" >大号</el-radio-button>
                                </el-radio-group>
                            </div>
                    </div>
                    <div style="margin-top: 20px; display: flex; flex-direction: row;">
                        <span>颜色：</span>
                        <div v-for="colorCombination in colorNames" :key="colorCombination.colorCode" style="margin-left: 10px; background-color: aliceblue; border-radius: 5px;">
                            <button style="padding: 5px; " >
                                {{ colorCombination.colorName || "未知颜色" }}
                            </button>
                        </div>
                    </div>

                    <div style="margin-top:30px">
                    <h3>数量</h3>
                    <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
                    </div>
                    <el-button type="warning" plain style="padding-top: 10px;margin-top: 10px;" @click="gotogouwuche">加入购物车</el-button>
                    <el-button type="danger" plain style="padding-top: 10px;margin-top: 10px;">立即购买</el-button>
                  </el-col>
                </el-row>

                <el-container>
            <el-footer>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="参数信息" name=1>
                        <div> 
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>产品编码：{{productTable[0].productId}}</span>
                                </div>
                            </span>   
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>产品名称:{{productTable[0].productName}}</span>
                                </div>
                            </span>  
                        </div>
                        <div> 
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>品牌：{{productTable[0].brandName}}</span>
                                </div>
                            </span>   
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>尺码：{{productTable[0].size}}</span>
                                </div>
                            </span>  
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>颜色：</span>
                                    <span v-for="colorCombination in colorNames" :key="colorCombination.colorCode" style="margin-left: 10px; background-color: aliceblue; border-radius: 5px;">{{ colorCombination.colorName || "未知颜色" }}</span>
                                </div>
                            </span> 
                        </div>
                        <div> 
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>流派类别：{{productTable[0].categoryName}}</span>
                                </div>
                            </span>   
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>技法类别：{{productTable[0].ttcategoryName}}</span>
                                </div>
                            </span>  
                        </div>
                        <div> 
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>载体类别：{{productTable[0].categoryName}}</span>
                                </div>
                            </span>   
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>所用面料：{{productTable[0].ttcategoryName}}</span>
                                </div>
                            </span>  
                        </div>
                        <div> 
                            <span>
                                <div style="margin-top: 20px;">
                                    <span>发货地址：{{shopTable[0].address}}</span>
                                </div>
                            </span>   
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="图片详情" name=2>

                        <el-image
                            style="width: 1100px; height: 1000px"
                            :src="require('@/assets/photo/productimage/'+ productTable[0].image+'.jpg')"
                            fit="fit">
                        </el-image>
                    </el-tab-pane>
                </el-tabs>
        </el-footer>
        </el-container>
            </el-main>
        
        </el-container>
    </div>
</template>
<script>
export default {
    name: 'ProductDetail',
   data() {
      return {
        productId:'',
        referenId:'',
        user:'',
        productTable:[],
        shopTable:[],
        ReferenProductTable:[],
        activeName:1,
        num:1,
        color:'',
        colorNames: [],
        size:'',
      }
   },
   created(){
    const productId = this.$route.query.productId;
    const referenId = this.$route.query.referenId;
    this.productId = productId;
    this.referenId = referenId;
    console.log("productId111111",this.productId,this.referenId);
   },
   beforeMount(){
    var user = sessionStorage.getItem('CurUser');
    let rs = JSON.parse(user);
    this.user = rs;
    console.log("user-prodetail",this.user);
    this.loadPostlistPageC1();
    this.loadPostlistPageC2();
    this.loadReferenProduct();
   },
   computed:{
   },
   methods:{
    loadPostlistPageC1() {
        console.log("loadPostlistPageC1", this.productId);
                this.$axios.post(this.$httpUrl + '/products/list3',{
                    
                    "param": {
                        "productId": this.productId,
                    }
                }).then(res => res.data).then(res => {
                    console.log("post", res, res.data);
                    if (res.code == 200) {
                        this.productTable = res.data;
                        console.log("productTable", this.productTable);
                        this.colorName(this.productTable[0].color);
                    } else {
                        alert('获取数据失败1');
                    }
                })
                console.log("productTable", this.productTable);
    },
    loadPostlistPageC2() {
        console.log("loadPostlistPageC2", this.referenId);
        let referenId = this.referenId;
        let firstTwoLetters = referenId.slice(0, 2);
        console.log(firstTwoLetters);

        if(firstTwoLetters=='SH'){
        this.$axios.post(this.$httpUrl+'/shops/list3',{
            "param":{
                "shopId":this.referenId
            }
            }).then(res => res.data).then(res =>{
            console.log("post",res,res.data);
            if(res.code==200){
                this.shopTable = res.data;
                console.log("shopTable",this.shopTable);
            }
            else{
                alert('获取数据失败2');
            }
            
            })
        console.log("shopTable",this.shopTable);
    }
    },
    loadReferenProduct(){
        console.log("loadPostlistPageC2", this.referenId);
        let referenId = this.referenId;
        let firstTwoLetters = referenId.slice(0, 2);
        console.log(firstTwoLetters);

        if(firstTwoLetters=='SH'){
            this.$axios.post(this.$httpUrl+'/products/list4',{
            "param":{
                "referenId":this.referenId
            }
            }).then(res => res.data).then(res =>{
            console.log("post",res,res.data);
            if(res.code==200){
                this.ReferenProductTable = res.data;
                console.log("ReferenProductTable",this.ReferenProductTable);
            }
            else{
                alert('获取数据失败3');
            }
            
            })
        console.log("ReferenProductTable",this.ReferenProductTable);
        }
    },
    colorName(color){
        const colorALLName={
                        "#35C1F1": "天空蓝",
                        "#C9850F": "橙色",
                        "#A27FE1": "薰衣草紫",
                        "#4DC597": "薄荷绿",
                        "#05E33E": "青草绿",
                        "#FF9900": "亮橙色",
                        "#85C7D5": "淡蓝色",
                        "#F8591D": "火焰红"
                    }
        const colorlist=color.split(';');       
        colorlist.forEach(colorCode => {
      // 检查颜色代码是否在 colorALLName 中
      if (colorALLName[colorCode]) {
        // 如果匹配，将颜色名称加入 colorNames
        this.colorNames.push({"colorCode":colorCode,"colorName":colorALLName[colorCode]});
      }
    });   
        
    },
    handleRouteChange(o){
                console.log(o,'00')
                this.$router.push({
                    path:'/ProductDetail',
                    query:{
                        productId:o.productId,
                        referenId:o.referenid
                    }
                })
                },
    gotogouwuche(){
        console.log("gotogouwuche",this.referenId,this.productId,this.user.customerId,this.productTable[0].price,this.productTable[0].image,this.num);
        this.$axios.post(this.$httpUrl+'/shopping-cart/save',{
                "customerId":this.user.customerId,
                "productId":this.productId,
                "perprice":this.productTable[0].price,
                "quantity":this.num,
                "isOrdered":"未结算",
                "selected":0,
                "referenid":this.referenId,
                "addedAt":new Date(),
                "updatedAt":new Date(),
                "image":this.productTable[0].image
            }).then(res => res.data).then(res => {
        console.log(res);
        if (res.code == "200") {
          alert("添加成功");
        //   this.$router.replace({path:'/gouwuche',  query:{
        //                 productId:this.productId,
        //                 referenId:this.referenId,
        //                 courierCompanyId:this.shopTable[0].courierCompanyId,
        //             }})
        } else {
          alert("添加失败");
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
    
    
    
   },
}
</script>
<style scoped>
    .time {
    font-size: 13px;
    color: #999;
    }

    .bottom {
    margin-top: 5px;
    line-height: 12px;
    }

    .button {
        font-size: 12px;
    padding: 0;
    float: right;
    }

    .image {
    width: 100%;
    display: block;
    }

    .clearfix:before,
    .clearfix:after {
    display: table;
    content: "";
    }

    .clearfix:after {
    clear: both
    }
    .fixed-pagination {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    z-index: 30;
    }
    .name-ellipsis {
        font-size: 12px;
        margin-left: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            }
</style>

