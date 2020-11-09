const mymap = L.map('mapid', {
  zoomControl: false
})
let marker = L.marker([0, 0])

const api_url = 'https://geo.ipify.org/api/v1?apiKey=at_EqXwcoZJnhta0viXZr6Sw5w58nNMf&ipAddress='

const ip = document.getElementById('ip')
const locations = document.getElementById('locations')
const timezone = document.getElementById('timezone')
const isp = document.getElementById('isp')
const address = document.getElementById('address')
const btn = document.getElementById('btn')

async function getData(address) {

  const response = await fetch(api_url + address)
  const data = await response.json()

  updateMap(data.location.lat, data.location.lng)

  ip.textContent = data.ip
  locations.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`
  timezone.textContent = `UTC ${data.location.timezone}`
  isp.textContent = data.isp

}

function setMap() {
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const tiles = L.tileLayer(tileUrl, {
    attribution
  })
  tiles.addTo(mymap)
}

function updateMap(lat, lng) {
  const locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconAnchor: [20, 74]
  })
  marker = L.marker([lat, lng], {
    icon: locationIcon
  }).addTo(mymap)
  mymap.setView([lat, lng], 13)

}

function getInput() {
  if (!validateIP(address.value)) {
    address.classList.add('invalid')
    document.querySelector('.validation-msg').innerHTML = 'Please enter a valid IP address'
    return
  } else {
    address.classList.remove('invalid')
    document.querySelector('.validation-msg').innerHTML = ''
    getData(address.value)
  }
}

function validateIP(input) {
  const format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return format.test(input)
}

btn.addEventListener('click', getInput)
address.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    getInput()
  }
})

setMap()
getData('')