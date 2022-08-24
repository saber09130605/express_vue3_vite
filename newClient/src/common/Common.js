const getTime = (time) => { //年月日时分秒
    let now = new Date(time)
    let nian = now.getFullYear()
    let yue = (now.getMonth() + 1).toString().padStart(2, '0')
    let ri = now.getDate().toString().padStart(2, '0')
    let shi = now.getHours().toString().padStart(2, '0')
    let fen = now.getMinutes().toString().padStart(2, '0')
    let miao = now.getSeconds().toString().padStart(2, '0')
    return `${nian}-${yue}-${ri} ${shi}:${fen}:${miao}`
}


export { getTime };