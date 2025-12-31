import { Scene, SceneManager } from "sliver-engine";
import { startGameScene } from "./StartGame";

const createScenes = () => {
  return [{ startGameScene }, startGameScene] as const;
};

const createSceneManager = () => {
  const [scenes, initialScene] = createScenes();

  return new SceneManager(scenes, initialScene);
};

export { createSceneManager };
