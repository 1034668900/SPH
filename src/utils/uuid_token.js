import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    // 需要生成一个随机的字符串，且不能每次都生成
    //可以通过判断本地存储是否存在uuid_token来判断是否需要生成
    // 本次存储没有则生成，然后将其存储在本地，本次存储有则直接从本地存储读取然后返回
    let uuid_token = localStorage.getItem('uuid_token')
    if (!uuid_token) {
        uuid_token = uuidv4()

    } else {
        // 将其存储到本地
        localStorage.setItem('uuid_token', uuid_token)
    }
    return uuid_token
}