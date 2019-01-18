//💲  ✎ 🖤
// define endpoint based on environment
const endpoint = (window.location.hostname.indexOf("herokuapp") === -1)
  ? "ws://localhost:3553" // development (local)
  : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}` // production (remote)

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(endpoint);
var room;

window.onresize = function(){
    setTimeout(function(){scrollTo(0,0)},10);
    setTimeout(function(){scrollTo(0,window.innerHeight)},50);
}

window.onload = function(){
    setTimeout(function(){scrollTo(0,0)},10);
    setTimeout(function(){scrollTo(0,window.innerHeight)},50);
}

function popup(type, title, message='', timeout=3000,position='topCenter'){
    const options = {
        title: title,
        message: message,
        timeout: timeout,
        position: position,
        //maxWidth: 0.5* window.width,
    };
    if (type == 'success') iziToast.success(options)
    if (type == 'warning') iziToast.warning(options)
    if (type == 'error') iziToast.error(options)
    if (type == 'info') iziToast.info(options)
}

client.onOpen.add(function() {
    console.log("connected to server")
});

client.onError.add(function(err) {
    console.log("something wrong happened", err);
  });

client.onClose.add(function() {
    console.log("connection has been closed");
  });

function initPlayerBoxs(numPlayers) {
    for (i = 1; i < numPlayers; ++i) {
        $("#topBox > div:first-child" ).clone().appendTo( "#topBox" )
    };
    var colors = ['#967262','#AB9A7B','#BFB88A','#C4C797','#88966B']
    if (numPlayers==2){
        $("#topBox > .playerBox:first-child" ).css({'backgroundColor': colors[2]});
        $('#topBox .playerBox:nth-child(2)').css({'backgroundColor': colors[3]});
    }
    if (numPlayers==3 || numPlayers==4){
        for (i = 1; i <= numPlayers; ++i) {
            $(`#topBox .playerBox:nth-child(${i})`).css({'backgroundColor': colors[i]});
        };
    }
    if (numPlayers==5){
        for (i = 1; i <= numPlayers; ++i) {
            $(`#topBox .playerBox:nth-child(${i})`).css({'backgroundColor': colors[i-1]});
        };
    }
}


function updatePlayerInfo(player){//dead players won't be updated
    var playerId = player.playerId;
    $('.turnNo')[playerId].innerHTML = room.state.currentTurn
    $('.health')[playerId].innerHTML = player.health
    $('.money')[playerId].innerHTML = player.money
    //weapons
    var count = 0;
    $('.weapons')[playerId].innerHTML = ''
    for (var weapon in player.weapons) {
        if (count != 0) $('.weapons')[playerId].innerHTML += '、';
        $('.weapons')[playerId].innerHTML += `${weapon}(${player.weapons[weapon]})`
        count += 1;
    }
}

function playerOut(playerId, reason){
    $('.playerName').eq(playerId).css('text-decoration','line-through')
    var theBox = $('.deadText')[playerId];
    function randomIcon(icons){
        return icons[Math.floor(Math.random()*icons.length)];
    }
    if (reason=='bombed') theBox.innerHTML = '💥';
    else if (reason=='invalid') theBox.innerHTML = randomIcon(['😵','💩']);
    else if (reason=='police')  theBox.innerHTML = randomIcon(['😣','😩']);
    //else if (reason=='weapon') 
    else if (reason=='nuke') theBox.innerHTML = '🤯'; 
    else theBox.innerHTML = randomIcon(['👼','👻']);
}

function refreshGame(){
}

