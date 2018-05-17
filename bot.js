const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
var request = require("request");
bot.on('message', (msg) => {
  const name = msg.from.first_name;
  

 if(msg.hasOwnProperty("photo")){ 

   if(msg.hasOwnProperty("caption")){
    
    if(msg.caption.toLowerCase()=="set-up"||msg.caption.toLowerCase()=="setup"){
      if(msg.photo[0].hasOwnProperty("file_path")){
          bot.sendMessage(msg.chat.id, 'setup Image already used');
        }else{
            
              request({
                url: 'https://api.telegram.org/bot599607306:AAFTu8N2kweoWEIQF30w_uPwWguQ2lorc0w/getFile?file_id='+msg.photo[0].file_id,
                json: true
                }, function (error, response, body) {
                    //setup database for iris recognition
                    var exec = require('child_process').exec, child;
                    child = exec('/usr/bin/java -jar IrisRecognition "https://api.telegram.org/file/bot599607306:AAFTu8N2kweoWEIQF30w_uPwWguQ2lorc0w/'+body.result.file_path+'" '+msg.caption+' setup',
                      function (error, stdout, stderr){
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if(error !== null){
                          console.log('exec error: ' + error);
                        }
                    });
                    
                });
        }
    }else if(msg.caption.toLowerCase()=="pay"){
          
              request({
                url: 'https://api.telegram.org/bot599607306:AAFTu8N2kweoWEIQF30w_uPwWguQ2lorc0w/getFile?file_id='+msg.photo[0].file_id,
                json: true
                }, function (error, response, body) {

                  //execute jar file for  comparing irisrecognition
                    var exec = require('child_process').exec, child;
                    child = exec('/usr/bin/java -jar IrisRecognition "https://api.telegram.org/file/bot599607306:AAFTu8N2kweoWEIQF30w_uPwWguQ2lorc0w/'+body.result.file_path+'" '+msg.caption+' compare',
                      function (error, stdout, stderr){
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if(error !== null){
                          console.log('exec error: ' + error);
                        }
                    });

                    
                });
      }else{
      bot.sendMessage(msg.chat.id, 'Caption Not recognize');
      } 
   }else{
    bot.sendMessage(msg.chat.id, 'Please give caption to image');
   }
 }else{
  const text = msg.text.toLowerCase();
  switch (text)
    {
       case "hai":
            bot.sendMessage(msg.chat.id, 'Hello, ' + name + '! Please send your eye image with caption "setup",  We need to recognize you'); 
          break;
       case "hello":
            bot.sendMessage(msg.chat.id, 'Hello, ' + name + '! Please send your eye image with caption "setup",  We need to recognize you'); 
          break;
       case "product list":
               bot.sendMessage(msg.chat.id, 'here the list products for you...\r\n 1. pen Rp 5.000,00 \r\n 2. book Rp 3.000,00 \r\n 3. bag Rp 95.000,00', {
          "reply_markup": {
            "keyboard": [["Buy Pen", "Buy Book", "Buy Bag"]]
            }
           });
           break;
       case "what's you have":
            bot.sendMessage(msg.chat.id, 'here the list of best products for you...\r\n 1. pen Rp 5.000,00 \r\n 2. book Rp 3.000,00 \r\n 3. bag Rp 95.000,00', {
          "reply_markup": {
            "keyboard": [["Buy Pen", "Buy Book", "Buy Bag"]]
            }
           });
           break;
       case "what do you have":
            bot.sendMessage(msg.chat.id, 'here the list of best products for you...\r\n 1. pen Rp 5.000,00 \r\n 2. book Rp 3.000,00 \r\n 3. bag Rp 95.000,00', {
          "reply_markup": {
            "keyboard": [["Buy Pen", "Buy Book", "Buy Bag"]]
            }
           });
           break;
       case "new products":
            bot.sendMessage(msg.chat.id, 'here the list of best products for you...\r\n 1. pen Rp 5.000,00 \r\n 2. book Rp 3.000,00 \r\n 3. bag Rp 95.000,00', {
          "reply_markup": {
            "keyboard": [["Buy Pen", "Buy Book", "Buy Bag"]]
            }
           });
           break;
       case "yes": 
            bot.sendMessage(msg.chat.id, 'Your payment has been made, Please send you eyes image with caption "pay" for payment'); 
           break;
       case "buy pen": 
            bot.sendMessage(msg.chat.id, 'You wanna buy pen?'); 
           break;
       case "buy book": 
            bot.sendMessage(msg.chat.id, 'You wanna buy book?'); 
           break;
       case "buy bag": 
            bot.sendMessage(msg.chat.id, 'You wanna buy bag?');
           break; 
       case "1": 
            bot.sendMessage(msg.chat.id, 'You wanna buy pen?'); 
           break;
       case "2": 
            bot.sendMessage(msg.chat.id, 'You wanna buy book?'); 
           break;
       case "3": 
            bot.sendMessage(msg.chat.id, 'You wanna buy bag?'); 
           break;
       default: 
            bot.sendMessage(msg.chat.id, 'command not found'); 
          break;
    }
 }

  
});

module.exports = bot;
