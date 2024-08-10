const OAUTH_TOKEN = 'jk8oswwaa498oubrd95atn9wtv1fjb'; // Needs scopes user:bot,
const NICK = 'tony_linguica_bot'
const CHANNEL = '1bladez'

const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

socket.addEventListener('open', () =>{
  socket.send(`PASS oauth:${OAUTH_TOKEN}`)
  socket.send(`NICK ${NICK}`)
  socket.send(`JOIN #${CHANNEL}`)
})

socket.addEventListener('message', (event) => {
  document.getElementById("serverOutput").innerText += event.data;
  if (event.data.includes("Hello World")) {
    console.log('hello world sent!')
    socket.send(`PRIVMSG #${channel} :cringe`)
  }

  if (event.data.includes("PING") || event.data.includes("ping")) {
    socket.send("PONG");
    socket.send(`PRIVMSG #${CHANNEL} :<- n é o Tony. This is an automated message: PONG`)
    socket.send(`PRIVMSG #${CHANNEL} :/timeout joaozerar6 2`)
  } else if (event.data.includes("sexo")) {
    socket.send("PONG");
    socket.send(`PRIVMSG #${CHANNEL} :<- n é o Tony.       para com isso ae ${getUserName(event.data)}`)
  }
});


const getUserName = (message) => {
  const regex = /^:(\w+)!.*\s(\w+)\s#\w+/;
  const match = message.match(regex);

  if (match) {
    const username = match[1];
    const keyword = match[2];
    console.log(`Username: ${username}, Keyword: ${keyword}`);
    // Output: Username: foo, Keyword: JOIN

    return `@${username}`
  }

  return ''
}

// else if (event.data.includes("vapo")) {
//   socket.send("PONG");
//   socket.send(`PRIVMSG #${CHANNEL} :<- n é o Tony. ⠄⠄⠄⠄⠄⣀⣤⣲⣽⠶⠅⢭⠴⠶⠿⠛⠋⠉⠄⠈⠄⠑⠂⠂⠄⠄⠄⠄⠄⠄ ⠄⠄⠄⠄⣰⠟⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠄⠄⠄⠄ ⠄⠄⠄⠄⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣀⣀⣀⣀⣀⣀⡀⠄⠄⠄⠄ ⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⣴⣤⣤⣀⣀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠄⠄⠄ ⠄⠄⠄⠄⠄⠄⠄⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄ ⠄⠄⠄⣤⣀⠄⠰⣾⣿⣿⣿⡿⢛⡛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡇⠄⠄ ⠄⠄⢰⣿⣿⣶⣶⣶⣬⣭⣉⠙⠛⠿⠿⠖⠄⠄⣹⣿⣿⡟⠋⠉⠤⠤⣶⡇⠄⠄ ⠄⠄⢸⣿⣷⣾⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣾⢛⣴⣷⡒⣶⣶⣤⣶⣿⡇⠄⠄ ⠄⠄⠈⣿⣿⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠄⠄ ⠄⠄⠄⠛⡏⠄⢿⣿⣿⣿⣿⣿⣿⡿⢿⣿⡿⠛⠛⠿⠿⠿⣿⣿⣿⣿⣿⣿⠄⠄ ⠄⠄⠄⠄⡀⠄⠈⢻⠿⣿⣿⣿⣯⠄⠄⠄⠴⣴⣤⣶⣤⡤⠌⠉⢀⣽⣿⡿⠄⠄ ⠄⠄⠄⠄⠱⡀⠄⠄⣴⠁⠉⠟⠃⢰⣿⣷⣶⣿⣿⣿⣿⣶⣶⣦⢸⣿⠟⢡⣀⣀ ⣠⣴⣾⣿⣆⠹⣦⡀⢂⠁⠄⠄⠄⠸⣿⣿⣦⣄⣀⣉⣩⣽⣿⠏⠄⠄⠄⠄⠄⠈ ⣿⣿⣿⣿⣿⣦⠈⠣⠊⠣⠄⠄⠄⠄⠈⠉⠛⠛⠛⠿⠛⠛⠁⠄⠄⠄⠄⠄⠄⠄ ⡿⠿⠿⢿⣿⣿⣧⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄`)
// }
