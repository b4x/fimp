/*
##############
#friendly imp#
##############
friendly imp or fimp is an IRC bot that uses node.js
*/



/*
########################
## required depencies ##
########################
install each one with 'npm install [dependency]'
for example 'npm install irc'
fs comes preinstalled with node.js
*/

var irc = require('irc'),
    _ = require('underscore'),
    fs = require('fs');

/*
#######################
##connection settings##
#######################
change these to suit your needs
*/

var bot_nick= 'perkele',
    bot_user= 'saatana',
    bot_name= 'finn\'s pet',
    this_channel = '#anarchy',
    this_server = 'ihazurinter.net',
    server_port = '6667',
    commandIdentifer = '@',
    usersFilePath = './users/';

/*
###############
#command .txts#
###############
fs will read a line from the .txt minus the newline
remove or comment out an unwanted variable here using //
for example
//var linux = fs.readFileSync('linux.txt').toString().split("\n");
remember to comment out the entire command further down in the source
add a new command variable here
make sure to have the .txt file containing lines seperated by newlines present before running
for example
create colors.txt with
red
blue
green
add this line below
var colors = fs.readFileSync('colors.txt').toString().split("\n");
uncomment the example colors command further down in the code
finally add !colors to the announce string at the bottom of the code
for example
!linux !colors !add nick text
*/

var sayings = fs.readFileSync('jokes.txt').toString().split("\n");
var greetings = fs.readFileSync('greetings.txt').toString().split("\n");
var icelandic = fs.readFileSync('icelandic.txt').toString().split("\n");
var linux = fs.readFileSync('linux.txt').toString().split("\n");

var userDict = {}, // User Dictionary (cache)
    nicks = {};

var bot = new irc.Client(this_server, bot_nick, {
  userName: bot_user,
  realName: bot_name,
  channels: [this_channel],
  port: server_port,
  debug: true
});

// Load users (from the usersFilePath) format is nick.txt - Extract the nick and add it to userDict
function 
loadUsers() {
  fs.readdir(usersFilePath, function(err, files) {
    if (err) {
      // failed to read the dir. Maybe logout error?
    }
    else {
      files.forEach(function(file) {
        var nick = file.split(".")[0];
        userDict[nick] = {};
      });
      loadSayings(); // go ahead an do an inital load for the sayings
    }
  });
}

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
  fs.appendFile(userFile, saying+"\n", function(err) {
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

loadUsers();

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
    ##############
    #joke command#
    ##############
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
    #teach command#
    ###############
    teach function listens for !teach, and returns one line 
    from icelandic.txt if called change
    */
    if (com.command.match(/teach/i)) {
      list = _.shuffle(icelandic);
      toSay = _.sample(list);
      bot.say(to, toSay);
    }

    /**
    ###############
    #linux command#
    ###############
    linux function listens for !linux, and returns one line 
    from linux.txt if called change
    */
    if (com.command.match(/linux/i)) {
      list = _.shuffle(linux);
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
      
      var nick = com.params[0].toLowerCase(),
          toAdd = '';
      com.params.shift();
      toAdd = com.params.join(' ');
      
      if (nick == bot_nick) {
        // If someone tried to add a saying to the bots nick
        bot.say(to, 'No fuck you');
      }
      else {
        if (!_.has(userDict, nick)) {
          // If our user dictionary does not contain the nick. We need to add them
          
          if (_.has(nicks, nick)) {
            // But only if they are actually in the channel
            userDict[nick] = {};
          }
        }
        
        // Add a saying to the nicks saying file
        if (_.has(nicks, nick) && _.has(userDict, nick)) {
          // If they are in the channel and the nick is register in the user Dict
          addSaying(to, nick, toAdd);
        }
      }
    if (com.command == "voice") {
	var nick = com.params[0].toLowerCase();
	bot.say("MODE " + channel + " +v " + nick);
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

bot.addListener('pm', function(nick, message) {
  var com = parseCommand(message);
  
  if (com) {
    
    if (com.command == 'list') {
      bot.say(nick, '-- User Dictionary --');
      for (var user in userDict) {
        bot.say(nick, '  '+user);
      }
    }
  }
});

bot.addListener('names', function(chan, chanNicks) {
  for (var nick in chanNicks) {
    if (nick !== bot_nick) { 
      nicks[nick.toLowerCase()] = 1;
    }
  }
  console.log(nicks);
});

/*
#########################
#    interject module   #
#########################

bot.addListener('message', function(from, to, message) {
  if 
(/(g|G)(n|N)(u|U)((\s*|)((\/)|((p|P)(l|L)(u|U)(s|S))|(\+)|((s|S)(l|L)(a|A)(s|S)(h|H)))(\s*|))\(l|L)(i|I)(n|N)(u|U)(x|X)\??/i.test(message)){
}
  else if (/(l|L)(i|I)(n|N)(u|U)(x|X)\??/i.test(message)){
  bot.say(to, 'I\'d just like to interject for a moment. What you\’re referring to as Linux,\
 is in fact, GNU/Linux, or as I\’ve recently taken to calling it, GNU plus Linux.');
}});

bot.addListener('error', function(message) {
  console.log('error: ', message);
});

*/



/*
#########################
#announce/greet function#
#########################
*/

bot.addListener('join', function(channel, who) {
  if (who == bot_nick) {
    bot.say(channel,'I\'m ' + bot_nick + ', try out these commands 4!joke !teach !linux !add nick text');
  }
  else {
    var list = _.shuffle(greetings),
        toSay = _.sample(list);
    bot.say(channel,''+toSay+who);
  }
});