function addListeners (room) {
    var mySessionId;
    var maxClients;
    var newDeath = {};
    room.onJoin.add(function() {
        mySessionId = room.sessionId
        maxClients = room.options.maxClients
        initPlayerBoxs(maxClients)
    })

    room.onLeave.add(function() {
        console.log("LEFT ROOM", arguments);
        //popup('info','已离开房间')
    });
    room.onError.add(function(err) {
        console.log("oops, error ocurred:");
        console.log(err);
    });

    /*
    room.onStateChange.add(function(state) {
        if (playerId == undefined) {
            playerId = Object.keys(state.players).length
            console.log('i am player '+ playerId)
        }
    });
        }
    });*/
    /*
    room.listen("players/:id", (change) => {
        players = room.state.players
        console.log(players)
        
        if (change.operation === "add") {
          console.log("new player added to the state");
          console.log("player id:", change.path.id);
          console.log("player data:", change.value);
      
        } else if (change.operation === "remove") {
          console.log("player has been removed from the state");
          console.log("player id:", change.path.id);
        }
      });*/
    /*
    room.listen("players/:id/:attribute", (change) => {
        console.log(change.operation); // => "replace" (can be "add", "remove" or "replace")
        console.log(change.path["id"]); // => "f98h3f"
        console.log(change.path["attribute"]); // => "y"
        console.log(change.value); // => 1
    })*/
    room.onMessage.add(function(message) {
        console.log("server just sent this message:");
        console.log(message);
        if (message.type == 'join'){
            var pId = message.playerId + 1
            if (message.clientId != mySessionId){//后来的玩家
                popup('info','Player'+pId+'已加入','',1000,'topLeft')
                $('.playerName')[message.playerId].innerHTML = 'Player'+pId
                $(`.playerBox:eq(${message.playerId}) .playerInfo`).css('display', 'flex')
            }
            else {//自己加入时
                popup('success', '成功加入房间'+room.options.rmid+'，您是Player'+pId, '', 4000,'topLeft');
                for (var i=0; i < pId; i++){
                    $('.playerName')[i].innerHTML = 'Player'+(i+1)
                    $(`.playerBox:eq(${i}) .playerInfo`).css('display', 'flex')
                }
                $('.playerName')[message.playerId].style.textDecoration = 'underline'
            }
        }
        if (message.type == 'leave'){
            if (message.clientId != mySessionId){//后来的玩家
                popup('info',`Player${message.playerId+1}已离开`,'',1000,'topLeft')
                if (room.state.gameOn){
                    playerOut(message.playerId)
                }
                else {
                    $('.playerName')[message.playerId].innerHTML = 'Waiting for player...'
                    $(`.playerBox:eq(${message.playerId}) .playerInfo`).css('display', 'none')
                }
            }
        }
        if (message.type=='gameStart'){
            popup('info','游戏即将开始...','',2000,'topRight')
            for (var i = 0; i < maxClients; i++){
                $('.turnNo')[i].innerHTML = room.state.currentTurn
            }
            $(".card").addClass("active");
        }
        if (message.type=='turnStart'){
            for (var pId in newDeath) {
                playerOut(pId, newDeath[pId])
            }
            newDeath = {}
            $('.topCard').animate({opacity: 0},150)
            $('.selected').removeClass('selected');
            $('.card').css('opacity',1);
            $('.cardFront, .cardBack').hide();
            $('.flipContainer').removeClass('flipped')
            $('.cardFront').removeClass('buy use others defend')
            if (room.state.players[mySessionId].state == 'alive'){
                $(".card").addClass("active");
                popup('info','请出牌','',5000)
            }
            else if (room.state.players[mySessionId].state == 'dead'){

            }
        }
        if (message.type=='moved'){
            $('.cardBack').eq(message.playerId).show();
            $('.cardFront').eq(message.playerId).show();
            $('.cardBack').eq(message.playerId).animate({opacity: 1},150)
            $('.cardFront').eq(message.playerId).animate({opacity: 1},150)
            // prepare the other face
            $('.cardFrontText')[message.playerId].innerHTML = message.move.fullname
            $('.cardFront').eq(message.playerId).addClass(message.move.type)
            if (message.playerId==room.state.players[mySessionId].playerId) $('.iziToast-capsule').hide();
        }
        if (message.type=='out'){
            newDeath[message.playerId] = message.reason
        }
        if (message.type=='turnFinish'){
            //iziToast.hide({transitionOut: 'fadeOutUp'}, document.querySelector('.iziToast'));
            $('.flipContainer').addClass('flipped')
            for (var player in room.state.players) {
                if (room.state.players[player].state=='alive') {
                    updatePlayerInfo(room.state.players[player])
                }
            }
        }
        if (message.type=='end'){
            var pId = message.playerId
            var icons = ['😜','😎']
            $('.deadText')[pId].innerHTML = icons[Math.floor(Math.random()*icons.length)];
            $('.deadText')[pId].style.fontSize = '4em';
            //iziToast.hide({transitionOut: 'fadeOutUp'}, document.querySelector('.iziToast'));
            $('.iziToast-capsule').hide();
            popup('info',`Player${pId+1}获胜！`,'',10000)
            setTimeout(function(){window.location.reload()},10000)
        }
      });
}

