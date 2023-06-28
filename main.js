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
      elem.nextElementSibling.remove()
    }
    if ( !validInput(elem) ) {
      elem.insertAdjacentHTML('afterend', `<p class="error">hello</p>`)
      return
    }
  }
})

function validInput(elem) {
  const {tooShort, tooLong} = elem.validity
  if (tooShort || tooLong) {
    return false
  }
  return true
}
