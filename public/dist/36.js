(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[36],{

/***/ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.0.6@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/channel/channel.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_channel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/api/channel.js */ "./src/api/channel.js");
/* harmony import */ var _utils_clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/clipboard */ "./src/utils/clipboard.js");
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

 // use clipboard directly

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      activeIndex: '',
      currentPage: 1,
      tableData: [],
      value: '',
      pageSize: 10,
      aid: '',
      cid: '',
      companyList: [],
      appsList: [],
      appValue: '',
      total: 0,
      loading: false
    };
  },
  mounted: function mounted() {
    this.getApp();
    this.getList();
  },
  methods: {
    handleCopy: function handleCopy(text, event) {
      Object(_utils_clipboard__WEBPACK_IMPORTED_MODULE_1__["default"])(text, event);
    },
    clipboardSuccess: function clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      });
    },
    onChangeStatus: function onChangeStatus(item) {
      console.log(item);
      this.$router.push({
        path: "/details",
        query: {
          url: item
        }
      });
    },
    goDetail: function goDetail(item) {
      this.$router.push({
        path: "/details/".concat(item.id)
      });
    },
    transformTime: function transformTime(timestamp) {
      if (timestamp) {
        timestamp = timestamp * 1000;
        var time = new Date(timestamp);
        var y = time.getFullYear(); // getFullYear方法以四位数字返回年份

        var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一

        var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)

        var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)

        var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)

        var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)

        return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
      } else {
        return '';
      }
    },
    onChangeApp: function onChangeApp(index) {
      this.aid = index;
      this.getList();
    },
    getList: function getList() {
      var _this = this;

      this.loading = true;
      Object(_api_channel_js__WEBPACK_IMPORTED_MODULE_0__["list"])({
        page: this.currentPage,
        size: this.pageSize,
        aid: this.aid
      }).then(function (response) {
        if (response.code === 200) {
          _this.total = response.count;
          _this.loading = false;
          _this.tableData = response.data.map(function (item) {
            item.Status = item.status === '0' ? '无效' : '有效';
            item.valid = item.status === '0' ? '否' : '是';
            item.create_time = _this.transformTime(item.create_time);
            return item;
          });
        }
      }).catch(function (e) {
        _this.loading = false;
      });
    },
    getApp: function getApp() {
      var _this2 = this;

      Object(_api_channel_js__WEBPACK_IMPORTED_MODULE_0__["appList"])({}).then(function (response) {
        if (response.code === 200) {
          // this.companyList = response.data
          _this2.appsList = response.data;
        }
      });
    },
    createUrl: function createUrl() {
      this.$router.push({
        path: '/create'
      });
    },
    handleSelect: function handleSelect(e) {
      this.activeIndex = e;
      this.getList();
    },
    handleSizeChange: function handleSizeChange(e) {
      this.pageSize = e;
      this.getList();
    },
    handleCurrentChange: function handleCurrentChange(e) {
      this.currentPage = e;
      this.getList();
    }
  }
});

/***/ }),

