const Room = require('colyseus').Room;

module.exports = class GameRoom extends Room {
  onInit (options) {
    this.moveList = [{"type":"others","cost":-5,"fullname":"攒","ammo":"","atk":0,"def":0,"name":"money","id":0,"special":""},{"type":"others","cost":0,"fullname":"警","ammo":"","atk":0,"def":0,"name":"police","id":1,"special":"unstealable"},{"type":"others","cost":0,"fullname":"偷","ammo":"","atk":0,"def":0,"name":"steal","id":2,"special":""},{"type":"buy","cost":1,"fullname":"买小刀","ammo":1,"atk":0,"def":1,"name":"小刀","id":3,"special":""},{"type":"buy","cost":2,"fullname":"买匕首","ammo":1,"atk":0,"def":2,"name":"匕首","id":4,"special":""},{"type":"buy","cost":3,"fullname":"买手枪","ammo":1,"atk":0,"def":3,"name":"手枪","id":5,"special":""},{"type":"buy","cost":4,"fullname":"买冲锋","ammo":1,"atk":0,"def":4,"name":"冲锋","id":6,"special":""},{"type":"buy","cost":5,"fullname":"买步枪","ammo":1,"atk":0,"def":5,"name":"步枪","id":7,"special":""},{"type":"buy","cost":5,"fullname":"买狙击","ammo":1,"atk":0,"def":5,"name":"狙击","id":8,"special":""},{"type":"buy","cost":6,"fullname":"买轻机","ammo":2,"atk":0,"def":6,"name":"轻机","id":9,"special":""},{"type":"buy","cost":7,"fullname":"买重机","ammo":2,"atk":0,"def":7,"name":"重机","id":10,"special":""},{"type":"buy","cost":8,"fullname":"买榴弹","ammo":1,"atk":0,"def":8,"name":"榴弹","id":11,"special":""},{"type":"buy","cost":9,"fullname":"买炸弹","ammo":1,"atk":0,"def":9,"name":"炸弹","id":12,"special":""},{"type":"buy","cost":10,"fullname":"买炮弹","ammo":1,"atk":0,"def":10,"name":"炮弹","id":13,"special":""},{"type":"buy","cost":11,"fullname":"买导弹","ammo":2,"atk":0,"def":11,"name":"导弹","id":14,"special":""},{"type":"buy","cost":12,"fullname":"买中子弹","ammo":1,"atk":0,"def":12,"name":"中子弹","id":15,"special":""},{"type":"buy","cost":13,"fullname":"买原子弹","ammo":1,"atk":0,"def":13,"name":"原子弹","id":16,"special":""},{"type":"buy","cost":14,"fullname":"买原子弹+","ammo":1,"atk":0,"def":13,"name":"原子弹","id":17,"special":"unstealable"},{"type":"buy","cost":15,"fullname":"买氢弹","ammo":1,"atk":0,"def":15,"name":"氢弹","id":18,"special":""},{"type":"buy","cost":16,"fullname":"买氢弹+","ammo":1,"atk":0,"def":15,"name":"氢弹","id":19,"special":"unstealable"},{"type":"use","cost":0,"fullname":"Tsa","ammo":"","atk":1,"def":1,"name":"小刀","id":20,"special":""},{"type":"use","cost":0,"fullname":"Shua","ammo":"","atk":2,"def":2,"name":"匕首","id":21,"special":""},{"type":"use","cost":0,"fullname":"Biu","ammo":"","atk":3,"def":3,"name":"手枪","id":22,"special":""},{"type":"use","cost":0,"fullname":"Dddddda","ammo":"","atk":4,"def":4,"name":"冲锋","id":23,"special":""},{"type":"use","cost":0,"fullname":"Teng","ammo":"","atk":5,"def":5,"name":"步枪","id":24,"special":""},{"type":"use","cost":0,"fullname":"Piu","ammo":"","atk":5,"def":5,"name":"狙击","id":25,"special":""},{"type":"use","cost":0,"fullname":"Zzzzzda","ammo":"","atk":6,"def":6,"name":"轻机","id":26,"special":""},{"type":"use","cost":0,"fullname":"ZZZZZDa","ammo":"","atk":7,"def":7,"name":"重机","id":27,"special":""},{"type":"use","cost":0,"fullname":"榴弹","ammo":"","atk":8,"def":8,"name":"榴弹","id":28,"special":""},{"type":"use","cost":0,"fullname":"炸弹","ammo":"","atk":9,"def":9,"name":"炸弹","id":29,"special":""},{"type":"use","cost":0,"fullname":"安炸弹","ammo":"","atk":0,"def":9,"name":"炸弹","id":30,"special":"setbomb"},{"type":"use","cost":0,"fullname":"炮弹","ammo":"","atk":10,"def":10,"name":"炮弹","id":31,"special":""},{"type":"use","cost":0,"fullname":"Ziu~ Dong","ammo":"","atk":11,"def":11,"name":"导弹","id":32,"special":""},{"type":"use","cost":0,"fullname":"中子弹","ammo":"","atk":12,"def":12,"name":"中子弹","id":33,"special":""},{"type":"use","cost":0,"fullname":"原子弹","ammo":"","atk":13,"def":13,"name":"原子弹","id":34,"special":""},{"type":"use","cost":0,"fullname":"氢弹","ammo":"","atk":15,"def":15,"name":"氢弹","id":35,"special":""},{"type":"defend","cost":0,"fullname":"防小刀","ammo":"","atk":0,"def":1,"name":"小刀","id":36,"special":""},{"type":"defend","cost":0,"fullname":"防匕首","ammo":"","atk":0,"def":2,"name":"匕首","id":37,"special":""},{"type":"defend","cost":0,"fullname":"防手枪","ammo":"","atk":0,"def":3,"name":"手枪","id":38,"special":""},{"type":"defend","cost":0,"fullname":"防冲锋","ammo":"","atk":0,"def":4,"name":"冲锋","id":39,"special":""},{"type":"defend","cost":0,"fullname":"防步枪","ammo":"","atk":0,"def":5,"name":"步枪","id":40,"special":""},{"type":"defend","cost":0,"fullname":"防狙击","ammo":"","atk":0,"def":5,"name":"狙击","id":41,"special":""},{"type":"defend","cost":0,"fullname":"防轻机","ammo":"","atk":0,"def":6,"name":"轻机","id":42,"special":""},{"type":"defend","cost":0,"fullname":"防重机","ammo":"","atk":0,"def":7,"name":"重机","id":43,"special":""},{"type":"defend","cost":0,"fullname":"防榴弹","ammo":"","atk":0,"def":8,"name":"榴弹","id":44,"special":""},{"type":"defend","cost":0,"fullname":"防炸弹","ammo":"","atk":0,"def":9,"name":"炸弹","id":45,"special":""},{"type":"defend","cost":0,"fullname":"防炮弹","ammo":"","atk":0,"def":10,"name":"炮弹","id":46,"special":""},{"type":"defend","cost":0,"fullname":"防导弹","ammo":"","atk":0,"def":11,"name":"导弹","id":47,"special":""},{"type":"defend","cost":0,"fullname":"防中子弹","ammo":"","atk":0,"def":12,"name":"中子弹","id":48,"special":""},{"type":"defend","cost":0,"fullname":"防原子弹","ammo":"","atk":0,"def":13,"name":"原子弹","id":49,"special":""}]
    this.setState({
      currentTurn: 1,
      players: {},
      weapons:{},
      messages:[],
      currentPlay: {},
      alivePlayers:[],
      timeout: 5
    })
    this.maxClients = options.maxClients
    this.setMetadata({rmid: options.rmid});
    console.log(`CREATING ROOM ${options.rmid}, maxPlayer=${options.maxClients}`);
  }
  
  onJoin (client) {
    client.playerIndex = Object.keys(this.state.players).length;
    this.state.players[client.sessionId] = {}
    var thisPlayer = this.state.players[client.sessionId]
    thisPlayer.playerId = client.playerIndex;
    thisPlayer.money = 5;
    thisPlayer.weapons = {};
    thisPlayer.currentPlay = '';
    thisPlayer.bombed = {};
    thisPlayer.state = 'ready';
    thisPlayer.health = 3;
    thisPlayer.toDie = {reason:'',damage:0};
    
    console.log("JOINNING NEW ROOM");
    this.broadcast({type:'join', clientId: client.sessionId, playerId: thisPlayer.playerId})
    if (this.clients.length == this.maxClients) {//room is full!
      // this.randomMoveTimeout = this.clock.setTimeout(this.doRandomMove.bind(this, client), TURN_TIMEOUT * 1000);
      // lock this room for new users
      this.lock();
      this.broadcast({type:'gameStart'});
      for (var cId in this.state.players) {
        if (this.state.players[cId].state == 'ready') {
            this.state.players[cId].state = 'alive'
            this.state.alivePlayers.push(cId);
        }
      };
      this.clock.setTimeout(this.broadcast.bind(this,{type:'turnStart'}), 2000)//finish one turn
    }
  }

  requestJoin (options, isNewRoom) {
    return (options.create)
        ? (options.create && isNewRoom)
        : this.clients.length > 0;
  }

  declareDeath(clientId, reason){
    var ply = this.state.players[clientId]
    var dmg;
    if (reason == 'neutron') {dmg = 2}
    else if (reason == 'nuke') {dmg = 3}
    else {dmg = 1};
    if (dmg > ply.toDie.damage){
        ply.toDie.damage = dmg
        ply.toDie.reason = reason
    }
  };
  executeDeath(){
    for (var cId in this.state.players){
        var ply = this.state.players[cId]
        if (ply.toDie.damage > 0){
            ply.health -= ply.toDie.damage;
            if (ply.health <= 0) { // declare death
                if (this.state.alivePlayers.indexOf(cId) !== -1){
                    this.state.alivePlayers = this.state.alivePlayers.filter(item => item !== cId);
                    ply.state = 'dead';
                    this.broadcast({type:'out', playerId:ply.playerId, reason: ply.toDie.reason})
                }
            }
            else {
                this.broadcast({type:'injured', playerId:ply.playerId, reason: ply.toDie.reason})
            }
        }
        ply.toDie = {reason:'',damage:0}
    }
  }
  
  validate(move){
    //卡死
    var user = this.state.players[move.user]
    // not enough money
    if (move.type == 'buy' && move.cost > user.money) return false
    // not bought yet
    else if (move.type == 'use' && user.weapons[move.name]==undefined) return false
    else return true
  }

  evalMoves(currentPlay){
    var maxAtkMove = {'atk': 0};
    var thief = [];
    var police = 0;
    var atk5 = ['placeholder'];
    var setBomb = 0;
    var toJudge = [];
    for (var player in currentPlay) {
        var move = currentPlay[player]
        toJudge.push(move);
        if (!this.validate(move)) this.declareDeath(move.user, 'invalid')
        else {// invalid moves are not affective, but will still be judged
            // 步枪和狙击
            if (move.special=='setbomb') {
                setBomb += 1;
                var weapons = this.state.players[player].weapons
                weapons[move.name] -= 1
                if (weapons[move.name] == 0){
                    delete weapons[move.name]
                }
            }
            if (move.atk == 5 && move.fullname != atk5[0]){atk5.unshift(move.fullname)};
            if (move.atk > maxAtkMove.atk){maxAtkMove = move};
            if (move.name == 'steal'){thief.push(move)};
            if (move.name == 'police'){police +=1};
        }
    };
    return [toJudge, [setBomb, maxAtkMove, thief, police, atk5.length -1]]
    // last 3 are counts
  }

  judge(evaluation){
    var moveList = evaluation[0]
    var [setBomb, maxAtkMove, thief, police, atk5] = evaluation[1];
    var maxAtk = maxAtkMove.atk;
    function addAmmo(player, move, type='ammo'){
        if (type=='ammo'){
            if (player.weapons[move.name] != undefined){
                player.weapons[move.name] += move.ammo
            }
            else player.weapons[move.name] = move.ammo;
        }
        else if (type=='bomb'){
            if (move.type != 'buy'){ // 'defend' or 'others'
                if (player.bombed[move.fullname] != undefined) player.bombed[move.fullname] = 1;
                else player.bombed[move.fullname] += 1;
            }
            else {
                if (player.bombed[move.name] != undefined) player.bombed[move.name] += move.ammo
                else player.bombed[move.name] = move.ammo;
            }
        }
    }

    // with the evaluations given, the following criteria apply on each individual
    for (var i = 0; i < moveList.length; i++) {
        var move = moveList[i]
        var thisPlayer = this.state.players[move.user]
        thisPlayer.money -= move.cost
        // being bombed
        if (thisPlayer.bombed[move.name]!= undefined){//use
            if (thisPlayer.bombed[move.name] >= thisPlayer.weapons[move.name]){
                this.declareDeath(move.user, 'bombed')
                thisPlayer.bombed[move.name] -= 1
                if (thisPlayer.bombed[move.name] == 0){
                    delete thisPlayer.bombed[move.name]
                }
            }
        }
        if (thisPlayer.bombed[move.fullname] != undefined){// others or defend被安的炸弹炸死
            this.declareDeath(move.user, 'bombed')
            if (move.name=='money') move.cost = 0
        }
        
        if (maxAtk == 0) {//no weapons used (except for setting bomb)
            if (police > 0 && move.name == 'steal') {
                this.declareDeath(move.user, 'police')
            }
            else {//该玩家没死
                if (police == 0 && thief.length == 1){//只有一个偷：被偷
                    if (move.type == 'buy' && move.special != 'unstealable'){
                        addAmmo(this.state.players[thief[0].user], move)
                        if (setBomb>0) {//偷到被安炸弹的武器
                            addAmmo(this.state.players[thief[0].user], move,'bomb')
                        }
                    }
                    else if (move.name='money') {
                        this.state.players[thief[0].user].money -= move.cost
                        thisPlayer.money += move.cost
                    }
                }
                else {
                    if (move.type == 'buy'){
                        addAmmo(this.state.players[move.user], move)
                    }//安在买上，不能用；安在挡上，不能挡
                    if (setBomb > 0 && move.special != 'unstealable'){
                        addAmmo(this.state.players[move.user], move, 'bomb')
                    }
                }
            }
        }
        else {//maxAtk > 0
            // use 1 ammo
            // 新买的可以用 
            if (move.type == 'use'){
                thisPlayer.weapons[move.name] -= 1
                if (thisPlayer.weapons[move.name] == 0){
                    delete thisPlayer.weapons[move.name]
                }
            }
            if ((move.type == 'defend' && move.def != maxAtk) || (move.type != 'defend' && move.def < maxAtk)){
            // incorrect defend OR buying/using something cheaper: killed
                if (maxAtk >= 14) this.declareDeath(move.user, 'nuke')
                else if (maxAtk == 13) this.declareDeath(move.user, 'neutron')
                else this.declareDeath(move.user, 'weapon')
            }
            if (maxAtk == 5 && atk5 == 2 && move.type == 'defend'){
                // two types of 5 atk
                this.declareDeath(move.user, 'weapon')
            }
        };
    }
    this.executeDeath();
    // turn finish
    this.clock.setTimeout(this.broadcast.bind(this, {type:'turnFinish'}), 800)
    if (this.state.alivePlayers.length==1) {// game ends
        this.clock.setTimeout(this.broadcast.bind(this, {type:'end',playerId: this.state.players[this.state.alivePlayers[0]].playerId}), 1000)
    }
    else {
        this.state.currentPlay = {}
        this.state.currentTurn += 1
        this.clock.setTimeout(this.broadcast.bind(this, {type:'turnStart'}), 2800)
    }
    // start next turn
  };

  onMessage (client, data) {
    var cId = client.sessionId
    var thisPlayer = this.state.players[cId]
    // console.log(data)
    // assume data is a move
    if (data.move != undefined){//move gives just an id 
        if (this.state.currentPlay[cId] == undefined) {
            this.state.currentPlay[cId] = Object.assign({}, this.moveList[data.move]);
            this.state.currentPlay[cId].user = cId;
            this.broadcast({type:'moved', playerId: thisPlayer.playerId, move:this.moveList[data.move]})
            if (Object.keys(this.state.currentPlay).length==this.state.alivePlayers.length){
                this.judge(this.evalMoves(this.state.currentPlay))
                // inside judge function
            }
        }
    }

    //if (this.isTimeout) this.isTimeout.clear();
    //this.isTimeout = this.clock.setTimeout(this.doRandomMove.bind(this, this.clients[ otherPlayerIndex ]), TURN_TIMEOUT * 1000);
  }

  onLeave (client) {
    this.broadcast({type:'leave', clientId: client.sessionId, playerId: this.state.players[clientId].playerId})
    delete this.state.players[ client.sessionId ];
  }

  timeoutMove (client) {
    this.onMessage (client, {move: 0});
  }

}

