var E = Object.defineProperty;
var k = (t, e, n) => e in t ? E(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var g = (t, e, n) => (k(t, typeof e != "symbol" ? e + "" : e, n), n);
const q = "opacity: 0.5; cursor: not-allowed;";
let y;
const h = (t) => {
  var n, r;
  y || (y = ((r = (n = document.querySelector("[type=submit]")) == null ? void 0 : n.style) == null ? void 0 : r.cssText) ?? "");
  const e = document.querySelector("[type=submit]");
  return e ? (e.disabled = t, e.style.cssText = t ? y + q : y, e) : null;
}, w = (t, e) => {
  let n;
  return (...r) => {
    clearTimeout(n), n = window.setTimeout(() => {
      t(...r);
    }, e);
  };
}, p = ({
  shouldDisplayError: t,
  element: e,
  errorMessage: n
}) => {
  var a, s;
  (a = e.parentElement) != null && a.querySelector(".course-already-bought-error") || e.insertAdjacentHTML(
    "afterend",
    `<div class="error course-already-bought-error">${n}</div>`
  );
  const r = (s = e.parentElement) == null ? void 0 : s.querySelector(
    ".course-already-bought-error"
  );
  r && (r.style.cssText = t ? "" : "display: none;");
};
let d;
const S = async ({
  target: t,
  errorMessage: e,
  courseId: n,
  localDev: r = !1
}) => {
  if (!(t instanceof HTMLInputElement))
    return;
  const a = t.value;
  if (d == null || d.abort(), !a)
    return;
  d = new AbortController();
  const s = d.signal, c = await fetch(
    `${r ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/is-registered?email=${a}&course=${n}`,
    { signal: s }
  ).then(
    (l) => l.json()
  ).catch((l) => {
    console.log(l);
  }), i = !!(c != null && c.isAlreadyRegistered);
  t.setCustomValidity(i ? e : "");
  const u = h(i);
  u && p({
    shouldDisplayError: i,
    element: u,
    errorMessage: e
  }), p({
    shouldDisplayError: i,
    element: t,
    errorMessage: e
  });
}, T = w(S, 500), G = ({
  errorMessage: t = "Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.",
  courseId: e = "generalCourseParticipantOrCommunityMember",
  localDev: n = !1
} = {}) => {
  var s;
  (s = document.querySelector('[name="email"]')) == null || s.addEventListener("input", (o) => {
    o.target && (h(!0), T({
      target: o.target,
      errorMessage: t,
      courseId: e,
      localDev: n
    }));
  });
  const r = document.querySelector('[name="email"]'), a = r == null ? void 0 : r.value;
  r == null || r.dispatchEvent(
    new Event("input", {
      bubbles: !0,
      cancelable: !0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: a
    })
  );
};
let m;
const V = async ({
  orgName: t,
  groupName: e,
  localDev: n = !1,
  onValid: r,
  onInvalid: a,
  onEmptyInput: s
}) => {
  if (m == null || m.abort(), !t || !e)
    return s();
  m = new AbortController();
  const o = m.signal, i = await fetch(
    `${n ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/ortsgruppenname-is-valid?orgName=${t}&groupName=${e}`,
    { signal: o }
  ).then(
    (l) => l.json()
  ).catch((l) => {
    if (l.name === "AbortError")
      return "aborted";
    console.log(l);
  });
  if (i === "aborted")
    return;
  !!(i != null && i.isGroupNameValid) ? r() : a();
}, L = w(V, 500), f = (t) => {
  const e = document.querySelector(t.query);
  return e ? t.getValue ? t.getValue(e) : e.value : "";
}, b = (t, e) => {
  let n = f(t);
  e(n);
  const r = () => {
    const o = f(t);
    n !== o && (n = o, e(o));
  }, a = () => {
    const o = document.querySelector(t.query) ?? document.body, c = new MutationObserver(() => {
      r();
    });
    return c.observe(o, {
      attributes: !0,
      childList: !0,
      subtree: !0,
      characterData: !0
    }), () => {
      c.disconnect();
    };
  }, s = () => {
    const o = document.querySelector(t.query);
    if (o)
      return o.addEventListener("input", r), () => {
        o.removeEventListener("input", r);
      };
  };
  return t.getValue ? a() : s();
}, U = ({
  orgNameSelector: t,
  groupNameSelector: e,
  errorMessage: n,
  localDev: r = !1
}) => {
  let a = f(t), s = f(e);
  const o = (i) => {
    const u = h(i);
    u && p({
      element: u,
      shouldDisplayError: i,
      errorMessage: n
    });
    const l = document.querySelector(e.query);
    l && p({
      element: l,
      shouldDisplayError: i,
      errorMessage: n
    });
  }, c = () => {
    o(!1), h(!0), L({
      orgName: a,
      groupName: s,
      localDev: r,
      onValid: () => {
        o(!1);
      },
      onInvalid: () => {
        o(!0);
      },
      onEmptyInput: () => {
        o(!1);
      }
    });
  };
  b(t, (i) => {
    a = i, c();
  }), b(e, (i) => {
    s = i, c();
  });
}, v = async (t, e) => {
  const { default: n } = await e(), r = document.createElement("style");
  r.innerHTML = n, t.appendChild(r);
}, M = (t) => v(t, () => import("./style-DC2QuTw5.js")), C = (t) => new Promise((e) => setTimeout(e, t));
class N {
  constructor() {
    g(this, "email", "");
  }
  trackEmailInput() {
    var e;
    (e = document.querySelector('input[type="email"]')) == null || e.addEventListener("input", (n) => {
      const r = n.target;
      this.email = r.value;
    });
  }
  getEmail() {
    return this.email;
  }
}
const A = async ({
  email: t,
  localDev: e = !1
}) => t ? (await fetch(
  `${e ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/get-redirect-url?email=${t}`
).then(
  (s) => s.json()
)).redirectUrl : "", I = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
  </path>
</svg>`, x = (t) => {
  const e = document.createElement("div");
  return e.innerHTML = I, e.className = "object-fill p-8 mx-auto size-32", t.appendChild(e), e;
}, $ = () => new Promise((t) => {
  new MutationObserver((n, r) => {
    for (const a of n)
      a.type === "childList" && Array.from(a.addedNodes).find(
        (c) => {
          var i;
          return c instanceof HTMLElement && (((i = c.classList) == null ? void 0 : i.contains("thank-you-message")) || c.querySelector(".thank-you-message"));
        }
      ) && (r.disconnect(), t());
  }).observe(document.body, { childList: !0, subtree: !0 });
}), j = async ({
  localDev: t = !1,
  successMessage: e
}) => {
  const n = new N();
  n.trackEmailInput(), await $();
  const r = document.querySelector(".thank-you-message");
  await M(r), x(r);
  const a = n.getEmail();
  let s = "";
  for (; !s; )
    s = await A({ email: a, localDev: t }), await C(2500);
  window.location.href = s;
  const o = typeof e == "function" ? e(s) : e;
  o && (r.innerHTML = o);
}, H = () => v(document.head, () => import("./navbarStyle-Ctrt6S1n.js")), O = async () => {
  await H();
};
export {
  O as navbarControl,
  j as redirectAfterFormSubmission,
  G as validateEmail,
  U as validateGroupName
};
