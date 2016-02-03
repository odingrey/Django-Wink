var winkDevices = [];

function winkLogin() {
	var xhr = new XMLHttpRequest();
	$.ajax({		// Get wink API and wink user info from the database.
		url: '/getWinkLogin',
		dataType: 'json',
		success: function(data) {
			var username = data.wink_username;
			var password = data.wink_password;
			var clientid = data.api_id;
			var clientsecret = data.api_password;
			var sendstring = "{\"client_id\":\"" + clientid + "\",\"client_secret\":\"" + clientsecret + "\",\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"grant_type\":\"password\"}";

			xhr.open('POST', 'https://winkapi.quirky.com/oauth2/token');
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (typeof cb !== "undefined") {
						cb(this);
					} else {	// Login successful
						var response = JSON.parse(this.responseText);

						AccessToken = response.access_token;
						RefreshToken = response.refresh_token;
						TokenType = response.token_type;
						fetchDevices();
						return;
					}
				}
			};
			xhr.send(sendstring);
		}
	});
}

function fetchDevices() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://winkapi.quirky.com/users/me/wink_devices');
	xhr.setRequestHeader("Authorization", "Bearer " + AccessToken);
	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (xhr.status != 200) {
				// Handle request failure here...
				updateStatus("Error Calling Wink REST API " + xhr.status + " " + xhr.statusText);
				return;
			} else {
				updateStatus("Calling Wink REST API");

				// Request successful, read the response
				for each (var control in JSON.parse(xhr.responseText)) {	 //Loop for each device in response
					winkDevices.push(control);
				}

				updateStatus("Found " + winkDevices.length + " Wink devices");
			}
		}
	};
	updateStatus"Fetching...");
	xhr.send();
	window.setTimeout(function() {		// Retry
		fetchDevices();
		// Generate HTML
	}, 60000);

}


function updateStatus(message) {
	document.getElementById("winkResult").innerHTML = message;
	return;
}

function generateDivFromObject(object) {
		
}

