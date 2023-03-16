import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
// const configuration = new Configuration({
//   organization: 'org-BFclJAk2nsXvamKv7gucJIMJ',
//   apiKey: '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',
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();
// const url = 'https://api.openai.com/v1/files' // 文件

//
const answer = axios; // 使用axios发送post请求
const headers = {
    Authorization: 'Bearer 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',
};



// 处理输入内容
function Embeddings() {
    const url = 'https://api.openai.com/v1/embeddings' //  提供一段文字，和要对文字处理的描述，返回结果
    const data = {
        'model': 'text-embedding-ada-002',
        'input': '你能用来干啥',
    };
    answer
        .post(url, data, { headers: headers })
        .then(res => {
            console.log(res.data[0].url);
            return res.data[0].url;
        })
        .catch(err => {
            console.log(err.response.data);
            return 'error';
        });
}
// 处理输入内容
function edit() {
    const url = 'https://api.openai.com/v1/edits' //  提供一段文字，和要对文字处理的描述，返回结果
    const data = {
        'model': 'text-davinci-edit-001',
        'input': '我是是是是是中国人中的好人',
        'instruction': '去除重复的字',
        temperature: 0.8,
        top_p: 1.0,
        n: 5
    };
    answer
        .post(url, data, { headers: headers })
        .then(res => {
            console.log(res.data[0].url);
            return res.data[0].url;
        })
        .catch(err => {
            console.log(err.response.data);
            return 'error';
        });
}
// 得到图片
function getImage() {
    const url = 'https://api.openai.com/v1/images/generations' // 图片
    const data = {
        'prompt': 'Lady Gaga',
        'n': 2,
        'size': '1024x1024'
    };
    answer
        .post(url, data, { headers: headers })
        .then(res => {})
        .catch(err => {
            console.log(err.response.data);
            return 'error';
        });
}
// 图片合成
function imageEdit() {
    const url = 'https://api.openai.com/v1/images/edits' // 图片
    const data = {
        'prompt': 'A cute baby sea otter wearing a beret',
        'n': 2,
        image: '',
        mask: '',
        'size': '1024x1024'
    };
    answer
        .post(url, data, { headers: headers })
        .then(res => {
            console.log(res.data[0].url);
            return res.data[0].url;
        })
        .catch(err => {
            console.log(err.response.data);
            return 'error';
        });
}
// 得到文字
export function getchatGptText(prompt) {
    const url = 'https://api.openai.com/v1/completions'; // 文字
    const data = {
        model: 'text-davinci-003', // 模型id
        prompt: prompt,
        temperature: 0.0, // 控制结果的随机性，如果希望结果更有创意可以尝试 0.9，或者希望有固定结果可以尝试 0.0
        max_tokens: 1000, // 生成结果时的最大 tokens 数，不能超过模型的上下文长度
        top_p: 0.1, // 一个可用于代替 temperature 的参数，对应机器学习中 nucleus sampling，如果设置 0.1 意味着只考虑构成前 10% 概率质量的 tokens
        frequency_penalty: 0.5, // [控制字符的重复度] -2.0 ~ 2.0 之间的数字
        n: 1,
        presence_penalty: 0.0, // [控制主题的重复度] -2.0 ~ 2.0 之间的数字
    };
    return new Promise((resolve, reject) => {
        answer
            .post(url, data, { headers: headers })
            .then(res => {
                res.data.choices.forEach(element => {
                    console.log(element.text.trim());
                    resolve(element.text.trim())
                });
            })
            .catch(err => {
                reject(err.response.data.error.message)
                console.log(err.response.data.error.message);
            });
    })

}