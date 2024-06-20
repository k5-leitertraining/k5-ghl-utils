var E = Object.defineProperty;
var v = (t, e, n) => e in t ? E(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var g = (t, e, n) => (v(t, typeof e != "symbol" ? e + "" : e, n), n);
const k = "opacity: 0.5; cursor: not-allowed;";
let y;
const h = (t) => {
  var n, r;
  y || (y = ((r = (n = document.querySelector("[type=submit]")) == null ? void 0 : n.style) == null ? void 0 : r.cssText) ?? "");
  const e = document.querySelector("[type=submit]");
  return e ? (e.disabled = t, e.style.cssText = t ? y + k : y, e) : null;
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
  var s, i;
  (s = e.parentElement) != null && s.querySelector(".course-already-bought-error") || e.insertAdjacentHTML(
    "afterend",
    `<div class="error course-already-bought-error">${n}</div>`
  );
  const r = (i = e.parentElement) == null ? void 0 : i.querySelector(
    ".course-already-bought-error"
  );
  r && (r.style.cssText = t ? "" : "display: none;");
};
let d;
const q = async ({
  target: t,
  errorMessage: e,
  courseId: n,
  localDev: r = !1
}) => {
  if (!(t instanceof HTMLInputElement))
    return;
  const s = t.value;
  if (d == null || d.abort(), !s)
    return;
  d = new AbortController();
  const i = d.signal, c = await fetch(
    `${r ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/is-registered?email=${s}&course=${n}`,
    { signal: i }
  ).then(
    (l) => l.json()
  ).catch((l) => {
    console.log(l);
  }), a = !!(c != null && c.isAlreadyRegistered);
  t.setCustomValidity(a ? e : "");
  const u = h(a);
  u && p({
    shouldDisplayError: a,
    element: u,
    errorMessage: e
  }), p({
    shouldDisplayError: a,
    element: t,
    errorMessage: e
  });
}, V = w(q, 500), B = ({
  errorMessage: t = "Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.",
  courseId: e = "generalCourseParticipantOrCommunityMember",
  localDev: n = !1
} = {}) => {
  var i;
  (i = document.querySelector('[name="email"]')) == null || i.addEventListener("input", (o) => {
    o.target && (h(!0), V({
      target: o.target,
      errorMessage: t,
      courseId: e,
      localDev: n
    }));
  });
  const r = document.querySelector('[name="email"]'), s = r == null ? void 0 : r.value;
  r == null || r.dispatchEvent(
    new Event("input", {
      bubbles: !0,
      cancelable: !0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: s
    })
  );
};
let m;
const S = async ({
  orgName: t,
  groupName: e,
  localDev: n = !1,
  onValid: r,
  onInvalid: s,
  onEmptyInput: i
}) => {
  if (m == null || m.abort(), !t || !e)
    return i();
  m = new AbortController();
  const o = m.signal, a = await fetch(
    `${n ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/ortsgruppenname-is-valid?orgName=${t}&groupName=${e}`,
    { signal: o }
  ).then(
    (l) => l.json()
  ).catch((l) => {
    if (l.name === "AbortError")
      return "aborted";
    console.log(l);
  });
  if (a === "aborted")
    return;
  !!(a != null && a.isGroupNameValid) ? r() : s();
}, T = w(S, 500), f = (t) => {
  const e = document.querySelector(t.query);
  return e ? t.getValue ? t.getValue(e) : e.value : "";
}, b = (t, e) => {
  let n = f(t);
  e(n);
  const r = () => {
    const o = f(t);
    n !== o && (n = o, e(o));
  }, s = () => {
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
  }, i = () => {
    const o = document.querySelector(t.query);
    if (o)
      return o.addEventListener("input", r), () => {
        o.removeEventListener("input", r);
      };
  };
  return t.getValue ? s() : i();
}, G = ({
  orgNameSelector: t,
  groupNameSelector: e,
  errorMessage: n,
  localDev: r = !1
}) => {
  let s = f(t), i = f(e);
  const o = (a) => {
    const u = h(a);
    u && p({
      element: u,
      shouldDisplayError: a,
      errorMessage: n
    });
    const l = document.querySelector(e.query);
    l && p({
      element: l,
      shouldDisplayError: a,
      errorMessage: n
    });
  }, c = () => {
    o(!1), h(!0), T({
      orgName: s,
      groupName: i,
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
  b(t, (a) => {
    s = a, c();
  }), b(e, (a) => {
    i = a, c();
  });
}, L = async (t) => {
  const { default: e } = await import("./style-DC2QuTw5.js"), n = document.createElement("style");
  n.innerHTML = e, t.appendChild(n);
}, M = (t) => new Promise((e) => setTimeout(e, t));
class A {
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
const C = async ({
  email: t,
  localDev: e = !1
}) => t ? (await fetch(
  `${e ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/get-redirect-url?email=${t}`
).then(
  (i) => i.json()
)).redirectUrl : "", N = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
  </path>
</svg>`, I = (t) => {
  const e = document.createElement("div");
  return e.innerHTML = N, e.className = "object-fill p-8 mx-auto size-32", t.appendChild(e), e;
}, x = () => new Promise((t) => {
  new MutationObserver((n, r) => {
    for (const s of n)
      s.type === "childList" && Array.from(s.addedNodes).find(
        (c) => {
          var a;
          return c instanceof HTMLElement && (((a = c.classList) == null ? void 0 : a.contains("thank-you-message")) || c.querySelector(".thank-you-message"));
        }
      ) && (r.disconnect(), t());
  }).observe(document.body, { childList: !0, subtree: !0 });
}), H = async ({ localDev: t = !1 }) => {
  const e = new A();
  e.trackEmailInput(), await x();
  const n = document.querySelector(".thank-you-message");
  await L(n), I(n);
  const r = e.getEmail();
  let s = "";
  for (; !s; )
    s = await C({ email: r, localDev: t }), await M(2500);
  window.location.href = s;
};
export {
  H as redirectAfterFormSubmission,
  B as validateEmail,
  G as validateGroupName
};
