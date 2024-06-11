var v = Object.defineProperty;
var E = (t, e, n) => e in t ? v(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var g = (t, e, n) => (E(t, typeof e != "symbol" ? e + "" : e, n), n);
const k = "opacity: 0.5; cursor: not-allowed;";
let h;
const y = (t) => {
  var n, r;
  h || (h = ((r = (n = document.querySelector("[type=submit]")) == null ? void 0 : n.style) == null ? void 0 : r.cssText) ?? "");
  const e = document.querySelector("[type=submit]");
  return e ? (e.disabled = t, e.style.cssText = t ? h + k : h, e) : null;
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
  var i, a;
  (i = e.parentElement) != null && i.querySelector(".course-already-bought-error") || e.insertAdjacentHTML(
    "afterend",
    `<div class="error course-already-bought-error">${n}</div>`
  );
  const r = (a = e.parentElement) == null ? void 0 : a.querySelector(
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
  const i = t.value;
  if (d == null || d.abort(), !i)
    return;
  d = new AbortController();
  const a = d.signal, c = await fetch(
    `${r ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/is-registered?email=${i}&course=${n}`,
    { signal: a }
  ).then(
    (l) => l.json()
  ).catch((l) => {
    console.log(l);
  }), s = !!(c != null && c.isAlreadyRegistered);
  t.setCustomValidity(s ? e : "");
  const u = y(s);
  u && p({
    shouldDisplayError: s,
    element: u,
    errorMessage: e
  }), p({
    shouldDisplayError: s,
    element: t,
    errorMessage: e
  });
}, V = w(q, 500), $ = ({
  errorMessage: t = "Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.",
  courseId: e = "generalCourseParticipantOrCommunityMember",
  localDev: n = !1
} = {}) => {
  var a;
  (a = document.querySelector('[name="email"]')) == null || a.addEventListener("input", (o) => {
    o.target && (y(!0), V({
      target: o.target,
      errorMessage: t,
      courseId: e,
      localDev: n
    }));
  });
  const r = document.querySelector('[name="email"]'), i = r == null ? void 0 : r.value;
  r == null || r.dispatchEvent(
    new Event("input", {
      bubbles: !0,
      cancelable: !0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: i
    })
  );
};
let m;
const S = async ({
  orgName: t,
  groupName: e,
  localDev: n = !1,
  onValid: r,
  onInvalid: i,
  onEmptyInput: a
}) => {
  if (m == null || m.abort(), !t || !e)
    return a();
  m = new AbortController();
  const o = m.signal, s = await fetch(
    `${n ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/ortsgruppenname-is-valid?orgName=${t}&groupName=${e}`,
    { signal: o }
  ).then(
    (l) => l.json()
  ).catch((l) => {
    if (l.name === "AbortError")
      return "aborted";
    console.log(l);
  });
  if (s === "aborted")
    return;
  !!(s != null && s.isGroupNameValid) ? r() : i();
}, L = w(S, 500), f = (t) => {
  const e = document.querySelector(t.query);
  return e ? t.getValue ? t.getValue(e) : e.value : "";
}, b = (t, e) => {
  let n = f(t);
  e(n);
  const r = () => {
    const o = f(t);
    n !== o && (n = o, e(o));
  }, i = () => {
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
  }, a = () => {
    const o = document.querySelector(t.query);
    if (o)
      return o.addEventListener("input", r), () => {
        o.removeEventListener("input", r);
      };
  };
  return t.getValue ? i() : a();
}, B = ({
  orgNameSelector: t,
  groupNameSelector: e,
  errorMessage: n,
  localDev: r = !1
}) => {
  let i = f(t), a = f(e);
  const o = (s) => {
    const u = y(s);
    u && p({
      element: u,
      shouldDisplayError: s,
      errorMessage: n
    });
    const l = document.querySelector(e.query);
    l && p({
      element: l,
      shouldDisplayError: s,
      errorMessage: n
    });
  }, c = () => {
    o(!1), y(!0), L({
      orgName: i,
      groupName: a,
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
  b(t, (s) => {
    i = s, c();
  }), b(e, (s) => {
    a = s, c();
  });
}, T = (t) => new Promise((e) => setTimeout(e, t));
class M {
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
  (a) => a.json()
)).redirectUrl : "", N = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
  </path>
</svg>`, C = (t) => {
  const e = document.createElement("div");
  return e.innerHTML = N, e.className = "object-fill p-8 mx-auto size-32", t.appendChild(e), e;
}, I = () => new Promise((t) => {
  new MutationObserver((n, r) => {
    for (const i of n)
      i.type === "childList" && Array.from(i.addedNodes).find(
        (c) => {
          var s;
          return c instanceof HTMLElement && (((s = c.classList) == null ? void 0 : s.contains("thank-you-message")) || c.querySelector(".thank-you-message"));
        }
      ) && (r.disconnect(), t());
  }).observe(document.body, { childList: !0, subtree: !0 });
}), G = async ({ localDev: t = !1 }) => {
  await import("./style-l0sNRNKZ.js");
  const e = new M();
  e.trackEmailInput(), await I(), C(document.querySelector(".thank-you-message"));
  const n = e.getEmail();
  let r = "";
  for (; !r; )
    r = await A({ email: n, localDev: t }), await T(2500);
  window.location.href = r;
};
export {
  G as redirectAfterFormSubmission,
  $ as validateEmail,
  B as validateGroupName
};
