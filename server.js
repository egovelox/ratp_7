const http = require("http")

const PORT = 3000;
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000,
};
const GET_ENDPOINT = "/ratp/ligne7/departures/courneuve"
const SERVER_START_MESSAGE = [
  `[START] Listening on ${PORT}`,
  `[ENDPOINT] ${GET_ENDPOINT}`,
].join("\n")
const LINE_HOUR_START = "06:30:00".split(':');
const LINE_HOUR_END = "00:30:00".split(':');

let departures = initDepartures()
let status = initStatus()

setInterval(() => {
  if (!isLineOpen()) {
    departures = []
    status = 'closed'
    return
  }

  status = 'open'
  for (const d of departures) {
    if (d.minutes === 0) {
      d.minutes = 7
      continue
    }
    d.minutes -= 1
  }
}, seconds(60))

http.createServer(async (req, res) => {
  switch (req.url) {
    case GET_ENDPOINT:
      send(res, 200, { status, departures })
  }
}).listen(
  PORT,
  "localhost",
  () => console.log(SERVER_START_MESSAGE)
);




function send(res, status, message) {
  res.writeHead(status, HEADERS);
  // console.log(message)
  res.end(JSON.stringify({response: message}))
}

function isLineOpen() {
  const now = new Date(Date.now())
  const TODAY_START = new Date()
  const TODAY_END = new Date()
  TODAY_START.setHours(LINE_HOUR_START[0], LINE_HOUR_START[1], LINE_HOUR_START[2], 0);
  TODAY_END.setHours(LINE_HOUR_END[0], LINE_HOUR_END[1], LINE_HOUR_END[2], 0);

  if (now > TODAY_END && now < TODAY_START ) {
    return false
  } else {
    return true
  }
}

function initStatus() {
  if (!isLineOpen) {
    return 'closed'
  }
  return 'open'
}

function initDepartures() {
  if (!isLineOpen) {
    return []
  }
  return [
    {id: 1, minutes: 2},
    {id: 2, minutes: 4},
    {id: 3, minutes: 6},
    {id: 4, minutes: 0},
    {id: 5, minutes: 2},
    {id: 6, minutes: 4},
    {id: 7, minutes: 6},
    {id: 8, minutes: 0},
    {id: 9, minutes: 2},
    {id: 10, minutes: 4},
    {id: 11, minutes: 6},
    {id: 12, minutes: 0},
    {id: 13, minutes: 2}, 
    {id: 14, minutes: 4},
    {id: 15, minutes: 6},
    {id: 16, minutes: 0},
    {id: 17, minutes: 2},
    {id: 18, minutes: 4},
    {id: 19, minutes: 6},
    {id: 20, minutes: 0},
    {id: 21, minutes: 2},
    {id: 22, minutes: 4},
    {id: 23, minutes: 6},
    {id: 24, minutes: 0},
    {id: 25, minutes: 2},
    {id: 26, minutes: 4},
    {id: 27, minutes: 6},
    {id: 28, minutes: 0},
    {id: 29, minutes: 2},
    {id: 30, minutes: 4},
    {id: 31, minutes: 6},
    {id: 32, minutes: 0},
    {id: 33, minutes: 2},
    {id: 34, minutes: 4},
    {id: 35, minutes: 6},
    {id: 36, minutes: 0},
    {id: 37, minutes: 2},
    {id: 38, minutes: 4},
    {id: 39, minutes: 6},
  ]
}

function seconds(count) {
  return count * 1000
}
