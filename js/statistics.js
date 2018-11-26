var data;

if (document.title == ("senate")) {

    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {

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

        data = jdata
        console.log(data);



        var members = data.results[0].members;


        general(members);


        SenateAtAGlanceTable();


        document.getElementById("loader").style.display = 'none';
        document.getElementById("loader2").style.display = 'none';
        document.getElementById("loader3").style.display = 'none';




        if (document.URL.split("/")[document.URL.split("/").length - 1] == "senate-attendance-page.html") {
            GenTable(MostEngaged, "MostEngaged");
            GenTable(LeastEngaged, "LeastEngaged");
        } else {
            GenTables(LeastLoyal, "LeastLoyal");
            GenTables(MostLoyal, "MostLoyal");

            document.getElementById("loader").style.display = 'none';
            document.getElementById("loader2").style.display = 'none';
            document.getElementById("loader3").style.display = 'none';
        }



    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });

}

if (document.title == ("house")) {


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

        data = jdata
        console.log(data);


        var members = data.results[0].members;

        general(members);


        HouseAtAGlanceTable();

        document.getElementById("loader").style.display = 'none';
        document.getElementById("loader2").style.display = 'none';
        document.getElementById("loader3").style.display = 'none';



        if (document.URL.split("/")[document.URL.split("/").length - 1] == "house-attendance-page.html") {
            GenTable(MostEngaged, "MostEngaged");
            GenTable(LeastEngaged, "LeastEngaged");
        } else {
            GenTables(LeastLoyal, "LeastLoyal");
            GenTables(MostLoyal, "MostLoyal");

            document.getElementById("loader").style.display = 'none';
            document.getElementById("loader2").style.display = 'none';
            document.getElementById("loader3").style.display = 'none';
        }




    }).catch(function (error) {
        console.log("Request failed:" + error.message);
    });

}


var myObj = {
    "numberOfRepublicans": 0,
    "numberOfDemocrats": 0,
    "numberOfIndependents": 0,
    "total": 0,
    "PerOfMissedVotesL": 0,
    "PerOfMissedVotesM": 0,
    "PerOfPartyVotesL": 0,
    "PerOfPartyVotesM": 0,
    "PerVotesByPartyRep": 0,
    "PerVotesByPartyDem": 0,
    "PerVotesByPartyInd": 0,
    "PerVotesByPartyTotal": 0,
}

