// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');

//VERIFY IF FILE EXISTS
let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);

//VARIABLES
const client_id = process.env.POLICA_BOT_USER_ID;
const token = process.env.POLICA_BOT_TOKEN;
const prefix = "-";

function add_member(member){
  obj = {"name":member, "shots":0}
  //console.log(obj);
  return obj;
};

//change to mapreduce
function countShots(member){
  // var item = data.items.filter(i => i.name == member);
  // if(item.length == 0){
  //   var new_member = add_member(member);
  //   data.items.push(new_member);
  //   console.log(data);
  // };
//console.log(item);
  // var shots = item[0].shots++;

    // fs.writeFile("data.json", JSON.stringify(data), function(err) {
    //   console.log('shots were added');
    //     if (err) throw err;
    //   };
    // );    //
};

client.once('ready', () => {
  console.log('Parado!');
  console.log(data);
});

client.on("message", message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' '); //all arguments after "shot"
  const command = args.shift().toLowerCase(); // "shot"
  const member = message.mentions.members.first();

if (command === "shot" && member){
    message.channel.send("Parado " + member.displayName + "!")

    countShots(member.displayName); //else criar arquivo

  }
});

client.login(token);


//save counter as json
