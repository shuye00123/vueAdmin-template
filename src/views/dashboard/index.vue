<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :xs="14" :sm="14" :md="14" :lg="8">
        <el-card class="box-card">
          <div class="text item">{{name}}</div>
          <div class="text item">余额:{{balance / 100}}元</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'balance'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    // width: 480px;
  }
</style>
