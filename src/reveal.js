// Content stays visible unless an observer can safely animate it into view.
export function reveal(node) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches || !('IntersectionObserver' in window)) return {};
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('reveal-pending');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
  const seen = new WeakSet();
  const scan = () => node.querySelectorAll('.section-heading,.project-card,.intro-strip,.home-photo-feature,.principle,.service-row').forEach(element => {
    if (seen.has(element)) return;
    seen.add(element);
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('reveal-pending');
      observer.observe(element);
    }
  });
  scan();
  const mutations = new MutationObserver(scan);
  mutations.observe(node, { childList: true, subtree: true });
  return { destroy() { observer.disconnect(); mutations.disconnect(); } };
}
