const E = "opacity: 0.5; cursor: not-allowed;";
let y;
const b = (t) => {
  var r, n;
  y || (y = ((n = (r = document.querySelector("[type=submit]")) == null ? void 0 : r.style) == null ? void 0 : n.cssText) ?? "");
  const e = document.querySelector("[type=submit]");
  return e ? (e.disabled = t, e.style.cssText = t ? y + E : y, e) : null;
}, g = (t, e) => {
  let r;
  return (...n) => {
    clearTimeout(r), r = window.setTimeout(() => {
      t(...n);
    }, e);
  };
}, h = ({
  shouldDisplayError: t,
  element: e,
  errorMessage: r
}) => {
  var u, a;
  (u = e.parentElement) != null && u.querySelector(".course-already-bought-error") || e.insertAdjacentHTML(
    "afterend",
    `<div class="error course-already-bought-error">${r}</div>`
  );
  const n = (a = e.parentElement) == null ? void 0 : a.querySelector(
    ".course-already-bought-error"
  );
  n && (n.style.cssText = t ? "" : "display: none;");
};
let d;
const v = async ({
  target: t,
  errorMessage: e,
  courseId: r,
  localDev: n = !1
}) => {
  if (!(t instanceof HTMLInputElement))
    return;
  const u = t.value;
  if (d == null || d.abort(), !u)
    return;
  d = new AbortController();
  const a = d.signal, c = await fetch(
    `${n ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/is-registered?email=${u}&course=${r}`,
    { signal: a }
  ).then(
    (i) => i.json()
  ).catch((i) => {
    console.log(i);
  }), s = !!(c != null && c.isAlreadyRegistered);
  t.setCustomValidity(s ? e : "");
  const l = b(s);
  l && h({
    shouldDisplayError: s,
    element: l,
    errorMessage: e
  }), h({
    shouldDisplayError: s,
    element: t,
    errorMessage: e
  });
}, V = g(v, 500), S = ({
  errorMessage: t = "Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.",
  courseId: e = "generalCourseParticipantOrCommunityMember",
  localDev: r = !1
} = {}) => {
  var a;
  (a = document.querySelector('[name="email"]')) == null || a.addEventListener("input", (o) => {
    o.target && (b(!0), V({
      target: o.target,
      errorMessage: t,
      courseId: e,
      localDev: r
    }));
  });
  const n = document.querySelector('[name="email"]'), u = n == null ? void 0 : n.value;
  n == null || n.dispatchEvent(
    new Event("input", {
      bubbles: !0,
      cancelable: !0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: u
    })
  );
};
let m;
const q = async ({
  orgName: t,
  groupName: e,
  localDev: r = !1,
  onValid: n,
  onInvalid: u,
  onEmptyInput: a
}) => {
  if (m == null || m.abort(), !t || !e)
    return a();
  m = new AbortController();
  const o = m.signal, s = await fetch(
    `${r ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/ortsgruppenname-is-valid?orgName=${t}&groupName=${e}`,
    { signal: o }
  ).then(
    (i) => i.json()
  ).catch((i) => {
    if (i.name === "AbortError")
      return "aborted";
    console.log(i);
  });
  if (s === "aborted")
    return;
  !!(s != null && s.isGroupNameValid) ? n() : u();
}, w = g(q, 500), p = (t) => {
  const e = document.querySelector(t.query);
  return e ? t.getValue ? t.getValue(e) : e.value : "";
}, f = (t, e) => {
  let r = p(t);
  e(r);
  const n = () => {
    const o = p(t);
    r !== o && (r = o, e(o));
  }, u = () => {
    const o = document.querySelector(t.query) ?? document.body, c = new MutationObserver(() => {
      n();
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
      return o.addEventListener("input", n), () => {
        o.removeEventListener("input", n);
      };
  };
  return t.getValue ? u() : a();
}, T = ({
  orgNameSelector: t,
  groupNameSelector: e,
  errorMessage: r,
  localDev: n = !1
}) => {
  let u = p(t), a = p(e);
  const o = (s) => {
    const l = b(s);
    l && h({
      element: l,
      shouldDisplayError: s,
      errorMessage: r
    });
    const i = document.querySelector(e.query);
    i && h({
      element: i,
      shouldDisplayError: s,
      errorMessage: r
    });
  }, c = () => {
    o(!1), b(!0), w({
      orgName: u,
      groupName: a,
      localDev: n,
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
  f(t, (s) => {
    u = s, c();
  }), f(e, (s) => {
    a = s, c();
  });
};
export {
  S as validateEmail,
  T as validateGroupName
};
