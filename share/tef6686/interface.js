const tef6686_server='http://192.168.0.114'
function Tuner_WriteBuffer(buf) {
    return fetch(`${tef6686_server}/write`, {
        method: 'post',
        body: buf.join(',')
    })
}

function Tuner_ReadBuffer(len) {
    return fetch(`${tef6686_server}/read`, {
        method: 'post',
        body: len + ''
    }).then(r => r.text())
}

function Tuner_WaitMs(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function chunk(list, size) {
    const rst = []
    for (let i = 0; i < list.length; i++) {
        if (i % size == 0) {
            rst.push([])
        }
        rst[rst.length - 1].push(list[i])
    }
    return rst
}

async function Tuner_Patch_Load(pLutBytes) {
    const list = chunk(pLutBytes, 24)
    for (let i = 0; i < list.length; i++) {
        const patch=list[i]
        await Tuner_WriteBuffer([0x1b, ...patch])
    }
    return Promise.resolve()
}

async function Tuner_Table_Write(tab) {
    for (let i = 0; i < tab.length; i++) {
        const item = tab[i]
        await window[item.method](item.data)
    }
    return Promise.resolve()
}