function create (number) {
    function genRoomId(){
        const max = 999;
        const min = 10;
        return Math.round(Math.random()*(max-min)+min);
    };
    // var rmid = genRoomId().toString();
    client.getAvailableRooms('gameRoom', function(rooms, err) {
        console.log(rooms);
        var num = rooms.length
        if (num===0) var rmid = 10
        else var rmid = num+10
        room = client.join('gameRoom', { create: true, maxClients: number, rmid: rmid.toString()});
        console.log('Created room '+ rmid)
        addListeners(room)
    });
}

function join (rmid, options) {
    room = client.join(rmid, options);
    addListeners(room);
};

function getAvailableRooms() {
    client.getAvailableRooms('gameRoom', function(rooms, err) {
          console.log(rooms);
    });
}

$(document).ready(function() {
    var container = $('#bottomBox')[0];
    container.addEventListener('touchstart', () => {});
    container.addEventListener('touchend', () => {});
    container.addEventListener('touchcancel', () => {});
    container.addEventListener('touchmove', () => {});
    
    $('input')[0].onfocus = function(){this.value=''};
    $('input')[0].onblur = function(){if (this.value == '') this.value='请输入游戏人数或房间号'};
    //开始界面按钮效果
    for (i = 0; i < 2; i++) {    
        $('.btn')[i].ontouchstart = function(){
            this.css({'font-style': 'oblique', 'text-decoration': 'underline'})};
        $('.btn')[i].ontouchend = function(){
            this.css({'font-style': 'none', 'text-decoration': 'none'})};      
    };
    function enterRoom(){
        $('#cover').hide();
        $('#mainWindow').css({'display':'flex'});
    }
    $('#btn-create').click(function(){
        var inputVal = $('input')[0].value;
        var num = parseInt(inputVal);
        if (num > 1 && num < 6) {
            create(inputVal);
            enterRoom();
        }
        else popup('warning','请检查输入');
    });
    $('#btn-join').click(function(){
        var inputVal = $('input')[0].value
        var num = parseInt(inputVal)
        if (num > 9 && num < 1000) {
            client.getAvailableRooms("gameRoom", function(rooms, err) {
                if (err) console.error(err);
                var found = false;
                var id;
                var maxClients;
                rooms.forEach(function(room) {
                    if (room.metadata.rmid == num){
                      found = true;
                      id = room.roomId;
                      maxClients = room.maxClients;
                    }
                });
                if (!found) popup('warning','无此房间')
                else {
                    join(id, {rmid: num, maxClients: maxClients});
                    enterRoom()
                }
            });
        }
        else popup('warning','请检查输入');
    });

    var myScroll = new IScroll('#cardBox', {scrollX: true, scrollY: false, mouseWheel: true});
    var unselectedColor = $(".leftMenuItems").css('background-color')
    var selectedColor = $("#bottomBox").css('background-color')
    $(".leftMenuItems")[0].style.backgroundColor = selectedColor;
    $('.card').hide();
    $('.others').show();
    /* changes tag color and initialize cards */
    $(".leftMenuItems").click(function() {
        $(".leftMenuItems").css({"background-color": unselectedColor}); /* reset to light blue*/
        $(this).css({'background-color': selectedColor});
        $('.card').hide();
        var cardType = $(this).attr('id').slice(4)
        $('.'+ cardType).show();
        var numCards = $('.'+ cardType).length;
        //refresh iScroll
        var newWidth = `calc(${numCards+1}*(${$('.card').css('width')}+2px))`;
        //alert(newWidth);
        $('#cardWrapper').css({'width': newWidth});
        myScroll.refresh();
    });
    //var clickEvent = 'ontouchstart' in document.documentElement? 'touchend': 'click'
    $('.card').on('vclick', function(){
        if ($(this).hasClass('active')){
            if (! $(this).hasClass("selected")){
                $('.selected').removeClass('selected'); 
                $(this).addClass("selected");
            }
            else {
                //出牌
                room.send({move: parseInt(this.id.slice(4))})
                $(".card").removeClass("active");
                $(this).animate({opacity: 0},100);
            }
        }
        // first click, the card moves up
        // click on the selected card: play this card
    });
});