module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/okr-tree/src/okr-tree.vue?vue&type=template&id=e405adf4&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "org-chart-container" }, [
    _c(
      "div",
      {
        ref: "orgChartRoot",
        staticClass: "org-chart-node-children",
        class: {
          vertical: _vm.direction === "vertical",
          horizontal: _vm.direction === "horizontal",
          "show-collapsable": _vm.showCollapsable,
          "one-branch": _vm.data.length === 1
        }
      },
      _vm._l(_vm.root.childNodes, function(child) {
        return _c("OkrTreeNode", {
          key: _vm.getNodeKey(child),
          attrs: {
            node: child,
            root: _vm.root,
            orkstyle: "",
            "show-collapsable": _vm.showCollapsable,
            "label-width": _vm.labelWidth,
            "label-height": _vm.labelHeight,
            renderContent: _vm.renderContent,
            "selected-key": _vm.selectedKey,
            "default-expand-all": _vm.defaultExpandAll,
            "node-key": _vm.nodeKey,
            props: _vm.props
          }
        })
      }),
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/okr-tree/src/okr-tree.vue?vue&type=template&id=e405adf4&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(7);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/okr-tree/src/okr-tree-node.vue?vue&type=template&id=c7611dce&
var okr_tree_nodevue_type_template_id_c7611dce_render = function() {
  var this$1 = this
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.node.visible
    ? _c(
        "div",
        {
          staticClass: "org-chart-node",
          class: {
            collapsed: !_vm.node.leftExpanded || !_vm.node.expanded,
            "is-leaf": _vm.isLeaf,
            "is-current": _vm.node.isCurrent,
            "is-left-child-node": _vm.isLeftChildNode,
            "is-not-child":
              _vm.node.level === 1 &&
              _vm.node.childNodes.length <= 0 &&
              _vm.leftChildNodes.length <= 0,
            "only-both-tree-node":
              _vm.node.level === 1 && _vm.tree.store.onlyBothTree
          },
          on: {
            contextmenu: function($event) {
              return this$1.handleContextMenu($event)
            }
          }
        },
        [
          _c(
            "transition",
            { attrs: { duration: _vm.animateDuration, name: _vm.animateName } },
            [
              _vm.showLeftChildNode
                ? _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.node.leftExpanded,
                          expression: "node.leftExpanded"
                        }
                      ],
                      staticClass: "org-chart-node-left-children"
                    },
                    _vm._l(_vm.leftChildNodes, function(child) {
                      return _c("OkrTreeNode", {
                        key: _vm.getNodeKey(child),
                        attrs: {
                          "show-collapsable": _vm.showCollapsable,
                          node: child,
                          "label-width": _vm.labelWidth,
                          "label-height": _vm.labelHeight,
                          renderContent: _vm.renderContent,
                          "selected-key": _vm.selectedKey,
                          "node-key": _vm.nodeKey,
                          props: _vm.props,
                          "is-left-child-node": ""
                        }
                      })
                    }),
                    1
                  )
                : _vm._e()
            ]
          ),
          _c(
            "div",
            {
              staticClass: "org-chart-node-label",
              class: {
                "is-root-label": _vm.node.level === 1,
                "is-not-right-child":
                  _vm.node.level === 1 && _vm.node.childNodes.length <= 0,
                "is-not-left-child":
                  _vm.node.level === 1 && _vm.leftChildNodes.length <= 0
              }
            },
            [
              _vm.showNodeLeftBtn && _vm.leftChildNodes.length > 0
                ? _c("div", {
                    staticClass: "org-chart-node-left-btn",
                    class: { expanded: _vm.node.leftExpanded },
                    on: {
                      click: function($event) {
                        _vm.handleBtnClick("left")
                      }
                    }
                  })
                : _vm._e(),
              _c(
                "div",
                {
                  staticClass: "org-chart-node-label-inner",
                  class: _vm.computeLabelClass,
                  style: _vm.computeLabelStyle,
                  on: { click: _vm.handleNodeClick }
                },
                [
                  _c(
                    "node-content",
                    { attrs: { node: _vm.node } },
                    [
                      _vm._t("default", [
                        _vm._v(
                          "\n          " + _vm._s(_vm.node.label) + "\n        "
                        )
                      ])
                    ],
                    2
                  )
                ],
                1
              ),
              _vm.showNodeBtn && !_vm.isLeftChildNode
                ? _c("div", {
                    staticClass: "org-chart-node-btn",
                    class: { expanded: _vm.node.expanded },
                    on: {
                      click: function($event) {
                        _vm.handleBtnClick("right")
                      }
                    }
                  })
                : _vm._e()
            ]
          ),
          _c(
            "transition",
            { attrs: { duration: _vm.animateDuration, name: _vm.animateName } },
            [
              !_vm.isLeftChildNode &&
              _vm.node.childNodes &&
              _vm.node.childNodes.length > 0
                ? _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.node.expanded,
                          expression: "node.expanded"
                        }
                      ],
                      staticClass: "org-chart-node-children"
                    },
                    _vm._l(_vm.node.childNodes, function(child) {
                      return _c("OkrTreeNode", {
                        key: _vm.getNodeKey(child),
                        attrs: {
                          "show-collapsable": _vm.showCollapsable,
                          node: child,
                          "label-width": _vm.labelWidth,
                          "label-height": _vm.labelHeight,
                          renderContent: _vm.renderContent,
                          "selected-key": _vm.selectedKey,
                          "node-key": _vm.nodeKey,
                          props: _vm.props
                        }
                      })
                    }),
                    1
                  )
                : _vm._e()
            ]
          )
        ],
        1
      )
    : _vm._e()
}
var okr_tree_nodevue_type_template_id_c7611dce_staticRenderFns = []
okr_tree_nodevue_type_template_id_c7611dce_render._withStripped = true


