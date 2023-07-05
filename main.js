import './style.css'

const defaultDate = new Date()

const validityConfig = {
  tooShort: "too short",
  tooLong: "too long",
  valueMissing: "value missing",
  rangeOverflow: "exceeds maximum value",
  rangeUnderflow: "below min value"
}

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
    const [valid, msg] = validInput(elem.validity, validityConfig)
    if ( !valid ) {
      elem.nextElementSibling.classList.remove('hide-error')
      elem.nextElementSibling.classList.add('show-error')
      elem.nextElementSibling.textContent = msg
      elem.previousElementSibling.classList.add('error-label') 
      elem.classList.add('error-input')
    }
  }
})

function validInput(validity, validityCfg) {
  const valid = validInputHelper(validity, validityCfg)
  const msg = getErrorMsg(validity, validityCfg)
  return [valid, msg]
}

function validInputHelper(validity, validityCfg) {
  for ( const key in validityCfg ) {
    // if configured rule is invalid in the input, return false
    if ( key in validity && validity[key] ) {
      return false
    }
  }
  // if it isn't found, return true
  return true
}

function getErrorMsg(validity, validityCfg) {
  // weird refactor, but if the any of the configured valid properties
  // is found in the elements input validity object, then we return the configured message
  // if the input value is invalid
  for ( const key in validityCfg ) {
    if ( key in validity && validity[key]) {
      return validityCfg[key]
    }
  }
  return ""
}
