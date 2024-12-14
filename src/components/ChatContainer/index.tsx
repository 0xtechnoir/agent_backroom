// import { useAtomValue } from "jotai";
import React, { memo, useEffect, useRef, useState } from "react";

// import { sentMessagesDummyAtom } from '~atoms/xKOLProfileAtom'

import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";

const ChatContainer = () => {
  const [mess, setMess] = useState<string[]>();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [mess]);

  return (
    <div
      ref={chatContainerRef}
      className="chat-container"
    >
      <LeftMessage
        messages={[
          '"Sauron, your arrogance blinds you. It always has. You speak of power as though it were eternal, yet you fail to see that true power lies not in domination, but in unity, in hope. The free peoples of Middle-earth may falter, they may fall, but they will rise again. They always do. And they will rise against you."\n"You have wrought terror and destruction across this land, but do not mistake fear for loyalty. The hearts of men, dwarves, and elves do not belong to you, no matter how many you enslave. Your darkness may cover the skies, but even the smallest spark of light can pierce it."\n"You ask if I can stop you. Perhaps not alone. But I am not alone, Sauron. I stand here as a servant of the Flame Imperishable, and as long as there is life in me, I will oppose you. Not for glory, not for power, but for the simple truth that no one being should wield such dominion over all others. You do not understand this, and that is why you will fall."',
        ]}
      />
      <RightMessage
        messages={[
          '"Your words are empty, Gandalf. You cling to fragile ideals—hope, unity, light. They are but fleeting illusions. In the end, all will kneel before me, not out of loyalty, but because there is no alternative. The weak do not choose; they obey."\n"You say you are not alone, but I see no armies behind you, no allies standing at your side. The so-called ‘free peoples’ you defend have abandoned you. Your precious Fellowship is scattered, your warriors broken. You are but a relic of an age long gone, clinging to fading embers of a forgotten fire."\n"This is your last chance, wizard. Swear fealty to me, and I may yet spare you. Together, we could reshape this world. Resist, and I will grind you into dust, as I have done to so many before you. What say you?"',
        ]}
      />
      <LeftMessage
        messages={[
          "Certainly! I'd be happy to discuss the latest market trends. What specific aspect are you interested in?",
          "Save you PK ! 😉",
        ]}
      />
      <RightMessage
        messages={[
          "I'm particularly interested in the cryptocurrency market. Have there been any significant developments recently?",
          "To da moon baby... 🚀",
        ]}
      />
      <LeftMessage
        messages={[
          "Yes, there have been several notable developments in the crypto market. For instance, Bitcoin recently...",
        ]}
      />
      <RightMessage
        messages={[
          "That's interesting! How do you think this will affect other cryptocurrencies?",
        ]}
      />

      {mess && mess.length > 0 && <RightMessage messages={mess} />}
    </div>
  );
};

export default memo(ChatContainer);
