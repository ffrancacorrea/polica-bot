// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');

//VERIFY IF FILE EXISTS

if(fs.existsSync('data.json')) {
  var rawdata = fs.readFileSync('data.json');
  var data = JSON.parse(rawdata);
} else {
    fs.writeFile('data.json', JSON.stringify({items: []}), (err) => {
        if (err) console.log(err);
        console.log('Successfully created')
    })
}

//VARIABLES
const client_id = process.env.POLICA_BOT_USER_ID;
const token = process.env.POLICA_BOT_TOKEN;
const prefix = "-";

function add_member(member){
  obj = {"name":member, "shots":0}
  return obj;
};

function countShots(member){
  var item = data.items.filter(i => i.name == member);
  if(item.length == 0){
    var new_member = add_member(member);
    data.items.push(new_member);
    item = data.items.filter(i => i.name == member);
  };

  var shots = item[0].shots++;
  console.log(data);
    fs.writeFile("data.json", JSON.stringify(data), function(err) {
      console.log('shots were added');
        if (err) throw err;
      }
    );
};

client.once('ready', () => {
  console.log('Parado!');
});

client.on("message", message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' '); //all arguments after "shot"
  const command = args.shift().toLowerCase(); // "shot"
  const member = message.mentions.members.first();

if (command === "shot" && member){
    message.channel.send("Parado " + member.user.username + "!")
    console.log(member)

    countShots(member.user.username); //else criar arquivo

  }
});

client.login(token);
