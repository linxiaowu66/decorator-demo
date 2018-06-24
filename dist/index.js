
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function inject1(target, name, descriptor) {
  console.log('inject1 decorator...', target, name, descriptor);
  return {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value() {
      console.log('this is called by the inject1 value');
    }
  };
}

function inject(target, name, descriptor) {
  var initializer = descriptor.initializer;


  console.log('inject decorator...', initializer);

  return {
    enumerable: false,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return function () {
        console.log('this is called by inject initializer');
      };
    }
  };
}

function inject2(target, name, descriptor) {
  var _this = this;

  return {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    // value: function(...args) {
    //   descriptor.value.apply(this, args)
    // }
    value: function value() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      descriptor.value.apply(_this, args);
    }
  };
}

var A = function A() {
  _classCallCheck(this, A);
};

var B = (_class = function (_A) {
  _inherits(B, _A);

  function B() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, B);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = B.__proto__ || Object.getPrototypeOf(B)).call.apply(_ref, [this].concat(args))), _this2), _this2.val = 10, _initDefineProp(_this2, 'method', _descriptor, _this2), _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(B, [{
    key: 'method1',
    value: function method1() {}
  }, {
    key: 'method2',
    value: function method2() {
      this.val = 100;
      console.log(this.val);
    }
  }, {
    key: 'method3',
    value: function method3() {
      console.log(this);
    }
  }]);

  return B;
}(A), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'method', [inject], {
  enumerable: true,
  initializer: function initializer() {
    return function () {};
  }
}), _applyDecoratedDescriptor(_class.prototype, 'method1', [inject1], Object.getOwnPropertyDescriptor(_class.prototype, 'method1'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'method2', [inject2], Object.getOwnPropertyDescriptor(_class.prototype, 'method2'), _class.prototype)), _class);


var inis = new B();

inis.method();

inis.method1();

inis.method2();

inis.method3();