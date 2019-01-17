//💲  ✎ 🖤
// define endpoint based on environment
const endpoint = (window.location.hostname.indexOf("herokuapp") === -1)
  ? "ws://localhost:3553" // development (local)
  : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}` // production (remote)

var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(endpoint);
var room;

//var moveList = [{"type":"others","cost":-5,"fullname":"攒","atk":0,"def":0,"name":"money","id":0,"ammo":"","special":""},{"type":"others","cost":0,"fullname":"警","atk":0,"def":0,"name":"police","id":1,"ammo":"","special":""},{"type":"others","cost":0,"fullname":"偷","atk":0,"def":0,"name":"steal","id":2,"ammo":"","special":""},{"type":"buy","cost":1,"fullname":"买小刀","atk":0,"def":1,"name":"小刀","id":3,"ammo":1,"special":""},{"type":"buy","cost":2,"fullname":"买匕首","atk":0,"def":2,"name":"匕首","id":4,"ammo":1,"special":""},{"type":"buy","cost":3,"fullname":"买单枪","atk":0,"def":3,"name":"手枪","id":5,"ammo":1,"special":""},{"type":"buy","cost":4,"fullname":"买冲锋","atk":0,"def":4,"name":"冲锋","id":6,"ammo":1,"special":""},{"type":"buy","cost":5,"fullname":"买步枪","atk":0,"def":5,"name":"步枪","id":7,"ammo":1,"special":""},{"type":"buy","cost":5,"fullname":"买狙击","atk":0,"def":5,"name":"狙击","id":8,"ammo":1,"special":""},{"type":"buy","cost":6,"fullname":"买轻机","atk":0,"def":6,"name":"轻机","id":9,"ammo":2,"special":""},{"type":"buy","cost":7,"fullname":"买重机","atk":0,"def":7,"name":"重机","id":10,"ammo":2,"special":""},{"type":"buy","cost":8,"fullname":"买榴弹","atk":0,"def":8,"name":"榴弹","id":11,"ammo":1,"special":""},{"type":"buy","cost":9,"fullname":"买炸弹","atk":0,"def":9,"name":"炸弹","id":12,"ammo":1,"special":""},{"type":"buy","cost":10,"fullname":"买炮弹","atk":0,"def":10,"name":"炮弹","id":13,"ammo":1,"special":""},{"type":"buy","cost":11,"fullname":"买导弹","atk":0,"def":11,"name":"导弹","id":14,"ammo":2,"special":""},{"type":"buy","cost":12,"fullname":"买中子弹","atk":0,"def":12,"name":"中子弹","id":15,"ammo":1,"special":""},{"type":"buy","cost":13,"fullname":"买原子弹","atk":0,"def":13,"name":"原子弹","id":16,"ammo":1,"special":""},{"type":"buy","cost":14,"fullname":"买原子弹+","atk":0,"def":13,"name":"原子弹","id":17,"ammo":1,"special":"unstealable"},{"type":"buy","cost":15,"fullname":"买氢弹","atk":0,"def":15,"name":"氢弹","id":18,"ammo":1,"special":""},{"type":"buy","cost":16,"fullname":"买氢弹+","atk":0,"def":15,"name":"氢弹","id":19,"ammo":1,"special":"unstealable"},{"type":"use","cost":0,"fullname":"Tsa","atk":1,"def":1,"name":"小刀","id":20,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"Shua","atk":2,"def":2,"name":"匕首","id":21,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"Biu","atk":3,"def":3,"name":"手枪","id":22,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"Dddddda","atk":4,"def":4,"name":"冲锋","id":23,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"Teng","atk":5,"def":5,"name":"步枪","id":24,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"Piu","atk":5,"def":5,"name":"狙击","id":25,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"Zzzzzda","atk":6,"def":6,"name":"轻机","id":26,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"ZZZZZDa","atk":7,"def":7,"name":"重机","id":27,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"榴弹","atk":8,"def":8,"name":"榴弹","id":28,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"炸弹","atk":9,"def":9,"name":"炸弹","id":29,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"安炸弹","atk":0,"def":9,"name":"炸弹","id":30,"ammo":"","special":"setbomb"},{"type":"use","cost":0,"fullname":"炮弹","atk":10,"def":10,"name":"炮弹","id":31,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"Ziu~ Dong","atk":11,"def":11,"name":"导弹","id":32,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"中子弹","atk":12,"def":12,"name":"中子弹","id":33,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"原子弹/原子弹+","atk":13,"def":13,"name":"原子弹","id":34,"ammo":"","special":""},{"type":"use","cost":0,"fullname":"氢弹/氢弹+","atk":15,"def":15,"name":"氢弹","id":35,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"小刀","atk":0,"def":1,"name":"小刀","id":36,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"匕首","atk":0,"def":2,"name":"匕首","id":37,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"手枪","atk":0,"def":3,"name":"手枪","id":38,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"冲锋","atk":0,"def":4,"name":"冲锋","id":39,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"步枪","atk":0,"def":5,"name":"步枪","id":40,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"狙击","atk":0,"def":5,"name":"狙击","id":41,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"轻机","atk":0,"def":6,"name":"轻机","id":42,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"重机","atk":0,"def":7,"name":"重机","id":43,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"榴弹","atk":0,"def":8,"name":"榴弹","id":44,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"炸弹","atk":0,"def":9,"name":"炸弹","id":45,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"炮弹","atk":0,"def":10,"name":"炮弹","id":46,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"导弹","atk":0,"def":11,"name":"导弹","id":47,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"中子弹","atk":0,"def":12,"name":"中子弹","id":48,"ammo":"","special":""},{"type":"defend","cost":0,"fullname":"原子弹/原子弹+","atk":0,"def":13,"name":"原子弹","id":49,"ammo":"","special":""}]
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
    var myPlayerId;
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
                    this.playerOut(message.playerId)
                }
                else {
                    $('.playerName')[message.playerId].innerHTML = 'Waiting for player...'
                    $(`.playerBox:eq(${message.playerId}) .playerInfo`).css('display', 'none')
                }
            }
        }
        if (message.type=='gameStart'){
            popup('info','游戏即将开始...','',2000)
            for (var i = 0; i < maxClients; i++){
                $('.turnNo')[i].innerHTML = room.state.currentTurn
            }
        }
        if (message.type=='turnStart'){
            for (var pId in newDeath) {
                playerOut(pId, newDeath[pId])
            }
            newDeath = {}
            $('.topCard').animate({opacity: 0},150)
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
        }
        if (message.type=='out'){
            newDeath[message.playerId] = message.reason
        }
        if (message.type=='turnFinish'){
            //iziToast.hide({transitionOut: 'fadeOutUp'}, document.querySelector('.iziToast'));
            $('.iziToast-capsule').hide();
            $('.flipContainer').addClass('flipped')
            for (var player in room.state.players) {
                if (room.state.players[player].state=='alive') {
                    updatePlayerInfo(room.state.players[player])
                }
            }
            $('.card').css('opacity',1);
            
        }
        if (message.type=='end'){
            var pId = message.playerId
            var icons = ['😜','😎']
            $('.deadText')[pId].innerHTML = icons[Math.floor(Math.random()*icons.length)];
            $('.deadText')[pId].style.fontSize = '4em';
            //iziToast.hide({transitionOut: 'fadeOutUp'}, document.querySelector('.iziToast'));
            $('.iziToast-capsule').hide();
            popup('info',`Player${pId+1}获胜！`,'',10000)
            setTimeout(window.location.reload(),10000)
        }
      });
    /*
    room.listen("players/:id/:attribute", (change) => {
        console.log(change.operation); // => "replace" (can be "add", "remove" or "replace")
        console.log(change.path["id"]); // => "f98h3f"
        console.log(change.path["attribute"]); // => "y"
        console.log(change.value); // => 1
    })*/
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
        var newWidth = `calc(${numCards+0.5}*${$('.card').css('width')})`;
        //alert(newWidth);
        $('#cardWrapper').css({'width': newWidth});
        myScroll.refresh();
    });

    $('.card.active').click(function(){
        // first click, the card moves up
        // click on the selected card: play this card
        if (! $(this).hasClass("selected")){
            $('.selected').removeClass('selected'); 
            $(this).addClass("selected");
        }
        else {
            //出牌
            room.send({move: parseInt(this.id.slice(4))})
            $(".card").removeClass("active");
            $(this).animate({opacity: 0},150);
            $('.selected').removeClass('selected');
        }
    });
   
});