/*
########################
## required depencies ##
########################
install each one with 'npm install [dependency]'
for example 'npm install graceful-fs'
*/

var irc = require('irc'),
    fs = require('fs'),
    _ = require('underscore');

/*
#######################
##connection settings##
#######################
change these to suit your needs
*/
var bot_nick= 'fimp',
    bot_user= 'fimp',
    bot_name= 'b4x\'s imp',
    this_channel = '#wotc',
    this_server = 'irc.76chan.org',
    server_port = '6667',
    commandIdentifer = '!',
    usersFilePath = './users/';

var sayings = fs.readFileSync('jokes.txt').toString().split("\n"),
    greetings = fs.readFileSync('greetings.txt').toString().split("\n"),
    icelandic = fs.readFileSync('icelandic.txt').toString().split("\n");

var userDict = {
  
  "b4x": {},
  "jasonb": {},
  "ligent": {},
  "dddudeman": {},
  "duckmandrake": {},
  "finlandia": {},
  "brynjar": {},
  "warmang": {},
  "fullchan": {},
  "copypaste": {},
  "matr1xf1ng3rs": {}
};

var bot = new irc.Client(this_server, bot_nick, {
  userName: bot_user,
  realName: bot_name,
  channels: [this_channel],
  port: server_port,
  debug: true
});

// Reload the sayings for each user back into cache. (Call after adding new saying)
function loadSayings() {
  for (var user in userDict) {
    var userFile = usersFilePath+user+'.txt';
    userDict[user].sayings = fs.readFileSync(userFile).toString().split("\n");
  }
}

// Add a saying to a users file, and output a message from the bot "TO" the channel
function addSaying(to, user, saying) {
  var userFile = usersFilePath+user+".txt";
  fs.appendFile(userFile, saying, function(err) {
    if (err) {
      //maybe log out an error message?
    }
    else {
      bot.say(to, saying+" - Has been added");
      loadSayings(); // Go ahead and reload the sayings
    }
  });
}

// Parse a message (to a channel) to see if it contains a command. (prefixed by the commandIdentifier)
function parseCommand(message) {
  if (message[0] === commandIdentifer) {
    var params = message.split(" "),
        command = params[0].slice(1),
        comObj = { command: command };
    params.shift();
    comObj.params = params;
    return comObj;
  }
  else {
    return false;
  }
}

loadSayings();

bot.addListener('error', function(message) {
  // Have to listen for an error event.
  console.error('Error: %s: %s', message.command, message.args.join(' '));
});

bot.addListener('message', function(from, to, message) {
  var com = parseCommand(message), // Parses the command (If any)
      list, toSay;
  
  // These are global commands (Anyone can type in the command and it will work)
  if (com) {
    // If there was a command (!command)
    
    /**
    ###############
    #joke function#
    ###############
    joke function listens for !joke, !Joke or !JOKE, and returns one line from 
    jokes.txt if called change
    */
    if (com.command.match(/joke/i)) {
      list = _.shuffle(sayings);
      toSay = _.sample(list);
      bot.say(to, toSay);
    }
    
    /**
    ###############
    #teach function#
    ###############
    teach function listens for !teach, !Teach or !TEACH, and returns one line 
    from icelandic.txt if called change
    */
    if (com.command.match(/teach/i)) {
      list = _.shuffle(icelandic);
      toSay = _.sample(list);
      bot.say(to, toSay);
    }
    
    /**
     * !add
     * 
     * Add a string to a nicks response file.
     * 
     * @param nick
     * @param string
     */
    if (com.command == "add") {
      
      var nick = com.params[0],
          toAdd = '';
      com.params.shift();
      toAdd = com.params.join(' ')+'\n'; // newline is already added
      
      if (nick == bot_nick) {
        // If someone tried to add a saying to the bots nick
        bot.say(to, 'No fuck you');
      }
      else {
        // Add a saying to the nicks file
        addSaying(to, nick, toAdd);
      }
    }
  }
  else {
    // Else there was not a command, so we need to see if someone was mentioned
    
    for (var user in userDict) {
      var reg = new RegExp(user, "gi");
      if (message.match(reg)) {
        // A user in our dictionary was found, say something random from their sayings
        list = _.shuffle(userDict[user].sayings);
        toSay = _.sample(list);
        bot.say(to, toSay);
      }
    }
  }
});

/*
#########################
#announce/greet function#
#########################

*/

bot.addListener('join', function(channel, who) {
  if (who== bot_nick) {
//uncomment below to announce when this bot joins
    bot.say(channel,'I\'m ' + bot_nick + ', try out these commands 4!joke 4!teach 4!add nick text');
  }
  else {
    var list = _.shuffle(greetings),
        toSay = _.sample(list);
    //bot.say(channel, toSay);
    bot.say(channel,''+toSay+who);
  }
});