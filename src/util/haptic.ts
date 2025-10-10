export function triggerHaptic(duration: number[] = [100]): void {
  if (navigator.vibrate) {
    navigator.vibrate(duration)
    return
  }

  const labelEl = document.createElement('label')
  labelEl.ariaHidden = 'true'
  labelEl.style.display = 'none'

  const inputEl = document.createElement('input')
  inputEl.type = 'checkbox'
  inputEl.setAttribute('switch', '')
  labelEl.appendChild(inputEl)

  document.head.appendChild(labelEl)
  labelEl.click()
  document.head.removeChild(labelEl)
}
