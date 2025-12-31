import { SceneManager } from "sliver-engine";
import { startGameScene } from "./StartGame/GameObjects";
import { introScene } from "./IntroCutscene";

const createScenes = () => {
  return [{ startGameScene, introScene }, startGameScene] as const;
};

const createSceneManager = () => {
  const [scenes, initialScene] = createScenes();

  return new SceneManager(scenes, initialScene);
};

export { createSceneManager };
