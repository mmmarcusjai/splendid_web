// Initialize and add the map
var marker;
var map;
var infowindow = new google.maps.InfoWindow();

function initMap() {
    axios.get(`${base_url}/api/getOfficeDetail`)
        .then(function (response) {
            // console.log(response);
            let officeData = response.data;
            let officeList = [];
            for(var office in officeData) {
                officeList[office] = {
                    name: officeData[office].office_name,
                    position: {
                        lat: parseFloat(officeData[office].office_lat),
                        lng: parseFloat(officeData[office].office_lng)
                    }
                };
                // officeList[office][name = officeData[office].office_name;
                // officeList.office.position = officeData[office].office_location;
            }
            // console.log(officeList);
            renderMap(officeList);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderMap(data) {
    var office_location = data;
    // The map, centered at hk office
    var icon_img = {
        url: 'http://splendid.group/wp-content/themes/wecreate/dist/images/shadow.png', // url
        scaledSize: new google.maps.Size(50, 60) // scaled size
    };
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 2,
            center: office_location[0].position,
            disableDefaultUI: true,
            gestureHandling: 'greedy'
        });
    // The marker and add click event to office
    
    for (var office in office_location) {
        marker = new google.maps.Marker({
            position: office_location[office].position,
            title: office_location[office].name,
            map: map,
            icon: icon_img
        });

        google.maps.event.addListener(marker, 'click', (function (clickmarker) {
            return function () {
                infowindow.setContent(this.title);
                infowindow.open(map, clickmarker);
                // map.setZoom(18);
                // map.setCenter(clickmarker.getPosition());
            };
        })(marker, office));
    }
}