// CONCATENATED MODULE: ./packages/okr-tree/src/okr-tree-node.vue?vue&type=template&id=c7611dce&

// CONCATENATED MODULE: ./packages/okr-tree/src/model/util.js
var NODE_KEY = '$treeNodeId';

var markNodeData = function markNodeData(node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

var util_getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};

var findNearestComponent = function findNearestComponent(element, componentName) {
  var target = element;
  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }
    target = target.parentNode;
  }
  return null;
};
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/okr-tree/src/okr-tree-node.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var okr_tree_nodevue_type_script_lang_js_ = ({
  name: 'OkrTreeNode',
  inject: ['okrEventBus'],
  props: {
    props: {},
    node: {
      default: function _default() {
        return {};
      }
    },
    root: {
      default: function _default() {
        return {};
      }
    },
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 判断是否是左子树的节点，样式需要改
    isLeftChildNode: {
      type: Boolean,
      default: false
    },
    // 树节点的内容区的渲染 Function
    renderContent: Function,
    // 树节点区域的宽度
    labelWidth: [String, Number],
    // 树节点区域的高度
    labelHeight: [String, Number],
    // 用来控制选择节点的字段名
    selectedKey: String,
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: String
  },
  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;
        if (parent._props.renderContent) {
          return parent._props.renderContent(h, this.node);
        } else {
          return this.$scopedSlots.default(this.node);
        }
      }
    }
  },
  computed: {
    isLeaf: function isLeaf() {
      if (this.node.level === 1) {
        if (this.leftChildNodes.length === 0 && this.node.childNodes.length === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return this.node.isLeaf;
      }
    },
    leftChildNodes: function leftChildNodes() {
      if (this.tree.store.onlyBothTree) {
        if (this.isLeftChildNode) {
          return this.node.childNodes;
        } else {
          return this.node.leftChildNodes;
        }
      }
      return [];
    },
    animateName: function animateName() {
      if (this.tree.store.animate) {
        return this.tree.store.animateName;
      }
      return '';
    },
    animateDuration: function animateDuration() {
      if (this.tree.store.animate) {
        return this.tree.store.animateDuration;
      }
      return 0;
    },

    // 是否显示展开按钮
    showNodeBtn: function showNodeBtn() {
      if (this.isLeftChildNode) {
        return this.tree.store.direction === 'horizontal' && this.showCollapsable && this.leftChildNodes.length > 0 || this.level === 1;
      }
      return this.showCollapsable && this.node.childNodes && this.node.childNodes.length > 0;
    },
    showNodeLeftBtn: function showNodeLeftBtn() {
      return this.tree.store.direction === 'horizontal' && this.showCollapsable && this.leftChildNodes.length > 0;
    },

    // 节点的宽度
    computeLabelStyle: function computeLabelStyle() {
      var _labelWidth = this.labelWidth,
          labelWidth = _labelWidth === undefined ? 'auto' : _labelWidth,
          _labelHeight = this.labelHeight,
          labelHeight = _labelHeight === undefined ? 'auto' : _labelHeight;

      if (typeof labelWidth === 'number') {
        labelWidth = labelWidth + 'px';
      }
      if (typeof labelHeight === 'number') {
        labelHeight = labelHeight + 'px';
      }
      return {
        width: labelWidth,
        height: labelHeight
      };
    },
    computeLabelClass: function computeLabelClass() {
      var clsArr = [];
      var store = this.tree.store;
      if (store.labelClassName) {
        if (typeof store.labelClassName === 'function') {
          clsArr.push(store.labelClassName(this.node));
        } else {
          clsArr.push(store.labelClassName);
        }
      }
      if (store.currentLableClassName && this.node.isCurrent) {
        if (typeof store.currentLableClassName === 'function') {
          clsArr.push(store.currentLableClassName(this.node));
        } else {
          clsArr.push(store.currentLableClassName);
        }
      }
      if (this.node.isCurrent) {
        clsArr.push('is-current');
      }
      return clsArr;
    },
    computNodeStyle: function computNodeStyle() {
      return {
        display: this.node.expanded ? '' : 'none'
      };
    },
    computLeftNodeStyle: function computLeftNodeStyle() {
      return {
        display: this.node.leftExpanded ? '' : 'none'
      };
    },

    // 是否显示左子数
    showLeftChildNode: function showLeftChildNode() {
      return this.tree.onlyBothTree && this.tree.store.direction === 'horizontal' && this.leftChildNodes && this.leftChildNodes.length > 0;
    }
  },
  watch: {
    'node.expanded': function nodeExpanded(val) {
      // this.$nextTick(() => this.expanded = val);
    },
    'node.leftExpanded': function nodeLeftExpanded(val) {
      // this.$nextTick(() => this.expanded = val);
    }
  },
  data: function data() {
    return {
      // node 的展开状态
      expanded: false,
      tree: null
    };
  },
  created: function created() {
    var parent = this.$parent;
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    var tree = this.tree;
    if (!tree) {
      console.warn("Can not find node's tree.");
    }
  },

  methods: {
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.nodeKey, node.data);
    },
    handleNodeClick: function handleNodeClick() {
      var store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit('node-click', this.node.data, this.node, this);
    },
    handleBtnClick: function handleBtnClick(isLeft) {
      isLeft = isLeft === 'left';
      var store = this.tree.store;
      // 表示是OKR飞书模式
      if (store.onlyBothTree) {
        if (isLeft) {
          if (this.node.leftExpanded) {
            this.node.leftExpanded = false;
            this.tree.$emit('node-collapse', this.node.data, this.node, this);
          } else {
            this.node.leftExpanded = true;
            this.tree.$emit('node-expand', this.node.data, this.node, this);
          }
          return;
        }
      }
      if (this.node.expanded) {
        this.node.collapse();
        this.tree.$emit('node-collapse', this.node.data, this.node, this);
      } else {
        this.node.expand();
        this.tree.$emit('node-expand', this.node.data, this.node, this);
      }
    },
    handleContextMenu: function handleContextMenu(event) {
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
    }
  }
});
// CONCATENATED MODULE: ./packages/okr-tree/src/okr-tree-node.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_okr_tree_nodevue_type_script_lang_js_ = (okr_tree_nodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/okr-tree/src/okr-tree-node.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_okr_tree_nodevue_type_script_lang_js_,
  okr_tree_nodevue_type_template_id_c7611dce_render,
  okr_tree_nodevue_type_template_id_c7611dce_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/okr-tree/src/okr-tree-node.vue"
