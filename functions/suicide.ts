import { CommandOrigin } from "bdsx/bds/commandorigin";
import { CommandOutput } from "bdsx/bds/command";
import { serverInstance } from "bdsx/bds/server";
import { Player } from "bdsx/bds/player";

import obj = require("./../config.json");
import { AttributeId } from "bdsx/bds/attribute";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const suicide = async (
  param: { player: string },
  origin: CommandOrigin,
  output: CommandOutput
) => {
  // Get the player instance
  const player: Player = <Player>origin.getEntity();

  // If the nickname option is enabled, change the player's nickname
  if (obj.suicide.nickname)
    player.setNameTag(obj.suicide.loser.replace("{player}", player.getName()));

  // Killing the player
  player.setAttribute(AttributeId.Health, 0);

  serverInstance.getPlayers().forEach((destinyPlayer) => {
    destinyPlayer.sendMessage(
      obj.suicide.broadcast.replace("{player}", player.getName())
    );
  });

  // Sleep to change the nikname
  await sleep(obj.suicide.nicknameIntervalSeconds);

  player.setNameTag(player.getName());
};
