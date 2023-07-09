import './style.css'

const defaultDate = new Date()

const validityConfig = {
  tooShort: "too short",
  tooLong: "too long",
  valueMissing: (month_day_or_year) => `${month_day_or_year} is required`,
  rangeOverflow: overflow_message,
  rangeUnderflow: underflow_msg,
}

const MONTH = 'month'
const DAY = 'day'
const YEAR = 'year'

function overflow_message(input) {
  switch (input) {
    case MONTH:
     return 'Must be a valid month' 
    case DAY:
     return 'Must be a valid day' 
    case YEAR:
      return 'Must be in the past'
  }
}

function underflow_msg(input) {
  switch (input) {
    case MONTH:
     return 'Must be a valid month' 
    case DAY:
     return 'Must be a valid day' 
  }
}

function maxAmountOfDays(month) {
  // these are the amount of days for the months
  switch(month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 4:
    case 6:
    case 9:
    case 11:
      return 30
    case 2:
      // handle leap yeare for February
      return defaultDate.getFullYear() % 4 == 0 ? 29 : 28;
    default:
      return NaN
  }
}

// dynamicall set the max attribute
document.getElementById('year').setAttribute('max', defaultDate.getFullYear())

document.getElementById('day').addEventListener('input', (event) => { 
  document.getElementById('days-result').innerText = Math.abs(defaultDate.getDate() - Number(event.target.value))
})

document.getElementById('month').addEventListener('input', (event) => { 
  document.getElementById('months-result').innerText = Math.abs(defaultDate.getMonth() + 1 - Number(event.target.value))
  document.getElementById('day').setAttribute('max', maxAmountOfDays(Number(event.target.value)))
})

document.getElementById('year').addEventListener('input', (event) => { 
  // TODO: should I style when input is valid; is this required or an additional feature?
  const year = document.getElementById('year')
  const valid = validInputHelper(year.validity, validityConfig)
  let content = "--";
  if (valid) {
    // TODO: should I add also display error if invalid?
    content = defaultDate.getFullYear() - Number(event.target.value)
  } 
  document.getElementById('years-result').innerText = content
})

document.getElementById('form-control').addEventListener('submit', (event) => {
  event.preventDefault()
  const year = document.getElementById('year')
  const month = document.getElementById('month')
  const day = document.getElementById('day')
  for ( const elem of [year, month, day] ) {
    if ( elem.nextElementSibling !== null)  {
      // TODO: make this reusable to hide error
      elem.nextElementSibling.classList.add('hide-error')
      elem.nextElementSibling.classList.remove('show-error')
      elem.previousElementSibling.classList.remove('error-label') 
      elem.classList.remove('error-input')
    }

    const [valid, msg] = validInput(elem.validity, validityConfig, elem.id)
    if ( !valid ) {
      // TODO: make this reusable to show error
      elem.nextElementSibling.classList.remove('hide-error')
      elem.nextElementSibling.classList.add('show-error')
      elem.nextElementSibling.textContent = msg
      elem.previousElementSibling.classList.add('error-label') 
      elem.classList.add('error-input')
    }
  }
})

function validInput(validity, validityCfg, month_day_or_year) {
  const valid = validInputHelper(validity, validityCfg)
  const msg = getErrorMsg(validity, validityCfg, month_day_or_year)
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

function getErrorMsg(validity, validityCfg, month_day_or_year) {
  // weird refactor, but if the any of the configured valid properties
  // is found in the elements input validity object, then we return the configured message
  // if the input value is invalid
  for ( const key in validityCfg ) {
    if ( key in validity && validity[key]) {
      // f is a function that returns the error message for day, month, or year input
      const f = validityCfg[key]
      return f(month_day_or_year)
    }
  }
  return ""
}