function general(members) {
    numParty(members);
    AvePartyvotes(members);
    PartyPercent(members);
    MissedPerTopVotes(members);
    MissedPerBottomVotes(members);
    PartyPerTopVotes(members);
    PartyPerBottomVotes(members);
} {

    var numRep = [];
    var numDem = [];
    var numInd = [];
    var numTotal = [];


    function numParty(members) {
        for (i = 0; i < members.length; i++) {
            if (members[i].party == 'R') {
                numRep.push(members[i]);
            }
            
        }

        for (i = 0; i < members.length; i++) {
            if (members[i].party == 'D') {
                numDem.push(members[i]);
            }
        }

        for (i = 0; i < members.length; i++) {
            if (members[i].party == 'I') {
                numInd.push(members[i]);
            }
        }
        for (i = 0; i < members.length; i++) {
            if (members[i].party == 'R', 'D', 'I') {
                numTotal.push(members[i]);
            }

        }

    

    myObj.numberOfRepublicans = numRep.length;
    myObj.numberOfDemocrats = numDem.length;
    myObj.numberOfIndependents = numInd.length;
    myObj.total = numTotal.length;

    console.log(myObj);

}






var AvDem = [];
var AvRep = [];
var AvInd = [];
var AvTotal = [];


function AvePartyvotes(members) {
    for (i = 0; i < members.length; i++) {
        if (members[i].party == 'R') {
            AvRep.push(members[i].votes_with_party_pct);
        }
    }

    for (i = 0; i < members.length; i++) {
        if (members[i].party == 'D') {
            AvDem.push(members[i].votes_with_party_pct);
        }
    }

    for (i = 0; i < members.length; i++) {
        if (members[i].party == 'I') {
            AvInd.push(members[i].votes_with_party_pct);
        }

    }

    for (i = 0; i < members.length; i++) {
        if (members[i].party == 'R', 'D', 'I') {
            AvTotal.push(members[i].votes_with_party_pct);
        }
    }

}





var x = 0
var y = 0
var z = 0
var t = 0


function PartyPercent(members) {
    for (i = 0; i < AvRep.length; i++) {
        x = AvRep[i] + x;

    }


    for (i = 0; i < AvDem.length; i++) {
        y = AvDem[i] + y;

    }


    for (i = 0; i < AvInd.length; i++) {
        z = AvInd[i] + z;

    }

    for (i = 0; i < AvTotal.length; i++) {
        t = AvTotal[i] + t;

    }

    console.log(x);
    console.log(y);
    console.log(z);
    console.log(t);

    var PerRep = x / numRep.length;
    var PerDem = y / numDem.length;
    var PerInd = z / numInd.length;
    var PerTotal = t / numTotal.length;

    console.log(PerRep);
    console.log(PerDem);
    console.log(PerTotal);
    console.log(numTotal);
    

    myObj.PerVotesByPartyDem = PerDem;
    myObj.PerVotesByPartyRep = PerRep;
    myObj.PerVotesByPartyInd = PerInd;
    myObj.PerVotesByPartyTotal = PerTotal;
}



//ejercicio4//


var MostEngaged = [];

function MissedPerTopVotes(missedPerVotes) {
    missedPerVotes.sort(function (A, B) {
        return A.missed_votes_pct - B.missed_votes_pct;
    });

    var Tenpercent = Math.round(missedPerVotes.length * 10 / 100);


    for (i = 0; i < missedPerVotes.length; i++) {

        if (i >= Tenpercent) {
            if (missedPerVotes[i - 1].missed_votes_pct == missedPerVotes[i].missed_votes_pct) {
                MostEngaged.push(missedPerVotes[i])
            } else {
                break;

            }
        } else {
            MostEngaged.push(missedPerVotes[i]);

        }

    }
    console.log(missedPerVotes);
    console.log(Tenpercent);
    console.log(MostEngaged);
    myObj.PerOfMissedVotesM = MostEngaged.length;
}


var LeastEngaged = [];

function MissedPerBottomVotes(missedPerVotes) {
    missedPerVotes.sort(function (A, B) {
        return A.missed_votes_pct - B.missed_votes_pct;
    });

    var Tenpercent = Math.round(missedPerVotes.length * 10 / 100);

    var reverse = missedPerVotes.reverse();

    for (i = 0; i < missedPerVotes.length; i++) {

        if (i >= Tenpercent) {
            if (missedPerVotes[i - 1].missed_votes_pct == missedPerVotes[i].missed_votes_pct) {
                LeastEngaged.push(missedPerVotes[i])
            } else {
                break;

            }
        } else {
            LeastEngaged.push(reverse[i]);

        }

    }




    console.log(LeastEngaged);
    myObj.PerOfMissedVotesL = LeastEngaged.length;
}





//party loyalty//



var LeastLoyal = [];

function PartyPerTopVotes(PartyPerVotes) {

    PartyPerVotes.sort(function (A, B) {
        return A.votes_with_party_pct - B.votes_with_party_pct;
    });


    var Tenpercent = Math.round(PartyPerVotes.length * 10 / 100);


    for (i = 0; i < PartyPerVotes.length; i++) {


        if (i >= Tenpercent) {
            if (PartyPerVotes[i - 1].votes_with_party_pct == PartyPerVotes[i].votes_with_party_pct) {
                LeastLoyal.push(PartyPerVotes[i])
            } else {
                break;

            }
        } else {
            LeastLoyal.push(PartyPerVotes[i]);

        }

    }

    console.log(LeastLoyal);
    myObj.PerOfPartyVotesL = LeastLoyal.length;
}


var MostLoyal = [];

function PartyPerBottomVotes(PartyPerVotes) {

    PartyPerVotes.sort(function (A, B) {
        return A.votes_with_party_pct - B.votes_with_party_pct;
    });


    var Tenpercent = Math.round(PartyPerVotes.length * 10 / 100);

    var reverse = PartyPerVotes.reverse();

    for (i = 0; i < PartyPerVotes.length; i++) {


        if (i >= Tenpercent) {
            if (PartyPerVotes[i - 1].votes_with_party_pct == PartyPerVotes[i].votes_with_party_pct) {
                MostLoyal.push(PartyPerVotes[i])
            } else {
                break;

            }
        } else {
            MostLoyal.push(reverse[i]);
        }

    }


    console.log(MostLoyal);
    myObj.PerOfPartyVotesM = MostLoyal.length;
}




}



function GenTable(SenatorsList, table_name) {

    for (i = 0; i < SenatorsList.length; i++) {


        var tbody = document.getElementById(table_name);

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var addlink = document.createElement("a");



        var name = SenatorsList[i].first_name;
        var middleName = SenatorsList[i].middle_name;

        if (middleName == null) {
            middleName = " "
        };

        var lastName = SenatorsList[i].last_name;
        var Missedvotes = SenatorsList[i].missed_votes;
        var Missedvotesper = SenatorsList[i].missed_votes_pct;
        var link = SenatorsList[i].url;

        addlink.setAttribute("href", link);

        addlink.setAttribute("target", "_blank")

        td1.append(addlink);
        addlink.append(name + " " + middleName + " " + lastName);
        td2.append(Missedvotes);
        td3.append(Missedvotesper);



        tr.append(td1);
        tr.append(td2);
        tr.append(td3);


        tbody.append(tr);



    }
}

