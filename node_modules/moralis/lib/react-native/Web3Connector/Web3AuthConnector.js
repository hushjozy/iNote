var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3Auth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

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
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var Web3Auth = function (_AbstractWeb3Connecto) {
  (0, _inherits2.default)(Web3Auth, _AbstractWeb3Connecto);

  var _super = _createSuper(Web3Auth);

  function Web3Auth() {
    var _this;

    (0, _classCallCheck2.default)(this, Web3Auth);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'web3Auth';

    _this.activate = function () {
      var _ref,
          _ref$chainId,
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

      return _regenerator.default.async(function (_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref$chainId = _ref.chainId, chainId = _ref$chainId === void 0 ? '0x1' : _ref$chainId, clientId = _ref.clientId, theme = _ref.theme, appLogo = _ref.appLogo, loginMethodsOrder = _ref.loginMethodsOrder;

              if (clientId) {
                _context.next = 3;
                break;
              }

              throw new Error('"clientId" not provided, please provide clientId');

            case 3:
              try {
                _Web3Auth = (_require = require('@web3auth/web3auth')) == null ? void 0 : _require.Web3Auth;
              } catch (_unused) {}

              if (!_Web3Auth) {
                _Web3Auth = (_window = window) == null ? void 0 : (_window$Web3auth = _window.Web3auth) == null ? void 0 : _window$Web3auth.Web3Auth;
              }

              if (_Web3Auth) {
                _context.next = 7;
                break;
              }

              throw new Error('"@web3auth/web3auth" not installed, please install');

            case 7:
              ethChainConfig = {
                chainNamespace: 'eip155',
                chainId: (0, _verifyChainId.default)(chainId)
              };

              try {
                web3auth = new _Web3Auth({
                  chainConfig: ethChainConfig,
                  uiConfig: {
                    theme: theme != null ? theme : 'dark',
                    appLogo: appLogo != null ? appLogo : 'https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg',
                    loginMethodsOrder: loginMethodsOrder
                  },
                  clientId: clientId
                });
              } catch (_unused2) {}

              if (web3auth) {
                _context.next = 11;
                break;
              }

              throw new Error('Could not connect via Web3Auth, error during initializing Web3Auth');

            case 11:
              _context.next = 13;
              return _regenerator.default.awrap(web3auth.initModal());

            case 13:
              provider = null;
              _context.prev = 14;
              _context.next = 17;
              return _regenerator.default.awrap(web3auth.connect());

            case 17:
              provider = _context.sent;
              _context.next = 22;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](14);

            case 22:
              if (provider) {
                _context.next = 24;
                break;
              }

              throw new Error('Could not connect via Web3Auth, error in connecting to provider');

            case 24:
              _context.prev = 24;
              isSocialLogin = (_web3auth = web3auth) != null && _web3auth.provider ? false : true;
              ether = new _ethers.ethers.providers.Web3Provider((_web3auth2 = web3auth) != null && _web3auth2.provider ? web3auth.provider : web3auth);
              signer = ether.getSigner();
              _context.next = 30;
              return _regenerator.default.awrap(Promise.all([ether.getNetwork(), signer.getAddress()]));

            case 30:
              values = _context.sent;
              providerChainId = values[0].chainId;
              _this.account = values[1].toLocaleLowerCase();
              _this.chainId = "0x" + providerChainId.toString(16);
              _this.provider = isSocialLogin ? ether : (_web3auth3 = web3auth) == null ? void 0 : _web3auth3.provider;
              _this.web3Instance = web3auth;

              _this.subscribeToEvents(_this.provider);

              return _context.abrupt("return", {
                chainId: _this.chainId,
                account: _this.account,
                provider: _this.provider
              });

            case 40:
              _context.prev = 40;
              _context.t1 = _context["catch"](24);
              throw new Error('Could not connect via Web3Auth, error while authenticating');

            case 43:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[14, 20], [24, 40]], Promise);
    };

    _this.deactivate = function () {
      return _regenerator.default.async(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.unsubscribeToEvents(_this.provider);

              if (!_this.web3Instance) {
                _context2.next = 4;
                break;
              }

              _context2.next = 4;
              return _regenerator.default.awrap(_this.web3Instance.logout());

            case 4:
              _this.account = null;
              _this.chainId = null;
              _this.provider = null;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, null, Promise);
    };

    return _this;
  }

  return (0, _createClass2.default)(Web3Auth);
}(_AbstractWeb3Connector.default);

exports.Web3Auth = Web3Auth;