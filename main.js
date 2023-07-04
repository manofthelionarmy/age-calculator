import './style.css'

const defaultDate = new Date()

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
      // <p> is nextElementSibling
      elem.nextElementSibling.classList.add('hide-error')
      elem.nextElementSibling.classList.remove('show-error')
      // elem.nextElementSibling.classList.add('valid-input')
      elem.previousElementSibling.classList.remove('error-label') 
      elem.classList.remove('error-input')
    }
    // how do I add css animation when I change the display from none?
    if ( !validInput(elem) ) {
      // elem.insertAdjacentHTML('afterend', `<p class="error">hello</p>`)
      elem.nextElementSibling.classList.remove('hide-error')
      elem.nextElementSibling.classList.add('show-error')
      elem.previousElementSibling.classList.add('error-label') 
      elem.classList.add('error-input')
    }
  }
})

function validInput(elem) {
  const {tooShort, tooLong} = elem.validity
  if (tooShort || tooLong) {
    return false
  }
  if (elem.value.length === 0) {
    return false
  }
  return true
}
