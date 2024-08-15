var Xe = Object.defineProperty;
var Qe = (r, e, t) => e in r ? Xe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var je = (r, e, t) => (Qe(r, typeof e != "symbol" ? e + "" : e, t), t);
const Fe = "opacity: 0.5; cursor: not-allowed;";
let fe;
const pe = (r) => {
  var t, n;
  fe || (fe = ((n = (t = document.querySelector("[type=submit]")) == null ? void 0 : t.style) == null ? void 0 : n.cssText) ?? "");
  const e = document.querySelector("[type=submit]");
  return e ? (e.disabled = r, e.style.cssText = r ? fe + Fe : fe, e) : null;
}, Ve = (r, e) => {
  let t;
  return (...n) => {
    clearTimeout(t), t = window.setTimeout(() => {
      r(...n);
    }, e);
  };
}, me = ({
  shouldDisplayError: r,
  element: e,
  errorMessage: t
}) => {
  var s, a;
  (s = e.parentElement) != null && s.querySelector(".course-already-bought-error") || e.insertAdjacentHTML(
    "afterend",
    `<div class="error course-already-bought-error">${t}</div>`
  );
  const n = (a = e.parentElement) == null ? void 0 : a.querySelector(
    ".course-already-bought-error"
  );
  n && (n.style.cssText = r ? "" : "display: none;");
};
let Y;
const et = async ({
  target: r,
  errorMessage: e,
  courseId: t,
  localDev: n = !1
}) => {
  if (!(r instanceof HTMLInputElement))
    return;
  const s = r.value;
  if (Y == null || Y.abort(), !s)
    return;
  Y = new AbortController();
  const a = Y.signal, o = await fetch(
    `${n ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/is-registered?email=${s}&course=${t}`,
    { signal: a }
  ).then(
    (f) => f.json()
  ).catch((f) => {
    console.log(f);
  }), d = !!(o != null && o.isAlreadyRegistered);
  r.setCustomValidity(d ? e : "");
  const u = pe(d);
  u && me({
    shouldDisplayError: d,
    element: u,
    errorMessage: e
  }), me({
    shouldDisplayError: d,
    element: r,
    errorMessage: e
  });
}, tt = Ve(et, 500), kr = ({
  errorMessage: r = "Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.",
  courseId: e = "generalCourseParticipantOrCommunityMember",
  localDev: t = !1
} = {}) => {
  var a;
  (a = document.querySelector('[name="email"]')) == null || a.addEventListener("input", (i) => {
    i.target && (pe(!0), tt({
      target: i.target,
      errorMessage: r,
      courseId: e,
      localDev: t
    }));
  });
  const n = document.querySelector('[name="email"]'), s = n == null ? void 0 : n.value;
  n == null || n.dispatchEvent(
    new Event("input", {
      bubbles: !0,
      cancelable: !0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: s
    })
  );
};
let K;
const rt = async ({
  orgName: r,
  groupName: e,
  localDev: t = !1,
  onValid: n,
  onInvalid: s,
  onEmptyInput: a
}) => {
  if (K == null || K.abort(), !r || !e)
    return a();
  K = new AbortController();
  const i = K.signal, d = await fetch(
    `${t ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/ortsgruppenname-is-valid?orgName=${r}&groupName=${e}`,
    { signal: i }
  ).then(
    (f) => f.json()
  ).catch((f) => {
    if (f.name === "AbortError")
      return "aborted";
    console.log(f);
  });
  if (d === "aborted")
    return;
  !!(d != null && d.isGroupNameValid) ? n() : s();
}, nt = Ve(rt, 500), ge = (r) => {
  const e = document.querySelector(r.query);
  return e ? r.getValue ? r.getValue(e) : e.value : "";
}, Ae = (r, e) => {
  let t = ge(r);
  e(t);
  const n = () => {
    const i = ge(r);
    t !== i && (t = i, e(i));
  }, s = () => {
    const i = document.querySelector(r.query) ?? document.body, o = new MutationObserver(() => {
      n();
    });
    return o.observe(i, {
      attributes: !0,
      childList: !0,
      subtree: !0,
      characterData: !0
    }), () => {
      o.disconnect();
    };
  }, a = () => {
    const i = document.querySelector(r.query);
    if (i)
      return i.addEventListener("input", n), () => {
        i.removeEventListener("input", n);
      };
  };
  return r.getValue ? s() : a();
}, xr = ({
  orgNameSelector: r,
  groupNameSelector: e,
  errorMessage: t,
  localDev: n = !1
}) => {
  let s = ge(r), a = ge(e);
  const i = (d) => {
    const u = pe(d);
    u && me({
      element: u,
      shouldDisplayError: d,
      errorMessage: t
    });
    const f = document.querySelector(e.query);
    f && me({
      element: f,
      shouldDisplayError: d,
      errorMessage: t
    });
  }, o = () => {
    i(!1), pe(!0), nt({
      orgName: s,
      groupName: a,
      localDev: n,
      onValid: () => {
        i(!1);
      },
      onInvalid: () => {
        i(!0);
      },
      onEmptyInput: () => {
        i(!1);
      }
    });
  };
  Ae(r, (d) => {
    s = d, o();
  }), Ae(e, (d) => {
    a = d, o();
  });
}, Pe = async (r, e) => {
  const { default: t } = await e(), n = document.createElement("style");
  n.innerHTML = t, r.appendChild(n);
}, st = (r) => Pe(r, () => import("./style-DC2QuTw5.js")), at = (r) => new Promise((e) => setTimeout(e, r));
class it {
  constructor() {
    je(this, "email", "");
  }
  trackEmailInput() {
    var e;
    (e = document.querySelector('input[type="email"]')) == null || e.addEventListener("input", (t) => {
      const n = t.target;
      this.email = n.value;
    });
  }
  getEmail() {
    return this.email;
  }
}
const ot = async ({
  email: r,
  localDev: e = !1
}) => r ? (await fetch(
  `${e ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/get-redirect-url?email=${r}`
).then(
  (a) => a.json()
)).redirectUrl : "", ct = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
  </path>
