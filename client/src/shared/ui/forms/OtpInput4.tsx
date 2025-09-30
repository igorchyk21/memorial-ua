'use client'

import React, { useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function OtpInput4({
  length = 4,
  onChange,
  disabled = false,
  value = ''
}: { 
  length?: number;
  onChange?: (code: string) => void;
  disabled?: boolean;
  value?: string;
}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const focus = (idx: number) => inputsRef.current[idx]?.focus()

  const getCode = () =>
    inputsRef.current.map((el) => el?.value ?? '').join('')

  const handleChange = (e: any, index: number) => {
    const v = e.target.value.replace(/\D/g, '')
    e.target.value = v.slice(0, 1)
    if (v && index < length - 1) focus(index + 1)
    onChange?.(getCode())
  }

  const handleKeyDown = (e: any, index: number) => {
    const cur = e.currentTarget

    if (e.key === 'Backspace' && cur.value === '' && index > 0) {
      e.preventDefault()
      focus(index - 1)
      return
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      focus(index - 1)
      return
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault()
      focus(index + 1)
      return
    }
  }

  const handlePaste = (e: any, index: number) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '')
    if (!text) return
    e.preventDefault()
    const chars = text.slice(0, length - index).split('')
    for (let i = 0; i < chars.length; i++) {
      const el = inputsRef.current[index + i]
      if (!el) break
      el.value = chars[i]
    }
    const nextIndex = Math.min(index + chars.length, length - 1)
    focus(nextIndex)
    onChange?.(getCode())
  }

  // 🔹 Коли value змінюється ззовні
  useEffect(() => {
    if (value === '') {
      inputsRef.current.forEach((el) => {
        if (el) el.value = ''
      })
      setTimeout(() => {
        focus(0)  
      }, 0)
    } else {
      const chars = value.slice(0, length).split('')
      inputsRef.current.forEach((el, i) => {
        if (el) el.value = chars[i] ?? ''
      })
      onChange?.(getCode())
    }
  }, [value])

  useEffect(() => {
    if (value === '')
      setTimeout(() => {
        focus(0)  
      }, 0)
  }, [disabled])

  return (
    <Row className="g-md-3 px-md-5" role="group" aria-label="One-time password">
      {Array.from({ length }).map((_, i) => (
        <Col key={i} xs="3">
          <Form.Control
            autoFocus={i === 0}
            disabled={disabled}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            maxLength={1}
            className="text-center fs-3"
            aria-label={`OTP digit ${i + 1}`}
            ref={(el) => { inputsRef.current[i] = el }}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
          />
        </Col>
      ))}
    </Row>
  )
}
