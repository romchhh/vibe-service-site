export function sectionHref(homePath: string, sectionId: string, isHome: boolean) {
  return isHome ? `#${sectionId}` : `${homePath}#${sectionId}`
}

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId)
  if (!target) return false

  const top = target.getBoundingClientRect().top + window.scrollY
  const offset = Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop || '0',
  ) || 96

  window.scrollTo({
    top: Math.max(0, top - offset),
    behavior: 'smooth',
  })
  return true
}
