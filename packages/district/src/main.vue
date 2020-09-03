<template>
  <div class="el-district">
    <el-select v-model="province" :clearable="clearable" placeholder="省份" @change="provinceChange">
      <el-option v-for="(item, index) in provinces" :key="index" :label="item" :value="item" />
    </el-select>
    <el-select
      v-model="city"
      :clearable="clearable"
      placeholder="城市"
      @change="cityChange"
      :style="{'margin-left': spacing + 'px'}"
    >
      <el-option v-for="(item, index) in cities" :key="index" :label="item" :value="item" />
    </el-select>
    <el-select
      v-model="area"
      :clearable="clearable"
      placeholder="区域"
      @change="areaChange"
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
      areas: [],
      province: '',
      city: '',
      area: ''
    };
  },
  created() {
    this.provinces = this.districts[100000];
  },
  methods: {
    provinceChange() {
      this.$emit('province-change', this.province);
      this.cities = this.province ? this.districts[this.getCode(this.province, 'province')] : [];
      this.city = '';
      this.cityChange();
    },
    cityChange() {
      this.$emit('city-change', this.city);
      this.areas = this.city ? this.districts[this.getCode(this.city, 'city')] : [];
      this.area = '';
      this.areaChange();
    },
    areaChange() {
      this.$emit('area-change', this.area);
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
