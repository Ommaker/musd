const { Telegraf, session, Extra, Markup, Scenes } = require('telegraf');

const { BaseScene, Stage } = Scenes

const { enter, leave } = Stage

const stage = new Stage()

const Web3 = require('web3')

const rateLimit = require('telegraf-ratelimit');

const mongo = require('mongodb').MongoClient;

const axios = require('axios')

const { token , admins , mongo_url } = require('./details')

const bot = new Telegraf(token);

const curr = 'PolyDoge'



//Scenes Register 



const getwallet = new BaseScene('getwallet')

stage.register(getwallet)

const onwith = new BaseScene('onwith')

stage.register(onwith)

const mini = new BaseScene('mini')

stage.register(mini)

const max = new BaseScene('max')

stage.register(max)

const currr = new BaseScene('currr')

stage.register(currr)

const parse = new BaseScene('parse')

stage.register(parse)

const addr = new BaseScene('addr')

stage.register(addr)

const contract = new BaseScene('contract')

stage.register(contract)

const yt = new BaseScene('yt')

stage.register(yt)

const addcha = new BaseScene('addcha')

stage.register(addcha)

const rcha = new BaseScene('rcha')

stage.register(rcha)

const addchk = new BaseScene('addchk')

stage.register(addchk)

const rchk = new BaseScene('rchk')

stage.register(rchk)

const getref = new BaseScene('getref')

stage.register(getref)

const ytt = new BaseScene('ytt')

stage.register(ytt)

const chabal = new BaseScene('chabal')

stage.register(chabal)

const getdetails = new BaseScene('getdetails')

stage.register(getdetails)

const rewd = new BaseScene('rewd')

stage.register(rewd)

const paycha = new BaseScene('paycha')

stage.register(paycha)

const broad = new BaseScene('broad')

stage.register(broad)



function senderr(e){

    try{

        for (const i of admins){

            bot.telegram.sendMessage(i,"*🥲 Wtf! Error Happened In Bot:\n\n"+e+"\n\nDon't Panic Bot Will Not Stop*",{parse_mode:'Markdown'})

        }

    }catch(err){

        console.log(err)

    }

}



const buttonsLimit = {

    window: 1000,

    limit: 1,

    onLimitExceeded: (ctx, next) => {

      if ('callback_query' in ctx.update)

      ctx.answerCbQuery('😅 Please Dont Press Buttons Quikly , Try Again...', true)

        .catch((err) => sendError(err, ctx))

    },

    keyGenerator: (ctx) => {

      return ctx.callbackQuery ? true : false

    }

  }

  bot.use(rateLimit(buttonsLimit))



bot.use(session())

bot.use(stage.middleware())



let db;



mongo.connect(mongo_url, { useUnifiedTopology: true } , (err,client) =>{

    if (err) {

        console.log(err)

    }

    db = client.db(token.split(':')[0]);

    bot.launch().then(console.log(' Bot Hosted On Server Try To Send /start')

    )

})

//Just Main Menu Keyboard

let mainkey = [

    ['💰 Balance'],

    ['💠 Information','💳 Withdraw']

]



const botstart = async (ctx) =>{

    try {



if(ctx.message.chat.type != 'private'){

  return

  }

   let admin = await db.collection('admin').find({admin:'admin'}).toArray()

 let bData = await db.collection('vUsers').find({userId: ctx.from.id}).toArray()



 

        if (!(admin.length)){

            let botData = {admin:'admin',ref:1,mini:2,max:4,paycha:'@Username',botstat:'Active',withstat:'On',channel:[],parse:'Not Set',contract:'NOT SET',addr:'NOT SET',cur:'NOT SET',channels:[]}

            db.collection('admin').insertOne(botData)

            ctx.replyWithMarkdown("*👀 Bot Data Saved In Database Try To Restart Bot /start*")

            return

        }



        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let uData = await db.collection('info').find({user:ctx.from.id}).toArray()

        if (!(uData.length)){

            db.collection('withdraw').insertOne({user:ctx.from.id,'toWith':0})

            db.collection('info').insertOne({user:ctx.from.id})

            let ref = ctx.startPayload * 1

            let rData = await db.collection('refer').find({user:ctx.from.id}).toArray()

            if((ref) && ctx.from.id != ref && !('invited' in rData) && !(isNaN(ref))){

                db.collection('refer').insertOne({user:ctx.from.id,'invited':ref})

        

    }else{

                db.collection('refer').insertOne({user:ctx.from.id,'invited':"None",'kid':true})

                }}

                let emojis = ['🪂','🏈','🏏','🏆','🎮','🎯','🏖','🏥','⚰']

                let ans = emojis[Math.floor(Math.random()*emojis.length)];

                db.collection('captcha').updateOne({userId: ctx.from.id}, {$set: {value: ans}}, {upsert: true})

	ctx.replyWithMarkdown('*🤖❌ Human Verification*\n\n_To start, please select down below the exact same emoji: _   '+ans+'',{reply_markup:{inline_keyboard:[[{text:'🪂',callback_data:'/verify_🪂'},{text:'🏈',callback_data:'/verify_🏈'},{text:'🏏',callback_data:'/verify_🏏'}],[{text:'🏆',callback_data:'/verify_🏆'},{text:'🎮',callback_data:'/verify_🎮'},{text:'🎯',callback_data:'/verify_🎯'}],[{text:'🏖',callback_data:'/verify_🏖'},{text:'🏥',callback_data:'/verify_🏥'},{text:'⚰',callback_data:'/verify_⚰'}]]}})



    }catch(e){

        console.log(e)

senderr(e)

    }

}

bot.start(botstart)



bot.action(/verify_+/,async (ctx) =>{

    try{

         

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

         var dd = await db.collection('captcha').find({ userId: ctx.from.id }).toArray()

 var right = dd[0].value

 console.log(right)

var ans = ctx.match.input.split("_")[1]

if(right==ans){

	db.collection('info').updateOne({user:ctx.from.id},{$set:{verified:'yes'}})

	db.collection('info').updateOne({user:ctx.from.id},{$set:{captcha:"pass"}})

 let channels = admin[0].channels

	        text = '*✨ 🚀 Greetings from USDT Airdrop bot! 🚀*\n\n*🎉Total Reward: 1,000 USDT*\n\n*👤 Earn 0.01 USDT for every valid Refer*\n*🔥 Distribution Instant*\n*🌐 Network: Polygon*\n\n*🔍 All tasks will be reviewed by our team, and if incomplete, the drop may not be awarded. Stay diligent!*\n\n*🔸Join* [Airdrop Lite](https://t.me/Earningdoublex)\n*🔸Join* [Airdrop Titans](https://t.me/Airdrop_Titans)\n*🔸Join* [Airdrop Prestige](https://t.me/AirdropPrestige)\n*🔸Join* [Airdrop Cave](https://t.me/Coin_Cave)\n*🔸Join* [Airdrop Folder](https://t.me/addlist/p8kutql1njs0ZmM1)\n*🔸Join* [Airdrop Spy](https://t.me/SpyAirdrops)\n\n*ℹ️ You must complete all task then Press on ""✅ Join Airdrop""*\n\n'

        ctx.editMessageText(text,{parse_mode:'markdown',disable_web_page_preview : 'true' ,reply_markup:{inline_keyboard:[[{text:'✅ Join Airdrop',callback_data:'join'}]]}}).then((m)=> {

        	    console.log(m.message_id)

    var msid = m.message_id

    db.collection('info').updateOne({userId: ctx.from.id}, {$set: {msid: msid}}, {upsert: true})

  })

 }else{

  ctx.answerCbQuery('🆘 Wrong',true)

  }

            

        let uData = await db.collection('refer').find({user:ctx.from.id}).toArray()

    }catch(e){

        console.log(e)

senderr(e)

    }

})



