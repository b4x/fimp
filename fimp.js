/*
########################
## required depencies ##
########################
install each one with 'npm install [dependency]'
for example 'npm install graceful-fs'
*/

var irc = require('irc');
var util = require('util');
var fs = require('graceful-fs');
var _ = require('underscore');

/*
#######################
##connection settings##
#######################
change these to suit your needs
*/
var bot_nick= 'fimp';
var bot_user= 'fimp';
var bot_name= 'b4x\'s imp';
var this_channel = '#wotc';
var this_server = 'irc.ihazurinter.net';
var server_port = '6667';

var sayings = fs.readFileSync('jokes.txt').toString().split("\n");
var greetings = fs.readFileSync('greetings.txt').toString().split("\n");
var say_b4x = fs.readFileSync('./users/b4x.txt').toString().split("\n");
var say_jasonb = fs.readFileSync('./users/jasonb.txt').toString().split("\n");
var say_ligent = fs.readFileSync('./users/ligent.txt').toString().split("\n");
var say_dddudeman = fs.readFileSync('./users/dddudeman.txt').toString().split("\n");
var say_finlandia = fs.readFileSync('./users/finlandia.txt').toString().split("\n");
var say_duckmandrake = fs.readFileSync('./users/duckmandrake.txt').toString().split("\n");
var say_brynjar = fs.readFileSync('./users/brynjar.txt').toString().split("\n");
var say_warmang = fs.readFileSync('./users/warmang.txt').toString().split("\n");
var say_fullchan = fs.readFileSync('./users/fullchan.txt').toString().split("\n");
var say_edward = fs.readFileSync('./users/edward.txt').toString().split("\n");
var say_copypaste = fs.readFileSync('./users/copypaste.txt').toString().split("\n");
var say_matrixfingers = fs.readFileSync('./users/matrixfingers.txt').toString().split("\n");
var icelandic = fs.readFileSync('icelandic.txt').toString().split("\n");
var bot = new irc.Client(this_server, bot_nick, {
  userName: bot_user,
  realName: bot_name,
  channels: [this_channel],
  port: server_port,
  debug: true
  });
/*
bot.addListener('pm', function (from, message) {
    //console.log(from + ' => ME: ' + message);
    process_message(from, message);
});
*/
/*
###############
#joke function#
###############
joke function listens for !joke, !Joke or !JOKE, and returns one line from jokes.txt if called
change 
*/
bot.addListener('message', function(from, to, message) {
  if (/!(j|J)(oke|OKE)\??/i.test(message)){

    var list = _.shuffle(sayings);
    toSay = _.sample(list);
    bot.say(to, toSay);
  }
});

/*
###############
#teach function#
###############
teach function listens for !teach, !Teach or !TEACH, and returns one line from icelandic.txt if called
change 
*/
bot.addListener('message', function(from, to, message) {
  if (/!(t|T)(each|EACH)\??/i.test(message)){

    var list = _.shuffle(icelandic);
    toSay = _.sample(list);
    bot.say(to, toSay);
  }
});

