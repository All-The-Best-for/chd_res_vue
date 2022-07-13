"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  namespaced: true,
  //开启命名空间
  state: {
    goods: [],
    // 商品列表
    ratings: [],
    // 商家评价列表
    info: {},
    // 商家信息
    stallId: 0,
    //点击请求的档口id
    carts: [],
    //购物车数组，数组中存放stallId和cartFoods组成的对象
    newOrder: {},
    //本次登录最近一次下订单的订单信息，
    nowOrderId: 0,
    //当前选中的订单的Id，用于从订单列表中查找出要处理的订单
    userOrders: [] // 从后端返回的本用户的订单信息数组，

  },
  mutations: {
    RECEIVE_INFO: function RECEIVE_INFO(state, _ref) {
      var info = _ref.info;
      state.info = info;
    },
    RECEIVE_RATINGS: function RECEIVE_RATINGS(state, _ref2) {
      var ratings = _ref2.ratings;
      state.ratings = ratings;
    },
    RECEIVE_GOODS: function RECEIVE_GOODS(state, _ref3) {
      var goods = _ref3.goods;
      state.goods = goods;
    },
    // 对组件中的餐品选中数量进行加减，这个数据不需要持久化记录，也不需要区分用户，不同于购物车中的数据
    ADD_FOOD_COUNT: function ADD_FOOD_COUNT(state, _ref4) {
      var food = _ref4.food;
      var a = 0;
      state.carts.forEach(function (cart) {
        // 如果购物车列表中已经有了这个店铺的购物车
        if (cart.stallId === state.stallId) {
          a = 1;
          var b = 0;
          cart.cartFoods.forEach(function (aFood) {
            if (aFood.dishId === food.dishId) {
              b = 1;
              aFood.count++;
            }
          });

          if (b === 0) {
            _vue["default"].set(food, 'count', 1);

            cart.cartFoods.push(food);
          }
        }
      });

      if (a === 0) {
        // 先将要装入cartFoods的对象构造出来
        var newCart = {};
        var cartFoods = [];

        _vue["default"].set(newCart, 'stallId', state.stallId);

        _vue["default"].set(food, 'count', 1);

        cartFoods.push(food);

        _vue["default"].set(newCart, 'cartFoods', cartFoods);

        state.carts.push(newCart);
      }
    },
    DECREMENT_FOOD_COUNT: function DECREMENT_FOOD_COUNT(state, _ref5) {
      var food = _ref5.food;
      state.carts.forEach(function (cart) {
        // 如果购物车列表中已经有了这个店铺的购物车
        if (cart.stallId === state.stallId) {
          if (food.count > 0) {
            food.count--;

            if (food.count === 0) {
              // 用下标将food从cartFoods中移除
              cart.cartFoods.splice(cart.cartFoods.indexOf(food), 1);
            }
          }
        }
      });
    },
    CLEAR_SHOP_CART: function CLEAR_SHOP_CART(state) {
      state.carts.forEach(function (cart) {
        // 如果购物车列表中已经有了这个店铺的购物车
        if (cart.stallId === state.stallId) {
          cart.cartFoods = [];
        }
      });
    },
    // 变更点击的stallId
    CHANGE_STALL_ID: function CHANGE_STALL_ID(state, _ref6) {
      var stallId = _ref6.stallId;
      state.stallId = stallId;
    },
    // 变更选中的订单Id
    SET_NOW_ORDER_ID: function SET_NOW_ORDER_ID(state, _ref7) {
      var nowOrderId = _ref7.nowOrderId;
      state.nowOrderId = nowOrderId;
    }
  },
  actions: {
    // 获取商家信息
    getShopInfo: function getShopInfo(_ref8, _ref9) {
      var commit = _ref8.commit,
          state = _ref8.state;
      var shops = _ref9.shops;
      // 不需要发送请求了，直接从mySiteAbout中获取
      shops.forEach(function (shop) {
        if (shop.stallInfo.stallInfo.stallId === state.stallId) {
          var stallInfo = shop.stallInfo.stallInfo;
          commit('RECEIVE_INFO', {
            info: stallInfo
          });
        }
      });
    },
    // 获取商家评价列表
    getShopRatings: function getShopRatings(_ref10) {// const result = await reqShopRatings()
      // if(result.code===0) {
      //     const ratings = result.data
      //     commit('RECEIVE_RATINGS', {ratings})
      // }

      var commit = _ref10.commit;
    },
    // 获取商家商品列表
    getShopGoods: function getShopGoods(_ref11, _ref12) {
      var commit = _ref11.commit,
          state = _ref11.state;
      var shops = _ref12.shops;
      shops.forEach(function (shop) {
        if (shop.stallInfo.stallInfo.stallId === state.stallId) {
          var info = shop.dishInfo.dishInfo;
          commit('RECEIVE_GOODS', {
            goods: info
          });
        }
      });
    },
    // 同步更新food中的count值
    updateFoodCount: function updateFoodCount(_ref13, _ref14) {
      var commit = _ref13.commit;
      var isAdd = _ref14.isAdd,
          food = _ref14.food;

      if (isAdd) {
        commit('ADD_FOOD_COUNT', {
          food: food
        });
      } else {
        commit('DECREMENT_FOOD_COUNT', {
          food: food
        });
      }
    },
    // 清空购物车
    clearCart: function clearCart(_ref15) {
      var commit = _ref15.commit;
      commit('CLEAR_SHOP_CART');
    },
    // 修改stallId
    changeId: function changeId(_ref16, _ref17) {
      var commit = _ref16.commit;
      var stallId = _ref17.stallId;
      commit('CHANGE_STALL_ID', {
        stallId: stallId
      });
    },
    changeNowOrderId: function changeNowOrderId(_ref18, _ref19) {
      var commit = _ref18.commit;
      var nowOrderId = _ref19.nowOrderId;
      commit('SET_NOW_ORDER_ID', {
        nowOrderId: nowOrderId
      });
    },
    // 购物车中的总件数
    totalCount: function totalCount(_ref20, _ref21) {
      var state = _ref20.state;
      var stallId = _ref21.stallId;
      state.carts.forEach(function (cart) {
        if (cart.stallId === stallId) {
          return cart.cartFoods.reduce(function (preTotal, food) {
            return preTotal + food.count;
          }, 0);
        }
      });
    },
    // 购物车中的总价格
    totalPrice: function totalPrice(_ref22, _ref23) {
      var state = _ref22.state;
      var stallId = _ref23.stallId;
      state.carts.forEach(function (cart) {
        if (cart.stallId === stallId) {
          return cart.cartFoods.reduce(function (preTotal, food) {
            return preTotal + food.dishPrice * food.count;
          }, 0);
        }
      });
    },
    // 返回当前店铺购物车
    nowCart: function nowCart(_ref24) {
      var state = _ref24.state;
      state.carts.forEach(function (cart) {
        if (cart.stallId === state.stallId) {
          return cart.cartFoods;
        }
      });
    },
    // 先生成一个vuex存储的订单信息，再异步提交订单信息
    createOrder: function createOrder(_ref25, _ref26) {
      var state = _ref25.state;
      var totalPrice = _ref26.totalPrice,
          userId = _ref26.userId;
      // 生成一个请求参数对象
      var newOrder = {};
      state.carts.forEach(function (cart) {
        // 找到这个店铺的购物车
        if (cart.stallId === state.stallId) {
          // 生成一个orderId,以当前时间和用户id生成orderId
          var date = Date.parse(new Date());
          var orderId = Number(date / 1000) + userId;
          var orderTime = (0, _dayjs["default"])(date).format('YYYY-MM-DD HH:mm:ss');

          _vue["default"].set(newOrder, 'userId', userId);

          _vue["default"].set(newOrder, 'orderId', orderId);

          _vue["default"].set(newOrder, 'orderAmount', totalPrice);

          _vue["default"].set(newOrder, 'orderTime', orderTime);

          _vue["default"].set(newOrder, 'orderDishs', cart.cartFoods);

          _vue["default"].set(newOrder, 'stallInfo', state.info);
        }
      });
      state.newOrder = newOrder;
    }
  },
  getters: {
    // 满意评论的数量
    positiveSize: function positiveSize(state) {
      return state.ratings.reduce(function (preTotal, rating) {
        return preTotal + (rating.rateType === 0 ? 1 : 0);
      }, 0);
    }
  }
};
exports["default"] = _default;