"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.Web3Auth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _ethers = require("ethers");

var _verifyChainId = _interopRequireDefault(require("../utils/verifyChainId"));

var _AbstractWeb3Connector = _interopRequireDefault(require("./AbstractWeb3Connector"));

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function () {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = _Reflect$construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_Reflect$construct) return false;
  if (_Reflect$construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var Web3Auth = /*#__PURE__*/function (_AbstractWeb3Connecto) {
  (0, _inherits2.default)(Web3Auth, _AbstractWeb3Connecto);

  var _super = _createSuper(Web3Auth);

  function Web3Auth() {
    var _context;

    var _this;

    (0, _classCallCheck2.default)(this, Web3Auth);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, (0, _concat.default)(_context = [this]).call(_context, args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "type", 'web3Auth');
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "activate", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _ref2,
          _ref2$chainId,
          chainId,
          clientId,
          theme,
          appLogo,
          loginMethodsOrder,
          _Web3Auth,
          _require,
          _window,
          _window$Web3auth,
          ethChainConfig,
          web3auth,
          provider,
          _web3auth,
          _web3auth2,
          _web3auth3,
          isSocialLogin,
          ether,
          signer,
          values,
          providerChainId,
          _args = arguments;

      return _regenerator.default.wrap(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$chainId = _ref2.chainId, chainId = _ref2$chainId === void 0 ? '0x1' : _ref2$chainId, clientId = _ref2.clientId, theme = _ref2.theme, appLogo = _ref2.appLogo, loginMethodsOrder = _ref2.loginMethodsOrder;

              if (clientId) {
                _context2.next = 3;
                break;
              }

              throw new Error('"clientId" not provided, please provide clientId');

            case 3:
              try {
                _Web3Auth = (_require = require('@web3auth/web3auth')) === null || _require === void 0 ? void 0 : _require.Web3Auth;
              } catch (_unused) {// Do Nothing Individual Checks are done below
              } // Check if user is using CDN to import


              if (!_Web3Auth) {
                _Web3Auth = (_window = window) === null || _window === void 0 ? void 0 : (_window$Web3auth = _window.Web3auth) === null || _window$Web3auth === void 0 ? void 0 : _window$Web3auth.Web3Auth;
              } // Error checking for if library is not installed


              if (_Web3Auth) {
                _context2.next = 7;
                break;
              }

              throw new Error('"@web3auth/web3auth" not installed, please install');

            case 7:
              // Build config
              ethChainConfig = {
                chainNamespace: 'eip155',
                chainId: (0, _verifyChainId.default)(chainId)
              }; // Build Web3Auth

              try {
                web3auth = new _Web3Auth({
                  chainConfig: ethChainConfig,
                  uiConfig: {
                    theme: theme !== null && theme !== void 0 ? theme : 'dark',
                    appLogo: appLogo !== null && appLogo !== void 0 ? appLogo : 'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg',
                    loginMethodsOrder: loginMethodsOrder
                  },
                  clientId: clientId
                });
              } catch (_unused2) {// Do Nothing error checked below
              }

              if (web3auth) {
                _context2.next = 11;
                break;
              }

              throw new Error('Could not connect via Web3Auth, error during initializing Web3Auth');

            case 11:
              _context2.next = 13;
              return web3auth.initModal();

            case 13:
              provider = null;
              _context2.prev = 14;
              _context2.next = 17;
              return web3auth.connect();

            case 17:
              provider = _context2.sent;
              _context2.next = 22;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](14);

            case 22:
              if (provider) {
                _context2.next = 24;
                break;
              }

              throw new Error('Could not connect via Web3Auth, error in connecting to provider');

            case 24:
              _context2.prev = 24;
              isSocialLogin = (_web3auth = web3auth) !== null && _web3auth !== void 0 && _web3auth.provider ? false : true;
              ether = new _ethers.ethers.providers.Web3Provider((_web3auth2 = web3auth) !== null && _web3auth2 !== void 0 && _web3auth2.provider ? web3auth.provider : web3auth);
              signer = ether.getSigner();
              _context2.next = 30;
              return _promise.default.all([ether.getNetwork(), signer.getAddress()]);

            case 30:
              values = _context2.sent;
              providerChainId = values[0].chainId;
              _this.account = values[1].toLocaleLowerCase();
              _this.chainId = "0x".concat(providerChainId.toString(16));
              _this.provider = isSocialLogin ? ether : (_web3auth3 = web3auth) === null || _web3auth3 === void 0 ? void 0 : _web3auth3.provider;
              _this.web3Instance = web3auth;

              _this.subscribeToEvents(_this.provider);

              return _context2.abrupt("return", {
                chainId: _this.chainId,
                account: _this.account,
                provider: _this.provider
              });

            case 40:
              _context2.prev = 40;
              _context2.t1 = _context2["catch"](24);
              throw new Error('Could not connect via Web3Auth, error while authenticating');

            case 43:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, null, [[14, 20], [24, 40]]);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "deactivate", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function (_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.unsubscribeToEvents(_this.provider);

              if (!_this.web3Instance) {
                _context3.next = 4;
                break;
              }

              _context3.next = 4;
              return _this.web3Instance.logout();

            case 4:
              _this.account = null;
              _this.chainId = null;
              _this.provider = null;

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    })));
    return _this;
  }

  return (0, _createClass2.default)(Web3Auth);
}(_AbstractWeb3Connector.default);

exports.Web3Auth = Web3Auth;