bot.addListener('message', function(from, to, message) {
		if (/!add (b|B)(a|4|A)(x|X)\??/i.test(message)){
	var message = message.slice(9);
	fs.appendFile('users/b4x.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(b|B)(a|4|A)(x|X)\??/i.test(message)) {
        var say_b4x = fs.readFileSync('./users/b4x.txt').toString().split("\n");
	var list = _.shuffle(say_b4x);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (j|J)(a|A|4)(s|S)(o|O|0)(n|N)(b|B)\??/i.test(message)){
	var message = message.slice(12);
	fs.appendFile('users/jasonb.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(j|J)(a|A|4)(s|S)(o|O|0)(n|N)(b|B)\??/i.test(message)) {
        var say_jasonb = fs.readFileSync('./users/jasonb.txt').toString().split("\n");
	var list = _.shuffle(say_jasonb);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (f|F)(l|L|i|I|1)(n|N)(l|L|i|I|1)(a|A|4)(n|N)(d|D)(l|L|i|I|1)(a|A|4)\??/i.test(message)){
	var message = message.slice(15);
	fs.appendFile('users/finlandia.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(f|F)(l|L|i|I|1)(n|N)(l|L|i|I|1)(a|A|4)(n|N)(d|D)(l|L|i|I|1)(a|A|4)\??/i.test(message)) {
        var say_finlandia = fs.readFileSync('./users/finlandia.txt').toString().split("\n");
	var list = _.shuffle(say_finlandia);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (l|L|i|I|1)(l|L|i|I|1)(g|G)(e|E|3)(n|N)(t|T)\??/i.test(message)){
	var message = message.slice(12);
	fs.appendFile('users/ligent.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(l|L|i|I|1)(l|L|i|I|1)(g|G)(e|E|3)(n|N)(t|T)\??/i.test(message)) {
        var say_ligent = fs.readFileSync('./users/ligent.txt').toString().split("\n");
	var list = _.shuffle(say_ligent);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (w|W)(a|A|4)(r|R)(m|M)(a|A|4)(n|N)(g|G)\??/i.test(message)){
	var message = message.slice(13);
	fs.appendFile('users/warmang.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(w|W)(a|A|4)(r|R)(m|M)(a|A|4)(n|N)(g|G)\??/i.test(message)) {
        var say_warmang = fs.readFileSync('./users/warmang.txt').toString().split("\n");
	var list = _.shuffle(say_warmang);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (d|D)(u|U)(c|C)(k|K)(m|M)(a|A|4)(n|N)(d|D)(r|R)(a|A|4)(k|K)(e|E|3)\??/i.test(message)){
	var message = message.slice(18);
	fs.appendFile('users/duckmandrake.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(d|D)(u|U)(c|C)(k|K)(m|M)(a|A|4)(n|N)(d|D)(r|R)(a|A|4)(k|K)(e|E|3)\??/i.test(message)) {
        var say_duckmandrake = fs.readFileSync('./users/duckmandrake.txt').toString().split("\n");
	var list = _.shuffle(say_duckmandrake);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (d|D)(d|D)(d|D)(u|U)(d|D)(e|E|3)(m|M)(a|A|4)(n|N)\??/i.test(message)){
	var message = message.slice(15);
	fs.appendFile('users/dddudeman.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(d|D)(d|D)(d|D)(u|U)(d|D)(e|E|3)(m|M)(a|A|4)(n|N)\??/i.test(message)) {
        var say_dddudeman = fs.readFileSync('./users/dddudeman.txt').toString().split("\n");
	var list = _.shuffle(say_dddudeman);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (b|B)(r|R)(y|Y)(n|N)(j|J)(a|A|4)(r|R)\??/i.test(message)){
	var message = message.slice(13);
	fs.appendFile('users/brynjar.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(b|B)(r|R)(y|Y)(n|N)(j|J)(a|A|4)(r|R)\??/i.test(message)) {
        var say_brynjar = fs.readFileSync('./users/brynjar.txt').toString().split("\n");
	var list = _.shuffle(say_brynjar);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (M|m)(a|4|A)(t|T)(r|R)(i|I|l|1)(x|X)(f|F)(i|I|l|1)(n|N)(g|G)(e|E|3)(r|R)(5|s|S)\??/i.test(message)){
	var message = message.slice(19);
	fs.appendFile('users/matrixfingers.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(M|m)(a|4|A)(t|T)(r|R)(i|I|l|1)(x|X)(f|F)(i|I|l|1)(n|N)(g|G)(e|E|3)(r|R)(5|s|S)\??/i.test(message)) {
        var say_matrixfingers = fs.readFileSync('./users/matrixfingers.txt').toString().split("\n");
	var list = _.shuffle(say_matrixfingers);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

bot.addListener('message', function(from, to, message) {
		if (/!add (f|F)(u|U)(l|L|i|I|1)(l|L|i|I|1)(c|C)(h|H)(a|A|4)(n|N)\??/i.test(message)){
	var message = message.slice(14);
	fs.appendFile('users/fullchan.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(f|F)(u|U)(l|L|i|I|1)(l|L|i|I|1)(c|C)(h|H)(a|A|4)(n|N)\??/i.test(message)) {
        var say_fullchan = fs.readFileSync('./users/fullchan.txt').toString().split("\n");
	var list = _.shuffle(say_fullchan);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});

/*
bot.addListener('message', function(from, to, message) {
		if (/!add (c|C)(o|O|))(p|P)(y|Y)(p|P)(a|A|4)(s|S|5)(t|T)(e|E|3)\??/i.test(message)){
	var message = message.slice(15);
	fs.appendFile('users/copypaste.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(c|C)(o|O|))(p|P)(y|Y)(p|P)(a|A|4)(s|S|5)(t|T)(e|E|3)\??/i.test(message)) {
        var say_copypaste = fs.readFileSync('./users/copypaste.txt').toString().split("\n");
	var list = _.shuffle(say_copypaste);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});
*/

bot.addListener('message', function(from, to, message) {
		if (/!add (e|E|3)(d|D)(w|W)(a|A|4)(r|R)(d|D)\??/i.test(message)){
	var message = message.slice(12);
	fs.appendFile('users/edward.txt','\n' + message, function () {
	bot.say(to, message + ' has been added.');
		});
}
	else if(/(e|E|3)(d|D)(w|W)(a|A|4)(r|R)(d|D)\??/i.test(message)) {
        var say_edward = fs.readFileSync('./users/edward.txt').toString().split("\n");
	var list = _.shuffle(say_edward);
	toSay = _.sample(list);
        bot.say(to, toSay);
		}
});


bot.addListener('message', function(from, to, message) {
		if (/!add fimp\??/i.test(message)){
	bot.say(to,'No fuck you');
		};
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
    var list = _.shuffle(greetings);
    toSay = _.sample(list);
//    bot.say(channel, toSay);
    bot.say(channel,''+toSay+who);
  }
});

bot.addListener('message', function(from, to, message) {
    if(/(b|B)anana\??/i.test(message)) {
        bot.say(to, 'Nope, it ain\'t a banana but good guess.');
    }
});
