<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="充值金额" prop="merRuleid">
        <el-select v-model="form.price" filterable="" allow-create placeholder="请选择充值金额">
          <el-option v-for="item in prices" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        元
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prices: [100,200,500,1000],
      form: {
        price:null
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    }
  }
}
</script>