/***/ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5a55f599-vue-loader-template\"}!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a55f599-vue-loader-template"}!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "dashboard-editor-container" }, [
    _c(
      "div",
      { staticClass: "list-wrapper" },
      [
        _c(
          "div",
          { staticClass: "opertion-wrapper" },
          [
            _c(
              "el-select",
              {
                attrs: {
                  filterable: "",
                  clearable: "",
                  placeholder: "全部小程序"
                },
                on: { change: _vm.onChangeApp },
                model: {
                  value: _vm.appValue,
                  callback: function($$v) {
                    _vm.appValue = $$v
                  },
                  expression: "appValue"
                }
              },
              _vm._l(_vm.appsList, function(item) {
                return _c("el-option", {
                  key: item.aid,
                  attrs: { label: item.name, value: item.aid }
                })
              }),
              1
            ),
            _vm._v(" "),
            _c("el-button", { on: { click: _vm.createUrl } }, [
              _vm._v("新增URL")
            ])
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "el-table",
          {
            directives: [
              {
                name: "loading",
                rawName: "v-loading",
                value: _vm.loading,
                expression: "loading"
              }
            ],
            staticStyle: { width: "100%" },
            attrs: {
              data: _vm.tableData,
              "header-cell-style": {
                "background-color": "#f0f2f6"
              }
            }
          },
          [
            _c("el-table-column", {
              attrs: { prop: "page_name", label: "页面名称" }
            }),
            _vm._v(" "),
            _c("el-table-column", {
              attrs: { prop: "page_url", label: "URL" },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(scope) {
                    return [
                      _c(
                        "el-tooltip",
                        {
                          staticClass: "item",
                          attrs: {
                            effect: "light",
                            content: scope.row.page_url,
                            placement: "top-start"
                          }
                        },
                        [
                          _c(
                            "el-button",
                            {
                              staticClass: "commodity_name",
                              attrs: { type: "text", size: "small" }
                            },
                            [_vm._v(_vm._s(scope.row.page_url))]
                          )
                        ],
                        1
                      )
                    ]
                  }
                }
              ])
            }),
            _vm._v(" "),
            _c("el-table-column", {
              attrs: { prop: "app_name", label: "小程序名称" }
            }),
            _vm._v(" "),
            _c("el-table-column", {
              attrs: { prop: "create_time", label: "创建时间" }
            }),
            _vm._v(" "),
            _c("el-table-column", {
              attrs: { prop: "user_name", label: "创建人" }
            }),
            _vm._v(" "),
            _c("el-table-column", {
              attrs: { prop: "user_name", label: "二维码" },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(ref) {
                    var row = ref.row
                    return [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "text", icon: "document" },
                          on: {
                            click: function($event) {
                              return _vm.handleCopy(row.qrcode, $event)
                            }
                          }
                        },
                        [_vm._v("\n            复制二维码\n          ")]
                      ),
                      _vm._v(" "),
                      _c("p", [_vm._v(_vm._s(row.qrcode))])
                    ]
                  }
                }
              ])
            }),
            _vm._v(" "),
            _c("el-table-column", {
              attrs: { align: "center", label: "操作" },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(scope) {
                    return [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "text", size: "small" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation()
                              return _vm.onChangeStatus(scope.row.page_url)
                            }
                          }
                        },
                        [_vm._v("查看")]
                      )
                    ]
                  }
                }
              ])
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("el-pagination", {
          attrs: {
            "current-page": _vm.currentPage,
            "page-sizes": [10, 20, 30, 40],
            "page-size": _vm.pageSize,
            layout: "total, sizes, prev, pager, next, jumper",
            total: _vm.total
          },
          on: {
            "size-change": _vm.handleSizeChange,
            "current-change": _vm.handleCurrentChange
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dashboard-editor-container[data-v-1da2414d] {\n  padding: 30px;\n  position: relative;\n  height: 100%;\n  background: #f5f7fa;\n}\n.list-wrapper[data-v-1da2414d] {\n  background: #ffffff;\n  background: white;\n  -webkit-box-shadow: 0px 8px 16px 0px rgba(26, 26, 32, 0.04);\n          box-shadow: 0px 8px 16px 0px rgba(26, 26, 32, 0.04);\n  padding: 30px;\n}\n.list-wrapper .el-menu-demo[data-v-1da2414d] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n}\n.list-wrapper .opertion-wrapper[data-v-1da2414d] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.list-wrapper .opertion-wrapper .el-select[data-v-1da2414d] {\n      margin-right: 10px;\n}\n.list-wrapper .el-table[data-v-1da2414d] {\n    margin-top: 10px;\n}\n.list-wrapper .el-pagination[data-v-1da2414d] {\n    margin-top: 10px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.list-wrapper .commodity_name[data-v-1da2414d] {\n    text-align: left;\n    width: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/index.js?!./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_vue-style-loader@4.1.2@vue-style-loader??ref--8-oneOf-1-0!./node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js").default
var update = add("26d0062b", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/api/channel.js":
/*!****************************!*\
  !*** ./src/api/channel.js ***!
  \****************************/
/*! exports provided: appList, list, addUrl, urlList, tarsearch, checkcode, changeStatus, detail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appList", function() { return appList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "list", function() { return list; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addUrl", function() { return addUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlList", function() { return urlList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tarsearch", function() { return tarsearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkcode", function() { return checkcode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeStatus", function() { return changeStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detail", function() { return detail; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");

function appList() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/app/channel/applist',
    method: 'post',
    data: data
  });
}
function list() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/channel/list',
    method: 'post',
    data: data
  });
}
function addUrl() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/channel/add',
    method: 'post',
    data: data
  });
}
function urlList() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/channel/urllist',
    method: 'post',
    data: data
  });
}
function tarsearch() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/channel/tarSearch',
    method: 'post',
    data: data
  });
}
function checkcode() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/channel/checkQrcode',
    method: 'post',
    data: data
  });
} // export function detail(data = {}) {
//   return request({
//     url: 'app/channel/info',
//     method: 'post',
//     data
//   })
// }

function changeStatus() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/channel/deprecated',
    method: 'post',
    data: data
  });
}
function detail() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/channel/appMat',
    method: 'post',
    data: data
  });
}

/***/ }),

/***/ "./src/utils/clipboard.js":
/*!********************************!*\
  !*** ./src/utils/clipboard.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handleClipboard; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/_vue@2.6.10@vue/dist/vue.runtime.esm.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clipboard */ "./node_modules/_clipboard@2.0.4@clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_1__);



function clipboardSuccess() {
  vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$message({
    message: '复制成功',
    type: 'success',
    duration: 1500
  });
}

function clipboardError() {
  vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$message({
    message: 'Copy failed',
    type: 'error'
  });
}

function handleClipboard(_text, event) {
  var clipboard = new clipboard__WEBPACK_IMPORTED_MODULE_1___default.a(event.target, {
    text: function text() {
      return _text;
    }
  });
  clipboard.on('success', function () {
    clipboardSuccess();
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });
  clipboard.on('error', function () {
    clipboardError();
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });
  clipboard.onClick(event);
}

/***/ }),

/***/ "./src/views/channel/channel.vue":
/*!***************************************!*\
  !*** ./src/views/channel/channel.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./channel.vue?vue&type=template&id=1da2414d&scoped=true& */ "./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true&");