/* harmony default export */ var okr_tree_node = (component.exports);
// CONCATENATED MODULE: ./packages/okr-tree/src/model/merge.js
/* harmony default export */ var merge = (function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
});
// CONCATENATED MODULE: ./packages/okr-tree/src/model/node.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var getPropertyFromData = function getPropertyFromData(node, prop) {
  var props = node.store.props;
  var data = node.data || {};
  var config = props[prop];

  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    var dataProp = data[prop];
    return dataProp === undefined ? '' : dataProp;
  }
};

var nodeIdSeed = 0;

var node_Node = function () {
  function Node(options) {
    var isLeftChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Node);

    this.isLeftChild = isLeftChild;
    this.id = nodeIdSeed++;
    this.data = null;
    this.expanded = false;
    this.leftExpanded = false;
    this.isCurrent = false;
    this.visible = true;
    this.parent = null;
    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
    this.level = 0;
    this.childNodes = [];
    this.leftChildNodes = [];

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    var store = this.store;
    if (!store) {
      throw new Error('[Node]store is required!');
    }
    store.registerNode(this);
    if (this.data) {
      this.setData(this.data, isLeftChild);
      if (store.defaultExpandAll || !store.showCollapsable) {
        this.expanded = true;
        this.leftExpanded = true;
      }
    }

    if (!Array.isArray(this.data)) {
      markNodeData(this, this.data);
    }
    if (!this.data) return;
    var defaultExpandedKeys = store.defaultExpandedKeys;
    var key = store.key;
    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
      this.expand(null, true);
    }

    if (key && store.currentNodeKey !== undefined && this.key === store.currentNodeKey) {
      store.currentNode = this;
      store.currentNode.isCurrent = true;
    }

    this.updateLeafState();
  }

  Node.prototype.setData = function setData(data, isLeftChild) {
    if (!Array.isArray(data)) {
      markNodeData(this, data);
    }
    this.data = data;
    this.childNodes = [];
    var children = void 0;
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data;
    } else {
      children = getPropertyFromData(this, 'children') || [];
    }
    for (var i = 0, j = children.length; i < j; i++) {
      this.insertChild({ data: children[i] }, null, null, isLeftChild);
    }
  };

  // 是否是 OKR 飞书模式
  Node.prototype.hasLeftChild = function hasLeftChild() {
    var store = this.store;
    return store.onlyBothTree && store.direction === 'horizontal';
  };

  Node.prototype.insertChild = function insertChild(child, index, batch, isLeftChild) {
    if (!child) throw new Error('insertChild error: child is required.');
    if (!(child instanceof Node)) {
      if (!batch) {
        var children = this.getChildren(true);
        if (children.indexOf(child.data) === -1) {
          if (typeof index === 'undefined' || index < 0) {
            children.push(child.data);
          } else {
            children.splice(index, 0, child.data);
          }
        }
      }
      merge(child, {
        parent: this,
        store: this.store
      });
      child = new Node(child, isLeftChild);
    }
    child.level = this.level + 1;
    if (typeof index === 'undefined' || index < 0) {
      this.childNodes.push(child);
    } else {
      this.childNodes.splice(index, 0, child);
    }
    this.updateLeafState();
  };

  Node.prototype.getChildren = function getChildren() {
    var forceInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    // this is data
    if (this.level === 0) return this.data;
    var data = this.data;
    if (!data) return null;

    var props = this.store.props;
    var children = 'children';
    if (props) {
      children = props.children || 'children';
    }

    if (data[children] === undefined) {
      data[children] = null;
    }

    if (forceInit && !data[children]) {
      data[children] = [];
    }

    return data[children];
  };

  Node.prototype.updateLeafState = function updateLeafState() {
    if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
      this.isLeaf = this.isLeafByUser;
      return;
    }
    var childNodes = this.childNodes;
    if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
      this.isLeaf = !childNodes || childNodes.length === 0;
      return;
    }
    this.isLeaf = false;
  };

  Node.prototype.updateLeftLeafState = function updateLeftLeafState() {
    if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
      this.isLeaf = this.isLeafByUser;
      return;
    }
    var childNodes = this.leftChildNodes;
    if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
      this.isLeaf = !childNodes || childNodes.length === 0;
      return;
    }
    this.isLeaf = false;
  };
  // 节点的收起


  Node.prototype.collapse = function collapse() {
    this.expanded = false;
  };
  // 节点的展开


  Node.prototype.expand = function expand(callback, expandParent) {
    var _this = this;

    var done = function done() {
      if (expandParent) {
        var parent = _this.parent;
        while (parent.level > 0) {
          parent.isLeftChild ? parent.leftExpanded = true : parent.expanded = true;
          parent = parent.parent;
        }
      }
      _this.isLeftChild ? _this.leftExpanded = true : _this.expanded = true;
      if (callback) callback();
    };
    done();
  };

  Node.prototype.removeChild = function removeChild(child) {
    var children = this.getChildren() || [];
    var dataIndex = children.indexOf(child.data);
    if (dataIndex > -1) {
      children.splice(dataIndex, 1);
    }

    var index = this.childNodes.indexOf(child);

    if (index > -1) {
      this.store && this.store.deregisterNode(child);
      child.parent = null;
      this.childNodes.splice(index, 1);
    }

    this.updateLeafState();
  };

  Node.prototype.insertBefore = function insertBefore(child, ref) {
    var index = void 0;
    if (ref) {
      index = this.childNodes.indexOf(ref);
    }
    this.insertChild(child, index);
  };

  Node.prototype.insertAfter = function insertAfter(child, ref) {
    var index = void 0;
    if (ref) {
      index = this.childNodes.indexOf(ref);
      if (index !== -1) index += 1;
    }
    this.insertChild(child, index);
  };

  _createClass(Node, [{
    key: 'key',
    get: function get() {
      var nodeKey = this.store.key;
      if (this.data) return this.data[nodeKey];
      return null;
    }
  }, {
    key: 'label',
    get: function get() {
      return getPropertyFromData(this, 'label');
    }
  }]);

  return Node;
}();

