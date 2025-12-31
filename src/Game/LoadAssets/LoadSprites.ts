import { CanvasController, type SpriteLibrary } from "sliver-engine";
import {
  createSpriteAnimation,
  createUIspriteAnimation,
  spriteSize,
} from "../Definitions/Sprites";

// Dynamically import all paid assets from the Paid/People directory
const people = import.meta.glob<string>(
  "../Assets/Paid/People/*.{png,jpg,jpeg,svg,gif}",
  { eager: true, query: "?url", import: "default" }
);

const ui = import.meta.glob<string>(
  "../Assets/Paid/UI/*.{png,jpg,jpeg,svg,gif}",
  { eager: true, query: "?url", import: "default" }
);

const getFileBaseName = (path: string) => {
  const fileName = path.split("/").pop() ?? path;
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? fileName : fileName.slice(0, dot);
};

const loadSprites = async (library: SpriteLibrary) => {
  const names = await Promise.all(
    Object.entries(people).map(async ([path, url]) => {
      const name = getFileBaseName(path);
      const assetUrl = new URL(url, window.location.origin);
      const [frameWidth, frameHeight] = spriteSize;

      if (path.toLowerCase().endsWith(".svg")) {
        await library.loadSvgSprite(name, assetUrl.toString());
        return name;
      }
      await library.loadSpriteSheet(name, assetUrl, frameWidth, frameHeight);

      return name;
    })
  );

  const _ui = await Promise.all(
    Object.entries(ui).map(async ([path, url]) => {
      const name = getFileBaseName(path);
      const sheetName = `ui:${name}`;
      const assetUrl = new URL(url, window.location.origin);
      const [frameWidth, frameHeight] = [64, 32];

      await library.loadSpriteSheet(
        sheetName,
        assetUrl,
        frameWidth,
        frameHeight
      );

      return sheetName;
    })
  );

  return [...names, ..._ui].reduce(
    (acc, name) => {
      if (name.startsWith("ui:")) {
        acc.ui[name] = createUIspriteAnimation(name);
      } else {
        acc.people[name] = createSpriteAnimation(name);
      }

      return acc;
    },
    {
      ui: {},
      people: {},
    } as {
      ui: Record<string, ReturnType<typeof createUIspriteAnimation>>;
      people: Record<string, ReturnType<typeof createSpriteAnimation>>;
    }
  );
};

const canvasController = new CanvasController(800, 600);
const spriteLibrary = canvasController.getSpriteLibrary();

export { spriteLibrary, canvasController, loadSprites };
