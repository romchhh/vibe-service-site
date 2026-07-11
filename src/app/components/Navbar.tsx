'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalizedPath } from '@/lib/i18n/use-locale'
import { useBodyScrollLock } from '@/lib/body-scroll-lock'
import { useContactModal } from './ContactModalProvider'
import LangSwitcher from './LangSwitcher'
import SectionLink from './SectionLink'
import styles from './Navbar.module.css'

const NAV_SECTIONS = [
  { key: 'whyUs', sectionId: 'stats' },
  { key: 'services', sectionId: 'services' },
  { key: 'howWeWork', sectionId: 'how-we-work' },
  { key: 'team', sectionId: 'team' },
  { key: 'cases', sectionId: 'cases' },
  { key: 'blog', sectionId: 'blog' },
  { key: 'reviews', sectionId: 'reviews' },
  { key: 'faqs', sectionId: 'faq' },
] as const

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const { t } = useTranslation()
  const { open: openContactModal } = useContactModal()
  const lp = useLocalizedPath()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useBodyScrollLock(menuOpen)

  const isDark = !transparent || scrolled

  return (
    <>
      <nav className={`${styles.nav} ${menuOpen ? styles.navMenuOpen : ''} ${isDark || menuOpen ? styles.solid : styles.transparent} ${isDark || menuOpen ? styles.navDark : styles.navLight}`}>
        <button
          type="button"
          className={styles.mobileCta}
          onClick={openContactModal}
        >
          {t('nav.booking')}
          <span className={styles.ctaArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </button>

        <a href={lp('/')} className={styles.brand}>
          <span className={styles.brandBold}>{t('footer.brandBold')}</span>
          <span className={styles.brandRegular}>{t('footer.brandRegular')}</span>
        </a>

        <div className={styles.center}>
          {NAV_SECTIONS.map((item) => (
            <SectionLink key={item.sectionId} sectionId={item.sectionId}>
              {t(`nav.${item.key}`)}
            </SectionLink>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.desktopRight}>
            <LangSwitcher light={!isDark} />
            <button type="button" className={styles.cta} onClick={openContactModal}>
              {t('nav.booking')}
              <span className={styles.ctaArrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12 L12 2 M5 2 H12 V9" />
                </svg>
              </span>
            </button>
          </div>

          <button
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`${styles.drawer} ${menuOpen ? styles.open : ''}`} role="dialog" aria-modal="true">
        <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label={t('nav.closeMenu')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 4 L24 24 M24 4 L4 24"/>
          </svg>
        </button>

        {NAV_SECTIONS.map((item) => (
          <SectionLink
            key={item.sectionId}
            sectionId={item.sectionId}
            onNavigate={() => setMenuOpen(false)}
          >
            {t(`nav.${item.key}`)}
          </SectionLink>
        ))}
        <SectionLink sectionId="kontakt" onNavigate={() => setMenuOpen(false)}>
          {t('nav.booking')}
        </SectionLink>
        <button
          type="button"
          className={styles.drawerCta}
          onClick={() => { setMenuOpen(false); openContactModal() }}
        >
          {t('nav.cta')}
          <span className={styles.ctaArrow} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9" />
            </svg>
          </span>
        </button>
        <LangSwitcher variant="drawer" />
      </div>
    </>
  )
}
