submit = async (net) => {
    const urlPrefix = net == 'Mainnet' ? 'https://mainnet.gny.io' : 'https://testnet.gny.io';
    document.getElementById("net").innerHTML = net;

    document.getElementById("mainnet").style.display = 'none';
    document.getElementById("testnet").style.display = 'none';

    document.getElementById("loading").innerHTML = "0%";
    document.getElementById("loading").style.width =  "0%";
    document.getElementById("progress").style.display = 'block';

	const networkStatus = await(await fetch(urlPrefix + '/api/blocks?limit=1&orderBy=height:desc')).json();
    let percentComplete = 5;
    document.getElementById("loading").innerHTML = percentComplete + "%";
    document.getElementById("loading").style.width =  percentComplete + "%";

    const currentHeight = networkStatus.blocks[0].height;
	const lastBlockUnix = networkStatus.blocks[0].timestamp + 1542571200;
	const lastBlockStr = new Date(lastBlockUnix * 1000).toLocaleString();
    const blocksIntoLastRound = currentHeight % 101 - 1;
	
    const previousRound = (currentHeight - blocksIntoLastRound - 1) / 101;

    const lastCalculatedBlock = await(await fetch(urlPrefix + '/api/blocks/getBlock?height=' + (currentHeight - blocksIntoLastRound))).json();
    const lastCalculatedBlockUnix = lastCalculatedBlock.block.timestamp + 1542571200;
	const lastCalculatedBlockStr = new Date(lastCalculatedBlockUnix * 1000).toLocaleString();

    let allBlocks = [];
    let blocks = [];
    
    for(let i = 1010; i >= 110; i-=100)
    {
        blocks.push(await(await fetch(urlPrefix + '/api/blocks?orderBy=height:asc&limit=100&offset=' + (currentHeight - blocksIntoLastRound - i))).json());
        percentComplete += 9;
        document.getElementById("loading").innerHTML = percentComplete + "%";
        document.getElementById("loading").style.width =  percentComplete + "%";
    }

    blocks.push(await(await fetch(urlPrefix + '/api/blocks?orderBy=height:asc&limit=10&offset=' + (currentHeight - blocksIntoLastRound - 10))).json());
    document.getElementById("loading").innerHTML = "95%";
    document.getElementById("loading").style.width =  "95%";
    
    for(let j = 0; j < blocks.length; j++)
    {
        for(let i = 0; i < blocks[j].blocks.length; i++)
            allBlocks.push(blocks[j].blocks[i]);
    }

    let delegates = await(await fetch(urlPrefix + '/api/delegates?orderBy=rate:asc&limit=101')).json();
    document.getElementById("loading").innerHTML = "99%";
    document.getElementById("loading").style.width =  "99%";

    let delegatesDict = {};
    let delegatesProductivity = {};
    for(let i = 0; i < delegates.delegates.length; i++)
    {
        delegatesDict[delegates.delegates[i].publicKey] = delegates.delegates[i].username;
        delegatesProductivity[delegates.delegates[i].username] = [false, false, false, false, false, false, false, false, false, false];
    }

    for(let j = 0; j < 10; j++){
        for(let i = 0; i < 101; i++){
            try{
                delegatesProductivity[delegatesDict[allBlocks[i + (101 * j)].delegate]][j] = true;
            }
            catch(e){
                console.log(e);
            }
        }
    }

    document.getElementById("progress").style.display = 'none';
    for(let i = 0; i < delegates.delegates.length; i++)
    {
        let circles = [];
        for(let j = 0; j < blocks.length; j++)
        {
            if(delegatesProductivity[delegates.delegates[i].username][j]) 
				circles.push('green'); 
        else 
            circles.push('red');
        }

        let newCard = '';
        newCard += "<div class='card mb-3'>";
        newCard += "<div style='padding:5px 50px'>";
        newCard += "<div class='row'>";
        newCard += "<div class='col-6 col-lg-6'>";
        newCard += "<small class='text-muted'>#" + delegates.delegates[i].rate + "</small>";
        newCard += "<div class='h4'>" + delegates.delegates[i].username + "</div>";
        newCard += "</div>";
        newCard += "<div class='col-6 col-lg-6'>";
        newCard += "<small class='text-muted'>Recent Rounds</small>";
        newCard += "<div>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 9) + "' style='margin-right:5px;font-size:32px;color:" + circles[0] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 8) + "' style='margin-right:5px;font-size:32px;color:" + circles[1] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 7) + "' style='margin-right:5px;font-size:32px;color:" + circles[2] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 6) + "' style='margin-right:5px;font-size:32px;color:" + circles[3] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 5) + "' style='margin-right:5px;font-size:32px;color:" + circles[4] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 4) + "' style='margin-right:5px;font-size:32px;color:" + circles[5] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 3) + "' style='margin-right:5px;font-size:32px;color:" + circles[6] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 2) + "' style='margin-right:5px;font-size:32px;color:" + circles[7] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound - 1) + "' style='margin-right:5px;font-size:32px;color:" + circles[8] + "'></i>";
        newCard += "<i class='fa fa-circle' data-toggle='tooltip' data-placement='top' title='Round #" + (previousRound) + "' style='margin-right:5px;font-size:32px;color:" + circles[9] + "'></i>";
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
        document.getElementById("lastBlock").innerHTML = 'Most Recent Network Block: ' + lastBlockStr;
        document.getElementById("lastCalc").innerHTML = 'Data Below Updated At: ' + lastCalculatedBlockStr;
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
};
