<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="4" :push="1">
        <el-card class="box-card">
          <el-form ref="form" :model="form">
            <el-form-item label="充值金额（元）" prop="merRuleid">
              <el-select v-model="form.price" filterable="" allow-create placeholder="请选择充值金额">
                <el-option v-for="item in prices" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">充值</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="微信扫码支付" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <img :src=imgurl></img>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validateNumber } from '@/utils/validate'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'source',
    ])
  },
  data() {
    const validate = (rule, value, callback) => {
    if (!validateNumber(value)) {
        callback(new Error('请输入正确的金额'))
      } else {
        callback()
      }
    }
    return {
      imgurl: '123',
      dialogVisible: false,
      prices: [100,200,500,1000],
      form: {
        price:100
      },
      rechargeRules: {
        price: [{ required: true, trigger: 'blur', validator: validate }]
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('AddRecharge', this.form.price).then(() => {
            this.$store.dispatch('PrePay', this.source).then((response) => {
              if(this.source === 2) {
                this.imgurl = 'http://qr.topscan.com/api.php?text=' + response.data
                this.dialogVisible = true
              }else{
                this.pay(response.data)
              }
            }).catch(() => {})
          }).catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    pay(data) {
      if(typeof(WeixinJSBridge) == "undefined") {
				if(document.addEventListener) {
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if(document.attachEvent) {
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
				console.log("初始化失败");
			} else {
				onBridgeReady(data);
				console.log("初始化成功");
			}

			function onBridgeReady(data) {
				var dt = data;
				var appId = dt.appId;
				var timeStamp = dt.timeStamp;
				var nonceStr = dt.nonceStr;
				var datapackage = dt.datapackage;
				var signType = dt.signType;
				var paySign = dt.paySign;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": appId,
						"timeStamp": timeStamp,
						"nonceStr": nonceStr,
						"package": datapackage,
						"signType": signType,
						"paySign": paySign
					},
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request:ok") {
              alert('充值成功');
							//gotoSuccessPage();
							//wx.closeWindow();
						} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
							console.log("用户取消支付!");
						} else {
							console.log("支付失败!");
						}
					}
				);
			}
    }
  }
}
</script>
<style>
  .el-dialog{
    text-align: center
  }
</style>