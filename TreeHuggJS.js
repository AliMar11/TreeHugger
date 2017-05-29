const body = document.body;
const zipInput = document.getElementById('zip-input-field');
const treeList = document.getElementById('tree-list');
const heightInput = document.getElementById('height-input-field');
const findTreesBtn = document.getElementById('find-trees-button');

// EVENT LISTENERS
console.log(heightInput);

findTreesBtn.addEventListener('click', () => {
	let zip = zipInput.value;
  let height = heightInput.value;
  let heightCm = height * 2.54
  console.log('btn clicked');
  getTreeData(zip, heightCm);
});

// geocoding key
// AIzaSyCcuunkmrQ4WY2XmCh88FiCeRBxqLcUeJE

// GEOCODING URL REVERSE ADDRESS LOOKUP

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

// get tree data
function getTreeData(zip, heightCm) {
	$.ajax({
	type: 'GET',
  url: 'https://data.cityofnewyork.us/resource/nwxe-4ae8.json',
  data: {
  	'$limit': 100,
    'zipcode': zip,
  	},
   success: (treeData) => {
   	treeData.forEach((treeEl) => {
    	let latitude = treeEl.latitude;
    	let longitude = treeEl.longitude;
 			let armSpan = heightCm;
      let treeCircum = 2 * 3.14 * treeEl.tree_dbh;
      if(treeCircum < armSpan) {
        let status = treeEl.status;
        let address = treeEl.address;
      	makeTreeListItem(latitude, longitude, address, status);
      }
    });
   },
   error: (err) => {
   	console.log(err)
   }
	});
}

function makeTreeListItem(lat, lng, address, status) {
	let listItem = document.createElement('li');
  let addressItem = document.createElement('h2');
  addressItem.innerHTML = address;
  let statusItem = document.createElement('h3');
  statusItem.innerHTML = 'status: ' + status;
	let imgEl = document.createElement('img');
  // imgEl.style.display = 'inline-block';
  let location = 'location=' + lat + ',' + lng;
  let url = 'https://maps.googleapis.com/maps/api/streetview?size=150x150&' + location + '&fov=90&heading=235&pitch=10&key=AIzaSyBr4nCcRxjws1lMejzlmDsqPl1fo4PS-is';
  imgEl.src = url;
  listItem.appendChild(imgEl);
  console.log(status);
  console.log(address);
  listItem.appendChild(addressItem);
  listItem.appendChild(statusItem);
  body.appendChild(listItem);
}
