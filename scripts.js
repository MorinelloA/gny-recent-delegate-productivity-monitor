submit = async () => {
    document.getElementById("mainnet").style.display = 'none';
    document.getElementById("testnet").style.display = 'none';

    document.getElementById("loading").innerHTML = "0%";
    document.getElementById("loading").style.width =  "0%";
    document.getElementById("progress").style.display = 'block';

    const networkStatus = await(await fetch('https://testnet.gny.io/api/blocks/getHeight')).json();
    document.getElementById("loading").innerHTML = "10%";
    document.getElementById("loading").style.width =  "10%";

    const currentHeight = networkStatus.height;
    const blocksIntoLastRound = currentHeight % 101;

    let allBlocks = [];
    let blocks1 = await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 505))).json();
    document.getElementById("loading").innerHTML = "25%";
    document.getElementById("loading").style.width =  "25%";
    let blocks2 = await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 405))).json();
    document.getElementById("loading").innerHTML = "35%";
    document.getElementById("loading").style.width =  "35%";
    let blocks3 = await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 305))).json();
    document.getElementById("loading").innerHTML = "50%";
    document.getElementById("loading").style.width =  "50%";
    let blocks4 = await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 205))).json();
    document.getElementById("loading").innerHTML = "65%";
    document.getElementById("loading").style.width =  "65%";
    let blocks5 = await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - 105))).json();
    document.getElementById("loading").innerHTML = "80%";
    document.getElementById("loading").style.width =  "80%";
    let blocks6 = await(await fetch('https://testnet.gny.io/api/blocks?orderBy=height:asc&limit=5&offset=' + (currentHeight - blocksIntoLastRound - 5))).json();
    document.getElementById("loading").innerHTML = "90%";
    document.getElementById("loading").style.width =  "90%";
    
    for(let i = 0; i < blocks1.blocks.length; i++)
        allBlocks.push(blocks1.blocks[i]);
    for(let i = 0; i < blocks2.blocks.length; i++)
        allBlocks.push(blocks2.blocks[i]);
    for(let i = 0; i < blocks3.blocks.length; i++)
        allBlocks.push(blocks3.blocks[i]);
    for(let i = 0; i < blocks4.blocks.length; i++)
        allBlocks.push(blocks4.blocks[i]);
    for(let i = 0; i < blocks5.blocks.length; i++)
        allBlocks.push(blocks5.blocks[i]);
    for(let i = 0; i < blocks6.blocks.length; i++)
        allBlocks.push(blocks6.blocks[i]);

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
    for(let i = 0; i < 101; i++)
    {
        try
        {
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][0] = true;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //Second Round
    for(let i = 102; i < 202; i++)
    {
        try
        {
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][1] = true;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //Third Round
    for(let i = 202; i < 303; i++)
    {
        try
        {
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][2] = true;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //Fourth Round
    for(let i = 303; i < 404; i++)
    {
        try
        {
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][3] = true;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //Fifth Round
    for(let i = 404; i < 505; i++)
    {
        try
        {
            delegatesProductivity[delegatesDict[allBlocks[i].delegate]][4] = true;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    document.getElementById("progress").style.display = 'none';
    document.getElementById("data").innerHTML += "<label class='col-3 col-form-label'><b>Delegate</b></label><label class='distribution col-3 col-form-label'><b>Recent Productivity</b></label><label class='distribution col-2 col-form-label'><b>Produced Blocks</b></label><label class='distribution col-2 col-form-label'><b>Missed Blocks</b></label><label class='distribution col-2 col-form-label'><b>Productivity</b></label><br />"

    const redCircle = "<i class='fa fa-circle' style='color:red'></i>";
    const greenCircle = "<i class='fa fa-circle' style='color:green'></i>";
    for(let i = 0; i < delegates.delegates.length; i++)
    {
        let circle1, circle2, circle3, circle4, circle5;
        if(delegatesProductivity[delegates.delegates[i].username][0]) 
            circle1 = greenCircle; 
        else 
            circle1= redCircle;

        if(delegatesProductivity[delegates.delegates[i].username][1]) 
            circle2 = greenCircle; 
        else 
            circle2= redCircle;

        if(delegatesProductivity[delegates.delegates[i].username][2]) 
            circle3 = greenCircle; 
        else 
            circle3= redCircle;

        if(delegatesProductivity[delegates.delegates[i].username][3]) 
            circle4 = greenCircle; 
        else 
            circle4= redCircle;

        if(delegatesProductivity[delegates.delegates[i].username][4]) 
            circle5 = greenCircle; 
        else 
            circle5= redCircle;

        document.getElementById("data").innerHTML += "<label class='col-3 col-form-label'>" + delegates.delegates[i].username + "</label><label class='distribution col-3 col-form-label'>" + circle1 + circle2 + circle3 + circle4 + circle5 + "</label><label class='distribution col-2 col-form-label'>" + delegates.delegates[i].producedBlocks + "</label><label class='distribution col-2 col-form-label'>" + delegates.delegates[i].missedBlocks + "</label><label class='distribution col-2 col-form-label'>" + (delegates.delegates[i].productivity * 100).toFixed(3) + "%</label><br />"
    }
};