</svg>`, dt = (r) => {
  const e = document.createElement("div");
  return e.innerHTML = ct, e.className = "object-fill p-8 mx-auto size-32", r.appendChild(e), e;
}, ut = () => new Promise((r) => {
  new MutationObserver((t, n) => {
    for (const s of t)
      s.type === "childList" && Array.from(s.addedNodes).find(
        (o) => {
          var d;
          return o instanceof HTMLElement && (((d = o.classList) == null ? void 0 : d.contains("thank-you-message")) || o.querySelector(".thank-you-message"));
        }
      ) && (n.disconnect(), r());
  }).observe(document.body, { childList: !0, subtree: !0 });
}), br = async ({
  localDev: r = !1,
  successMessage: e
}) => {
  const t = new it();
  t.trackEmailInput(), await ut();
  const n = document.querySelector(".thank-you-message");
  await st(n), dt(n);
  const s = t.getEmail();
  let a = "";
  for (; !a; )
    a = await ot({ email: s, localDev: r }), await at(2500);
  window.location.href = a;
  const i = typeof e == "function" ? e(a) : e;
  i && (n.innerHTML = i);
};
var _;
(function(r) {
  r.assertEqual = (s) => s;
  function e(s) {
  }
  r.assertIs = e;
  function t(s) {
    throw new Error();
  }
  r.assertNever = t, r.arrayToEnum = (s) => {
    const a = {};
    for (const i of s)
      a[i] = i;
    return a;
  }, r.getValidEnumValues = (s) => {
    const a = r.objectKeys(s).filter((o) => typeof s[s[o]] != "number"), i = {};
    for (const o of a)
      i[o] = s[o];
    return r.objectValues(i);
  }, r.objectValues = (s) => r.objectKeys(s).map(function(a) {
    return s[a];
  }), r.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const i in s)
      Object.prototype.hasOwnProperty.call(s, i) && a.push(i);
    return a;
  }, r.find = (s, a) => {
    for (const i of s)
      if (a(i))
        return i;
  }, r.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function n(s, a = " | ") {
    return s.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  r.joinValues = n, r.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(_ || (_ = {}));
var Ze;
(function(r) {
  r.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Ze || (Ze = {}));
const h = _.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), j = (r) => {
  switch (typeof r) {
    case "undefined":
      return h.undefined;
    case "string":
      return h.string;
    case "number":
      return isNaN(r) ? h.nan : h.number;
    case "boolean":
      return h.boolean;
    case "function":
      return h.function;
    case "bigint":
      return h.bigint;
    case "symbol":
      return h.symbol;
    case "object":
      return Array.isArray(r) ? h.array : r === null ? h.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? h.promise : typeof Map < "u" && r instanceof Map ? h.map : typeof Set < "u" && r instanceof Set ? h.set : typeof Date < "u" && r instanceof Date ? h.date : h.object;
    default:
      return h.unknown;
  }
}, c = _.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), lt = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
class w extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t = e || function(a) {
      return a.message;
    }, n = { _errors: [] }, s = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(s);
        else if (i.code === "invalid_return_type")
          s(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          s(i.argumentsError);
        else if (i.path.length === 0)
          n._errors.push(t(i));
        else {
          let o = n, d = 0;
          for (; d < i.path.length; ) {
            const u = i.path[d];
            d === i.path.length - 1 ? (o[u] = o[u] || { _errors: [] }, o[u]._errors.push(t(i))) : o[u] = o[u] || { _errors: [] }, o = o[u], d++;
          }
        }
    };
    return s(this), n;
  }
  static assert(e) {
    if (!(e instanceof w))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, _.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, n = [];
    for (const s of this.issues)
      s.path.length > 0 ? (t[s.path[0]] = t[s.path[0]] || [], t[s.path[0]].push(e(s))) : n.push(e(s));
    return { formErrors: n, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
w.create = (r) => new w(r);
const W = (r, e) => {
  let t;
  switch (r.code) {
    case c.invalid_type:
      r.received === h.undefined ? t = "Required" : t = `Expected ${r.expected}, received ${r.received}`;
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(r.expected, _.jsonStringifyReplacer)}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${_.joinValues(r.keys, ", ")}`;
      break;
    case c.invalid_union:
      t = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${_.joinValues(r.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${_.joinValues(r.options)}, received '${r.received}'`;
      break;
    case c.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case c.invalid_return_type:
      t = "Invalid function return type";
      break;
    case c.invalid_date:
      t = "Invalid date";
      break;
    case c.invalid_string:
      typeof r.validation == "object" ? "includes" in r.validation ? (t = `Invalid input: must include "${r.validation.includes}"`, typeof r.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith" in r.validation ? t = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith" in r.validation ? t = `Invalid input: must end with "${r.validation.endsWith}"` : _.assertNever(r.validation) : r.validation !== "regex" ? t = `Invalid ${r.validation}` : t = "Invalid";
      break;
    case c.too_small:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : t = "Invalid input";
      break;
    case c.too_big:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? t = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : t = "Invalid input";
      break;
    case c.custom:
      t = "Invalid input";
      break;
    case c.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case c.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case c.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, _.assertNever(r);
  }
  return { message: t };
};
let Le = W;
function ht(r) {
  Le = r;
}
function ye() {
  return Le;
}
const ve = (r) => {
  const { data: e, path: t, errorMaps: n, issueData: s } = r, a = [...t, ...s.path || []], i = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let o = "";
  const d = n.filter((u) => !!u).slice().reverse();
  for (const u of d)
    o = u(i, { data: e, defaultError: o }).message;
  return {
    ...s,
    path: a,
    message: o
  };
}, ft = [];
function l(r, e) {
  const t = ye(), n = ve({
    issueData: e,
    data: r.data,
    path: r.path,
    errorMaps: [
      r.common.contextualErrorMap,
      r.schemaErrorMap,
      t,
      t === W ? void 0 : W
      // then global default map
    ].filter((s) => !!s)
  });
  r.common.issues.push(n);
}
class x {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const n = [];
    for (const s of t) {
      if (s.status === "aborted")
        return g;
      s.status === "dirty" && e.dirty(), n.push(s.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, t) {
    const n = [];
    for (const s of t) {
      const a = await s.key, i = await s.value;
      n.push({
        key: a,
        value: i
      });
    }
    return x.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, t) {
    const n = {};
    for (const s of t) {
      const { key: a, value: i } = s;
      if (a.status === "aborted" || i.status === "aborted")
        return g;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || s.alwaysSet) && (n[a.value] = i.value);
    }
    return { status: e.value, value: n };
  }
}
const g = Object.freeze({
  status: "aborted"
}), U = (r) => ({ status: "dirty", value: r }), b = (r) => ({ status: "valid", value: r }), Ce = (r) => r.status === "aborted", Ne = (r) => r.status === "dirty", Q = (r) => r.status === "valid", F = (r) => typeof Promise < "u" && r instanceof Promise;
function _e(r, e, t, n) {
  if (t === "a" && !n)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? r !== e || !n : !e.has(r))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? n : t === "a" ? n.call(r) : n ? n.value : e.get(r);
}
function ze(r, e, t, n, s) {
  if (n === "m")
    throw new TypeError("Private method is not writable");
  if (n === "a" && !s)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? r !== e || !s : !e.has(r))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return n === "a" ? s.call(r, t) : s ? s.value = t : e.set(r, t), t;
}
var p;
(function(r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, r.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(p || (p = {}));
var J, X;
class N {
  constructor(e, t, n, s) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Me = (r, e) => {
  if (Q(e))
    return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new w(r.common.issues);
      return this._error = t, this._error;
    }
  };
};
function y(r) {
  if (!r)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: n, description: s } = r;
  if (e && (t || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (i, o) => {
    var d, u;
    const { message: f } = r;
    return i.code === "invalid_enum_value" ? { message: f ?? o.defaultError } : typeof o.data > "u" ? { message: (d = f ?? n) !== null && d !== void 0 ? d : o.defaultError } : i.code !== "invalid_type" ? { message: o.defaultError } : { message: (u = f ?? t) !== null && u !== void 0 ? u : o.defaultError };
  }, description: s };
}
class v {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return j(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: j(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new x(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: j(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (F(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const n = this.safeParse(e, t);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(e, t) {
    var n;
    const s = {
      common: {
        issues: [],
        async: (n = t == null ? void 0 : t.async) !== null && n !== void 0 ? n : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: j(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return Me(s, a);
  }
  async parseAsync(e, t) {
    const n = await this.safeParseAsync(e, t);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(e, t) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: j(e)
    }, s = this._parse({ data: e, path: n.path, parent: n }), a = await (F(s) ? s : Promise.resolve(s));
    return Me(n, a);
  }
  refine(e, t) {
    const n = (s) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(s) : t;
    return this._refinement((s, a) => {
      const i = e(s), o = () => a.addIssue({
        code: c.custom,
        ...n(s)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((d) => d ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof t == "function" ? t(n, s) : t), !1));
  }
  _refinement(e) {
    return new Z({
      schema: this,
      typeName: m.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return C.create(this, this._def);
  }
  nullable() {
    return V.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return S.create(this, this._def);
  }
  promise() {
    return H.create(this, this._def);
  }
  or(e) {
    return ne.create([this, e], this._def);
  }
  and(e) {
    return se.create(this, e, this._def);
  }
  transform(e) {
    return new Z({
      ...y(this._def),
      schema: this,
      typeName: m.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new de({
      ...y(this._def),
      innerType: this,
      defaultValue: t,
      typeName: m.ZodDefault
    });
  }
  brand() {
    return new Ie({
      typeName: m.ZodBranded,
      type: this,
      ...y(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ue({
      ...y(this._def),
      innerType: this,
      catchValue: t,
      typeName: m.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return he.create(this, e);
  }
  readonly() {
    return le.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const pt = /^c[^\s-]{8,}$/i, mt = /^[0-9a-z]+$/, gt = /^[0-9A-HJKMNP-TV-Z]{26}$/, yt = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, vt = /^[a-z0-9_-]{21}$/i, _t = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, kt = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, xt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Se;
const bt = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, wt = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Tt = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, De = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Et = new RegExp(`^${De}$`);
function Ue(r) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return r.precision ? e = `${e}\\.\\d{${r.precision}}` : r.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function St(r) {
  return new RegExp(`^${Ue(r)}$`);
}
function Be(r) {
  let e = `${De}T${Ue(r)}`;
  const t = [];
  return t.push(r.local ? "Z?" : "Z"), r.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function Zt(r, e) {
  return !!((e === "v4" || !e) && bt.test(r) || (e === "v6" || !e) && wt.test(r));
}
class E extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
      const a = this._getOrReturnCtx(e);
      return l(a, {
        code: c.invalid_type,
        expected: h.string,
        received: a.parsedType
      }), g;
    }
    const n = new x();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (s = this._getOrReturnCtx(e, s), i ? l(s, {
          code: c.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && l(s, {
          code: c.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), n.dirty());
      } else if (a.kind === "email")
        kt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "email",
          code: c.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "emoji")
        Se || (Se = new RegExp(xt, "u")), Se.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "emoji",
          code: c.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "uuid")
        yt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "uuid",
          code: c.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "nanoid")
        vt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "nanoid",
          code: c.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid")
        pt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "cuid",
          code: c.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid2")
        mt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "cuid2",
          code: c.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "ulid")
        gt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "ulid",
          code: c.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), l(s, {
            validation: "url",
            code: c.invalid_string,
            message: a.message
          }), n.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "regex",
          code: c.invalid_string,
          message: a.message
        }), n.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.invalid_string,
          validation: { includes: a.value, position: a.position },
          message: a.message
        }), n.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), n.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), n.dirty()) : a.kind === "datetime" ? Be(a).test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.invalid_string,
          validation: "datetime",
          message: a.message
        }), n.dirty()) : a.kind === "date" ? Et.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.invalid_string,
          validation: "date",
          message: a.message
        }), n.dirty()) : a.kind === "time" ? St(a).test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          code: c.invalid_string,
          validation: "time",
          message: a.message
        }), n.dirty()) : a.kind === "duration" ? _t.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "duration",
          code: c.invalid_string,
          message: a.message
        }), n.dirty()) : a.kind === "ip" ? Zt(e.data, a.version) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "ip",
          code: c.invalid_string,
          message: a.message
        }), n.dirty()) : a.kind === "base64" ? Tt.test(e.data) || (s = this._getOrReturnCtx(e, s), l(s, {
          validation: "base64",
          code: c.invalid_string,
          message: a.message
        }), n.dirty()) : _.assertNever(a);
    return { status: n.value, value: e.data };
  }
  _regex(e, t, n) {
    return this.refinement((s) => e.test(s), {
      validation: t,
      code: c.invalid_string,
      ...p.errToObj(n)
    });
  }
  _addCheck(e) {
    return new E({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...p.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...p.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...p.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...p.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...p.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...p.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...p.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...p.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...p.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...p.errToObj(e) });
  }
  datetime(e) {
    var t, n;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      local: (n = e == null ? void 0 : e.local) !== null && n !== void 0 ? n : !1,
      ...p.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...p.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...p.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...p.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...p.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...p.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...p.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...p.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...p.errToObj(t)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, p.errToObj(e));
  }
  trim() {
    return new E({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new E({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new E({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
E.create = (r) => {
  var e;
  return new E({
    checks: [],
    typeName: m.ZodString,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...y(r)
  });
};
function Ct(r, e) {
  const t = (r.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = t > n ? t : n, a = parseInt(r.toFixed(s).replace(".", "")), i = parseInt(e.toFixed(s).replace(".", ""));
  return a % i / Math.pow(10, s);
}
class A extends v {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const a = this._getOrReturnCtx(e);
      return l(a, {
        code: c.invalid_type,
        expected: h.number,
        received: a.parsedType
      }), g;
    }
    let n;
    const s = new x();
    for (const a of this._def.checks)
      a.kind === "int" ? _.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? Ct(e.data, a.value) !== 0 && (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.not_finite,
        message: a.message
      }), s.dirty()) : _.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, n, s) {
    return new A({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: n,
          message: p.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new A({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: p.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: p.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: p.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: p.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && _.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
A.create = (r) => new A({
  checks: [],
  typeName: m.ZodNumber,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ...y(r)
});
class M extends v {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== h.bigint) {
      const a = this._getOrReturnCtx(e);
      return l(a, {
        code: c.invalid_type,
        expected: h.bigint,
        received: a.parsedType
      }), g;
    }
    let n;
    const s = new x();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), l(n, {
        code: c.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : _.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, p.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, p.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, p.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, p.toString(t));
  }
  setLimit(e, t, n, s) {
    return new M({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: n,
          message: p.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new M({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: p.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: p.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: p.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
M.create = (r) => {
  var e;
  return new M({
    checks: [],
    typeName: m.ZodBigInt,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...y(r)
  });
};
class ee extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: c.invalid_type,
        expected: h.boolean,
        received: n.parsedType
      }), g;
    }
    return b(e.data);
  }
}
ee.create = (r) => new ee({
  typeName: m.ZodBoolean,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ...y(r)
});
class L extends v {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const a = this._getOrReturnCtx(e);
      return l(a, {
        code: c.invalid_type,
        expected: h.date,
        received: a.parsedType
      }), g;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return l(a, {
        code: c.invalid_date
      }), g;
    }
    const n = new x();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), l(s, {
        code: c.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), n.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), l(s, {
        code: c.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), n.dirty()) : _.assertNever(a);
    return {
      status: n.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new L({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: p.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
L.create = (r) => new L({
  checks: [],
  coerce: (r == null ? void 0 : r.coerce) || !1,
  typeName: m.ZodDate,
  ...y(r)
});
class ke extends v {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: c.invalid_type,
        expected: h.symbol,
        received: n.parsedType
      }), g;
    }
    return b(e.data);
  }
}
ke.create = (r) => new ke({
  typeName: m.ZodSymbol,
  ...y(r)
});
class te extends v {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: c.invalid_type,
        expected: h.undefined,
        received: n.parsedType
      }), g;
    }
    return b(e.data);
  }
}
te.create = (r) => new te({
  typeName: m.ZodUndefined,
  ...y(r)
});
class re extends v {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: c.invalid_type,
        expected: h.null,
        received: n.parsedType
      }), g;
    }
    return b(e.data);
  }
}
re.create = (r) => new re({
  typeName: m.ZodNull,
  ...y(r)
});
class G extends v {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return b(e.data);
  }
}
G.create = (r) => new G({
  typeName: m.ZodAny,
  ...y(r)
});
class P extends v {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return b(e.data);
  }
}
P.create = (r) => new P({
  typeName: m.ZodUnknown,
  ...y(r)
});
class R extends v {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return l(t, {
      code: c.invalid_type,
      expected: h.never,
      received: t.parsedType
    }), g;
  }
}
R.create = (r) => new R({
  typeName: m.ZodNever,
  ...y(r)
});
class xe extends v {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: c.invalid_type,
        expected: h.void,
        received: n.parsedType
      }), g;
    }
    return b(e.data);
  }
}
xe.create = (r) => new xe({
  typeName: m.ZodVoid,
  ...y(r)
});
class S extends v {
  _parse(e) {
    const { ctx: t, status: n } = this._processInputParams(e), s = this._def;
    if (t.parsedType !== h.array)
      return l(t, {
        code: c.invalid_type,
        expected: h.array,
        received: t.parsedType
      }), g;
    if (s.exactLength !== null) {
      const i = t.data.length > s.exactLength.value, o = t.data.length < s.exactLength.value;
      (i || o) && (l(t, {
        code: i ? c.too_big : c.too_small,
        minimum: o ? s.exactLength.value : void 0,
        maximum: i ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), n.dirty());
    }
    if (s.minLength !== null && t.data.length < s.minLength.value && (l(t, {
      code: c.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), n.dirty()), s.maxLength !== null && t.data.length > s.maxLength.value && (l(t, {
      code: c.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), n.dirty()), t.common.async)
      return Promise.all([...t.data].map((i, o) => s.type._parseAsync(new N(t, i, t.path, o)))).then((i) => x.mergeArray(n, i));
    const a = [...t.data].map((i, o) => s.type._parseSync(new N(t, i, t.path, o)));
    return x.mergeArray(n, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new S({
      ...this._def,
      minLength: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new S({
      ...this._def,
      maxLength: { value: e, message: p.toString(t) }
    });
  }
  length(e, t) {
    return new S({
      ...this._def,
      exactLength: { value: e, message: p.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
S.create = (r, e) => new S({
  type: r,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: m.ZodArray,
  ...y(e)
});
function D(r) {
  if (r instanceof k) {
    const e = {};
    for (const t in r.shape) {
      const n = r.shape[t];
      e[t] = C.create(D(n));
    }
    return new k({
      ...r._def,
      shape: () => e
    });
  } else
    return r instanceof S ? new S({
      ...r._def,
      type: D(r.element)
    }) : r instanceof C ? C.create(D(r.unwrap())) : r instanceof V ? V.create(D(r.unwrap())) : r instanceof O ? O.create(r.items.map((e) => D(e))) : r;
}
class k extends v {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = _.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      const u = this._getOrReturnCtx(e);
      return l(u, {
        code: c.invalid_type,
        expected: h.object,
        received: u.parsedType
      }), g;
    }
    const { status: n, ctx: s } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof R && this._def.unknownKeys === "strip"))
      for (const u in s.data)
        i.includes(u) || o.push(u);
    const d = [];
    for (const u of i) {
      const f = a[u], T = s.data[u];
      d.push({
        key: { status: "valid", value: u },
        value: f._parse(new N(s, T, s.path, u)),
        alwaysSet: u in s.data
      });
    }
    if (this._def.catchall instanceof R) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const f of o)
          d.push({
            key: { status: "valid", value: f },
            value: { status: "valid", value: s.data[f] }
          });
      else if (u === "strict")
        o.length > 0 && (l(s, {
          code: c.unrecognized_keys,
          keys: o
        }), n.dirty());
      else if (u !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const f of o) {
        const T = s.data[f];
        d.push({
          key: { status: "valid", value: f },
          value: u._parse(
            new N(s, T, s.path, f)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: f in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const f of d) {
        const T = await f.key, Re = await f.value;
        u.push({
          key: T,
          value: Re,
          alwaysSet: f.alwaysSet
        });
      }
      return u;
    }).then((u) => x.mergeObjectSync(n, u)) : x.mergeObjectSync(n, d);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return p.errToObj, new k({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, n) => {
          var s, a, i, o;
          const d = (i = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, t, n).message) !== null && i !== void 0 ? i : n.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (o = p.errToObj(e).message) !== null && o !== void 0 ? o : d
          } : {
            message: d
          };
        }
      } : {}
    });
  }
  strip() {
    return new k({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new k({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new k({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new k({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: m.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new k({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return _.objectKeys(e).forEach((n) => {
      e[n] && this.shape[n] && (t[n] = this.shape[n]);
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return _.objectKeys(this.shape).forEach((n) => {
      e[n] || (t[n] = this.shape[n]);
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return D(this);
  }
  partial(e) {
    const t = {};
    return _.objectKeys(this.shape).forEach((n) => {
      const s = this.shape[n];
      e && !e[n] ? t[n] = s : t[n] = s.optional();
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return _.objectKeys(this.shape).forEach((n) => {
      if (e && !e[n])
        t[n] = this.shape[n];
      else {
        let a = this.shape[n];
        for (; a instanceof C; )
          a = a._def.innerType;
        t[n] = a;
      }
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return qe(_.objectKeys(this.shape));
  }
}
k.create = (r, e) => new k({
  shape: () => r,
  unknownKeys: "strip",
  catchall: R.create(),
  typeName: m.ZodObject,
  ...y(e)
});
k.strictCreate = (r, e) => new k({
  shape: () => r,
  unknownKeys: "strict",
  catchall: R.create(),
  typeName: m.ZodObject,
  ...y(e)
});
k.lazycreate = (r, e) => new k({
  shape: r,
  unknownKeys: "strip",
  catchall: R.create(),
  typeName: m.ZodObject,
  ...y(e)
});
class ne extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), n = this._def.options;
    function s(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new w(o.ctx.common.issues));
      return l(t, {
        code: c.invalid_union,
        unionErrors: i
      }), g;
    }
    if (t.common.async)
      return Promise.all(n.map(async (a) => {
        const i = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: i
          }),
          ctx: i
        };
      })).then(s);
    {
      let a;
      const i = [];
      for (const d of n) {
        const u = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, f = d._parseSync({
          data: t.data,
          path: t.path,
          parent: u
        });
        if (f.status === "valid")
          return f;
        f.status === "dirty" && !a && (a = { result: f, ctx: u }), u.common.issues.length && i.push(u.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((d) => new w(d));
      return l(t, {
        code: c.invalid_union,
        unionErrors: o
      }), g;
    }
  }
  get options() {
    return this._def.options;
  }
}
ne.create = (r, e) => new ne({
  options: r,
  typeName: m.ZodUnion,
  ...y(e)
});
const I = (r) => r instanceof ie ? I(r.schema) : r instanceof Z ? I(r.innerType()) : r instanceof oe ? [r.value] : r instanceof $ ? r.options : r instanceof ce ? _.objectValues(r.enum) : r instanceof de ? I(r._def.innerType) : r instanceof te ? [void 0] : r instanceof re ? [null] : r instanceof C ? [void 0, ...I(r.unwrap())] : r instanceof V ? [null, ...I(r.unwrap())] : r instanceof Ie || r instanceof le ? I(r.unwrap()) : r instanceof ue ? I(r._def.innerType) : [];
class Te extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.object)
      return l(t, {
        code: c.invalid_type,
        expected: h.object,
        received: t.parsedType
      }), g;
    const n = this.discriminator, s = t.data[n], a = this.optionsMap.get(s);
    return a ? t.common.async ? a._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : a._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (l(t, {
      code: c.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [n]
    }), g);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, n) {
    const s = /* @__PURE__ */ new Map();
    for (const a of t) {
      const i = I(a.shape[e]);
      if (!i.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of i) {
        if (s.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        s.set(o, a);
      }
    }
    return new Te({
      typeName: m.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: s,
      ...y(n)
    });
  }
}
function Oe(r, e) {
  const t = j(r), n = j(e);
  if (r === e)
    return { valid: !0, data: r };
  if (t === h.object && n === h.object) {
    const s = _.objectKeys(e), a = _.objectKeys(r).filter((o) => s.indexOf(o) !== -1), i = { ...r, ...e };
    for (const o of a) {
      const d = Oe(r[o], e[o]);
      if (!d.valid)
        return { valid: !1 };
      i[o] = d.data;
    }
    return { valid: !0, data: i };
  } else if (t === h.array && n === h.array) {
    if (r.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < r.length; a++) {
      const i = r[a], o = e[a], d = Oe(i, o);
      if (!d.valid)
        return { valid: !1 };
      s.push(d.data);
    }
    return { valid: !0, data: s };
  } else
    return t === h.date && n === h.date && +r == +e ? { valid: !0, data: r } : { valid: !1 };
}
class se extends v {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e), s = (a, i) => {
      if (Ce(a) || Ce(i))
        return g;
      const o = Oe(a.value, i.value);
      return o.valid ? ((Ne(a) || Ne(i)) && t.dirty(), { status: t.value, value: o.data }) : (l(n, {
        code: c.invalid_intersection_types
      }), g);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([a, i]) => s(a, i)) : s(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
se.create = (r, e, t) => new se({
  left: r,
  right: e,
  typeName: m.ZodIntersection,
  ...y(t)
});
class O extends v {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.array)
      return l(n, {
        code: c.invalid_type,
        expected: h.array,
        received: n.parsedType
      }), g;
    if (n.data.length < this._def.items.length)
      return l(n, {
        code: c.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), g;
    !this._def.rest && n.data.length > this._def.items.length && (l(n, {
      code: c.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...n.data].map((i, o) => {
      const d = this._def.items[o] || this._def.rest;
      return d ? d._parse(new N(n, i, n.path, o)) : null;
    }).filter((i) => !!i);
    return n.common.async ? Promise.all(a).then((i) => x.mergeArray(t, i)) : x.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new O({
      ...this._def,
      rest: e
    });
  }
}
O.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new O({
    items: r,
    typeName: m.ZodTuple,
    rest: null,
    ...y(e)
  });
};
class ae extends v {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.object)
      return l(n, {
        code: c.invalid_type,
        expected: h.object,
        received: n.parsedType
      }), g;
    const s = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in n.data)
      s.push({
        key: a._parse(new N(n, o, n.path, o)),
        value: i._parse(new N(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data
      });
    return n.common.async ? x.mergeObjectAsync(t, s) : x.mergeObjectSync(t, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, n) {
    return t instanceof v ? new ae({
      keyType: e,
      valueType: t,
      typeName: m.ZodRecord,
      ...y(n)
    }) : new ae({
      keyType: E.create(),
      valueType: e,
      typeName: m.ZodRecord,
      ...y(t)
    });
  }
}
class be extends v {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.map)
      return l(n, {
        code: c.invalid_type,
        expected: h.map,
        received: n.parsedType
      }), g;
    const s = this._def.keyType, a = this._def.valueType, i = [...n.data.entries()].map(([o, d], u) => ({
      key: s._parse(new N(n, o, n.path, [u, "key"])),
      value: a._parse(new N(n, d, n.path, [u, "value"]))
    }));
    if (n.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const d of i) {
          const u = await d.key, f = await d.value;
          if (u.status === "aborted" || f.status === "aborted")
            return g;
          (u.status === "dirty" || f.status === "dirty") && t.dirty(), o.set(u.value, f.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const d of i) {
        const u = d.key, f = d.value;
        if (u.status === "aborted" || f.status === "aborted")
          return g;
        (u.status === "dirty" || f.status === "dirty") && t.dirty(), o.set(u.value, f.value);
      }
      return { status: t.value, value: o };
    }
  }
}
be.create = (r, e, t) => new be({
  valueType: e,
  keyType: r,
  typeName: m.ZodMap,
  ...y(t)
});
class z extends v {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== h.set)
      return l(n, {
        code: c.invalid_type,
        expected: h.set,
        received: n.parsedType
      }), g;
    const s = this._def;
    s.minSize !== null && n.data.size < s.minSize.value && (l(n, {
      code: c.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), t.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && (l(n, {
      code: c.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function i(d) {
      const u = /* @__PURE__ */ new Set();
      for (const f of d) {
        if (f.status === "aborted")
          return g;
        f.status === "dirty" && t.dirty(), u.add(f.value);
      }
      return { status: t.value, value: u };
    }
    const o = [...n.data.values()].map((d, u) => a._parse(new N(n, d, n.path, u)));
    return n.common.async ? Promise.all(o).then((d) => i(d)) : i(o);
  }
  min(e, t) {
    return new z({
      ...this._def,
      minSize: { value: e, message: p.toString(t) }
    });
  }
  max(e, t) {
    return new z({
      ...this._def,
      maxSize: { value: e, message: p.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
z.create = (r, e) => new z({
  valueType: r,
  minSize: null,
  maxSize: null,
  typeName: m.ZodSet,
  ...y(e)
});
class B extends v {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.function)
      return l(t, {
        code: c.invalid_type,
        expected: h.function,
        received: t.parsedType
      }), g;
    function n(o, d) {
      return ve({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          ye(),
          W
        ].filter((u) => !!u),
        issueData: {
          code: c.invalid_arguments,
          argumentsError: d
        }
      });
    }
    function s(o, d) {
      return ve({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          ye(),
          W
        ].filter((u) => !!u),
        issueData: {
          code: c.invalid_return_type,
          returnTypeError: d
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, i = t.data;
    if (this._def.returns instanceof H) {
      const o = this;
      return b(async function(...d) {
        const u = new w([]), f = await o._def.args.parseAsync(d, a).catch((Ee) => {
          throw u.addIssue(n(d, Ee)), u;
        }), T = await Reflect.apply(i, this, f);
        return await o._def.returns._def.type.parseAsync(T, a).catch((Ee) => {
          throw u.addIssue(s(T, Ee)), u;
        });
      });
    } else {
      const o = this;
      return b(function(...d) {
        const u = o._def.args.safeParse(d, a);
        if (!u.success)
          throw new w([n(d, u.error)]);
        const f = Reflect.apply(i, this, u.data), T = o._def.returns.safeParse(f, a);
        if (!T.success)
          throw new w([s(f, T.error)]);
        return T.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new B({
      ...this._def,
      args: O.create(e).rest(P.create())
    });
  }
  returns(e) {
    return new B({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, n) {
    return new B({
      args: e || O.create([]).rest(P.create()),
      returns: t || P.create(),
      typeName: m.ZodFunction,
      ...y(n)
    });
  }
}
class ie extends v {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
ie.create = (r, e) => new ie({
  getter: r,
  typeName: m.ZodLazy,
  ...y(e)
});
class oe extends v {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return l(t, {
        received: t.data,
        code: c.invalid_literal,
        expected: this._def.value
      }), g;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
oe.create = (r, e) => new oe({
  value: r,
  typeName: m.ZodLiteral,
  ...y(e)
});
function qe(r, e) {
  return new $({
    values: r,
    typeName: m.ZodEnum,
    ...y(e)
  });
}
class $ extends v {
  constructor() {
    super(...arguments), J.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), n = this._def.values;
      return l(t, {
        expected: _.joinValues(n),
        received: t.parsedType,
        code: c.invalid_type
      }), g;
    }
    if (_e(this, J, "f") || ze(this, J, new Set(this._def.values), "f"), !_e(this, J, "f").has(e.data)) {
      const t = this._getOrReturnCtx(e), n = this._def.values;
      return l(t, {
        received: t.data,
        code: c.invalid_enum_value,
        options: n
      }), g;
    }
    return b(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return $.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return $.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...t
    });
  }
}
J = /* @__PURE__ */ new WeakMap();
$.create = qe;
class ce extends v {
  constructor() {
    super(...arguments), X.set(this, void 0);
  }
  _parse(e) {
    const t = _.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== h.string && n.parsedType !== h.number) {
      const s = _.objectValues(t);
      return l(n, {
        expected: _.joinValues(s),
        received: n.parsedType,
        code: c.invalid_type
      }), g;
    }
    if (_e(this, X, "f") || ze(this, X, new Set(_.getValidEnumValues(this._def.values)), "f"), !_e(this, X, "f").has(e.data)) {
      const s = _.objectValues(t);
      return l(n, {
        received: n.data,
        code: c.invalid_enum_value,
        options: s
      }), g;
    }
    return b(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
X = /* @__PURE__ */ new WeakMap();
ce.create = (r, e) => new ce({
  values: r,
  typeName: m.ZodNativeEnum,
  ...y(e)
});
class H extends v {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.promise && t.common.async === !1)
      return l(t, {
        code: c.invalid_type,
        expected: h.promise,
        received: t.parsedType
      }), g;
    const n = t.parsedType === h.promise ? t.data : Promise.resolve(t.data);
    return b(n.then((s) => this._def.type.parseAsync(s, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
H.create = (r, e) => new H({
  type: r,
  typeName: m.ZodPromise,
  ...y(e)
});
class Z extends v {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === m.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (i) => {
        l(n, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const i = s.transform(n.data, a);
      if (n.common.async)
        return Promise.resolve(i).then(async (o) => {
          if (t.value === "aborted")
            return g;
          const d = await this._def.schema._parseAsync({
            data: o,
            path: n.path,
            parent: n
          });
          return d.status === "aborted" ? g : d.status === "dirty" || t.value === "dirty" ? U(d.value) : d;
        });
      {
        if (t.value === "aborted")
          return g;
        const o = this._def.schema._parseSync({
          data: i,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? g : o.status === "dirty" || t.value === "dirty" ? U(o.value) : o;
      }
    }
    if (s.type === "refinement") {
      const i = (o) => {
        const d = s.refinement(o, a);
        if (n.common.async)
          return Promise.resolve(d);
        if (d instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return o.status === "aborted" ? g : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => o.status === "aborted" ? g : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (s.type === "transform")
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!Q(i))
          return i;
        const o = s.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => Q(i) ? Promise.resolve(s.transform(i.value, a)).then((o) => ({ status: t.value, value: o })) : i);
    _.assertNever(s);
  }
}
Z.create = (r, e, t) => new Z({
  schema: r,
  typeName: m.ZodEffects,
  effect: e,
  ...y(t)
});
Z.createWithPreprocess = (r, e, t) => new Z({
  schema: e,
  effect: { type: "preprocess", transform: r },
  typeName: m.ZodEffects,
  ...y(t)
});
class C extends v {
  _parse(e) {
    return this._getType(e) === h.undefined ? b(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
C.create = (r, e) => new C({
  innerType: r,
  typeName: m.ZodOptional,
  ...y(e)
});
class V extends v {
  _parse(e) {
    return this._getType(e) === h.null ? b(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
V.create = (r, e) => new V({
  innerType: r,
  typeName: m.ZodNullable,
  ...y(e)
});
class de extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let n = t.data;
    return t.parsedType === h.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
de.create = (r, e) => new de({
  innerType: r,
  typeName: m.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...y(e)
});
class ue extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), n = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return F(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new w(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new w(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ue.create = (r, e) => new ue({
  innerType: r,
  typeName: m.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...y(e)
});
class we extends v {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const n = this._getOrReturnCtx(e);
      return l(n, {
        code: c.invalid_type,
        expected: h.nan,
        received: n.parsedType
      }), g;
    }
    return { status: "valid", value: e.data };
  }
}
we.create = (r) => new we({
  typeName: m.ZodNaN,
  ...y(r)
});
const Nt = Symbol("zod_brand");
class Ie extends v {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), n = t.data;
    return this._def.type._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class he extends v {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return a.status === "aborted" ? g : a.status === "dirty" ? (t.dirty(), U(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return s.status === "aborted" ? g : s.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(e, t) {
    return new he({
      in: e,
      out: t,
      typeName: m.ZodPipeline
    });
  }
}
class le extends v {
  _parse(e) {
    const t = this._def.innerType._parse(e), n = (s) => (Q(s) && (s.value = Object.freeze(s.value)), s);
    return F(t) ? t.then((s) => n(s)) : n(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
le.create = (r, e) => new le({
  innerType: r,
  typeName: m.ZodReadonly,
  ...y(e)
});
function We(r, e = {}, t) {
  return r ? G.create().superRefine((n, s) => {
    var a, i;
    if (!r(n)) {
      const o = typeof e == "function" ? e(n) : typeof e == "string" ? { message: e } : e, d = (i = (a = o.fatal) !== null && a !== void 0 ? a : t) !== null && i !== void 0 ? i : !0, u = typeof o == "string" ? { message: o } : o;
      s.addIssue({ code: "custom", ...u, fatal: d });
    }
  }) : G.create();
}
const Ot = {
  object: k.lazycreate
};
var m;
(function(r) {
  r.ZodString = "ZodString", r.ZodNumber = "ZodNumber", r.ZodNaN = "ZodNaN", r.ZodBigInt = "ZodBigInt", r.ZodBoolean = "ZodBoolean", r.ZodDate = "ZodDate", r.ZodSymbol = "ZodSymbol", r.ZodUndefined = "ZodUndefined", r.ZodNull = "ZodNull", r.ZodAny = "ZodAny", r.ZodUnknown = "ZodUnknown", r.ZodNever = "ZodNever", r.ZodVoid = "ZodVoid", r.ZodArray = "ZodArray", r.ZodObject = "ZodObject", r.ZodUnion = "ZodUnion", r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", r.ZodIntersection = "ZodIntersection", r.ZodTuple = "ZodTuple", r.ZodRecord = "ZodRecord", r.ZodMap = "ZodMap", r.ZodSet = "ZodSet", r.ZodFunction = "ZodFunction", r.ZodLazy = "ZodLazy", r.ZodLiteral = "ZodLiteral", r.ZodEnum = "ZodEnum", r.ZodEffects = "ZodEffects", r.ZodNativeEnum = "ZodNativeEnum", r.ZodOptional = "ZodOptional", r.ZodNullable = "ZodNullable", r.ZodDefault = "ZodDefault", r.ZodCatch = "ZodCatch", r.ZodPromise = "ZodPromise", r.ZodBranded = "ZodBranded", r.ZodPipeline = "ZodPipeline", r.ZodReadonly = "ZodReadonly";
})(m || (m = {}));
const It = (r, e = {
  message: `Input not instance of ${r.name}`
}) => We((t) => t instanceof r, e), Ge = E.create, He = A.create, Rt = we.create, jt = M.create, Ye = ee.create, At = L.create, Mt = ke.create, $t = te.create, Vt = re.create, Pt = G.create, Lt = P.create, zt = R.create, Dt = xe.create, Ut = S.create, Bt = k.create, qt = k.strictCreate, Wt = ne.create, Gt = Te.create, Ht = se.create, Yt = O.create, Kt = ae.create, Jt = be.create, Xt = z.create, Qt = B.create, Ft = ie.create, er = oe.create, tr = $.create, rr = ce.create, nr = H.create, $e = Z.create, sr = C.create, ar = V.create, ir = Z.createWithPreprocess, or = he.create, cr = () => Ge().optional(), dr = () => He().optional(), ur = () => Ye().optional(), lr = {
  string: (r) => E.create({ ...r, coerce: !0 }),
  number: (r) => A.create({ ...r, coerce: !0 }),
  boolean: (r) => ee.create({
    ...r,
    coerce: !0
  }),
  bigint: (r) => M.create({ ...r, coerce: !0 }),
  date: (r) => L.create({ ...r, coerce: !0 })
}, hr = g;
var q = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: W,
  setErrorMap: ht,
  getErrorMap: ye,
  makeIssue: ve,
  EMPTY_PATH: ft,
  addIssueToContext: l,
  ParseStatus: x,
  INVALID: g,
  DIRTY: U,
  OK: b,
  isAborted: Ce,
  isDirty: Ne,
  isValid: Q,
  isAsync: F,
  get util() {
    return _;
  },
  get objectUtil() {
    return Ze;
  },
  ZodParsedType: h,
  getParsedType: j,
  ZodType: v,
  datetimeRegex: Be,
  ZodString: E,
  ZodNumber: A,
  ZodBigInt: M,
  ZodBoolean: ee,
  ZodDate: L,
  ZodSymbol: ke,
  ZodUndefined: te,
  ZodNull: re,
  ZodAny: G,
  ZodUnknown: P,
  ZodNever: R,
  ZodVoid: xe,
  ZodArray: S,
  ZodObject: k,
  ZodUnion: ne,
  ZodDiscriminatedUnion: Te,
  ZodIntersection: se,
  ZodTuple: O,
  ZodRecord: ae,
  ZodMap: be,
  ZodSet: z,
  ZodFunction: B,
  ZodLazy: ie,
  ZodLiteral: oe,
  ZodEnum: $,
  ZodNativeEnum: ce,
  ZodPromise: H,
  ZodEffects: Z,
  ZodTransformer: Z,
  ZodOptional: C,
  ZodNullable: V,
  ZodDefault: de,
  ZodCatch: ue,
  ZodNaN: we,
  BRAND: Nt,
  ZodBranded: Ie,
  ZodPipeline: he,
  ZodReadonly: le,
  custom: We,
  Schema: v,
  ZodSchema: v,
  late: Ot,
  get ZodFirstPartyTypeKind() {
    return m;
  },
  coerce: lr,
  any: Pt,
  array: Ut,
  bigint: jt,
  boolean: Ye,
  date: At,
  discriminatedUnion: Gt,
  effect: $e,
  enum: tr,
  function: Qt,
  instanceof: It,
  intersection: Ht,
  lazy: Ft,
  literal: er,
  map: Jt,
  nan: Rt,
  nativeEnum: rr,
  never: zt,
  null: Vt,
  nullable: ar,
  number: He,
  object: Bt,
  oboolean: ur,
  onumber: dr,
  optional: sr,
  ostring: cr,
  pipeline: or,
  preprocess: ir,
  promise: nr,
  record: Kt,
  set: Xt,
  strictObject: qt,
  string: Ge,
  symbol: Mt,
  transformer: $e,
  tuple: Yt,
  undefined: $t,
  union: Wt,
  unknown: Lt,
  void: Dt,
  NEVER: hr,
  ZodIssueCode: c,
  quotelessJson: lt,
  ZodError: w
});
const fr = q.object({
  label: q.string(),
  url: q.string()
}), Ke = fr.extend({
  children: q.lazy(() => q.array(Ke).optional())
}), pr = q.array(Ke), mr = async () => {
  const {
    data: r,
    success: e,
    error: t
  } = await pr.safeParseAsync([
    {
      label: "Kurse",
      url: "https://neu.k5-leitertraining.de/#courses",
      children: [
        {
          label: "00 Einflussnehmerkurs",
          url: "https://go.k5-leitertraining.de/einflussnehmerkurs-anmeldung"
        },
        {
          label: "01 Leiter-Werden-Kurs",
          url: "https://go.k5-leitertraining.de/leiter-werden-kurs-info"
        },
        {
          label: "02 Gruppenleiterkurs",
          url: "https://go.k5-leitertraining.de/gruppenleiterkurs-info"
        },
        {
          label: "03 Bereichsleiterkurs",
          url: "https://go.k5-leitertraining.de/bereichsleiterkursseite"
        },
        {
          label: "04 Gesamtleiterkurs",
          url: "https://go.k5-leitertraining.de/gesamtleiterkurs-info"
        },
        {
          label: "Lerngruppen Info",
          url: "https://go.k5-leitertraining.de/en-lerngruppen"
        },
        {
          label: "K5 Gruppen verwalten",
          url: "https://go.k5-leitertraining.de/en-gruppenanmeldungen-info"
        }
      ]
    },
    {
      label: "Events",
      url: "https://go.k5-leitertraining.de/konferenz24-home",
      children: [
        {
          label: "Rewatch: K5 Next Steps Event",
          url: "https://go.k5-leitertraining.de/k5-2024-next-steps-event"
        },
        {
          label: "K5 Leiterkonferenz Wuppertal",
          url: "https://go.k5-leitertraining.de/konferenz24-wuppertal"
        }
      ]
    },
    {
      label: "Für Kirchen & Org.",
      url: "https://go.k5-leitertraining.de/partner",
      children: [
        {
          label: "Preise & Modelle",
          url: "https://go.k5-leitertraining.de/k5-gruppen-preise"
        },
        {
          label: "Gemeindel. & Pastorennetzwerk",
          url: "https://go.k5-leitertraining.de/gemeindeleiternetzwerk"
        },
        {
          label: "Entwickler Task Force",
          url: "https://go.k5-leitertraining.de/entwicklung"
        },
        {
          label: "Flexkurse (Coming 2025)",
          url: "https://go.k5-leitertraining.de/flexkurse"
        },
        {
          label: "Key Workshops (Coming 2025)",
          url: "https://go.k5-leitertraining.de/workshops"
        },
        {
          label: "1% Coaching (Coming 2025)",
          url: "https://go.k5-leitertraining.de/coaching"
        },
        {
          label: "Jetzt Partner werden",
          url: "https://go.k5-leitertraining.de/partnerkirche-org-anmeldung"
        }
      ]
    },
    {
      label: "NEU: Leitertest",
      url: "https://neu.k5-leitertraining.de/leitertest#/"
    },
    {
      label: "Zur Kursplattform",
      url: "https://onecommunity.mn.co/sign_in"
    }
  ]);
  return e ? r : (console.error(t.message), []);
}, gr = () => Pe(document.head, () => import("./navbarStyle-Ctrt6S1n.js")), yr = () => Math.random().toString(36).substr(2, 9), Je = (r) => {
  var e;
  return {
    id: yr(),
    title: r.label,
    goTo: "url",
    url: r.url,
    goToId: "",
    openInNewTab: !1,
    childs: ((e = r.children) == null ? void 0 : e.map(Je)) ?? []
  };
}, vr = (r) => {
  console.log(r);
  const e = window.__NUXT__.data.pageData.elements.find(
    (t) => t.meta === "nav-menu"
  );
  if (!e) {
    console.error("Error when applying navigation: nav-menu element not found");
    return;
  }
  e.extra.menuItems.value = e.extra.menuItems.value = r.map(Je);
}, wr = async () => {
  await gr();
  const r = await mr();
  vr(r);
};
export {
  wr as navbarControl,
  br as redirectAfterFormSubmission,
  kr as validateEmail,
  xr as validateGroupName
};
