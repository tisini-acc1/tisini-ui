export default function shuffleItems<T extends any>(items:Array<T>):T[] {
    return items.sort(() => Math.random() - 0.5);
  }