(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }
            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            if (h<12){
                c.innerHTML = h + ":" + m + ":" + s + " AM";
            }
            if (h>=12){
                if(h>=13){
                    h-=12;
                }
                c.innerHTML = h + ":" + m + ":" + s + " PM";
            }
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "Tarne hind: 0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let fname = document.getElementById("fname")
        let lname = document.getElementById("lname")
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
        }else if (fname.value === "" || lname.value === ""){
            alert("Palun sisetage oma nimi");
        
            fname.focus();
        
            return;
        
        }else if(fname.value != "" && lname.value != ""){
            if(/\d/.test(fname.value) || /\d/.test(lname.value)){
                alert("Palun sisestage sobiv nimi");
            
                document.fname.focus();
                
                return;
            }
        }else if(!(document.getElementById("reg").checked || document.getElementById("exp").checked)){
            alert("Palun valige posti kas kiirpost või tavapost!");
                
            document.getElementById("reg").focus();
                
        }
        let hind = 0;
        if(document.getElementById("v1").checked){
            hind+=5;
        }
        if(document.getElementById("v2").checked){
            hind+=1;
        }
        else if(linn.value === "trt" || linn.value == "nrv"){
            hind+=2.5
        }
        else if(linn.value === "prn"){
            hind+=3
        }
        if(document.getElementById("exp").checked){
            hind+=2.5
        }
        e.innerHTML = "Tarne hind: "+hind+"€";       
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    function pushpinClicked1(e) {
        infobox1.setOptions({
            title: "Tartu Ülikool",
            visible: true
        });
    }
    function pushpinClicked2(e) {
        infobox2.setOptions({
            title: "Viljandi Kultuuriakadeemia",
            visible: true
        });
    }

    let tu = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let vlnd = new Microsoft.Maps.Location(
            58.36680, 
            25.59766
        );
    let centerPoint = new Microsoft.Maps.Location(
            58.38996, 
            26.14597
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(tu, {});
    let pushpin2 = new Microsoft.Maps.Pushpin(vlnd, {});

    let infobox1 = new Microsoft.Maps.Infobox(tu, {
            visible: false
        });
    
    let infobox2 = new Microsoft.Maps.Infobox(vlnd, {
            visible: false
        });
    infobox1.setMap(map);
    infobox2.setMap(map);

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked1);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked2);

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

