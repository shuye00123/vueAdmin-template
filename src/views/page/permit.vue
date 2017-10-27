<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="22" :sm="22" :md="22" :lg="12" :push="1">
        <el-card class="box-card">
        <el-form :model="form" :rules="permitRules" ref="form" label-width="80px">
      <el-form-item label="车牌号码" prop="platenum">
        <el-input name="platenum" v-model="form.platenum"></el-input>
      </el-form-item>
      <el-form-item label="放行规则" prop="merRuleid">
        <el-select v-model="form.merRuleid" value-key="id" placeholder="选择放行规则">
          <el-option name="merRuleid" v-for="rule in ruleList" :key="rule.id" :value="rule.id" :label="rule.rule"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="放行原因" prop="reasonid">
        <el-select v-model="form.reasonid" value-key="id" placeholder="选择放行原因">
          <el-option name="reasonid" v-for="reason in reasonList" :key="reason.id" :value="reason.id" :label="reason.reason"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">放行</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isValidPlate } from "@/utils/validate";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["ruleList", "reasonList"])
  },
  data() {
    const validatePlate = (rule, value, callback) => {
      if (!isValidPlate(value)) {
        callback(new Error("请输入正确的车牌号"));
      } else {
        callback();
      }
    };
    const validateRuleid = (rule, value, callback) => {
      if (value == null) {
        callback(new Error("请选择放行规则"));
      } else {
        callback();
      }
    };
    const validateReasonid = (rule, value, callback) => {
      if (value == null) {
        callback(new Error("请选择放行原因"));
      } else {
        callback();
      }
    };
    return {
      form: {
        platenum: "",
        merRuleid: null,
        reasonid: null,
        remark: ""
      },
      permitRules: {
        platenum: [
          { required: true, trigger: "blur", validator: validatePlate }
        ],
        merRuleid: [
          { required: true, trigger: "blur", validator: validateRuleid }
        ],
        reasonid: [
          { required: true, trigger: "blur", validator: validateReasonid }
        ]
      }
    };
  },
  created() {
    this.form.merRuleid = this.ruleList[0].id
    this.form.reasonid = this.reasonList[0].id
  },
  methods: {
    onSubmit() {
      console.log(this.ruleList)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("AddPermit", this.form)
            .then(response => {})
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
