import { Scene, Vector } from "sliver-engine";
import { LamenEmpireButton } from "../../GameObjects";

const startGameScene = new Scene("StartGame", "rgba(255,255,255,1)");

startGameScene.addGameObject(
  new LamenEmpireButton(new Vector(400, 300), "Start", 4, () =>
    console.log("Start Game")
  )
);

export { startGameScene };