/* harmony default export */ var model_node = (node_Node);
// CONCATENATED MODULE: ./packages/okr-tree/src/model/tree-store.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function tree_store_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var tree_store_TreeStore = function () {
  function TreeStore(options) {
    tree_store_classCallCheck(this, TreeStore);

    this.currentNode = null;
    this.currentNodeKey = null;

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    this.nodesMap = {};
    this.root = new model_node({
      data: this.data,
      store: this
    }, false);

    if (this.root.store.onlyBothTree) {
      if (!this.leftData) {
        throw new Error('[Tree] leftData is required in onlyBothTree');
      }
      if (this.leftData) {
        this.isLeftChilds = new model_node({
          data: this.leftData,
          store: this
        }, true);
        if (this.isLeftChilds) {
          this.root.childNodes[0].leftChildNodes = this.isLeftChilds.childNodes[0].childNodes;
          this.root.childNodes[0].leftExpanded = this.isLeftChilds.childNodes[0].leftExpanded;
        }
      }
    }
  }

  TreeStore.prototype.filter = function filter(value) {
    var childName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'childNodes';

    this.filterRight(value, childName);
  };
  // 过滤默认节点


  TreeStore.prototype.filterRight = function filterRight(value, childName) {
    var filterNodeMethod = this.filterNodeMethod;
    var traverse = function traverse(node, childName) {
      var childNodes = void 0;
      if (node.root) {
        childNodes = node.root.childNodes[0][childName];
      } else {
        childNodes = node.childNodes;
      }
      childNodes.forEach(function (child) {
        child.visible = filterNodeMethod.call(child, value, child.data, child);
        traverse(child, childName);
      });

      if (!node.visible && childNodes.length) {
        var allHidden = true;
        allHidden = !childNodes.some(function (child) {
          return child.visible;
        });

        if (node.root) {
          node.root.visible = allHidden === false;
        } else {
          node.visible = allHidden === false;
        }
      }
      if (!value) return;

      if (node.visible) node.expand();
    };

    traverse(this, childName);
  };

  TreeStore.prototype.registerNode = function registerNode(node) {
    var key = this.key;
    if (!key || !node || !node.data) return;

    var nodeKey = node.key;
    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
  };

  TreeStore.prototype.deregisterNode = function deregisterNode(node) {
    var _this = this;

    var key = this.key;
    if (!key || !node || !node.data) return;
    node.childNodes.forEach(function (child) {
      _this.deregisterNode(child);
    });
    delete this.nodesMap[node.key];
  };

  TreeStore.prototype.setData = function setData(newVal) {
    var instanceChanged = newVal !== this.root.data;
    if (instanceChanged) {
      this.root.setData(newVal);
    } else {
      this.root.updateChildren();
    }
  };

  TreeStore.prototype.updateChildren = function updateChildren(key, data) {
    var node = this.nodesMap[key];
    if (!node) return;
    var childNodes = node.childNodes;
    for (var i = childNodes.length - 1; i >= 0; i--) {
      var child = childNodes[i];
      this.remove(child.data);
    }
    for (var _i = 0, j = data.length; _i < j; _i++) {
      var _child = data[_i];
      this.append(_child, node.data);
    }
  };

  TreeStore.prototype.getNode = function getNode(data) {
    if (data instanceof model_node) return data;
    var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : util_getNodeKey(this.key, data);
    return this.nodesMap[key] || null;
  };

  TreeStore.prototype.setDefaultExpandedKeys = function setDefaultExpandedKeys(keys) {
    var _this2 = this;

    keys = keys || [];
    this.defaultExpandedKeys = keys;
    keys.forEach(function (key) {
      var node = _this2.getNode(key);
      if (node) node.expand(null, true);
    });
  };

  TreeStore.prototype.setCurrentNode = function setCurrentNode(currentNode) {
    var prevCurrentNode = this.currentNode;
    if (prevCurrentNode) {
      prevCurrentNode.isCurrent = false;
    }
    this.currentNode = currentNode;
    this.currentNode.isCurrent = true;
  };

  TreeStore.prototype.setUserCurrentNode = function setUserCurrentNode(node) {
    var key = node.key;
    var currNode = this.nodesMap[key];
    this.setCurrentNode(currNode);
  };

  TreeStore.prototype.setCurrentNodeKey = function setCurrentNodeKey(key) {
    if (key === null || key === undefined) {
      this.currentNode && (this.currentNode.isCurrent = false);
      this.currentNode = null;
      return;
    }
    var node = this.getNode(key);
    if (node) {
      this.setCurrentNode(node);
    }
  };

  TreeStore.prototype.getCurrentNode = function getCurrentNode() {
    return this.currentNode;
  };

  TreeStore.prototype.remove = function remove(data) {
    var node = this.getNode(data);
    if (node && node.parent) {
      if (node === this.currentNode) {
        this.currentNode = null;
      }
      node.parent.removeChild(node);
    }
  };

  TreeStore.prototype.append = function append(data, parentData) {
    var parentNode = parentData ? this.getNode(parentData) : this.root;

    if (parentNode) {
      parentNode.insertChild({ data: data });
    }
  };

  TreeStore.prototype.insertBefore = function insertBefore(data, refData) {
    var refNode = this.getNode(refData);
    refNode.parent.insertBefore({ data: data }, refNode);
  };

  TreeStore.prototype.insertAfter = function insertAfter(data, refData) {
    var refNode = this.getNode(refData);
    refNode.parent.insertAfter({ data: data }, refNode);
  };

  return TreeStore;
}();

