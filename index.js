// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
//bot token
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
};

function countShots(member){
  var item = data.items.filter(i => i.name == member);
  //adds member to json in case it does not exist
  if(item.length == 0){
    var new_member = add_member(member);
    data.items.push(new_member);
    item = data.items.filter(i => i.name == member);
  };
  var shots = item[0].shots++;
  //write new data to file
  fs.writeFile("data.json", JSON.stringify(data), function(err) {
      console.log('shots were added');
        if (err) throw err;
      }
    );
};

function get_tshot(n_shot){
  if (n_shot > 1){
    t_shot = "shots"
  } else t_shot = "shot"

  return t_shot
}

function checkShots(){
  var shots = data.items.map(i => "\n"+ i.name + " tem " + i.shots.toString() + " " + get_tshot(i.shots))
  var message = "**VEJA ABAIXO OS MELIANTES!**\n" + "```" + shots + "```"
  //console.log(shots)
  //console.log(message)
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

  if(command === "shot" && member){
    message.channel.send("Parado " + member.user.username + "!")
    console.log(member)

    countShots(member.user.username); //else criar arquivo
  }
  if(command === "shots") {
    var text = checkShots()
    console.log(text)
    message.channel.send(text);
  }
});

client.login(token);