//Joined Button Code

bot.action('join', async (ctx)=>{

    try{



        bot.telegram.sendChatAction(ctx.from.id,'typing').catch((err) => console.log(err))

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let checkJoined = await joinCheck(ctx.from.id,admin)

        if(!checkJoined){

            ctx.replyWithMarkdown('*🚨Must Join All Channel First*')

            return

        }

        let data = await db.collection('info').find({user:ctx.from.id}).toArray()



        if (!('verified' in data[0])){



            botstart(ctx)



            return



        }

        let uData = await db.collection('refer').find({user:ctx.from.id}).toArray()

        if (!('kid' in uData[0]) && ('invited' in uData[0])){

            await db.collection('refer').updateOne({user:ctx.from.id},{$set:{'kid':true}})

            let refid = uData[0].invited

            let rData = await db.collection('info').find({user:refid}).toArray()

            if(!(rData.length)){

                db.collection('refer').updateOne({user:ctx.from.id},{$set:{'invited':'None'}})

                ctx.replyWithMarkdown("*🚸 Wrong Refer Link *")

                return

            }

            if (!('balance' in rData[0])){

                var bal = 0;

            }else{

                var bal = rData[0].balance

            }

            let PerRef = admin[0].ref

            let final = parseFloat(bal) + parseFloat(PerRef)

            db.collection('info').updateOne({user:refid},{$set:{'balance':final}})

            bot.telegram.sendMessage(refid,"*➕ New Referral Detected On You Link!!*\n\t\t["+ctx.from.first_name+"](tg://user?id="+ctx.from.id+")* Has Started Bot By Your Link.*",{parse_mode:'Markdown'})

        }

        var yt = admin[0].yt

        ctx.deleteMessage();

        ctx.replyWithMarkdown('*🔘 Follow Our* [Twitter]('+yt+')\n*🔘 Subscribe Our* [Youtube](https://youtube.com/@CryptoChasers?si=dXvdxj_xPDyjMM7B)\n\n*📝 Must Complete This Task Then Submit Your Twitter link For Proceed *',{disable_web_page_preview:true,reply_markup:{remove_keyboard: true}})

        ctx.scene.enter('ytt')

    }catch(e){

        console.log(e)

senderr(e)



    }

})



//YouTube

