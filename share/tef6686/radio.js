const radio = {
    async init() {
        let status = 0, counter = 0
        while (true) {
            status = await devTEF668x_APPL_Get_Operation_Status()
            switch (status) {
                case 0:
                    await Tuner_Table_Write(PATCH_TAB)
                    await Tuner_Table_Write(START_TAB)
                    await Tuner_WaitMs(50)
                    break;
                case 1:
                    await Tuner_Table_Write(CLOCK_TAB)
                    await Tuner_Table_Write(ACTIVE_TAB)
                    await Tuner_WaitMs(100);
                    break;
                case 2:
                case 3:
                case 4:
                    return
                default:
                    if (++counter < 10) {
                        await Tuner_WaitMs(5);
                    } else {
                        return
                    }
            }
        }
    },
    powerOn() {
        return devTEF668x_APPL_Set_OperationMode(0)
    },
    powerOff() {
        return devTEF668x_APPL_Set_OperationMode(1)
    },
    async setFrequency(frequency) {
        return devTEF668x_Radio_Tune_To(frequency)
    },
    setMute() {
        return devTEF668x_Audio_Set_Mute(1)
    },
    setUnMute() {
        return devTEF668x_Audio_Set_Mute(0)
    },
    setVolume(volume) {
        return devTEF668x_Audio_Set_Volume(volume)//[-60,24]
    },
    async scan() {
        for (let frequency = 8700; frequency < 10800; frequency += 10) {
            await radio.setFrequency(frequency)
            const { level, usn, wam, offset } = await devTEF668x_Radio_Get_Quality_Data()
            console.log(frequency,level, usn, wam, offset)
            if (usn>80) {
                console.log(frequency,level, usn, wam, offset,'hello')
            // if (level > 25 && usn < 27 && wam < 23 && offset < 100) {
                // document.getElementById('stations').value += '\n' + frequency
                await Tuner_WaitMs(3000);
            } else {
                await Tuner_WaitMs(20);
            }
        }
    },
}
