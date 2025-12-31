import "./style.css";
import "./Game/Definitions/Sprites";
import { RamenEmpireGame } from "./Game";
import { loadEverything } from "./Game/LoadAssets";
import { canvasController } from "./Game/LoadAssets/LoadSprites";
import { soundLibrary } from "./Game/LoadAssets/LoadSounds";
import { createSceneManager } from "./Game/Scenes";

type AssetDefinitions = Awaited<ReturnType<typeof loadEverything>>;

declare global {
  interface Window {
    game: RamenEmpireGame;
    definitions: AssetDefinitions;
  }
}

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app root element");

const createGame = async () => {
  const definitions = await loadEverything();
  window.definitions = definitions;

  const game = new RamenEmpireGame({
    canvas: canvasController,
    soundManager: soundLibrary,
    scenes: createSceneManager(),
  });

  window.game = game;
  game.start();

  return game;
};

createGame().then(async (game) => {
  console.log("Game started:", game);
});
