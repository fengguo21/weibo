(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.0.6@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/role/role.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.function.name */ "./node_modules/_core-js@2.6.9@core-js/modules/es6.function.name.js");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.number.constructor */ "./node_modules/_core-js@2.6.9@core-js/modules/es6.number.constructor.js");
/* harmony import */ var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_renyakun_works_crs_frontend_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread */ "./node_modules/_@babel_runtime@7.4.5@@babel/runtime/helpers/esm/objectSpread.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/_core-js@2.6.9@core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _api_role__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/role */ "./src/api/role.js");
/* harmony import */ var _api_account__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/api/account */ "./src/api/account.js");
/* harmony import */ var _utils_orderBy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/orderBy */ "./src/utils/orderBy.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/router */ "./src/router/index.js");





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
var filterAsyncRoutes = function filterAsyncRoutes(routes) {
  var res = [];
  routes.forEach(function (route) {
    var tmp = Object(_Users_renyakun_works_crs_frontend_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_2__["default"])({}, route);

    if (tmp.hidden !== true) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children);
      }

      res.push(tmp);
    }
  });
  return res;
};





/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_utils_orderBy__WEBPACK_IMPORTED_MODULE_6__["default"]],
  data: function data() {
    return {
      asyncRoutes: _router__WEBPACK_IMPORTED_MODULE_7__["asyncRoutes"],
      roleData: [],
      allotUserList: [],
      username: '',
      userId: '',
      currentRow: '',
      isShowAdd: false,
      title: '',
      rules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }]
      },
      data: [],
      defaultProps: {
        label: function label(data, node) {
          console.log(node);
          return node.data.meta.title;
        },
        children: 'children'
      },
      addInfo: {
        name: '',
        available: '',
        describe: ''
      },
      temp: {
        name: '',
        available: '',
        describe: ''
      },
      isShowMenu: false,
      isShowUser: false,
      uid: '',
      mid: [],
      defaultChecked: [],
      isShowApp: false,
      listapp: '',
      checkList: [],
      chooseRole: [],
      current: 1,
      total: 0
    };
  },
  computed: {
    pageTableData: {
      get: function get() {
        return this.roleData.slice((this.current - 1) * 10, this.current * 10);
      },
      set: function set(newValue) {
        this.roleData = newValue;
        this.total = this.roleData.length;
      }
    },
    routes: function routes() {
      return filterAsyncRoutes(this.asyncRoutes);
    }
  },
  watch: {
    isShowAdd: function isShowAdd() {
      this.$refs['ruleForm'].resetFields();
    }
  },
  created: function created() {
    console.log(_router__WEBPACK_IMPORTED_MODULE_7__["asyncRoutes"]);
    this.getRoleList();
  },
  methods: {
    changePage: function changePage(e) {
      this.current = e;
      this.currentRow = '';
    },
    getRoleList: function getRoleList() {
      var _this = this;

      this.currentRow = '';
      var parma = {
        role_name: this.username,
        role_no: this.userId
      };
      this.current = 1;
      Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["rolelist"])(parma).then(function (res) {
        console.log(res);
        _this.roleData = res.data;
        _this.total = _this.roleData.length;
      });
    },
    searchInfo: function searchInfo() {
      this.getRoleList();
    },
    reset: function reset() {
      this.username = '';
      this.userId = '';
      this.getRoleList();
    },
    handleCurrentChange: function handleCurrentChange(val) {
      var i = this.roleData.indexOf(val);
      this.$refs.multipleTable.clearSelection();
      this.$refs.multipleTable.toggleRowSelection(this.roleData[i]);
    },
    add: function add() {
      this.title = '新增角色';
      this.addInfo = {};
      this.isShowAdd = true;
    },
    addRole: function addRole(formName) {
      var _this2 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["addroles"])(_this2.addInfo).then(function (res) {
            console.log(res);
            _this2.isShowAdd = false;

            _this2.getRoleList();
          });
        } else {
          return false;
        }
      });
    },
    edit: function edit() {
      if (this.chooseRole.length === 0) {
        this.$message({
          message: '请先选择角色'
        });
        return;
      }

      this.isShowAdd = true;
      this.title = '编辑角色';
      this.addInfo = Object.assign({}, this.currentRow);
      this.addInfo.roleid = this.chooseRole[0].id; // this.addInfo.name = this.currentRow.name
      // this.addInfo.roleid = this.currentRow.id
      // this.addInfo.describe = this.currentRow.describe
      // this.addInfo.available = this.currentRow.available
      // this.$refs['ruleForm'].resetFields()
    },
    deleteRole: function deleteRole() {
      var _this3 = this;

      if (this.chooseRole.length === 0) {
        this.$message({
          message: '请先选择角色'
        });
        return;
      }

      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["deleteroles"])({
          roleid: _this3.chooseRole[0]
        }).then(function (res) {
          _this3.getRoleList();

          _this3.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      }).catch(function () {
        _this3.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateStatus: function updateStatus(e) {
      var _this4 = this;

      if (this.chooseRole.length === 0) {
        this.$message({
          message: '请先选择角色'
        });
        return;
      }

      var available = e.target.innerText === '启用' ? '1' : '0';
      Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["updateavail"])({
        roleid: this.currentRow.id,
        available: available
      }).then(function (res) {
        _this4.getRoleList();
      });
    },
    changeSelected: function changeSelected(selection) {
      console.log(selection);
      this.chooseRole = selection;
      this.currentRow = selection[0];
    },
    roleApps: function roleApps() {
      var _this5 = this;

      if (this.chooseRole.length === 0) {
        this.$message({
          message: '请先选择角色'
        });
        return;
      }

      Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["applist"])().then(function (res) {
        console.log(res);
        _this5.listapp = res.data;
      });
      this.checkList = this.chooseRole[0].appIds.map(function (item) {
        return Number(item);
      });
      this.isShowApp = true;
    },
    allotApp: function allotApp() {
      var _this6 = this;

      if (this.checkList.length === 0) {
        this.$message({
          message: '选项不能为空'
        });
        return;
      }

      var param = {
        roleid: this.chooseRole,
        aid: this.checkList
      };
      this.isShowApp = false;
      Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["addRoleApp"])(param).then(function (res) {
        _this6.getRoleList();

        _this6.$message({
          type: 'success',
          message: '添加成功'
        });
      });
    },
    allotMenu: function allotMenu() {
      if (this.chooseRole.length === 0) {
        this.$message({
          message: '请先选择角色'
        });
        return;
      }

      console.log(this.currentRow.menuIds, '----------------------zy');
      var arr = [];
      this.asyncRoutes.forEach(function (item) {
        console.log(item);

        if (item.children) {
          arr.push(item.name);
        }
      });
      var list = [];
      this.currentRow.menuIds.forEach(function (item) {
        if (arr.indexOf(item) === -1) {
          list.push(item);
        }
      });
      this.isShowMenu = true;
      this.defaultChecked = list;
      console.log(list, '-----------------zy'); // menulist({}).then(res => {
      //   console.log(res)
      //   this.data = res.data
      // })
    },
    allotUser: function allotUser() {
      var _this7 = this;

      if (this.chooseRole.length === 0) {
        this.$message({
          message: '请先选择角色'
        });
        return;
      }

      Object(_api_account__WEBPACK_IMPORTED_MODULE_5__["adminlistAdmin"])({}).then(function (res) {
        _this7.allotUserList = res.data;
        _this7.isShowUser = true;
        var that = _this7;
        that.$nextTick(function () {
          var _this8 = this;

          var arr = this.allotUserList.filter(function (v, i) {
            return _this8.currentRow.adminIds.indexOf(v.uid) !== -1;
          });
          this.$refs.multipleTableBus.clearSelection();
          arr.forEach(function (v) {
            _this8.$refs.multipleTableBus.toggleRowSelection(v, true);
          });
        });
      });
    },
    handleSelectionChange: function handleSelectionChange(val) {
      console.log(val);
      this.uid = val.map(function (item) {
        return item.uid;
      });
      console.log(this.uid);
    },
    allot: function allot() {
      var _this9 = this;

      var param = {
        roleid: this.chooseRole,
        uid: this.uid
      };

      if (this.uid.length === 0) {
        this.$message({
          message: '选项不能为空'
        });
        return;
      }

      Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["roleAdmin"])(param).then(function (res) {
        console.log(res);
        _this9.isShowUser = false;

        _this9.getRoleList();
      });
    },
    addMenus: function addMenus() {
      var _this10 = this;

      var rawSelectedMenus = this.$refs.tree.getCheckedNodes(false, true);
      console.log(selectedMenus);
      var selectedMenus = [];
      rawSelectedMenus.forEach(function (item) {
        if (item.name) {
          selectedMenus.push(item.name);
        }

        console.log(selectedMenus);
      });
      console.log(selectedMenus);
      console.log(this.currentRow.id);
      Object(_api_role__WEBPACK_IMPORTED_MODULE_4__["addRoleMenu"])({
        roleid: [this.currentRow.id],
        mid: selectedMenus
      }).then(function (res) {
        console.log(res);
        _this10.isShowMenu = false;

        _this10.$message({
          type: 'success',
          message: '分配成功'
        });

        _this10.getRoleList();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5a55f599-vue-loader-template\"}!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a55f599-vue-loader-template"}!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("div", { staticClass: "top" }, [
        _c(
          "div",
          { staticClass: "btns" },
          [
            _c(
              "el-button",
              { attrs: { type: "primary" }, on: { click: _vm.add } },
              [_vm._v("新增")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                attrs: {
                  disabled: _vm.chooseRole.length === 1 ? false : true,
                  type: "primary"
                },
                on: { click: _vm.edit }
              },
              [_vm._v("编辑")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                attrs: {
                  disabled: _vm.chooseRole.length === 1 ? false : true,
                  type: "primary"
                },
                on: { click: _vm.deleteRole }
              },
              [_vm._v("删除")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                attrs: {
                  disabled: _vm.chooseRole.length === 1 ? false : true,
                  type: "primary"
                },
                on: { click: _vm.allotMenu }
              },
              [_vm._v("角色菜单分配")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              {
                attrs: {
                  disabled: _vm.chooseRole.length === 1 ? false : true,
                  type: "primary"
                },
                on: { click: _vm.allotUser }
              },
              [_vm._v("角色用户分配")]
            ),
            _vm._v(" "),
            _c(
              "el-button",
              { attrs: { type: "primary" }, on: { click: _vm.roleApps } },
              [_vm._v("角色小程序分配")]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "user_search" },
          [
            _c("span", { staticStyle: { "line-height": "36px" } }, [
              _vm._v("角色名称 :")
            ]),
            _vm._v(" "),
            _c("el-input", {
              staticClass: "ipt-search",
              attrs: { placeholder: "请输入用户名称" },
              model: {
                value: _vm.username,
                callback: function($$v) {
                  _vm.username = $$v
                },
                expression: "username"
              }
            }),
            _vm._v(" "),
            _c("span", { staticStyle: { "line-height": "36px" } }, [
              _vm._v("角色编号 :")
            ]),
            _vm._v(" "),
            _c("el-input", {
              staticClass: "ipt-search",
              attrs: { placeholder: "请输入用户编号" },
              model: {
                value: _vm.userId,
                callback: function($$v) {
                  _vm.userId = $$v
                },
                expression: "userId"
              }
            }),
            _vm._v(" "),
            _c("el-button", { on: { click: _vm.searchInfo } }, [
              _vm._v("搜索")
            ]),
            _vm._v(" "),
            _c("el-button", { on: { click: _vm.reset } }, [_vm._v("重置")])
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "line" })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "main-body" }, [
        _c(
          "div",
          { staticClass: "lf_list" },
          [
            _c(
              "el-table",
              {
                ref: "multipleTable",
                attrs: {
                  data: _vm.pageTableData,
                  border: "",
                  "highlight-current-row": ""
                },
                on: {
                  "current-change": _vm.handleCurrentChange,
                  "selection-change": _vm.changeSelected
                }
              },
              [
                _c("el-table-column", {
                  attrs: { type: "selection", width: "55" }
                }),
                _vm._v(" "),
                _c("el-table-column", {
                  attrs: { label: "角色名称", prop: "name" }
                }),
                _vm._v(" "),
                _c("el-table-column", {
                  attrs: { label: "角色编号", prop: "id" }
                }),
                _vm._v(" "),
                _c("el-table-column", {
                  attrs: { label: "有效状态" },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(scope) {
                        return [
                          _c("span", [
                            _vm._v(
                              _vm._s(scope.row.available === "1" ? "是" : "否")
                            )
                          ])
                        ]
                      }
                    }
                  ])
                }),
                _vm._v(" "),
                _c("el-table-column", {
                  attrs: { label: "说明", prop: "describe" }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("el-pagination", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.total > 10 ? true : false,
                  expression: "total>10?true:false"
                }
              ],
              staticClass: "pagination",
              attrs: {
                "current-page": _vm.current,
                "page-size": 10,
                layout: "total, prev, pager, next, jumper",
                total: _vm.total
              },
              on: {
                "update:currentPage": function($event) {
                  _vm.current = $event
                },
                "update:current-page": function($event) {
                  _vm.current = $event
                },
                "current-change": _vm.changePage
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.currentRow,
                expression: "currentRow"
              }
            ],
            staticClass: "rt_info"
          },
          [
            _c("el-tag", { staticStyle: { "margin-left": "15px" } }, [
              _vm._v("基本信息")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "info" }, [
              _c("div", { staticClass: "item" }, [
                _c("span", { staticClass: "tit" }, [_vm._v("角色编号:")]),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.currentRow.id))])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "item" }, [
                _c("span", { staticClass: "tit" }, [_vm._v("角色名称:")]),
                _vm._v(" "),
                _c("span", [_vm._v(_vm._s(_vm.currentRow.name))])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "item" }, [
                _c("span", { staticClass: "tit" }, [_vm._v("状态:")]),
                _vm._v(" "),
                _c("span", [
                  _vm._v(_vm._s(_vm.currentRow.available === "1" ? "是" : "否"))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "textarea" }, [
                _c("span", [_vm._v("说明:")]),
                _vm._v(" "),
                _c("div", [_vm._v(_vm._s(_vm.currentRow.describe))])
              ])
            ])
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { title: _vm.title, visible: _vm.isShowAdd, width: "30%" },
          on: {
            "update:visible": function($event) {
              _vm.isShowAdd = $event
            }
          }
        },
        [
          _c(
            "div",
            [
              _c(
                "el-form",
                {
                  ref: "ruleForm",
                  staticClass: "add_info",
                  attrs: {
                    rules: _vm.rules,
                    "label-width": "80px",
                    "label-position": "left",
                    model: _vm.addInfo
                  }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      staticClass: "item",
                      attrs: { label: "用户名称", prop: "name" }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.addInfo.name,
                          callback: function($$v) {
                            _vm.$set(_vm.addInfo, "name", $$v)
                          },
                          expression: "addInfo.name"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { staticClass: "item", attrs: { label: "是否启用" } },
                    [
                      _c(
                        "el-select",
                        {
                          model: {
                            value: _vm.addInfo.available,
                            callback: function($$v) {
                              _vm.$set(_vm.addInfo, "available", $$v)
                            },
                            expression: "addInfo.available"
                          }
                        },
                        [
                          _c("el-option", {
                            attrs: { label: "是", value: "1" }
                          }),
                          _vm._v(" "),
                          _c("el-option", {
                            attrs: { label: "否", value: "0" }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { staticClass: "item", attrs: { label: "用户描述" } },
                    [
                      _c("el-input", {
                        attrs: { type: "textarea" },
                        model: {
                          value: _vm.addInfo.describe,
                          callback: function($$v) {
                            _vm.$set(_vm.addInfo, "describe", $$v)
                          },
                          expression: "addInfo.describe"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.isShowAdd = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      return _vm.addRole("ruleForm")
                    }
                  }
                },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "角色菜单分配",
            visible: _vm.isShowMenu,
            width: "50%"
          },
          on: {
            "update:visible": function($event) {
              _vm.isShowMenu = $event
            }
          }
        },
        [
          _c(
            "div",
            [
              _c("el-tree", {
                ref: "tree",
                attrs: {
                  "node-key": "name",
                  "default-checked-keys": _vm.defaultChecked,
                  data: _vm.routes,
                  "show-checkbox": "",
                  "default-expand-all": "",
                  props: _vm.defaultProps
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.isShowMenu = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                { attrs: { type: "primary" }, on: { click: _vm.addMenus } },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "角色用户分配",
            visible: _vm.isShowUser,
            width: "40%"
          },
          on: {
            "update:visible": function($event) {
              _vm.isShowUser = $event
            }
          }
        },
        [
          _c(
            "div",
            [
              _c(
                "el-table",
                {
                  ref: "multipleTableBus",
                  attrs: { data: _vm.allotUserList, border: "" },
                  on: { "selection-change": _vm.handleSelectionChange }
                },
                [
                  _c("el-table-column", {
                    attrs: { type: "selection", width: "55" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "用户名称", prop: "nickname" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "用户编号", prop: "uid" }
                  }),
                  _vm._v(" "),
                  _c("el-table-column", {
                    attrs: { label: "所属公司", prop: "customer_name" }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.isShowUser = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                { attrs: { type: "primary" }, on: { click: _vm.allot } },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "角色小程序分配",
            visible: _vm.isShowApp,
            width: "40%"
          },
          on: {
            "update:visible": function($event) {
              _vm.isShowApp = $event
            }
          }
        },
        [
          _c(
            "div",
            [
              _c(
                "el-checkbox-group",
                {
                  model: {
                    value: _vm.checkList,
                    callback: function($$v) {
                      _vm.checkList = $$v
                    },
                    expression: "checkList"
                  }
                },
                _vm._l(_vm.listapp, function(item) {
                  return _c(
                    "el-checkbox",
                    {
                      key: item.id,
                      staticClass: "check_list",
                      attrs: { label: item.id }
                    },
                    [_vm._v(_vm._s(item.name))]
                  )
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "dialog-footer",
              attrs: { slot: "footer" },
              slot: "footer"
            },
            [
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      _vm.isShowApp = false
                    }
                  }
                },
                [_vm._v("取 消")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                { attrs: { type: "primary" }, on: { click: _vm.allotApp } },
                [_vm._v("确 定")]
              )
            ],
            1
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/_core-js@2.6.9@core-js/modules/_strict-method.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_core-js@2.6.9@core-js/modules/_strict-method.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ "./node_modules/_core-js@2.6.9@core-js/modules/_fails.js");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "./node_modules/_core-js@2.6.9@core-js/modules/es6.array.sort.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_core-js@2.6.9@core-js/modules/es6.array.sort.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ "./node_modules/_core-js@2.6.9@core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/_core-js@2.6.9@core-js/modules/_a-function.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/_core-js@2.6.9@core-js/modules/_to-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/_core-js@2.6.9@core-js/modules/_fails.js");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ "./node_modules/_core-js@2.6.9@core-js/modules/_strict-method.js")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container .top[data-v-0348f245] {\n  padding: 10px;\n}\n.container .top .line[data-v-0348f245] {\n    width: 100%;\n    margin: 15px -10px;\n    height: 1px;\n    background-color: #000;\n}\n.container .user_search[data-v-0348f245] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 20px;\n}\n.container .user_search .ipt-search[data-v-0348f245] {\n    width: 300px;\n    margin-right: 10px;\n}\n.container .main-body[data-v-0348f245] {\n  padding: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.container .main-body .lf_list[data-v-0348f245],\n  .container .main-body .rt_info[data-v-0348f245] {\n    width: 50%;\n}\n.container .info[data-v-0348f245] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.container .info .item[data-v-0348f245] {\n    width: 50%;\n    padding: 15px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.container .info .item .tit[data-v-0348f245] {\n      width: 50%;\n      font-size: 14px;\n      color: #606266;\n}\n.container .info .textarea[data-v-0348f245] {\n    width: 100%;\n    padding: 15px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.container .info .textarea span[data-v-0348f245] {\n      width: 10%;\n      color: #606266;\n      font-size: 14px;\n}\n.container .info .textarea .ipt[data-v-0348f245] {\n      width: 50%;\n}\n.container .check_list[data-v-0348f245] {\n  margin: 10px 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/index.js?!./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_vue-style-loader@4.1.2@vue-style-loader??ref--8-oneOf-1-0!./node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js").default
var update = add("7fa8969a", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/api/account.js":
/*!****************************!*\
  !*** ./src/api/account.js ***!
  \****************************/
/*! exports provided: adminlist, adminlistAdmin, adduser, updateValid, setpassword, deleteuser, uploadpic, rolelist, clientlist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminlist", function() { return adminlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminlistAdmin", function() { return adminlistAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adduser", function() { return adduser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateValid", function() { return updateValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setpassword", function() { return setpassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteuser", function() { return deleteuser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadpic", function() { return uploadpic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rolelist", function() { return rolelist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientlist", function() { return clientlist; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");

function adminlist(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/admin/list',
    method: 'post',
    data: data
  });
}
function adminlistAdmin(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/admin/listAdmin',
    method: 'post',
    data: data
  });
}
function adduser(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/admin/add',
    method: 'post',
    data: data
  });
}
function updateValid(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/admin/updateValid',
    method: 'post',
    data: data
  });
}
function setpassword(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/admin/reset-password',
    method: 'post',
    data: data
  });
}
function deleteuser(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/admin/delete',
    method: 'post',
    data: data
  });
}
function uploadpic(fromdata) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/file/upload',
    method: 'post',
    fromdata: fromdata,
    data: {},
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
function rolelist(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/list',
    method: 'post',
    data: data
  });
}
function clientlist(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/customer/list',
    method: 'post',
    data: data
  });
}

/***/ }),

/***/ "./src/api/role.js":
/*!*************************!*\
  !*** ./src/api/role.js ***!
  \*************************/
/*! exports provided: getRoutes, addRole, updateRole, deleteRole, rolelist, addroles, deleteroles, updateavail, roleAdmin, addRoleMenu, addRoleApp, applist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoutes", function() { return getRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addRole", function() { return addRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateRole", function() { return updateRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteRole", function() { return deleteRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rolelist", function() { return rolelist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addroles", function() { return addroles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteroles", function() { return deleteroles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateavail", function() { return updateavail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roleAdmin", function() { return roleAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addRoleMenu", function() { return addRoleMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addRoleApp", function() { return addRoleApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applist", function() { return applist; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");

function getRoutes() {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/routes',
    method: 'get'
  });
}
function addRole(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: '/role',
    method: 'post',
    data: data
  });
}
function updateRole(id, data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: "/role/".concat(id),
    method: 'put',
    data: data
  });
}
function deleteRole(id) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: "/role/".concat(id),
    method: 'delete'
  });
}
function rolelist(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/list',
    method: 'post',
    data: data
  });
}
function addroles(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/add',
    method: 'post',
    data: data
  });
}
function deleteroles(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/delete',
    method: 'post',
    data: data
  });
}
function updateavail(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/update',
    method: 'post',
    data: data
  });
}
function roleAdmin(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/addRoleAdmin',
    method: 'post',
    data: data
  });
}
function addRoleMenu(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/addRoleMenu',
    method: 'post',
    data: data
  });
}
function addRoleApp(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/role/addRoleApp',
    method: 'post',
    data: data
  });
}
function applist() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: 'app/setting/customer/listapp',
    method: 'post',
    data: data
  });
}

/***/ }),

/***/ "./src/utils/orderBy.js":
/*!******************************!*\
  !*** ./src/utils/orderBy.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.sort */ "./node_modules/_core-js@2.6.9@core-js/modules/es6.array.sort.js");
/* harmony import */ var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    orderBy: function orderBy(obj, column, type) {
      var orderBy = type.toUpperCase();

      if (['ASC', 'DESC'].indexOf(orderBy) === -1) {
        // console.error($type, 'Not valid, please use ASC or DESC')
        return;
      }

      this['order' + orderBy](obj, column);
    },
    orderASC: function orderASC(obj, column) {
      obj.sort(function (a, b) {
        return parseInt(a[column]) > parseInt(b[column]) ? 1 : parseInt(b[column]) > parseInt(a[column]) ? -1 : 0;
      });
    },
    orderDESC: function orderDESC(obj, column) {
      obj.sort(function (a, b) {
        return parseInt(a[column]) > parseInt(b[column]) ? -1 : parseInt(b[column]) > parseInt(a[column]) ? 1 : 0;
      });
    }
  }
});

/***/ }),

/***/ "./src/views/role/role.vue":
/*!*********************************!*\
  !*** ./src/views/role/role.vue ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./role.vue?vue&type=template&id=0348f245&scoped=true& */ "./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true&");
/* harmony import */ var _role_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./role.vue?vue&type=script&lang=js& */ "./src/views/role/role.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _role_vue_vue_type_style_index_0_id_0348f245_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& */ "./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_15_7_0_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/_vue-loader@15.7.0@vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_15_7_0_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _role_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0348f245",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/_vue-hot-reload-api@2.3.3@vue-hot-reload-api/dist/index.js */ "./node_modules/_vue-hot-reload-api@2.3.3@vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/_vue@2.6.10@vue/dist/vue.runtime.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('0348f245', component.options)
    } else {
      api.reload('0348f245', component.options)
    }
    module.hot.accept(/*! ./role.vue?vue&type=template&id=0348f245&scoped=true& */ "./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./role.vue?vue&type=template&id=0348f245&scoped=true& */ "./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true&");
(function () {
      api.rerender('0348f245', {
        render: _role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "src/views/role/role.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/role/role.vue?vue&type=script&lang=js&":
/*!**********************************************************!*\
  !*** ./src/views/role/role.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_8_0_6_babel_loader_lib_index_js_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/_babel-loader@8.0.6@babel-loader/lib!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./role.vue?vue&type=script&lang=js& */ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_8_0_6_babel_loader_lib_index_js_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_style_index_0_id_0348f245_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/_vue-style-loader@4.1.2@vue-style-loader??ref--8-oneOf-1-0!../../../node_modules/_css-loader@1.0.1@css-loader??ref--8-oneOf-1-1!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true& */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/index.js?!./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@7.1.0@sass-loader/lib/loader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=style&index=0&id=0348f245&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_style_index_0_id_0348f245_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_style_index_0_id_0348f245_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_style_index_0_id_0348f245_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_style_index_0_id_0348f245_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_7_1_0_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_style_index_0_id_0348f245_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true&":
/*!****************************************************************************!*\
  !*** ./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5a55f599_vue_loader_template_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5a55f599-vue-loader-template"}!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/_vue-loader@15.7.0@vue-loader/lib??vue-loader-options!./role.vue?vue&type=template&id=0348f245&scoped=true& */ "./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5a55f599-vue-loader-template\"}!./node_modules/_vue-loader@15.7.0@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.7.0@vue-loader/lib/index.js?!./src/views/role/role.vue?vue&type=template&id=0348f245&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5a55f599_vue_loader_template_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5a55f599_vue_loader_template_node_modules_vue_loader_15_7_0_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_7_0_vue_loader_lib_index_js_vue_loader_options_role_vue_vue_type_template_id_0348f245_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=34.js.map