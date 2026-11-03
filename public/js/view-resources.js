
function viewResources() {
    var request = new XMLHttpRequest();

    request.open('GET', '/view-resources', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            var response = JSON.parse(request.responseText);
            var html = '';

            for (var i = 0; i < response.length; i++) {
                html += '<tr>' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + response[i].name + '</td>' +
                    '<td>' + response[i].location + '</td>' +
                    '<td>' + response[i].description + '</td>' +
                    '<td>' + response[i].owner + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-warning" ' +
                    'onclick=\'editResource(' +
                    JSON.stringify(JSON.stringify(response[i])) +
                    ')\'>Edit</button> ' +
                    '<button type="button" class="btn btn-danger" ' +
                    'onclick="deleteResource(\'' + response[i].id +
                    '\')">Delete</button>' +
                    '</td>' +
                    '</tr>';
            }

            document.getElementById('tableContent').innerHTML = html;
        } else {
            console.error('Failed to load resources:', request.status);
        }
    };

    request.onerror = function () {
        console.error('Network error while loading resources.');
    };

    request.send();
}
