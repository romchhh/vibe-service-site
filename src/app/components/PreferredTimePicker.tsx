'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import {
  formatMonthLabel,
  formatScheduledSlot,
  formatSelectedDateLabel,
  formatTimeSlot,
  getBookableDateKeys,
  getLondonParts,
  getMonthGrid,
  getTimeSlots,
  getTodayDateKey,
  getWeekdayLabels,
  parseDateKey,
} from '@/lib/scheduling'
import { useLocale } from '@/lib/i18n/use-locale'
import styles from './PreferredTimePicker.module.css'

type PreferredTimePickerProps = {
  id: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  compact?: boolean
}

type PanelCoords = {
  top: number
  left: number
  width: number
  ready: boolean
}

type MobileStep = 'date' | 'time'

const PANEL_MARGIN = 12
const MOBILE_BREAKPOINT = 640

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMobile
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === 'left' ? <path d="M10 3 L5 8 L10 13" /> : <path d="M6 3 L11 8 L6 13" />}
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4 L12 12 M12 4 L4 12" />
    </svg>
  )
}

export default function PreferredTimePicker({ id, value, onChange, required, compact = false }: PreferredTimePickerProps) {
  const { t } = useTranslation()
  const locale = useLocale()
  const listId = useId()
  const isMobile = useIsMobile()
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const bookableDates = useMemo(() => getBookableDateKeys(), [])
  const today = useMemo(() => getLondonParts(new Date()), [])
  const todayKey = useMemo(() => getTodayDateKey(), [])

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileStep, setMobileStep] = useState<MobileStep>('date')
  const [viewYear, setViewYear] = useState(today.year)
  const [viewMonth, setViewMonth] = useState(today.month)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<{ hour: number; minute: number } | null>(null)
  const [coords, setCoords] = useState<PanelCoords>({ top: 0, left: 0, width: 480, ready: false })

  const weekdayLabels = useMemo(() => getWeekdayLabels(locale), [locale])
  const monthCells = useMemo(
    () => getMonthGrid(viewYear, viewMonth, bookableDates),
    [viewYear, viewMonth, bookableDates],
  )
  const timeSlots = useMemo(
    () => (selectedDate ? getTimeSlots(selectedDate) : []),
    [selectedDate],
  )

  useEffect(() => setMounted(true), [])

  const updatePanelPosition = useCallback(() => {
    if (!open || isMobile || !triggerRef.current || !panelRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const panel = panelRef.current.getBoundingClientRect()
    const width = compact
      ? Math.min(360, window.innerWidth - PANEL_MARGIN * 2)
      : Math.min(560, Math.max(480, trigger.width, window.innerWidth - PANEL_MARGIN * 2))

    let top = trigger.bottom + 8
    if (top + panel.height > window.innerHeight - PANEL_MARGIN) {
      top = Math.max(PANEL_MARGIN, trigger.top - panel.height - 8)
    }

    let left = trigger.left
    if (left + width > window.innerWidth - PANEL_MARGIN) {
      left = window.innerWidth - width - PANEL_MARGIN
    }
    left = Math.max(PANEL_MARGIN, left)

    setCoords({ top, left, width, ready: true })
  }, [open, compact, isMobile])

  useLayoutEffect(() => {
    if (!open || isMobile) {
      setCoords((current) => ({ ...current, ready: false }))
      return
    }

    updatePanelPosition()
  }, [open, isMobile, selectedDate, viewMonth, viewYear, timeSlots.length, updatePanelPosition])

  useEffect(() => {
    if (!open || isMobile) return

    const handleReposition = () => updatePanelPosition()

    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)
    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [open, isMobile, updatePanelPosition])

  useEffect(() => {
    if (!open) return

    const handleClick = (event: MouseEvent) => {
      if (isMobile) return
      const target = event.target as Node
      if (wrapRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      setOpen(false)
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMobile && mobileStep === 'time') {
          setMobileStep('date')
          return
        }
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, isMobile, mobileStep])

  useEffect(() => {
    if (!open || !isMobile) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open, isMobile])

  const shiftMonth = (delta: number) => {
    let year = viewYear
    let month = viewMonth + delta

    while (month < 1) {
      month += 12
      year -= 1
    }
    while (month > 12) {
      month -= 12
      year += 1
    }

    setViewYear(year)
    setViewMonth(month)
  }

  const handleDateSelect = (dateKeyValue: string) => {
    setSelectedDate(dateKeyValue)
    setSelectedTime(null)

    const { year, month } = parseDateKey(dateKeyValue)
    setViewYear(year)
    setViewMonth(month)

    if (isMobile) {
      setMobileStep('time')
    }
  }

  const handleTimeSelect = (hour: number, minute: number) => {
    if (!selectedDate) return

    setSelectedTime({ hour, minute })
    onChange(formatScheduledSlot(selectedDate, hour, minute, locale))
    setOpen(false)
    setMobileStep('date')
  }

  const openPanel = () => {
    setMobileStep(selectedDate ? 'time' : 'date')
    setOpen(true)
  }

  const closePanel = () => {
    setOpen(false)
    setMobileStep('date')
  }

  const displayValue = value || t('contact.preferredTimePlaceholder')

  const calendarSection = (
    <div className={styles.calendar}>
      <div className={styles.monthNav}>
        <button type="button" className={styles.navBtn} onClick={() => shiftMonth(-1)} aria-label={t('contact.schedulePrevMonth')}>
          <ChevronIcon direction="left" />
        </button>
        <p className={styles.monthLabel}>{formatMonthLabel(viewYear, viewMonth, locale)}</p>
        <button type="button" className={styles.navBtn} onClick={() => shiftMonth(1)} aria-label={t('contact.scheduleNextMonth')}>
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className={styles.weekdays}>
        {weekdayLabels.map((label) => (
          <span key={label} className={styles.weekday}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.days}>
        {monthCells.map((cell, index) => {
          if (!cell.day || !cell.dateKey) {
            return <span key={`empty-${index}`} className={styles.dayEmpty} aria-hidden="true" />
          }

          const isSelected = selectedDate === cell.dateKey
          const isToday = cell.dateKey === todayKey
          const isDisabled = !cell.bookable

          return (
            <button
              key={cell.dateKey}
              type="button"
              className={`${styles.day} ${isSelected ? styles.daySelected : ''} ${isToday ? styles.dayToday : ''} ${isDisabled ? styles.dayDisabled : ''}`}
              disabled={isDisabled}
              aria-pressed={isSelected}
              onClick={() => handleDateSelect(cell.dateKey!)}
            >
              <span>{cell.day}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  const timesSection = (
    <div className={styles.times}>
      <div className={styles.timesHead}>
        <p className={styles.timesTitle}>{t('contact.scheduleSelectTime')}</p>
        {selectedDate && (
          <p className={styles.timesDate}>{formatSelectedDateLabel(selectedDate, locale)}</p>
        )}
      </div>

      {!selectedDate && (
        <div className={styles.timesEmpty}>
          <CalendarIcon />
          <p>{t('contact.scheduleSelectDate')}</p>
        </div>
      )}

      {selectedDate && timeSlots.length === 0 && (
        <p className={styles.timesHint}>{t('contact.scheduleNoSlots')}</p>
      )}

      {selectedDate && timeSlots.length > 0 && (
        <div className={styles.slots}>
          {timeSlots.map(({ hour, minute }) => {
            const active =
              selectedTime?.hour === hour &&
              selectedTime?.minute === minute

            return (
              <button
                key={`${hour}-${minute}`}
                type="button"
                className={`${styles.slot} ${active ? styles.slotActive : ''}`}
                onClick={() => handleTimeSelect(hour, minute)}
              >
                {formatTimeSlot(hour, minute, locale)}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )

  const panelContent = (
    <div
      id={listId}
      ref={panelRef}
      className={[
        styles.panel,
        compact ? styles.panelCompact : styles.panelEmbedded,
        isMobile ? styles.panelMobile : '',
        !isMobile && coords.ready ? styles.panelReady : '',
        isMobile ? styles.panelMobileReady : '',
      ].filter(Boolean).join(' ')}
      style={isMobile ? undefined : {
        top: coords.top,
        left: coords.left,
        width: coords.width,
      }}
      role="dialog"
      aria-modal={isMobile ? 'true' : undefined}
      aria-label={t('contact.preferredTime')}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.panelHeader}>
        {isMobile && mobileStep === 'time' ? (
          <button type="button" className={styles.backBtn} onClick={() => setMobileStep('date')}>
            <ChevronIcon direction="left" />
            <span>{t('contact.scheduleBack')}</span>
          </button>
        ) : (
          <div className={styles.panelHeaderText}>
            <p className={styles.panelTitle}>{t('contact.preferredTime')}</p>
            <p className={styles.panelSubtitle}>{t('contact.scheduleHint')}</p>
          </div>
        )}

        {isMobile && (
          <div className={styles.mobileSteps} aria-hidden="true">
            <span className={mobileStep === 'date' ? styles.stepActive : ''}>1</span>
            <span className={styles.stepDivider} />
            <span className={mobileStep === 'time' ? styles.stepActive : ''}>2</span>
          </div>
        )}

        <button type="button" className={styles.closeBtn} onClick={closePanel} aria-label={t('contact.close')}>
          <CloseIcon />
        </button>
      </div>

      <div className={`${styles.panelBody} ${isMobile ? styles.panelBodyMobile : ''}`}>
        {isMobile ? (
          mobileStep === 'date' ? calendarSection : timesSection
        ) : (
          <>
            {calendarSection}
            <div className={styles.times}>
              <div className={styles.timesHead}>
                <p className={styles.timesTitle}>
                  {selectedDate ? t('contact.scheduleSelectTime') : t('contact.scheduleSelectDate')}
                </p>
                {selectedDate && (
                  <p className={styles.timesDate}>{formatSelectedDateLabel(selectedDate, locale)}</p>
                )}
              </div>

              {!selectedDate && (
                <div className={styles.timesEmpty}>
                  <CalendarIcon />
                  <p>{t('contact.scheduleSelectDate')}</p>
                </div>
              )}

              {selectedDate && timeSlots.length === 0 && (
                <p className={styles.timesHint}>{t('contact.scheduleNoSlots')}</p>
              )}

              {selectedDate && timeSlots.length > 0 && (
                <div className={styles.slots}>
                  {timeSlots.map(({ hour, minute }) => {
                    const active =
                      selectedTime?.hour === hour &&
                      selectedTime?.minute === minute

                    return (
                      <button
                        key={`${hour}-${minute}`}
                        type="button"
                        className={`${styles.slot} ${active ? styles.slotActive : ''}`}
                        onClick={() => handleTimeSelect(hour, minute)}
                      >
                        {formatTimeSlot(hour, minute, locale)}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${compact ? styles.compact : styles.embedded} ${open ? styles.open : ''}`}
      data-schedule-open={open ? 'true' : undefined}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={`${styles.trigger} ${value ? styles.triggerFilled : ''} ${open ? styles.triggerOpen : ''}`}
        onClick={() => (open ? closePanel() : openPanel())}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? listId : undefined}
      >
        <span className={styles.triggerContent}>
          <span className={value ? styles.value : styles.placeholder}>{displayValue}</span>
          {!value && !open && (
            <span className={styles.triggerHint}>{t('contact.scheduleHint')}</span>
          )}
        </span>
        <span className={styles.triggerIcon} aria-hidden="true">
          <CalendarIcon />
        </span>
      </button>

      <input
        tabIndex={-1}
        className={styles.hiddenInput}
        value={value}
        onChange={() => {}}
        required={required}
        aria-hidden="true"
      />

      {open && mounted && createPortal(
        isMobile ? (
          <div className={styles.mobileOverlay} onClick={closePanel} role="presentation">
            {panelContent}
          </div>
        ) : (
          <>
            {!compact && <div className={styles.backdropEmbedded} onClick={closePanel} aria-hidden="true" />}
            {compact && <div className={styles.backdrop} onClick={closePanel} aria-hidden="true" />}
            {panelContent}
          </>
        ),
        document.body,
      )}
    </div>
  )
}
