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

var members = data.results[0].members;

var numRep = [];
var numDem = [];
var numInd = [];


function numParty() {
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

}



numParty();

myObj.numberOfRepublicans = numRep.length;
myObj.numberOfDemocrats = numDem.length;
myObj.numberOfIndependents = numInd.length;
myObj.total = numRep.length + numDem.length + numInd.length;


console.log(myObj);

var AvDem = [];
var AvRep = [];
var AvInd = [];


function AvePartyvotes() {
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

}

AvePartyvotes();




var x = 0
var y = 0
var z = 0


function PartyPercent() {
    for (i = 0; i < AvRep.length; i++) {
        x = AvRep[i] + x;

    }


    for (i = 0; i < AvDem.length; i++) {
        y = AvDem[i] + y;

    }


    for (i = 0; i < AvInd.length; i++) {
        z = AvInd[i] + z;

    }

}

PartyPercent();

console.log(x);
console.log(y);
console.log(z);


var PerRep = x / numRep.length;
var PerDem = y / numDem.length;
var PerInd = z / numInd.length;

console.log(PerRep);
console.log(PerDem);
console.log(PerInd);

myObj.PerVotesByPartyDem = PerDem;
myObj.PerVotesByPartyRep = PerRep;
myObj.PerVotesByPartyInd = PerInd;
myObj.PerVotesByPartyTotal = ((PerDem + PerRep + PerInd) / 3)

//ejercicio4//

var missedPerVotes = data.results[0].members;

missedPerVotes.sort(function (A, B) {
    return A.missed_votes_pct - B.missed_votes_pct;
});

console.log(missedPerVotes);

var Tenpercent = missedPerVotes.length * 10 / 100;

console.log(Tenpercent);


var MostEngaged = [];

function MissedPerTopVotes() {
    for (i = 0; i <= Tenpercent; i++) {
        MostEngaged.push(missedPerVotes[i]);
    }

    console.log(MostEngaged);

}

MissedPerTopVotes();





var reverse = missedPerVotes.reverse();
var LeastEngaged = [];

function MissedPerBottomVotes() {

    for (i = 0; i <= Tenpercent; i++) {
        LeastEngaged.push(reverse[i]);
    }

    console.log(LeastEngaged);

}

MissedPerBottomVotes();

myObj.PerOfMissedVotesM = MostEngaged.length;
myObj.PerOfMissedVotesL = LeastEngaged.length;

//party loyalty//

var PartyPerVotes = data.results[0].members;

PartyPerVotes.sort(function (A, B) {
    return A.votes_with_party_pct - B.votes_with_party_pct;
});



var Tenpercent = PartyPerVotes.length * 10 / 100;




var LeastLoyal = [];

function PartyPerTopVotes() {
    for (i = 0; i <= Tenpercent; i++) {
        LeastLoyal.push(PartyPerVotes[i]);
    }

    console.log(LeastLoyal);

}

PartyPerTopVotes();

var reverse = PartyPerVotes.reverse();
var MostLoyal = [];

function PartyPerBottomVotes() {

    for (i = 0; i <= Tenpercent; i++) {
        MostLoyal.push(reverse[i]);
    }

    console.log(MostLoyal);

}

PartyPerBottomVotes();

myObj.PerOfPartyVotesM = MostLoyal.length;
myObj.PerOfPartyVotesL = LeastLoyal.length;


SenateAtAGlanceTable();

if (document.URL.split("/")[document.URL.split("/").length - 1] == "senate-attendance-page.html") {
GenTable(MostEngaged, "MostEngaged");
GenTable(LeastEngaged, "LeastEngaged");
} else {
GenTables(LeastLoyal, "LeastLoyal");
GenTables(MostLoyal, "MostLoyal");
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
    td2.append(numRep.length);
    td3.append(PerRep.toFixed(2));
    td4.append("Democrats");
    td5.append(numDem.length);
    td6.append(PerDem.toFixed(2));
    td7.append("Independets");
    td8.append(numInd.length);
    td9.append(PerInd.toFixed(2));
    td10.append("Total");
    td11.append(myObj.total);
    td12.append(myObj.PerVotesByPartyTotal.toFixed(2));


    tr.append(td, td2, td3);
    tr2.append(td4, td5, td6);
    tr3.append(td7, td8, td9);
    tr4.append(td10, td11, td12);


    tbody.append(tr, tr2, tr3, tr4);

}
