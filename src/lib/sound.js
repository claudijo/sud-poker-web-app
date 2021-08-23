export class Sound {
  constructor(url) {
    this.audio = new Audio(url)
  }

  async play() {
    try {
      await this.audio.play()
    } catch(error) {
      console.warn(error)
    }
  }

  async stop() {
    try {
      await this.audio.stop()
    } catch(error) {
      console.warn(error)
    }
  }
}