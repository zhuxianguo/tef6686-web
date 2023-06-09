const { createApp } = Vue
const app = createApp({
  data() {
    return {
      volume:0,
      station: 8870,
      stations: [
        8870,
        9050,
        9080,
        9100,
        9150,
        9380,
        9450,
        9480,
        9660,
        9740,
        9930,
        9960,
        10060,
        10250,
        10390,
        10520,
        10590,
        10610,
        10730,
      ],
    }
  },
  async mounted() {
    await radio.init();
    await radio.powerOff()
    await radio.setUnMute()
    await this.onTuneTo(8870)
  },
  methods: {
    onFrequencyUp() {
      let index = this.stations.findIndex(o => o == this.station)
      index++
      if (index > this.stations.length - 1) index = this.stations.length - 1
      const frequency = this.stations[index]
      return this.onTuneTo(frequency)
    },
    onFrequencyDown() {
      let index = this.stations.findIndex(o => o == this.station)
      index--
      if (index < 0) index = 0
      const frequency = this.stations[index]
      return this.onTuneTo(frequency)
    },
    onTuneTo(frequency){
      this.station = frequency
      return radio.setFrequency(frequency)
    },
    onVolumeUp(){
      this.volume++
      if(this.volume>24)this.volume=24
      return radio.setVolume(this.volume)
    },
    onVolumeDown(){
      this.volume--
      if(this.volume<-60)this.volume=-60
      return radio.setVolume(this.volume)
    },
  },
}).mount('#app');