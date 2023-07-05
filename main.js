import './style.css'

const defaultDate = new Date()

// dynamicall set the max attribute
document.getElementById('year').setAttribute('max', defaultDate.getFullYear())

document.getElementById('day').addEventListener('input', (event) => { 
  document.getElementById('days-result').innerText = Math.abs(defaultDate.getDate() - Number(event.target.value))
})

document.getElementById('month').addEventListener('input', (event) => { 
  document.getElementById('months-result').innerText = Math.abs(defaultDate.getMonth() + 1 - Number(event.target.value))
})

document.getElementById('year').addEventListener('input', (event) => { 
  document.getElementById('years-result').innerText = defaultDate.getFullYear() - Number(event.target.value)
})

document.getElementById('form-control').addEventListener('submit', (event) => {
  event.preventDefault()
  const year = document.getElementById('year')
  const month = document.getElementById('month')
  const day = document.getElementById('day')
  for ( const elem of [year, month, day] ) {
    if ( elem.nextElementSibling !== null)  {
      elem.nextElementSibling.classList.add('hide-error')
      elem.nextElementSibling.classList.remove('show-error')
      elem.previousElementSibling.classList.remove('error-label') 
      elem.classList.remove('error-input')
    }
    const [valid, msg] = validInput(elem)
    if ( !valid ) {
      elem.nextElementSibling.classList.remove('hide-error')
      elem.nextElementSibling.classList.add('show-error')
      elem.nextElementSibling.textContent = msg
      elem.previousElementSibling.classList.add('error-label') 
      elem.classList.add('error-input')
    }
  }
})

function validInput(elem) {
  const valid = validInputHelper(elem.validity)
  const msg = getErrorMsg(elem.validity)
  return [valid, msg]
}

function validInputHelper(validity) {
  const {tooShort, tooLong, rangeOverflow, rangeUnderflow, valueMissing} = validity
  // if any of these are true, then we have caught an invalid value
  return !(tooShort || tooLong || rangeOverflow || rangeUnderflow || valueMissing)
}

function getErrorMsg(validity) {
  const {tooShort, tooLong, rangeOverflow, rangeUnderflow, valueMissing} = validity
  if ( tooShort ) {
    return "too short" 
  }
  if (tooLong) {
    return "too long"
  }
  if (rangeOverflow) {
    return "exceeds max value"
  }
  if (rangeUnderflow) {
    return "below min value"
  }
  if (valueMissing) {
    return "missing value"
  }
  return ""
}