/* harmony default export */ var tree_store = (tree_store_TreeStore);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/okr-tree/src/okr-tree.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var okr_treevue_type_script_lang_js_ = ({
  name: 'OkrTree',
  components: {
    OkrTreeNode: okr_tree_node
  },
  provide: function provide() {
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
      default: function _default() {
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
    ondeClass: function ondeClass() {
      return {
        findNode: null
      };
    }
  },
  data: function data() {
    return {
      okrEventBus: new external_vue_default.a(),
      store: null,
      root: null
    };
  },
  created: function created() {
    this.isTree = true;
    this.store = new tree_store({
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
    data: function data(newVal) {
      this.store.setData(newVal);
    },
    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    }
  },
  methods: {
    filter: function filter(value) {
      if (!this.filterNodeMethod) {
        throw new Error('[Tree] filterNodeMethod is required when filter');
      }
      this.store.filter(value);
      if (this.onlyBothTree) {
        this.store.filter(value, 'leftChildNodes');
      }
    },
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.nodeKey, node.data);
    },

    // 通过 node 设置某个节点的当前选中状态
    setCurrentNode: function setCurrentNode(node) {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in setCurrentNode');
      }
      this.store.setUserCurrentNode(node);
    },

    // 根据 data 或者 key 拿到 Tree 组件中的 node
    getNode: function getNode(data) {
      return this.store.getNode(data);
    },

    // 通过 key 设置某个节点的当前选中状态
    setCurrentKey: function setCurrentKey(key) {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in setCurrentKey');
      }
      this.store.setCurrentNodeKey(key);
    },
    remove: function remove(data) {
      this.store.remove(data);
    },

    // 获取当前被选中节点的 data
    getCurrentNode: function getCurrentNode() {
      var currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey: function getCurrentKey() {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in getCurrentKey');
      }
      var currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    append: function append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    updateKeyChildren: function updateKeyChildren(key, data) {
      if (!this.nodeKey) {
        throw new Error('[Tree] nodeKey is required in updateKeyChild');
      }
      this.store.updateChildren(key, data);
    }
  }
});
// CONCATENATED MODULE: ./packages/okr-tree/src/okr-tree.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_okr_treevue_type_script_lang_js_ = (okr_treevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/okr-tree/src/okr-tree.vue





/* normalize component */

var okr_tree_component = Object(componentNormalizer["a" /* default */])(
  src_okr_treevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var okr_tree_api; }
okr_tree_component.options.__file = "packages/okr-tree/src/okr-tree.vue"
/* harmony default export */ var okr_tree = (okr_tree_component.exports);
// CONCATENATED MODULE: ./packages/okr-tree/index.js


/* istanbul ignore next */
okr_tree.install = function (Vue) {
  Vue.component(okr_tree.name, okr_tree);
};

/* harmony default export */ var packages_okr_tree = __webpack_exports__["default"] = (okr_tree);

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ })

/******/ });