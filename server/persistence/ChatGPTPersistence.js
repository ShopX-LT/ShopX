const { capitalize } = require('lodash');
const { Configuration, OpenAIApi } = require('openai');

const chatGPTConfig = async (openai, message) => {
  const response = await openai.createChatCompletion({
    model: 'text-davinci-003',
    max_tokens: 50,
    temparature: 0,
    prompt: message,
  });
  return response;
};

const generateMainText = async ({ openai, product }) => {
  const message = `write a hero section main text to capture users interest for an e-commerce store that sells ${product}, the text should be less than 7 words long`;

  try {
    const response = await chatGPTConfig(openai, message);
    return response.data.choices[0].text;
  } catch (error) {
    console.error('ChatGPT Persistence error in generateMainText()', error);
    return null;
  }
};
const generateSubText = async ({ openai, product }) => {
  const message = `write a hero section sub text to capture users interest  and makes them want ot click the action button for an e-commerce store that sells ${product}, the text should be less than 30 words long`;

  try {
    const response = await chatGPTConfig(openai, message);
    return response.data.choices[0].text;
  } catch (error) {
    console.error('ChatGPT Persistence error in generateMainText()', error);
    return null;
  }
};
const dummyGenerateMainText = async ({ product }) => {
  const message = `Luxury ${product} at your doorstep`;

  try {
    return capitalize(message);
  } catch (error) {
    console.error('ChatGPT Persistence error in generateMainText()', error);
    return null;
  }
};
const dummyGenerateSubText = async ({ openai, product }) => {
  const message = `Shop our stunning collection from the comfort of your own home and elevate your
  style.`;

  try {
    return message;
  } catch (error) {
    console.error('ChatGPT Persistence error in generateMainText()', error);
    return null;
  }
};

const generateText = async ({ product }) => {
  try {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);

    const mainText = await dummyGenerateMainText({ openai, product });
    const subText = await dummyGenerateSubText({ openai, product });

    return { mainText, subText };
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateText,
};
