// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');

const token = process.env.POLICA_BOT_TOKEN;
const prefix = "!";

//check if file exists
if(fs.existsSync('data.json')) {
  var rawdata = fs.readFileSync('data.json');
  var data = JSON.parse(rawdata);
} else {
    fs.writeFile('data.json', JSON.stringify({items: []}), (err) => {
        if (err) console.log(err);
    })
}

function add_member(member){
  obj = {"name":member, "shots":0}
  return obj;

}

function countShots(member, command){
  var item = data.items.filter(i => i.name == member);
  //adds member to json in case it does not exist

  if(item.length == 0){
    var new_member = add_member(member);
    data.items.push(new_member);
    item = data.items.filter(i => i.name == member);
  };

  var shots;
  if(command == "shot"){
    shots = item[0].shots++
  } else shots = item[0].shots--;

  //write new data to file
  fs.writeFile("data.json", JSON.stringify(data), function(err) {
        if (err) throw err;
      }
    );
}

function get_tshot(n_shot){
  if (n_shot > 1){
    t_shot = "shots"
  } else t_shot = "shot"

  return t_shot
}

function checkShots(){
  var shots = data.items.map(i => "\n"+ i.name + " tem " + i.shots.toString() + " " + get_tshot(i.shots))
  var message = "**LISTA DE MELIANTES!**\n" + "```" + shots + "```"
  return message
}

client.once('ready', () => {
  console.log('Parado!');
});

client.on("message", message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' '); //all arguments after "shot"
  const command = args.shift().toLowerCase(); // "shot"
  const member = message.mentions.members.first();

  //call poliça
  if(command === "epa"){
    //if(member.user.username == "poliça")
    message.channel.send("ALERTA! Favor usar outro canal")
  }
  //!ajuda
  if(command === "ajuda"){
    const help = `**LISTA DE COMANDOS DO BOT:**
**!shot @<user>:** adiciona 1 shot pro usuário
**!shot-rm @<user>**: remove 1 shot do usuário (admin only)
**!shots:** exibe a lista de shots por usuário
**!epa:** eu dou um alerta!
**!ajuda:** exibe a lista de comandos do bot (mas essa você já sabe)
                  `
    message.channel.send(help)
  }
  //!shot @name
  if(command === "shot" && member){
    message.channel.send("Parado " + member.user.username + "! +1 shot!")
    countShots(member.user.username, command);
  }
  //!shot-rm @name
  if(command === "shot-rm" && member){
    if (message.member.hasPermission('ADMINISTRATOR')){
      message.channel.send("Parabéns, " + member.user.username + "! -1 shot!")
      countShots(member.user.username, command);
    } else message.channel.send("Somente o admin do server pode remover shots!")
  }
  //!shots
  if(command === "shots") {
    var text = checkShots()
    console.log(text)
    message.channel.send(text);
  }
});

client.login(token);
