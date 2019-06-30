import { DoGood } from "./DoGood.js";
import { ApiThingRepository } from "./ThingRepository.js";

const thingRepository = new ApiThingRepository();

export const doGood = new DoGood(thingRepository);