const main = document.querySelector("main");
const chatter = document.getElementById("chatter");
const msgTemplate = document.getElementById("chatMsg");

const activateCommandNode = (node) => {
  setTimeout(() => {
    node.classList.add("active");
  }, 50);

  setTimeout(() => {
    node.classList.remove("active");
  }, 1500);
};

ComfyJS.onCommand = (_user, command, _message, _flags, _extra) => {
  if (chatCommands.includes(command)) {
    const originalNode = document.querySelector(`.command-${command}`);
    const commandNode = originalNode.cloneNode(true);
    main.appendChild(commandNode);

    activateCommandNode(commandNode);
  }
};

ComfyJS.onSub = () => {
  const thanks = document.querySelector(".sub-thanks");

  activateCommandNode(thanks);
};

const getChatMessageClass = (flags) => {
  if(flags.broadcaster) {
    return 'is-broadcaster'
  }
  if(flags.mod) {
    return 'is-moderator'
  }
  if(flags.subscriber) {
    return 'is-subscriber'
  }

  return ''
}

ComfyJS.onChat = (user, message, flags) => {
  const newMsg = msgTemplate.content.cloneNode(true);
  const messageClass = getChatMessageClass(flags)
  if(messageClass) {
    newMsg.firstElementChild.classList.add(messageClass)
  }
  newMsg.querySelector("strong").textContent = user;
  newMsg.querySelector("span").textContent = message;
  chatter.appendChild(newMsg);
};

ComfyJS.Init(twitchUsername);
