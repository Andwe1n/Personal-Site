// Apply the shared recipe to existing and subsequently rendered controls.
// Native fields use a glass wrapper so the two specular pseudo-elements render.
export function glassUI(node) {
  const selector = 'a:not(.skip-link),button,.workspace-switch,.preview-label,.section-heading,.tag,.connection-icon,.connection-unset,.draft-preview,.case-image-placeholder,.case-emblem,.project-visual,.thumbnail-image,.sample-badge';
  const apply = () => node.querySelectorAll(selector).forEach(element => {
    // Navigation shares one outer glass surface; its text links stay unframed.
    if (!element.closest('.nav-shell') && !element.closest('[data-glass="none"]')) element.classList.add('glass');
  });
  apply();
  const observer = new MutationObserver(apply);
  observer.observe(node, { childList: true, subtree: true });
  return { destroy() { observer.disconnect(); } };
}