/* harmony import */ var _channel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./channel.vue?vue&type=script&lang=js& */ "./src/views/channel/channel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _channel_vue_vue_type_style_index_0_id_1da2414d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& */ "./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_15_7_0_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/_vue-loader@15.7.0@vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_15_7_0_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _channel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1da2414d",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/_vue-hot-reload-api@2.3.3@vue-hot-reload-api/dist/index.js */ "./node_modules/_vue-hot-reload-api@2.3.3@vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/_vue@2.6.10@vue/dist/vue.runtime.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('1da2414d', component.options)
    } else {
      api.reload('1da2414d', component.options)
    }
    module.hot.accept(/*! ./channel.vue?vue&type=template&id=1da2414d&scoped=true& */ "./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./channel.vue?vue&type=template&id=1da2414d&scoped=true& */ "./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true&");
(function () {
      api.rerender('1da2414d', {
        render: _channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "src/views/channel/channel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/channel/channel.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/views/channel/channel.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_8_0_6_babel_loader_lib_index_js_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/_babel-loader@8.0.6@babel-loader/lib!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./channel.vue?vue&type=script&lang=js& */ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_8_0_6_babel_loader_lib_index_js_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_style_index_0_id_1da2414d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/_vue-style-loader@4.1.2@vue-style-loader??ref--8-oneOf-1-0!../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true& */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/index.js?!./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=style&index=0&id=1da2414d&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_style_index_0_id_1da2414d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_style_index_0_id_1da2414d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_style_index_0_id_1da2414d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_style_index_0_id_1da2414d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_style_index_0_id_1da2414d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true&":
/*!**********************************************************************************!*\
  !*** ./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5a55f599_vue_loader_template_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a55f599-vue-loader-template"}!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./channel.vue?vue&type=template&id=1da2414d&scoped=true& */ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5a55f599-vue-loader-template\"}!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/channel/channel.vue?vue&type=template&id=1da2414d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5a55f599_vue_loader_template_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5a55f599_vue_loader_template_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_channel_vue_vue_type_template_id_1da2414d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=36.js.map