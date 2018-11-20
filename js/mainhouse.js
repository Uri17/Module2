//document.getElementById("house-data").innerHTML = JSON.stringify(data, null, 2);

var data;

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {

    method: "GET",
    headers: {
        'X-API-Key': "ljBYYxQv4PTlIEUw4xbxZSC6PAxdL36cQPJfcOkj"
    }

}).then(function (response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
}).then(function (jdata) {

    data = jdata;
    console.log(data);
    
    getmembers();
    states();
    

}).catch(function (error) {
    console.log("Request failed:" + error.message);
});


function getmembers() {
    createTable(data.results[0].members);
}

function createTable(members) {

    var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";


    for (i = 0; i < members.length; i++) {

        var thead = document.createElement("thead")

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var addlink = document.createElement("a");


        var name = members[i].first_name;
        var middleName = members[i].middle_name;

        if (middleName == null) {
            middleName = " "
        };

        var lastName = members[i].last_name;
        var party = members[i].party;
        var state = members[i].state;
        var years_in_office = members[i].seniority;
        var votes_with_party_pct = members[i].votes_with_party_pct;

        var link = members[i].url;

        addlink.setAttribute("href", link);

        addlink.setAttribute("target", "_blank")


        addlink.append(name + " " + middleName + " " + lastName);
        td1.append(addlink);
        td2.append(party);
        td3.append(state);
        td4.append(years_in_office);
        td5.append(votes_with_party_pct);



        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);

        tbody.append(tr);




    }
}





// Pass the checkbox name to the function
function getCheckedBoxes() {

    var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');

    var filteredMembers = [];
    var members = data.results[0].members;

    if (checkedBoxes.length > 0) {
        // loop over them all
        for (var i = 0; i < checkedBoxes.length; i++) {
            for (var j = 0; j < members.length; j++) {

                // And stick the checked ones onto an array...
                if (checkedBoxes[i].value == members[j].party) {
                    filteredMembers.push(members[j]);
                }

                // Return the array if it is non-empty, or null
                //    return checkedBoxes.length > 0 ? checkedBoxes : null;
            }
        }
    } else {
        filteredMembers = filteredMembers.concat(members);
    }

    var select = document.getElementById("states");
    var selectedValue = select.value;

    if (selectedValue !== "All") {
        // Find those who not meet condition
        var membersToRemove = filteredMembers.filter((member) => selectedValue !== member.state);
        // we delate
        membersToRemove.map(function (member) {
            filteredMembers.splice(filteredMembers.indexOf(member), 1)
        });
    }

    // Call as

    createTable(filteredMembers);

}




function states() {

    var select = document.getElementById("states")

    var repeatedstates = [];

    for (i = 0; i < data.results[0].members.length; i++) {
        if (!repeatedstates.includes(data.results[0].members[i].state)) {
            repeatedstates.push(data.results[0].members[i].state);
        }
    }

    repeatedstates.sort();

    for (var i = 0; i < repeatedstates.length; i++) {

        var state = repeatedstates[i];

        var option = document.createElement("option");

        option.append(state);
        select.append(option);

    }

    console.log(repeatedstates);
}

