submit = async () => {
    document.getElementById("mainnet").style.display = 'none';
    document.getElementById("testnet").style.display = 'none';

    document.getElementById("loading").innerHTML = "0%";
    document.getElementById("loading").style.width =  "0%";
    document.getElementById("progress").style.display = 'block';

    const networkStatus = await(await fetch('https://testnet.gny.io/api/blocks/getHeight')).json();
    document.getElementById("loading").innerHTML = "5%";
    document.getElementById("loading").style.width =  "5%";

    const currentHeight = networkStatus.height;
    const blocksIntoLastRound = currentHeight % 101;
    const previousRound = (currentHeight - blocksIntoLastRound) / 101;

    let allBlocks = [];
    let blocks = [];
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 1005))).json());
    document.getElementById("loading").innerHTML = "14%";
    document.getElementById("loading").style.width =  "14%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 905))).json());
    document.getElementById("loading").innerHTML = "25%";
    document.getElementById("loading").style.width =  "25%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 805))).json());
    document.getElementById("loading").innerHTML = "34%";
    document.getElementById("loading").style.width =  "34%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 705))).json());
    document.getElementById("loading").innerHTML = "43%";
    document.getElementById("loading").style.width =  "43%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 605))).json());
    document.getElementById("loading").innerHTML = "52%";
    document.getElementById("loading").style.width =  "52%";

    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 505))).json());
    document.getElementById("loading").innerHTML = "52%";
    document.getElementById("loading").style.width =  "52%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 405))).json());
    document.getElementById("loading").innerHTML = "61%";
    document.getElementById("loading").style.width =  "61%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 305))).json());
    document.getElementById("loading").innerHTML = "70%";
    document.getElementById("loading").style.width =  "70%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 205))).json());
    document.getElementById("loading").innerHTML = "79%";
    document.getElementById("loading").style.width =  "79%";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 105))).json());
    document.getElementById("loading").innerHTML = "88";
    document.getElementById("loading").style.width =  "88";
    
    blocks.push(await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=10&offset=' + (currentHeight - blocksIntoLastRound - 10))).json());
    document.getElementById("loading").innerHTML = "95%";
    document.getElementById("loading").style.width =  "95%";
    
    for(let j = 0; j < blocks.length; j++)
    {
        for(let i = 0; i < blocks[j].blocks.length; i++)
            allBlocks.push(blocks[j].blocks[i]);
    }

    let delegates = await(await fetch('https://testnet.gny.io/api/delegates?orderBy=rate:asc&limit=101')).json();
    document.getElementById("loading").innerHTML = "99%";
    document.getElementById("loading").style.width =  "99%";

    let delegatesDict = {};
    let delegatesProductivity = {}
    for(let i = 0; i < delegates.delegates.length; i++)
    {
        delegatesDict[delegates.delegates[i].publicKey] = delegates.delegates[i].username;
        delegatesProductivity[delegates.delegates[i].username] = [false, false, false, false, false];
    }

    //First Round
    for(let i = 0; i < 101; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][0] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Second Round
    for(let i = 101; i < 202; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][1] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Third Round
    for(let i = 202; i < 303; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][2] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Fourth Round
    for(let i = 303; i < 404; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][3] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Fifth Round
    for(let i = 404; i < 505; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][4] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Sixth Round
    for(let i = 505; i < 606; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][5] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Seventh Round
    for(let i = 606; i < 707; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][6] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Eighth Round
    for(let i = 707; i < 808; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][7] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Ninth Round
    for(let i = 808; i < 909; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][8] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    //Tenth Round
    for(let i = 909; i < 1010; i++){
        try{
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][9] = true;
        }
        catch(e){
            console.log(e);
        }
    }

    document.getElementById("progress").style.display = 'none';
    for(let i = 0; i < delegates.delegates.length; i++)
    {
        let circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8, circle9, circle10;
        if(delegatesProductivity[delegates.delegates[i].username][0]) 
            circle1 = 'green'; 
        else 
            circle1 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][1]) 
            circle2 = 'green'; 
        else 
            circle2 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][2]) 
            circle3 = 'green'; 
        else 
            circle3 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][3]) 
            circle4 = 'green'; 
        else 
            circle4 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][4]) 
            circle5 = 'green'; 
        else 
            circle5 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][5]) 
            circle6 = 'green'; 
        else 
            circle6 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][6]) 
            circle7 = 'green'; 
        else 
            circle7 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][7]) 
            circle8 = 'green'; 
        else 
            circle8 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][8]) 
            circle9 = 'green'; 
        else 
            circle9 = 'red';

        if(delegatesProductivity[delegates.delegates[i].username][9]) 
            circle10 = 'green'; 
        else 
            circle10 = 'red';

        //document.getElementById("data").innerHTML += "<label class='col-3 col-form-label'>" + delegates.delegates[i].username + "</label><label class='distribution col-3 col-form-label'>" + circle1 + circle2 + circle3 + circle4 + circle5 + "</label><label class='distribution col-2 col-form-label'>" + delegates.delegates[i].producedBlocks + "</label><label class='distribution col-2 col-form-label'>" + delegates.delegates[i].missedBlocks + "</label><label class='distribution col-2 col-form-label'>" + (delegates.delegates[i].productivity * 100).toFixed(3) + "%</label><br />"
    
        let newCard = '';
        newCard += "<div class='card mb-3'>";
        //newCard += "<div class='card-body'>";
        newCard += "<div style='padding:5px 50px'>";
        //newCard += "<div class='row pb-2'>";
        newCard += "<div class='row'>";
        newCard += "<div class='col-6 col-lg-6'>";
        newCard += "<small class='text-muted'>#" + delegates.delegates[i].rate + "</small>";
        newCard += "<div class='h4'>" + delegates.delegates[i].username + "</div>";
        newCard += "</div>";
        newCard += "<div class='col-6 col-lg-6'>";
        newCard += "<small class='text-muted'>Recent Rounds</small>";
        newCard += "<div>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 9) + "' style='margin-right:5px;font-size:32px;color:" + circle1 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 8) + "' style='margin-right:5px;font-size:32px;color:" + circle2 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 7) + "' style='margin-right:5px;font-size:32px;color:" + circle3 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 6) + "' style='margin-right:5px;font-size:32px;color:" + circle4 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 5) + "' style='margin-right:5px;font-size:32px;color:" + circle5 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 4) + "' style='margin-right:5px;font-size:32px;color:" + circle6 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 3) + "' style='margin-right:5px;font-size:32px;color:" + circle7 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 2) + "' style='margin-right:5px;font-size:32px;color:" + circle8 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 1) + "' style='margin-right:5px;font-size:32px;color:" + circle9 + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound) + "' style='margin-right:5px;font-size:32px;color:" + circle10 + "'></i>";
        newCard += "</div>";
        newCard += "</div>";
        newCard += "<div class='w-100'></div>";
        newCard += "<div class='col-3 col-lg-3'>";
        newCard += "<small class='text-muted'>Produced</small>";
        newCard += "<div class='h5'>" + delegates.delegates[i].producedBlocks + "</div>";
        newCard += "</div>";
        newCard += "<div class='col-3 col-lg-3'>";
        newCard += "<small class='text-muted'>Missed</small>";
        newCard += "<div class='h5'>" + delegates.delegates[i].missedBlocks + "</div>"
        newCard += "</div>";
        newCard += "<div class='col-6 col-lg-6 order-1 order-lg-0'>";
        newCard += "<small class='text-muted'>Overall Productivity</small>";
        newCard += "<div class='progress' style='height: 20px'>";
        if(delegates.delegates[i].productivity > .3)
        {
            newCard += "<div class='progress-bar bg-success bg-progress-indetermined' role='progressbar' style='height: 20px;width: " + (delegates.delegates[i].productivity * 100) + "%' aria-valuenow='" + (delegates.delegates[i].productivity * 100) + "' aria-valuemin='0' aria-valuemax='100'>" + (100 * delegates.delegates[i].productivity).toFixed(2) + "%</div>";
            newCard += "<div class='progress-bar bg-danger bg-progress-total' role='progressbar' style='height: 20px;width: " + (100 - (delegates.delegates[i].productivity * 100)) + "%' aria-valuenow='" + (100 - (delegates.delegates[i].productivity * 100)) + "' aria-valuemin='0' aria-valuemax='100'></div>";
        }
        else
        {
            newCard += "<div class='progress-bar bg-success bg-progress-indetermined' role='progressbar' style='height: 20px;width: " + (delegates.delegates[i].productivity * 100) + "%' aria-valuenow='" + (delegates.delegates[i].productivity * 100) + "' aria-valuemin='0' aria-valuemax='100'></div>";
            newCard += "<div class='progress-bar bg-danger bg-progress-total' role='progressbar' style='height: 20px;width: " + (100 - (delegates.delegates[i].productivity * 100)) + "%' aria-valuenow='" + (100 - (delegates.delegates[i].productivity * 100)) + "' aria-valuemin='0' aria-valuemax='100'>" + (100 * delegates.delegates[i].productivity).toFixed(2) + "%</div>";
        }
        newCard += "</div>";
        newCard += "</div>";
        newCard += "</div>";
        newCard += "</div>";
        newCard += "</div>";

        document.getElementById("data").innerHTML += newCard;
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
};
