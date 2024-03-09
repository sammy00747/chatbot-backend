const OpenAI = require("openai");


let openai = null;

let main = () => {
    try {
        openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
        console.log("ChatGPT init done!");
    }
    catch(e) {
        console.error(e)
    }
};

let getResponse = async(msg) => {
    if(!openai) {
        return "Sunny is busy now, but Sunny will be back in a moment!";
    }
    const params = await openai.chat.completions.create({
        messages: [{ role: 'user', content: msg }],
        model: 'gpt-3.5-turbo',
    });
    return params.choices[0].message.content;
}

module.exports = {main,getResponse};