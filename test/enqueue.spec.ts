import ava, { before } from "ava";
import { Corinth } from "../src/corinth";
import { getIp } from "./common";
import { setupCorinth } from "./run_corinth";

before(setupCorinth);

const corinth = new Corinth(getIp());

ava.serial("Enqueue item", async (t) => {
  const queue = await corinth.createQueue<{ name: string }>("queue0", {
    persistent: false,
  });
  {
    const { size, persistent } = await queue.stat();
    t.is(size, 0);
    t.assert(!persistent);
  }
  const result = await queue.enqueueOne({
    name: "test",
  });
  t.is(result.items.length, 1);
  {
    const { size } = await queue.stat();
    t.is(size, 1);
  }
});
