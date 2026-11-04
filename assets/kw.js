/* Skórka "kw": menu na całą stronę, karuzela usług, przełączanie opinii. */
(function () {
  try {
    var btn = document.querySelector('.kw-burger');
    var menu = document.querySelector('.kw-menu');
    if (btn && menu) {
      var ustaw = function (otwarte) {
        menu.classList.toggle('open', otwarte);
        btn.setAttribute('aria-expanded', otwarte ? 'true' : 'false');
        document.body.classList.toggle('kw-menu-open', otwarte);
      };
      btn.addEventListener('click', function () { ustaw(!menu.classList.contains('open')); });
      menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { ustaw(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') ustaw(false); });
    }
  } catch (e) {}

  try {
    document.querySelectorAll('.kw-car').forEach(function (car) {
      var track = car.querySelector('.kw-track');
      var bar = car.querySelector('.kw-progress i');
      if (!track) return;
      var krok = function () {
        var s = track.querySelector('.kw-slide');
        return s ? s.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300;
      };
      var nast = car.querySelector('[data-kw="next"]');
      var poprz = car.querySelector('[data-kw="prev"]');
      if (nast) nast.addEventListener('click', function () { track.scrollBy({ left: krok(), behavior: 'smooth' }); });
      if (poprz) poprz.addEventListener('click', function () { track.scrollBy({ left: -krok(), behavior: 'smooth' }); });
      var upd = function () {
        if (!bar) return;
        var max = track.scrollWidth - track.clientWidth;
        var w = Math.max(18, Math.min(100, track.clientWidth / track.scrollWidth * 100));
        var p = max > 0 ? track.scrollLeft / max : 0;
        bar.style.width = w + '%';
        bar.style.left = (p * (100 - w)) + '%';
      };
      track.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('resize', upd, { passive: true });
      upd();
    });
  } catch (e) {}

  try {
    document.querySelectorAll('.kw-quote-car').forEach(function (car) {
      var qs = car.querySelectorAll('.kw-q');
      var ph = car.querySelectorAll('.kw-quote-ph img');
      if (qs.length < 2) return;
      var i = 0;
      var pokaz = function (n) {
        i = (n + qs.length) % qs.length;
        qs.forEach(function (q, k) { q.classList.toggle('on', k === i); q.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
        ph.forEach(function (im, k) { im.style.opacity = k === i ? '1' : '0'; });
      };
      var n = car.querySelector('[data-kw="next"]');
      var p = car.querySelector('[data-kw="prev"]');
      if (n) n.addEventListener('click', function () { pokaz(i + 1); });
      if (p) p.addEventListener('click', function () { pokaz(i - 1); });
      pokaz(0);
    });
  } catch (e) {}
})();
