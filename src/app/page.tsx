"use client";

import ChatContainer from "@/components/ChatContainer";
import LordButton from "@/components/LordButton";
import Link from "next/link";

export default function Home() { 
  return (
    <main className="min-h-screen bg-parchment text-ink font-medieval p-5">
      <p className="lotr mx-auto mt-[24px]" />
      <div className="flex items-end max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-4 flex-1 relative top-[-44px]">
          <Link href="https://x.com/0xwhitewizard?s=21" target="_blank">
            <LordButton text="Gandalf" />
          </Link>

          <Link
            href="https://dexscreener.com/base/0xf777e9c107f9436c9a1bda1030ae078add7c6049"
            target="_blank"
          >
            <LordButton text="Dexscreener" />
          </Link>
          <Link href="https://app.virtuals.io/virtuals/10895" target="_blank">
            <LordButton text="Virtual" />
          </Link>
        </div>
        <div
          id="message-container"
          className="max-w-4xl mt-[0] mx-auto p-4 bg-scroll rounded-lg overflow-y-auto h-96"
        >
          <div className="mt-[65px] mb-[10px] mx-[100px] ">
            <ChatContainer />
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 relative top-[-44px]">
          <Link href="https://x.com/sauronthering" target="_blank">
            <LordButton text="Sauron" theme="dark" />
          </Link>
          <Link
            href="https://dexscreener.com/base/0x4327f92743575be1d9A921C98B4c238aD50B3F5f?__cf_chl_tk=pRWnCVklJw0M5oojZtxsJlAvlpoycbSbt6BHJ6GaPKs-1733502460-1.0.1.1-yQKB..dtIrtkod4FOn.ztHOmFGaqhI4KFSIKsurDJAY"
            target="_blank"
          >
            <LordButton text="Dexscreener" theme="dark" />
          </Link>
          <Link href="https://app.virtuals.io/virtuals/10895" target="_blank">
            <LordButton text="Virtual" theme="dark" />
          </Link>
        </div>
      </div>
    </main>
  );
}