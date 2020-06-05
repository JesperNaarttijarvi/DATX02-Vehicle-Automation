/**
 * Contains configs for the server. Dont change anything in here if you dont know what you're doing.
 */

module.exports = {
  server: {
    host: '10.0.0.68',
    port: '8081'
  },
  darknet: {
    root: '../darknet/',
    threshold: 0.5,
    frames_to_process: 1
  }
}