function GenTables(SenatorsList, table_name) {

    for (i = 0; i < SenatorsList.length; i++) {


        var tbody = document.getElementById(table_name);

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var addlink = document.createElement("a");



        var name = SenatorsList[i].first_name;
        var middleName = SenatorsList[i].middle_name;

        if (middleName == null) {
            middleName = " "
        };

        var lastName = SenatorsList[i].last_name;
        var Partyvotes = SenatorsList[i].total_votes;
        var Partyvotesper = SenatorsList[i].votes_with_party_pct;
        var link = SenatorsList[i].url;

        addlink.setAttribute("href", link);

        addlink.setAttribute("target", "_blank")

        td1.append(addlink);
        addlink.append(name + " " + middleName + " " + lastName);
        td2.append(Partyvotes);
        td3.append(Partyvotesper);



        tr.append(td1);
        tr.append(td2);
        tr.append(td3);


        tbody.append(tr);



    }
}


function SenateAtAGlanceTable() {

    var tbody = document.getElementById("SenateAtAGlance");

    var tr = document.createElement("tr");
    var tr2 = document.createElement("tr");
    var tr3 = document.createElement("tr");
    var tr4 = document.createElement("tr");

    var td = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");
    var td8 = document.createElement("td");
    var td9 = document.createElement("td");
    var td10 = document.createElement("td");
    var td11 = document.createElement("td");
    var td12 = document.createElement("td");


    td.append("Republicans");
    td2.append(myObj.numberOfRepublicans);
    td3.append(myObj.PerVotesByPartyRep.toFixed(2));
    td4.append("Democrats");
    td5.append(myObj.numberOfDemocrats);
    td6.append(myObj.PerVotesByPartyDem.toFixed(2));
    td7.append("Independents");
    td8.append(myObj.numberOfIndependents);
    td9.append(myObj.PerVotesByPartyInd.toFixed(2));
    td10.append("Total");
    td11.append(myObj.total);
    td12.append(myObj.PerVotesByPartyTotal.toFixed(2));


    tr.append(td, td2, td3);
    tr2.append(td4, td5, td6);
    tr3.append(td7, td8, td9);
    tr4.append(td10, td11, td12);


    tbody.append(tr, tr2, tr3, tr4);

}

function GenTable(HouseList, table_name) {

    for (i = 0; i < HouseList.length; i++) {

        var tbody = document.getElementById(table_name);

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var addlink = document.createElement("a");



        var name = HouseList[i].first_name;
        var middleName = HouseList[i].middle_name;

        if (middleName == null) {
            middleName = " "
        };

        var lastName = HouseList[i].last_name;
        var Missedvotes = HouseList[i].missed_votes;
        var Missedvotesper = HouseList[i].missed_votes_pct;
        var link = HouseList[i].url;

        addlink.setAttribute("href", link);

        addlink.setAttribute("target", "_blank")

        td1.append(addlink);
        addlink.append(name + " " + middleName + " " + lastName);
        td2.append(Missedvotes);
        td3.append(Missedvotesper);



        tr.append(td1);
        tr.append(td2);
        tr.append(td3);


        tbody.append(tr);

    }

}

function GenTables(HouseList, table_name) {

    for (i = 0; i < HouseList.length; i++) {


        var tbody = document.getElementById(table_name);

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var addlink = document.createElement("a");



        var name = HouseList[i].first_name;
        var middleName = HouseList[i].middle_name;

        if (middleName == null) {
            middleName = " "
        };

        var lastName = HouseList[i].last_name;
        var Partyvotes = HouseList[i].total_votes;
        var Partyvotesper = HouseList[i].votes_with_party_pct;
        var link = HouseList[i].url;

        addlink.setAttribute("href", link);

        addlink.setAttribute("target", "_blank")

        td1.append(addlink);
        addlink.append(name + " " + middleName + " " + lastName);
        td2.append(Partyvotes);
        td3.append(Partyvotesper);



        tr.append(td1);
        tr.append(td2);
        tr.append(td3);


        tbody.append(tr);



    }
}

function HouseAtAGlanceTable() {

    var tbody = document.getElementById("HouseAtAGlance");

    var tr = document.createElement("tr");
    var tr2 = document.createElement("tr");
    var tr3 = document.createElement("tr");
    var tr4 = document.createElement("tr");


    var td = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");
    var td8 = document.createElement("td");
    var td9 = document.createElement("td");
    var td10 = document.createElement("td");
    var td11 = document.createElement("td");
    var td12 = document.createElement("td");


    td.append("Republicans");
    td2.append(myObj.numberOfRepublicans);
    td3.append(myObj.PerVotesByPartyRep.toFixed(2));
    td4.append("Democrats");
    td5.append(myObj.numberOfDemocrats);
    td6.append(myObj.PerVotesByPartyDem.toFixed(2));
    td7.append("Independents");
    td8.append(myObj.numberOfIndependents);
    td9.append(0);
    td10.append("Total");
    td11.append(myObj.total);
    td12.append(myObj.PerVotesByPartyTotal.toFixed(2));


    tr.append(td, td2, td3);
    tr2.append(td4, td5, td6);
    tr3.append(td7, td8, td9);
    tr4.append(td10, td11, td12);



    tbody.append(tr, tr2, tr3, tr4);

}
