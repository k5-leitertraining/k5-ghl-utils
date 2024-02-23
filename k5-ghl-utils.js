const y = (r, e) => {
  let t;
  return (...n) => {
    clearTimeout(t), t = window.setTimeout(() => {
      r(...n);
    }, e);
  };
}, d = ({
  shouldDisplayError: r,
  element: e,
  errorMessage: t
}) => {
  var o, s;
  (o = e.parentElement) != null && o.querySelector(".course-already-bought-error") || e.insertAdjacentHTML(
    "afterend",
    `<div class="error course-already-bought-error">${t}</div>`
  );
  const n = (s = e.parentElement) == null ? void 0 : s.querySelector(
    ".course-already-bought-error"
  );
  n && (n.style.cssText = r ? "" : "display: none;");
}, b = "opacity: 0.5; cursor: not-allowed;";
let u;
const m = (r) => {
  var t, n;
  u || (u = ((n = (t = document.querySelector("[type=submit]")) == null ? void 0 : t.style) == null ? void 0 : n.cssText) ?? "");
  const e = document.querySelector("[type=submit]");
  return e ? (e.disabled = r, e.style.cssText = r ? u + b : u, e) : null;
};
let i;
const p = async ({
  target: r,
  errorMessage: e,
  courseId: t
}) => {
  if (!(r instanceof HTMLInputElement))
    return;
  const n = r.value;
  if (i == null || i.abort(), !n)
    return;
  i = new AbortController();
  const o = i.signal, s = await fetch(
    `https://k5-leitertraining.de/.netlify/functions/is-registered?email=${n}&course=${t}`,
    { signal: o }
  ).then(
    (c) => c.json()
  ).catch((c) => {
    console.log(c);
  }), l = !!(s != null && s.isAlreadyRegistered);
  r.setCustomValidity(l ? e : "");
  const a = m(l);
  a && d({
    shouldDisplayError: l,
    element: a,
    errorMessage: e
  }), d({
    shouldDisplayError: l,
    element: r,
    errorMessage: e
  });
}, E = y(p, 500), h = ({
  errorMessage: r = "Mit dieser E-Mail Adresse wurde dieser Kurs bereits gebucht oder eine Ortsgruppe erstellt. Bitte verwende eine andere E-Mail Adresse.",
  courseId: e = "generalCourseParticipantOrCommunityMember"
} = {}) => {
  var o;
  (o = document.querySelector('[name="email"]')) == null || o.addEventListener("input", (s) => {
    s.target && (m(!0), E({
      target: s.target,
      errorMessage: r,
      courseId: e
    }));
  });
  const t = document.querySelector('[name="email"]'), n = t == null ? void 0 : t.value;
  t == null || t.dispatchEvent(
    new Event("input", {
      bubbles: !0,
      cancelable: !0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: n
    })
  );
};
export {
  h as validateEmail
};
