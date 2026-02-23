import { useEffect } from "react";

export function useSilverCursor(isMobile) {
  useEffect(() => {
    if (isMobile) return;
    const style = document.createElement("style");
    style.textContent = `
      * { cursor: default !important; }
      a, button, [role="button"], .clickable,
      .hero-nav-icon, .portfolio-card, .gallery-vault-btn,
      .hero-nav-icon *, .portfolio-card *, .gallery-vault-btn * {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [isMobile]);
}
