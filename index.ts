import { tpa, tpaccept } from "./functions/tpa";

import { CxxString } from "bdsx/nativetype";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { suicide } from "./functions/suicide";

import obj = require("./config.json");

export const jsonPlayer: any = {}; // * jsonSaving temporary player data

console.log("[plugin:MultipleTools] allocated");

events.serverOpen.on(() => {
  console.log("[plugin:MultipleTools] launching");

  // * Commands and events registered.

  command
    .register("tpa", obj.tpa.description)
    .overload(tpa, { player: CxxString });

  command
    .register("tpaccept", obj.tpa.acceptDescription)
    .overload(tpaccept, {});

  command.register("suicide", obj.suicide.description).overload(suicide, {});

  // TODO : Add more commands and events such as sethome, home, warp, etc.
});

events.serverClose.on(() => {
  console.log("[plugin:MultipleTools] closed");
});
