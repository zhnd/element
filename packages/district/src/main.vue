<template>
  <div class="el-district">
    <el-select v-model="value[0]" :clearable="clearable" placeholder="省份" @change="provinceChange">
      <el-option v-for="(item, index) in provinces" :key="index" :label="item" :value="item" />
    </el-select>
    <el-select
      v-model="value[1]"
      :clearable="clearable"
      placeholder="城市"
      @change="cityChange"
      :style="{'margin-left': spacing + 'px'}"
    >
      <el-option v-for="(item, index) in cities" :key="index" :label="item" :value="item" />
    </el-select>
    <el-select
      v-model="value[2]"
      :clearable="clearable"
      placeholder="区域"
      :style="{'margin-left': spacing + 'px'}"
    >
      <el-option v-for="(item, index) in areas" :key="index" :label="item" :value="item" />
    </el-select>
  </div>
</template>

<script>
import DISTRICTS from './districts';

export default {
  name: 'ElDistrict',
  props: {
    value: {
      type: Array,
      default: ['', '', '']
    },
    clearable: {
      type: Boolean,
      default: false
    },
    spacing: [String, Number]
  },
  data() {
    return {
      districts: DISTRICTS,
      provinces: [],
      cities: [],
      areas: []
    };
  },
  created() {
    this.provinces = this.districts[100000];
    this.cities = this.value[0] ? this.districts[this.getCode(this.value[0], 'province')] : [];
    this.areas = this.value[1] ? this.districts[this.getCode(this.value[1], 'city')] : [];
  },
  methods: {
    provinceChange() {
      this.cities = this.value[0] ? this.districts[this.getCode(this.value[0], 'province')] : [];
      this.value[1] = '';
      this.cityChange();
    },
    cityChange() {
      this.areas = this.value[1] ? this.districts[this.getCode(this.value[1], 'city')] : [];
      this.value[2] = '';
    },
    getCode(value, type) {
      for (let x in this.districts) {
        for (let y in this.districts[x]) {
          if (value === this.districts[x][y]) {
            if (type === 'city' && y.slice(2) === '0000') {
              continue;
            }
            return y;
          }
        }
      }
    }
  }
};
</script>
