import { CommandOrigin } from "bdsx/bds/commandorigin";
import { CommandOutput } from "bdsx/bds/command";
import { serverInstance } from "bdsx/bds/server";
import { Player } from "bdsx/bds/player";
import { jsonPlayer } from "../index";

import obj = require("./../config.json");

export const tpa = (
  param: { player: string },
  origin: CommandOrigin,
  output: CommandOutput
) => {
  // Get the player instance
  const player: Player = <Player>origin.getEntity();

  // Get the player's json
  serverInstance.getPlayers().forEach((destinyPlayer) => {
    // FInding the player
    if (
      destinyPlayer
        .getName()
        .toLowerCase()
        .startsWith(param.player.toLowerCase())
    ) {
      try {
        // Send the destiny player a message saying that the player is requesting a teleport.
        destinyPlayer.sendMessage(
          obj.tpa.sendMessage.replace("{player}", player.getName())
        );

        // Saving the player info in the json of the destiny player.
        jsonPlayer[destinyPlayer.getName()] = {
          tpa: player.getName(),
          ...jsonPlayer[destinyPlayer.getName()],
        };

        // Indicating the player that the request was sent.
        output.success(
          obj.tpa.successSend.replace("{player}", destinyPlayer.getName())
        );

        return;
      } catch (error) {
        output.error(obj.tpa.error);
      }
    }
  });
};

export const tpaccept = (
  param: { player: string },
  origin: CommandOrigin,
  output: CommandOutput
) => {
  // Get the player instance
  const player: Player = <Player>origin.getEntity();

  serverInstance.getPlayers().forEach((destinyPlayer) => {
    try {
      // FInding the player
      if (destinyPlayer.getName() === jsonPlayer[player.getName()].tpa) {
        destinyPlayer.sendMessage(
          obj.tpa.accepted.replace("{player}", player.getName())
        );

        // Teleporting the player to the player who requested the teleport.
        destinyPlayer.teleport(player.getPosition());
      }
    } catch (error) {
      console.log(error);
    }
  });
};
