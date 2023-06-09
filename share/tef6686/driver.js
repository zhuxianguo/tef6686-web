function devTEF668x_Set_Cmd(module, cmd, ...others) {
    const buf = [module, cmd, 1]
    others.forEach(o => {
        buf.push(o >> 8)
        buf.push(o)
    })
    return Tuner_WriteBuffer(buf)
}

async function devTEF668x_Get_Cmd(module, cmd, len) {
    const buf = [module, cmd, 1]
    await Tuner_WriteBuffer(buf)
    return Tuner_ReadBuffer(len)
}

function convert8bto16b(a) {
    return a[0] << 8 | a[1]
}

async function devTEF668x_APPL_Get_Operation_Status() {
    const status = await devTEF668x_Get_Cmd(64, 128, 2)
    return convert8bto16b(status.split(','))
}

function devTEF668x_APPL_Set_OperationMode(mode) {
    return devTEF668x_Set_Cmd(64, 1, mode)
}

function devTEF668x_Radio_Tune_To(frequency) {
    return devTEF668x_Set_Cmd(32, 1, 1, frequency)
}

function devTEF668x_Audio_Set_Mute(mode) {
    return devTEF668x_Set_Cmd(48, 11, mode)
}

function devTEF668x_Audio_Set_Volume(volume) {
    return devTEF668x_Set_Cmd(48, 10, volume*10)
}

async function devTEF668x_Radio_Get_Quality_Data() {
    const r = await devTEF668x_Get_Cmd(32, 129, 14)
    const buf = r.split(',')
    const status = 0x3fff & convert8bto16b(buf) / 10
    const level = convert8bto16b(buf.splice(2)) / 10
    const usn = convert8bto16b(buf.splice(4)) / 10
    const wam = convert8bto16b(buf.splice(6)) / 10
    const offset = Math.abs(convert8bto16b(buf.splice(8)))
    const bandwidth = convert8bto16b(buf.splice(10))
    const modulation = convert8bto16b(buf.splice(12)) / 10
    return { status, level, usn, wam, offset, bandwidth, modulation }
}