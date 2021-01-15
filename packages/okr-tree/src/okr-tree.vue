<template>
  <div class="org-chart-container">
    <div
      ref="orgChartRoot"
      class="org-chart-node-children"
      :class="{
        vertical: direction === 'vertical',
        horizontal: direction === 'horizontal',
        'show-collapsable': showCollapsable,
        'one-branch': data.length === 1
      }"
    >
      <OkrTreeNode
        v-for="child in root.childNodes"
        :node="child"
        :root="root"
        orkstyle
        :show-collapsable="showCollapsable"
        :label-width="labelWidth"
        :label-height="labelHeight"
        :renderContent="renderContent"
        :selected-key="selectedKey"
        :default-expand-all="defaultExpandAll"
        :node-key="nodeKey"
        :key="getNodeKey(child)"
        :props="props"
      ></OkrTreeNode>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import OkrTreeNode from './okr-tree-node';
import TreeStore from './model/tree-store';
import { getNodeKey } from './model/util';
export default {
  name: 'OkrTree',
  components: {
    OkrTreeNode
  },
  provide() {
    return {
      okrEventBus: this.okrEventBus
    };
  },
  props: {
    data: {
      // 源数据
      required: true
    },
    leftData: {
      // 源数据
      type: Array
    },
    // 方向
    direction: {
      type: String,
      default: 'vertical'
    },
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 飞书 OKR 模式
    onlyBothTree: {
      type: Boolean,
      default: false
    },
    orkstyle: {
      type: Boolean,
      default: false
    },
    // 树节点的内容区的渲染 Function
    renderContent: Function,
    // 树节点区域的宽度
    labelWidth: [String, Number],
    // 树节点区域的高度
    labelHeight: [String, Number],
    // 树节点的样式
    labelClassName: [Function, String],
    // 当前选中节点样式
    currentLableClassName: [Function, String],
    // 用来控制选择节点的字段名
    selectedKey: String,
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 当前选中的节点
    currentNodeKey: [String, Number],
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: String,
    defaultExpandedKeys: {
      type: Array
    },
    filterNodeMethod: Function,
    props: {
      default() {
        return {
          leftChildren: 'leftChildren',
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        };
      }
    },
    // 动画
    animate: {
      type: Boolean,
      default: false
    },
    animateName: {
      type: String,
      default: 'okr-zoom-in-center'
    },
    animateDuration: {
      type: Number,
      default: 200
    }
  },
  computed: {
    ondeClass() {
      return {
        findNode: null
      };
    }
  },
  data() {
    return {
      okrEventBus: new Vue(),
      store: null,
      root: null
    };
  },
  created() {
    this.isTree = true;
    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      leftData: this.leftData,
      props: this.props,
      defaultExpandedKeys: this.defaultExpandedKeys,
      showCollapsable: this.showCollapsable,
      currentNodeKey: this.currentNodeKey,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod,
      labelClassName: this.labelClassName,
      currentLableClassName: this.currentLableClassName,
      onlyBothTree: this.onlyBothTree,
      direction: this.direction,
      animate: this.animate,
      animateName: this.animateName
    });
    this.root = this.store.root;
  },
  watch: {
    data(newVal) {
      this.store.setData(newVal);
    },
    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    }
  },
  methods: {
    filter(value) {
      if (!this.filterNodeMethod) {
        throw new Error('[Tree] filterNodeMethod is required when filter');
      }
      this.store.filter(value);
      if (this.onlyBothTree) {
        this.store.filter(value, 'leftChildNodes');
      }
    },
    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data);
    },
    // 通过 node 设置某个节点的当前选中状态
    setCurrentNode(node) {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in setCurrentNode');
      }
      this.store.setUserCurrentNode(node);
    },
    // 根据 data 或者 key 拿到 Tree 组件中的 node
    getNode(data) {
      return this.store.getNode(data);
    },
    // 通过 key 设置某个节点的当前选中状态
    setCurrentKey(key) {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in setCurrentKey');
      }
      this.store.setCurrentNodeKey(key);
    },
    remove(data) {
      this.store.remove(data);
    },
    // 获取当前被选中节点的 data
    getCurrentNode() {
      const currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey() {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in getCurrentKey');
      }
      const currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    updateKeyChildren(key, data) {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in updateKeyChild');
      }
      this.store.updateChildren(key, data);
    }
  }
};
</script>
