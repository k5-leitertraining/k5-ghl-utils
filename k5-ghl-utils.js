const h = (r, e) => {
  let n;
  return (...t) => {
    clearTimeout(n), n = window.setTimeout(() => {
      r(...t);
    }, e);
  };
}, y = ({
  shouldDisplayError: r,
  element: e,
  errorMessage: n
}) => {
  var s, o;
  (s = e.parentElement) != null && s.querySelector(".course-already-bought-error") || e.insertAdjacentHTML(
    "afterend",
    `<div class="error course-already-bought-error">${n}</div>`
  );
  const t = (o = e.parentElement) == null ? void 0 : o.querySelector(
    ".course-already-bought-error"
  );
  t && (t.style.cssText = r ? "" : "display: none;");
}, p = "opacity: 0.5; cursor: not-allowed;";
let c;
const b = (r) => {
  var n, t;
  c || (c = ((t = (n = document.querySelector("[type=submit]")) == null ? void 0 : n.style) == null ? void 0 : t.cssText) ?? "");
  const e = document.querySelector("[type=submit]");
  return e ? (e.disabled = r, e.style.cssText = r ? c + p : c, e) : null;
};
let l;
const E = async ({
  target: r,
  errorMessage: e,
  courseId: n,
  localDev: t = !1
}) => {
  if (!(r instanceof HTMLInputElement))
    return;
  const s = r.value;
  if (l == null || l.abort(), !s)
    return;
  l = new AbortController();
  const o = l.signal, u = await fetch(
    `${t ? "http://localhost:9999" : "https://k5-leitertraining.de"}/.netlify/functions/is-registered?email=${s}&course=${n}`,
    { signal: o }
  ).then(
    (d) => d.json()
  ).catch((d) => {
    console.log(d);
  }), i = !!(u != null && u.isAlreadyRegistered);
  r.setCustomValidity(i ? e : "");
  const m = b(i);
  m && y({
    shouldDisplayError: i,
    element: m,
    errorMessage: e
  }), y({
    shouldDisplayError: i,
    element: r,
    errorMessage: e
  });
}, f = h(E, 500), g = ({
  errorMessage: r = "Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.",
  courseId: e = "generalCourseParticipantOrCommunityMember",
  localDev: n = !1
} = {}) => {
  var o;
  (o = document.querySelector('[name="email"]')) == null || o.addEventListener("input", (a) => {
    a.target && (b(!0), f({
      target: a.target,
      errorMessage: r,
      courseId: e,
      localDev: n
    }));
  });
  const t = document.querySelector('[name="email"]'), s = t == null ? void 0 : t.value;
  t == null || t.dispatchEvent(
    new Event("input", {
      bubbles: !0,
      cancelable: !0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: s
    })
  );
};
export {
  g as validateEmail
};