ytt.on('text', async ctx => {

	    try{

        if(ctx.message.chat.type != 'private'){

            return

        }

       

        bot.telegram.sendChatAction(ctx.from.id,'typing').catch((err) => console.log(err))

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let data = await db.collection('info').find({user:ctx.from.id}).toArray()



        if (!('verified' in data[0])){



            botstart(ctx)



            return



        }

let email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

 if(ctx.message.text.length>=1){

	ctx.scene.leave();

	ctx.replyWithMarkdown('*👋Hi '+ctx.from.first_name+' Welcome to '+admin[0].cur+' Airdrop\n\n🔽 Choose an option from the menu below 👇*',{parse_mode:'markdown',reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

	}else{

		ctx.replyWithMarkdown('*❌Invalid Link Or Not Followed Our Twitter By This Account*')

		}

		}catch(e){

			senderr(e)

			}

			})

//Account Info Button Code

bot.hears('👤 My Account' , async (ctx) =>{

    try{

  

        bot.telegram.sendChatAction(ctx.from.id,'typing').catch((err) => console.log(err))

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        if(ctx.message.chat.type != 'private'){

            return

        }

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let data = await db.collection('info').find({user:ctx.from.id}).toArray()

        if (!('verified' in data[0])){

            botstart(ctx)

            return

        }

        

        if (!('balance' in data[0])){

            var bal =0;

        }else{

            var bal = data[0].balance

        }

        if (!('wallet' in data[0])){

            var wallet = 'None'

        }else{

            var wallet = data[0].wallet

        }

              var reff = await db.collection('info').find({user:ctx.from.id}).toArray()

        var cur = admin[0].curr

var ref = admin[0].ref

        let text = '*👤 Dear '+ctx.from.first_name+' your account info:*\n\n*🆔 User Id :-* `'+ctx.from.id+'`\n*💰 Balance : '+bal.toFixed(2)+' '+admin[0].cur+'*\n\n*💵 Wallet:* `'+wallet+'`'

        ctx.replyWithMarkdown(text)

    }catch(e){

        console.log(e)

senderr(e)

    }

})





bot.command('whale',async (ctx) =>{

    try{

        bot.telegram.sendChatAction(ctx.from.id,'typing').catch((err) => console.log(err))

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        if(ctx.message.chat.type != 'private'){

            return

        }

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let data = await db.collection('info').find({user:ctx.from.id}).toArray()

        if (!('verified' in data[0])){

            botstart(ctx)

            return

        }

        

        let users = await db.collection('info').find({},{projection:{user:1,'_id':0}}).toArray()

        let payout = await db.collection('admin').find({Payout:'Payout'}).toArray()

        if(payout.length == 0){

            var final = 0;

        }else{

            var final = payout[0].value

        }

        let curr = admin[0].curr

        //

        let text = "*📊Bot Live Status Here\n\n🙇 Total Users: "+users.length+" Users*"

        ctx.replyWithMarkdown(text)

    }catch(e){

        senderr(e)

        console.log(e)

    }

})



//information code



bot.hears('👥 Referrals', async (ctx)=>{

	try{

		        

		let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        if(ctx.message.chat.type != 'private'){

            return

        }

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let data = await db.collection('info').find({user:ctx.from.id}).toArray()

        if (!('verified' in data[0])){

            botstart(ctx)

            return

        }

ctx.replyWithMarkdown('*🎁For A Limited Time, Join '+admin[0].cur+'  Airdrop And Get Free '+admin[0].cur+' As A Gift 🎁\n\n🎉 Join Link:\nhttps://t.me/'+bot.botInfo.username+'?start='+ctx.from.id+'*\n*Get '+admin[0].ref+' '+admin[0].cur+' per invite 🎉*\n\n_❗️ Fake referrals = Not Payment ❗️_')

    }catch(e){

        senderr(e)

        console.log(e)

    }

})

		

//Wallet Button Code

bot.hears('💼 Wallet', async (ctx) =>{

    try{

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        if(ctx.message.chat.type != 'private'){

            return

        }

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let data = await db.collection('info').find({user:ctx.from.id}).toArray()

        if (!('wallet' in data[0])){

            var wallet = 'None'

        }else{

            var wallet = data[0].wallet

        }

        if (!('verified' in data[0])){

            botstart(ctx)

            return

        }

        ctx.replyWithMarkdown("💼 Your "+admin[0].cur+" wallet address:\n*"+wallet+"*\n*🌐 Network: Polygon*\n\n_♻️ Use the button below to change the wallet address 👇_",{reply_markup:{inline_keyboard:[[{text:'💳 Change Wallet Address',callback_data:'wallet'}]]}})

    }catch(e){

        senderr(e)

        console.log(e)

    }

})



bot.action('wallet', async (ctx) =>{

    try{

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let botstat = admin[0].botstat

        if (botstat != 'Active'){

            ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

            return

        }

        let data = await db.collection('info').find({user:ctx.from.id}).toArray()

        if (!('verified' in data[0])){

            botstart(ctx)

            return

        }

        

        // Sending message with an image using a link

        await ctx.replyWithPhoto({ url: 'https://i.postimg.cc/Wz2mdRr4/IMG-20240309-145356-085.jpg' }, {

            caption: "Enter your "+admin[0].cur+" Polygon Chain wallet address",

            reply_markup: { keyboard: [['❌ Cancel ❌']], resize_keyboard: true }

        });



        await ctx.scene.enter('getwallet')

    }catch(e){

        senderr(e)

        console.log(e)

    }

})





//Set Wallet Scene

getwallet.on('text', async (ctx) =>{

    try{

    	let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        const name = 'getwallet'

        if (ctx.message.text == '❌ Cancel ❌'){

            ctx.replyWithMarkdown('*❌ Cancelled\n\n🔽 Choose an option from the menu below 👇*',{parse_mode:'markdown',reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave(name)

            return

        }else if(ctx.message.text.length==42){

        	db.collection('info').updateOne({user:ctx.from.id},{$set:{'wallet':ctx.message.text}})

            ctx.replyWithMarkdown('_Successfully ✅ _\n\n*💼 Your '+admin[0].cur+' Wallet Address:*\n\n`'+ctx.message.text+'`',{parse_mode:'markdown',reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave()

            return

        }else{

            ctx.replyWithMarkdown('*❌ wrong ❌\n\nPlease enter the correct '+admin[0].cur+' address👇*',{parse_mode:'markdown'})

        }

    }catch(e){

        senderr(e)

        console.log(e)

    }

})



//Back Button

bot.hears('🔙 Back', async ctx =>{

	let admin = await db.collection('admin').find({admin:'admin'}).toArray()

    ctx.replyWithMarkdown('*👋Hi '+ctx.from.first_name+' Welcome to '+admin[0].cur+' Airdrop\n\n🔽 Choose an option from the menu below 👇*',{parse_mode:'markdown',reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

})

//Withdraw Button Code

bot.hears('🏧 Withdrawal',async (ctx) =>{

    try{

    bot.telegram.sendChatAction(ctx.from.id,'typing').catch((err) => console.log(err))

    let admin = await db.collection('admin').find({admin:'admin'}).toArray()

    let curr= admin[0].curr

    if(ctx.message.chat.type != 'private'){

        return

    }

    let botstat = admin[0].botstat

    if (botstat != 'Active'){

        ctx.replyWithMarkdown('*⛔ Currently Bot Is Under Maintenance*')

        return

    }

    let withstat = admin[0].withstat

    if(withstat != 'On'){

        ctx.replyWithMarkdown('*⛔ Currently Withdrawls Are Not Avaible*')

        return

    }

    let data = await db.collection('info').find({user:ctx.from.id}).toArray()

 

    if(!('balance' in data[0])){

        var bal = 0;

    }else{

        var bal = data[0].balance

    }

    let mini = admin[0].mini

    if (parseFloat(bal) < parseFloat(mini)){

        ctx.replyWithHTML('<b><i>⚠️ You need to refer at least 5 users to be eligible for claim</i></b>\n\n<i>The withdrawal will be  transferred to your wallet Instantly.</i>\n <i>You need at least '+mini+' '+admin[0].cur+' to Withdraw.</i>')

        return

    }

        if (!('wallet' in data[0])){

            var wallet = 'None'

        }else{

            var wallet = data[0].wallet

        }

    if(!('wallet' in data[0])){

        ctx.replyWithMarkdown("💼 Your "+admin[0].cur+" wallet address:\n*"+wallet+"*\n*🌐 Network: Polygon*\n\n_♻️ Use the button below to change the wallet address 👇_",{reply_markup:{inline_keyboard:[[{text:'💳 Change Wallet Address',callback_data:'wallet'}]]}})

        return

    }

    ctx.replyWithMarkdown("*📝 Send Amount Of "+admin[0].cur+" Which You Want To Withdraw?*",{reply_markup:{keyboard:[

        ['🔙 Back']

    ],resize_keyboard:true}})

    await ctx.scene.enter('onwith')

    }catch(e){

        senderr(e)

        console.log(e)

    }

})



onwith.on('text',async (ctx) =>{

    try{

        const name = 'onwith'

        var admin = await db.collection('admin').find({admin:'admin'}).toArray()

            let curr= admin[0].cur

        var data = await db.collection('info').find({user:ctx.from.id}).toArray()

        let mini = admin[0].mini

        if (ctx.message.text == '🔙 Back'){

            ctx.replyWithMarkdown('*👋Hi '+ctx.from.first_name+' Welcome to '+admin[0].cur+' Airdrop\n\n🔽 Choose an option from the menu below 👇*',{parse_mode:'markdown',reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave(name)

            return

        }else if(isNaN(ctx.message.text)){

            ctx.replyWithMarkdown("*🚫 Not A Valid Amount*",{reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave(name)

            return

        

        }else if(parseFloat(mini) > parseFloat(ctx.message.text)){

            ctx.replyWithMarkdown("*⚠️ Minimum Withdraw Is "+mini+" "+curr+"*",{reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave(name)

            return

        }else if(parseFloat(ctx.message.text) > parseFloat(data[0].balance)){

            ctx.replyWithMarkdown("*⚠️ You Did Not Have Enough Balance*",{reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave(name)

            return

        }else if(parseFloat(ctx.message.text) > parseFloat(admin[0].max)){

            ctx.replyWithMarkdown("*⛔️ Maximum Withdraw Is "+admin[0].max+" "+curr+"*",{reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave(name)

            return

        } else if (ctx.message.forward_from){

            ctx.replyWithMarkdown("*🚫 Forwards Not Allowed*",{reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            await ctx.scene.leave(name)

            return

        } else{

            await ctx.scene.leave(name)

            await db.collection('withdraw').updateOne({user:ctx.from.id},{$set:{'toWith':ctx.message.text}})

            let text = "*🚨 Withdrawal Request Confirmation\n\n💰 Amount: "+ctx.message.text+" "+curr+"\n🚨Wallet Address:* `"+data[0].wallet+"`*\n\n🟢Click On '✅ Continue' To Confirm*"

            ctx.replyWithMarkdown(text,{reply_markup:{inline_keyboard:[

                [{text:'✅ Continue',callback_data:'continue'},{text:'⛔️ Reject',callback_data:'reject'}]

            ]}})            

        }

    }catch(e){

        senderr(e)

        console.log(e)

    }

})



bot.action('reject', async (ctx) =>{

    try{

        await db.collection('withdraw').updateOne({user:ctx.from.id},{$set:{'toWith':0}})

        await ctx.deleteMessage()

        ctx.replyWithMarkdown('*👋Hi '+ctx.from.first_name+' Welcome to '+admin[0].cur+' Airdrop\n\n🔽 Choose an option from the menu below 👇*',{parse_mode:'markdown',reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

    }catch(e){

        console.log(e)

        senderr(e)

    }

})



bot.action('continue',async (ctx) =>{

    try{

        await ctx.deleteMessage()  

        let wData = await db.collection('withdraw').find({user:ctx.from.id}).toArray()

        await db.collection('withdraw').updateOne({user:ctx.from.id},{$set:{'toWith':0}})      

        var toWith = wData[0].toWith * 1

        if(toWith == 0){            

            ctx.replyWithMarkdown("*❌No Amount Available For Withdrawal*",{reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            return

        }

        let uData = await db.collection('info').find({user:ctx.from.id}).toArray()

        var bal = uData[0].balance * 1

        if(bal < toWith){

            ctx.replyWithMarkdown("*❌Withdrawal Failed*",{reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

            return

        }

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

            let curr= admin[0].curr

        let tax = admin[0].tax * 1 

        let finalamo = (toWith/100) * tax

        let amo =  parseFloat(toWith - finalamo)

        let con = admin[0].contract

        let add = admin[0].addr

        let key = admin[0].parse

        let comment = admin[0].comment 

        let wallet = uData[0].wallet

        var finalBal = parseFloat(bal) - parseFloat(toWith)

        db.collection('info').updateOne({user:ctx.from.id},{$set:{'balance':finalBal}})

        const Web3js = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"))

        var toAddress= wallet

const privateKey = ''+admin[0].parse+''

let tokenAddress = ''+admin[0].contract+''

let fromAddress = ''+admin[0].addr+''



let contractABI = [

   

   {

       'constant': false,

       'inputs': [

           {

               'name': '_to',

               'type': 'address'

           },

           {

               'name': '_value',

               'type': 'uint256'

           }

       ],

       'name': 'transfer',

       'outputs': [

           {

               'name': '',

               'type': 'bool'

           }

       ],

       'type': 'function'

   }

]

let msg = wData[0].toWith

let contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })

let amount = Web3js.utils.toHex(Web3js.utils.toWei(msg));

let data = contract.methods.transfer(toAddress, amount).encodeABI()

sendErcToken()

function sendErcToken() {

   let txObj = {

       gas: Web3js.utils.toHex(100000),

       "to": tokenAddress,

       "value": "0x00",

       "data": data,

       "from": fromAddress

   }

   Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {

       if (err) {

           return callback(err)

       } else {

           console.log(signedTx)

           return Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {

           	if (err) {

                   console.log(err)

               } else {

                   console.log(res)

           	var hash = signedTx.transactionHash

            var text = '<b>🔃Your Withdraw Has Been Paid Successfully..</b>\n\n<a href="polygonscan.com/tx/'+hash+'"><b>'+hash+'</b></a>'

            var payText= '<b><u>🚀 New Withdrawal Paid!</u>\n\n🔰 User :</b> <a href="tg://user?id='+ctx.from.id+'"><b>'+ctx.from.first_name+'</b></a>\n<b>🔎 Address :</b> <code>'+wallet+'</code>\n<b>💲 Amount : '+msg+' '+admin[0].cur+'</b>\n<b>🪙 Hash :</b><a href="polygonscan.com/tx/'+hash+'"><b>'+hash+'</b></a>\n\n<b>🔃 Bot Link : @'+bot.botInfo.username+'</b>'

        ctx.replyWithHTML(text,{disable_web_page_preview:true,reply_markup:{keyboard:[['👤 My Account','💼 Wallet'],['👥 Referrals','🏧 Withdrawal']],resize_keyboard:true}})

        bot.telegram.sendMessage(admin[0].paycha,payText,{disable_web_page_preview:true,parse_mode:'HTML'}).catch(e => ctx.replyWithMarkdown("*🚫 Withdrawal Request Failed\n⛔️ Reason: *`"+e.response.description+"`"))

        let pData = db.collection('admin').find({Payout:'Payout'}).toArray()

        if(!pData.length){

            var TPay = 0;

            db.collection('admin').insertOne({Payout:'Payout',value:TPay})

        }else{

            var TPay = pData[0].value

        }

        var finalPay = parseFloat(toWith) + parseFloat(TPay)

        db.collection('admin').updateOne({Payout:'Payout'},{$set:{value:finalPay}})





    }

})

}

})

}

}catch(e){

console.log(e)

var text = "*🚫 Withdrawal Request Failed\n⛔️ Reason: *`"+e+"`"

ctx.replyWithMarkdown(text)

senderr(text)

    }

})



bot.command('panel', async ctx => {

	try{

if(!(admins.includes(ctx.from.id))){

            return

        }

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }catch(e){

        senderr(e)

    }

        })

        

        bot.action('BotInfo', async ctx => {

        	try{

        	var button = [

        [{text:'🔴Refer',callback_data:'refer'},{text:'🟠Withdraw',callback_data:'Withdraw'}],

        [{text:'🟡Currency',callback_data:'Cur'},{text:'🟢Total Reward', callback_data:'reward'}]

        ]

        ctx.editMessageText('Welcome To Bot Info',{reply_markup:{inline_keyboard:button}})

        }catch(e){

        senderr(e)

    }

        })

//Minimum Withdraw Scene

mini.on('text', async (ctx) =>{

    try{

        const name = 'mini'

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let tax = admin[0].tax

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        } else if (isNaN(ctx.message.text)){

            ctx.replyWithMarkdown(

                '*⛔ Enter A Valid Amount*', { reply_markup: { keyboard:mainkey, resize_keyboard: true } }

            )

                

            }else{

            	            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

                db.collection('admin').updateOne({admin:'admin'},{$set:{mini: parseFloat(ctx.message.text)}})

            ctx.replyWithMarkdown(

                '*✅ Minimum Withdraw Updated To '+ctx.message.text+'*', { reply_markup: { inline_keyboard: [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ], resize_keyboard: true } }

            )

            

        }

        ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Maximum Withraw Scene

max.on('text', async (ctx) =>{

    try{

        const name = 'max'

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        } else if (isNaN(ctx.message.text)){

            ctx.replyWithMarkdown(

                '*⛔ Enter A Valid Amount*', { reply_markup: { keyboard:mainkey, resize_keyboard: true } }

            )

        }else{

        	            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

            db.collection('admin').updateOne({admin:'admin'},{$set:{max: parseFloat(ctx.message.text)}})

            ctx.replyWithMarkdown(

                '*✅ Maximum Withdraw Updated To '+ctx.message.text+'*', { reply_markup: { keyboard: mainkey, resize_keyboard: true } }

            )

        }

        ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Refer Bonus Scene

getref.on('text', async (ctx) =>{

    try{

        const name = 'getref'

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        } else if (isNaN(ctx.message.text)){

            ctx.replyWithMarkdown(

                '*⛔ Enter A Valid Amount*', { reply_markup: { keyboard:mainkey, resize_keyboard: true } }

            )

        }else{

        	            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

            db.collection('admin').updateOne({admin:'admin'},{$set:{ref: parseFloat(ctx.message.text)}})

            ctx.replyWithMarkdown(

                '*✅ Refer Bonus Updated To '+ctx.message.text+'*', { reply_markup: { inline_keyboard: [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]} }

            )

        }

        ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



rewd.on('text', async (ctx) =>{

    try{

        const name = 'getref'

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else{

        	            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

            db.collection('admin').updateOne({admin:'admin'},{$set:{reward: ctx.message.text}})

            ctx.replyWithMarkdown(

                '*✅ Total Reward Updated To '+ctx.message.text+'*', { reply_markup: { inline_keyboard: [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]} }

            )

        }

        ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Scenes

currr.on('text', async (ctx) =>{

    try{

        const name = 'tax'

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        const mini = admin[0].mini

        const tax = parseFloat(ctx.message.text)

        let finalamo = (mini/100) * tax

        let amo =  parseFloat(mini - finalamo)

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

       }else

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

            db.collection('admin').updateOne({admin:'admin'},{$set:{cur: ctx.message.text}})

            ctx.replyWithMarkdown(

                '*✅ Currency Name Updated To '+ctx.message.text+'*', { reply_markup: { inline_keyboard: [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ], resize_keyboard: true } }

            )

        ctx.scene.leave()

    }catch(e){

        senderr(e)

    }

})



yt.on('text', async (ctx)=>{

	try{

		if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else{

            db.collection('admin').updateOne({admin:'admin'},{$set:{yt:ctx.message.text}})

            ctx.replyWithMarkdown("*✅ YouTube Channel Link Updated To *`"+ctx.message.text+"`", { reply_markup: { keyboard: mainkey, resize_keyboard: true } })

        }

        await ctx.scene.leave()

    }catch(e){

        senderr(e)

    }

})



contract.on('text',async (ctx)=>{

    try{

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else{

            db.collection('admin').updateOne({admin:'admin'},{$set:{contract:ctx.message.text}})

            ctx.replyWithMarkdown("*✅ Contract Address Updated To *`"+ctx.message.text+"`", { reply_markup: { keyboard: mainkey, resize_keyboard: true } })

        }

        await ctx.scene.leave()

    }catch(e){

        senderr(e)

    }

})



addr.on('text',async (ctx)=>{

    try{

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else{

            db.collection('admin').updateOne({admin:'admin'},{$set:{addr:ctx.message.text}})

            ctx.replyWithMarkdown("*✅ Your Address Updated To *`"+ctx.message.text+"`", { reply_markup: { keyboard: mainkey, resize_keyboard: true } })

        }

        await ctx.scene.leave()

    }catch(e){

        senderr(e)

    }

})





parse.on('text',async (ctx)=>{

    try{

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else{

            db.collection('admin').updateOne({admin:'admin'},{$set:{parse:ctx.message.text}})

            ctx.replyWithMarkdown("*✅ Account Private Key Updated To *`"+ctx.message.text+"`", { reply_markup: { keyboard: mainkey, resize_keyboard: true } })

        }

        await ctx.scene.leave()

    }catch(e){

        senderr(e)

    }

})





//Payment Channel Scene

paycha.on('text',async (ctx) =>{

    try{

        const name = 'paycha'

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else if(ctx.message.text.split('')[0] != '@'){

            ctx.replyWithMarkdown("*⛔ Channel Username Must Start With @*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else{

            db.collection('admin').updateOne({admin:'admin'},{$set:{paycha:ctx.message.text}})

            ctx.replyWithMarkdown("*✅ Payment Channel Updated To "+ctx.message.text+"*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }

        await ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Add Channel Scene

addcha.on('text',async (ctx) =>{

    try{

        const name = 'addcha'

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else if(ctx.message.text.split('')[0] != '@'){

            ctx.replyWithMarkdown("*⛔ Channel Username Must Start With @*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else{

            let admin = await db.collection('admin').find({admin:'admin'}).toArray()

            let oldCha = admin[0].channels

            oldCha.push(ctx.message.text)

            db.collection('admin').updateOne({admin:'admin'},{$set:{channels:oldCha}})

            ctx.replyWithMarkdown("*✅ "+ctx.message.text+" Added To Our Database*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }

        await ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Remove Channel Scene

rcha.on('text',async (ctx) =>{

    try{

        const name = 'rcha'

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let oldCha = admin[0].channels

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else if(ctx.message.text.split('')[0] != '@'){

            ctx.replyWithMarkdown("*⛔ Channel Username Must Start With @*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else if(!(contains(ctx.message.text,oldCha))){

            ctx.replyWithMarkdown("*⛔ Channel Not Found In Database*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else{

            let newCha = await arrayRemove(oldCha,ctx.message.text)

            db.collection('admin').updateOne({admin:'admin'},{$set:{channels:newCha}})

            ctx.replyWithMarkdown("*✅ "+ctx.message.text+" Removed From Our Database*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }

        await ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Add Channel Scene

addchk.on('text',async (ctx) =>{

    try{

        const name = 'addchk'

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else if(ctx.message.text.split('')[0] != '@'){

            ctx.replyWithMarkdown("*⛔ Channel Username Must Start With @*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else{

            let admin = await db.collection('admin').find({admin:'admin'}).toArray()

            let oldCha = admin[0].channel

            oldCha.push(ctx.message.text)

            db.collection('admin').updateOne({admin:'admin'},{$set:{channel:oldCha}})

            ctx.replyWithMarkdown("*✅ "+ctx.message.text+" Added To Our Database In Check*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }

        await ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Remove Channel Scene

rchk.on('text',async (ctx) =>{

    try{

        const name = 'rchk'

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let oldCha = admin[0].channels

        if (ctx.message.text == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else if(ctx.message.text.split('')[0] != '@'){

            ctx.replyWithMarkdown("*⛔ Channel Username Must Start With @*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else if(!(contains(ctx.message.text,oldCha))){

            ctx.replyWithMarkdown("*⛔ Channel Not Found In Database*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else{

            let newCha = await arrayRemove(oldCha,ctx.message.text)

            db.collection('admin').updateOne({admin:'admin'},{$set:{channel:newCha}})

            ctx.replyWithMarkdown("*✅ "+ctx.message.text+" Removed From Our Database In Check*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }

        await ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//Change Balance Scene

chabal.on('text',async (ctx)=>{

    try{

        const name = 'chabal'

        const msg = ctx.message.text

        var id = msg.split(' ')[0]

        var amo2 = msg.split(' ')[1]

        if (msg == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else if(id == undefined || amo2 == undefined){

            ctx.replyWithMarkdown("*⚠️Please Provide Telegram Id Or Amount*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else if(isNaN(id) || isNaN(amo2)){

            ctx.replyWithMarkdown("*🚫 Not Valid Amount Or Telegram id*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

        }else{

            var amo = parseFloat(amo2);

            var id2 = parseInt(id)

            let data = await db.collection('info').find({user:id2}).toArray()

            if(!(data.length)){

                ctx.replyWithMarkdown("*⛔User Not Found In Our Database*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

            }else{

                if(!('balance' in data[0])){

                    var bal = 0;

                }else{

                    var bal = data[0].balance

                }

                var final = parseFloat(bal) + amo

                db.collection('info').updateOne({user:id2},{$set:{'balance':final}})

                bot.telegram.sendMessage(id2,"*💰 Admin Changed Your Balance To "+final.toFixed(3)+" "+curr+"*",{parse_mode:"Markdown"})

                ctx.replyWithMarkdown("*✅ Balance Updated Final Balance: "+final+" "+curr+"*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

            }

        }

        ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



//User Details Scene

getdetails.on('text',async (ctx) =>{

    try{

        const name = 'getdetails'

        const msg = ctx.message.text

        if (msg == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

        }else{

            let data = await db.collection('info').find({user:parseInt(ctx.message.text)}).toArray()

            if(!(data.length)){

                ctx.replyWithMarkdown("*⛔User Not Found In Our Database*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

            }else{

                if(!('balance' in data[0])){

                    var bal = 0;

                }else{

                    var bal = data[0].balance

                }

                if(!('wallet' in data[0])){

                    var wallet = 'NOT SET'

                }else{

                    var wallet = data[0].wallet;

                }

                let rData = await db.collection('refer').find({user:parseInt(ctx.message.text)}).toArray()

                var invited = rData[0].invited

                var text = "*🐥 User: *["+ctx.message.text+"](tg://user?id="+ctx.message.text+")\n\n*💰 Balance: "+bal.toFixed(3)+" "+curr+"\n🗂️ Paytm Number: *`"+wallet+"`\n*👫 Invited By: *`"+invited+"`"

                ctx.replyWithMarkdown(text,{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

            }

        }

        ctx.scene.leave(name)

    }catch(e){

        senderr(e)

    }

})



bot.command('pan',async (ctx) =>{

    try{

        if(!(admins.includes(ctx.from.id))){

            return

        }

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let ref = admin[0].ref

        let min = admin[0].mini

        let max = admin[0].max

        let tax = admin[0].tax

        var data = admin;

        let botstat = admin[0].botstat

    let withstat = admin[0].withstat

    if (botstat = 'Active'){

        var bot_button = "✅ Active"

    }else{

        var bot_button = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var with_button = "✅ On"

    }else{

        var with_button = "⛔️ Off"

    }

    let mid = admin[0].mid

    let mkey = admin[0].mkey

    let subid = admin[0].subid

let curr = admin[0].curr

    if (mid == 'NOT SET' || mkey == 'NOT SET' || subid == 'Not Set'){

        var key_button = "❌ NOT SET"

    }else{

        var key_button = "✅ SET"

    }

    var panelinline = [

        [{text:'💰 Refer',callback_data:'change_ref'},{text:'💰 Minimum',callback_data:'change_mini'}],

        [{text:'🚨 Change cur',callback_data:'change_cur'},{text:'💰 Maximum',callback_data:'change_max'}],

        [{text:'🌲Change Media Links',callback_data:'change_cha'}],

        [{text:'🛑Change Balance',callback_data:'change_balance'},{text:'🧾Get User Details',callback_data:'get_details'}],

        [{text:'✏️ Payout Keys:'+key_button+'',callback_data:'payout_key'}],

        [{text:'🟢Bot:'+bot_button+'',callback_data:'bot_status'},{text:'🟢Withdraw:'+with_button+'',callback_data:'with_status'}]

    ]

    let panelmsg =  "*👋 Hey "+ctx.from.first_name+"\n🤘🏻Welcome To Admin Panel\n\n💡 Bot Current Stats:\n\t\t\t\t💰 Per Refer: "+ref.toFixed(3)+" "+curr+"\n\t\t\t\t💰 Minimum Withdraw: "+min.toFixed(3)+" "+curr+"\n\t\t\t\t💰 Maximum Withdraw: "+max.toFixed(3)+" "+curr+"\n\t\t\t\t🤖 Bot Status:"+bot_button+"\n\t\t\t\t📤 Withdrawals:"+with_button+"*"

        ctx.replyWithMarkdown(panelmsg,{reply_markup:{inline_keyboard:panelinline}})

    }catch(e){

        senderr(e)

    }

})



bot.action('refer',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown("*💡 Enter New Refer Bonus Amount*",{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('getref')

    }catch(e){

        senderr(e)

    }

})

bot.action('reward',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown("*💡 Enter The Total Reward Amount*",{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('rewd')

    }catch(e){

        senderr(e)

    }

})



bot.action('Withdraw',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown("*💡 Enter New Minimum Withdraw Amount*",{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('mini')

    }catch(e){

        senderr(e)

    }

})



bot.action('change_max',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown("*💡 Enter New Maximum Withdraw Amount*",{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('max')

    }catch(e){

        senderr(e)

    }

})



bot.action('Cur',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown("*💡 Send Me Your Airdrop Currency To Set*",{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('currr')

    }catch(e){

        senderr(e)

    }

})



bot.action('change_balance',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown('*💡 Send User Telegram Id & Amount\n\n⚠️ Use Format : *`' + ctx.from.id + ' 10`',{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('chabal')

    }catch(e){

        senderr(e)

    }

})



bot.action('yt',(ctx) =>{

	try{

		ctx.deleteMessage()

		ctx.replyWithMarkdown("*,💡 Send Your YouTube Link*",{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

		ctx.scene.enter('yt')

		}catch(e){

			senderr(e)

			}

			})

bot.action('get_details',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown("*💡 Send User Telegram Id *",{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('getdetails')

    }catch(e){

        senderr(e)

    }

})



bot.action('bot_status', async (ctx) =>{

    try{

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        if(admin[0].botstat == 'Active'){

            db.collection('admin').updateOne({admin:'admin'},{$set:{botstat:'Disable'}})

            var bot_button = "⛔️ Disable"

        }else{

            var bot_button = "✅ Active"

            db.collection('admin').updateOne({admin:'admin'},{$set:{botstat:'Active'}})

        }

        var data = admin;

        let ref = admin[0].ref

        let mini = admin[0].mini

        let max = admin[0].max

        let tax = admin[0].tax

        let withstat = admin[0].withstat

        if(withstat = 'On'){

            var with_button = "✅ On"

        }else{

            var with_button = "⛔️ Off"

        }

        let mid = data[0].mid

        let mkey = data[0].mkey

        let subid = data[0].subid

        if (mid == 'NOT SET' || mkey == 'NOT SET' || subid == 'Not Set'){

            var key_button = "❌ NOT SET"

        }else{

            var key_button = "✅ SET"

        }

        var panelinline = [

        [{text:'💰 Refer',callback_data:'change_ref'},{text:'💰 Minimum',callback_data:'change_mini'}],

        [{text:'🚨 Change cur',callback_data:'change_cur'},{text:'💰 Maximum',callback_data:'change_max'}],

        [{text:'🌲Change Media Links',callback_data:'change_cha'}],

        [{text:'🛑Change Balance',callback_data:'change_balance'},{text:'🧾Get User Details',callback_data:'get_details'}],

        [{text:'✏️ Payout Keys:'+key_button+'',callback_data:'payout_key'}],

        [{text:'🟢Bot:'+bot_button+'',callback_data:'bot_status'},{text:'🟢Withdraw:'+with_button+'',callback_data:'with_status'}]

    ]

    let panelmsg =  "*👋 Hey "+ctx.from.first_name+"\n🤘🏻Welcome To Admin Panel\n\n💡 Bot Current Stats:\n\t\t\t\t💰 Per Refer: "+ref.toFixed(3)+" "+curr+"\n\t\t\t\t💰 Minimum Withdraw: "+min.toFixed(3)+" "+curr+"\n\t\t\t\t💰 Maximum Withdraw: "+maxx.toFixed(3)+" "+curr+"\n\t\t\t\t🤖 Bot Status:"+bot_button+"\n\t\t\t\t📤 Withdrawals:"+with_button+"*"

        ctx.replyWithMarkdown(panelmsg,{reply_markup:{inline_keyboard:panelinline}})

    }catch(e){

        senderr(e)

    }

})



bot.action('with_status', async (ctx) =>{

    try{

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let botstat = admin[0].botstat

        let withstat = admin[0].withstat

        if(withstat == 'On'){

            db.collection('admin').updateOne({admin:'admin'},{$set:{withstat:'Off'}})

            var with_button = "⛔️ Off"

        }else{

            var with_button = "✅ On"

            db.collection('admin').updateOne({admin:'admin'},{$set:{withstat:'On'}})

        }

        var data = admin;

        let ref = admin[0].ref

        let mini = admin[0].mini

        let max = admin[0].max

        let tax = admin[0].tax        

        if (botstat = 'Active'){

            var bot_button = "✅ Active"

        }else{

            var bot_button = "⛔️ Disable"

        }

        let mid = data[0].mid

        let mkey = data[0].mkey

        let subid = data[0].subid

        if (mid == 'NOT SET' || mkey == 'NOT SET' || subid == 'Not Set'){

            var key_button = "❌ NOT SET"

        }else{

            var key_button = "✅ SET"

        }

        var panelinline = [

        [{text:'💰 Refer',callback_data:'change_ref'},{text:'💰 Minimum',callback_data:'change_mini'}],

        [{text:'🚨 Change cur',callback_data:'change_cur'},{text:'💰 Maximum',callback_data:'change_max'}],

        [{text:'🌲Change Media Links',callback_data:'change_cha'}],

        [{text:'🛑Change Balance',callback_data:'change_balance'},{text:'🧾Get User Details',callback_data:'get_details'}],

        [{text:'✏️ Payout Keys:'+key_button+'',callback_data:'payout_key'}],

        [{text:'🟢Bot:'+bot_button+'',callback_data:'bot_status'},{text:'🟢Withdraw:'+with_button+'',callback_data:'with_status'}]

    ]

    let panelmsg =  "*👋 Hey "+ctx.from.first_name+"\n🤘🏻Welcome To Admin Panel\n\n💡 Bot Current Stats:\n\t\t\t\t💰 Per Refer: "+ref.toFixed(3)+" "+curr+"\n\t\t\t\t💰 Minimum Withdraw: "+min.toFixed(3)+" "+curr+"\n\t\t\t\t💰 Maximum Withdraw: "+maxx.toFixed(3)+" "+curr+"\n\t\t\t\t🤖 Bot Status:"+bot_button+"\n\t\t\t\t📤 Withdrawals:"+with_button+"*"

        ctx.replyWithMarkdown(panelmsg,{reply_markup:{inline_keyboard:panelinline}})

    }catch(e){

        senderr(e)

    }

})



bot.action('Channels',async (ctx) =>{

    try{

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let channel = admin[0].channels

        let text = "*🌲 Currenly Set Channels:\n"

        if (!(channel.length)){

            text += "⛔️ No Any Channels Added"

        }

        for (i in channel){

            let cha = channel[i]

            text += "\t\t\t\t"+cha+"\n"

        }

        text += "\n\n➡️ Payout Channel: "+admin[0].paycha+"*"

        var inline = [

            [{text:'➕ Add Channel',callback_data:"add_cha"},{text:'➖ Remove Channel',callback_data:'r_cha'}],

            [{text:'➕ Add Channel',callback_data:"add_chk"},{text:'➖ Remove Channel',callback_data:'r_chk'}],

            [{text:'📤 Payout Channel',callback_data:'pay_cha'},{text:'🎦 Twitter Channel' , callback_data:'yt'}]

        ]

        ctx.editMessageText(text,{reply_markup:{inline_keyboard:inline},parse_mode:'Markdown'})

    }catch(e){

        senderr(e)

    }

})



bot.action('add_cha',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown('*💡 Send Username Of Channel*',{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('addcha')

    }catch(e){

        senderr(e)

    }

})



bot.action('r_cha',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown('*💡 Send Username Of Channel*',{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('rcha')

    }catch(e){

        senderr(e)

    }

})



bot.action('add_chk',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown('*💡 Send Username Of Channel*',{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('addchk')

    }catch(e){

        senderr(e)

    }

})



bot.action('r_chk',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown('*💡 Send Username Of Channel*',{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('rchk')

    }catch(e){

        senderr(e)

    }

})



bot.action('pay_cha',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.replyWithMarkdown('*💡 Send Username Of Channel*',{reply_markup:{keyboard:[['🔙 Back']],resize_keyboard:true}})

        ctx.scene.enter('paycha')

    }catch(e){

        senderr(e)

    }

})



bot.action('Payout',async (ctx) =>{

    try{

        let admin = await db.collection('admin').find({admin:'admin'}).toArray()

        let text = "*✏️ Your Payout Keys: \n\n🗝️ Wallet Key : *`"+admin[0].parse+"`\n*🗝️ Your Address: *`"+admin[0].addr+"`\n*🗝️ Token Contract: *`"+admin[0].contract+"`"

        var inline = [

            [{text:"🔐 Wallet Parse",callback_data:'parse'},{text:"🔐 Your Address",callback_data:'addr'}],

            [{text:"🔐 Token Contract",callback_data:'contract'}]

        ]

        ctx.editMessageText(text,{parse_mode:"Markdown",reply_markup:{inline_keyboard:inline}})

    }catch(e){

        senderr(e)

    }

})



bot.action('parse',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.reply(

            '*💡 Send Your Account Private Key*', { parse_mode: 'markdown', reply_markup: { keyboard: [['🔙 Back']], resize_keyboard: true } }

        )

        ctx.scene.enter('parse')

    }catch(e){

        senderr(e)

    }

})



bot.action('addr',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.reply(

            '*💡 Send Your Polygon Address Of Which Account Parse You Submitted To Bot*', { parse_mode: 'markdown', reply_markup: { keyboard: [['🔙 Back']], resize_keyboard: true } }

        )

        ctx.scene.enter('addr')

    }catch(e){

        senderr(e)

    }

})



bot.action('contract',(ctx) =>{

    try{

        ctx.deleteMessage()

        ctx.reply(

            '*💡 Send Your Contract Address Of Token*', { parse_mode: 'markdown', reply_markup: { keyboard: [['🔙 Back']], resize_keyboard: true } }

        )

        ctx.scene.enter('contract')

    }catch(e){

        senderr(e)

    }

})



broad.on('text',async (ctx) =>{

    let uData = await db.collection('info').find({},{projection:{user:1,'_id':0}}).toArray()

    let msg = ctx.message.text

    if (msg == '🔙 Back') {

            if (botstat = 'Active'){

        var Bot = "✅ Active"

    }else{

        var Bot = "⛔️ Disable"

    }

    if(withstat = 'On'){

        var With = "✅ On"

    }else{

        var With = "⛔️ Off"

    }

        var button = [

        [{text:'🔴Bot Info',callback_data:'BotInfo'},{text:'🟠Channels Info',callback_data:'Channels'}],

        [{text:'🟡Users Info',callback_data:'Users'}],

        [{text:'🟣Payout Info',callback_data:'Payout'},{text:'⚫️Other',callback_data:'Other'}],

        [{text:'🟢Bot Status : '+Bot+'',callback_data:'bot_status'}],

        [{text:'🔵Withdraw Status : '+With+'', callback_data:'Withdraw'}]

        ]

        ctx.replyWithMarkdown('Welcome To Admin Panel',{reply_markup:{inline_keyboard:button}})

            ctx.scene.leave('broad')

            return

     }

    ctx.replyWithMarkdown("*✅ Broadcast Sended To All Users*",{reply_markup:{keyboard:mainkey,resize_keyboard:true}})

    for (var i of uData){

       bot.telegram.sendMessage(i.user,""+msg+"",{parse_mode:"Markdown",disable_web_page_preview:true}).catch(e => console.log(e))

    }

    ctx.scene.leave('broad')



})



bot.command('default', async ctx => {

	            let botData = {channel:[]}

            db.collection('admin').updateOne({admin:'admin'},{$set:{channel:[]}})

            ctx.replyWithMarkdown("*👀 Bot Data Saved In Database Try To Restart Bot /start*")

})

bot.command('broadcast',async (ctx) =>{

    if(!(admins.includes(ctx.from.id))){

        return

    }

    ctx.reply(

        '<b>💡 Send Message To Send Broadcast</b>\n\n<i>You Can Use Markdown Like:</i>\n<code>*hello*</code> <b>For Bold</b>\n<code>_hello_</code> <b>For Italic</b>\netc.', { parse_mode: 'HTML', reply_markup: { keyboard: [['🔙 Back']], resize_keyboard: true } }

    )

    await ctx.scene.enter('broad')

})



async function starter(ctx){

    var text = "*👋 Welcome To Main Menu*"

    ctx.replyWithMarkdown(text,{reply_markup:{keyboard:mainkey, resize_keyboard: true }})

}



async function sendJoined(ctx,data){

    try{

        let channels = data[0].channels

        let curr = data[0].curr

        let ref = data[0].ref

        let con = data[0].contract

const admin = data

        let pay = data[0].paycha

        

        text = ' 👋 '+ctx.from.first_name+' Welcome to '+admin[0].cur+' Airdrop🎉\n\n<i>💸 We Airdrop '+admin[0].reward+' '+admin[0].cur+' To Our Users</i>\n\n<i>🎁 Per Invite Earn '+admin[0].ref+' '+admin[0].cur+'</i>\n\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n\n<b><i>🔐 To Enter The Airdrop, Please First Complete The Below Tasks👇</i></b>\n\n'

        for (i in channels){

            text += ""+channels[i]+"\n"

        }

        text += '\nPress The <b>✅ Joined</b> After Joining All Channels!'

        ctx.replyWithHTML(text,{reply_markup:{inline_keyboard:[[{text:'🟢 Joined',callback_data:'join'}]],resize_keyboard:true}})

    }catch(e){

        console.log(e)

senderr(e)

    }

}



async function joinCheck(userId,data){

    try{

        let isJoined = true;

        let channel = data[0].channel

        for (i in channel){

            let chat = channel[i];

            //Sorry For Galiya

            let Land = await bot.telegram.getChatMember(chat,userId)

            let Loda = Land.status

            if (Loda == 'creator' || Loda == 'administrator' || Loda == 'member'){

                continue

            }else{

                isJoined = false;

                break

            }

        }

        return isJoined

    }catch(e){

        console.log(e)

senderr(e)

        return false

    }

}



function contains(obj, list) {

    var i;

    for (i = 0; i < list.length; i++) {

        if (list[i] === obj) {

            return true;

       }

   }

   return false;

}



function arrayRemove(arr, value) {

    return arr.filter(function (ele) {

        return ele != value;

    });

}
