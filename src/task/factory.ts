import {DoGoodApplication} from "./application";
import {MathRandomizer} from "./randomizer";
import {LocalJsonTaskGateway} from "./gateways/task_gateway";
import {InMemoryUserTaskGateway} from "./user_task_gateway";
import {ArrayColorGateway} from "./gateways/color_gateway";
import {ArrayEncouragementGateway} from "./gateways/encouragement_gateway";

const COLORS: string[] = [
  "#442B48",
  "#6320EE",
  "#D81E5B",
  "#F15152",
  "#66635B",
  "#A4036F",
  "#16DB93",
  "#F29E4C"
];

const ENCOURAGEMENTS: string[] = [
  "Great job! The world is a better place because of you.",
  "Solid work. Sometimes it’s the little things that save lives.",
  "Well done. You did a good thing!",
  "The hardest step is often the first one.",
  "Way to make a difference!",
  "Doing something good makes you feel good, too.",
  "One more good deed done!",
  "Lots of small things make one big thing."
];

export class DoGoodApplicationFactory {
  protected static instance: DoGoodApplication;

  static getInstance(): DoGoodApplication {
    if (!DoGoodApplicationFactory.instance) {
      const taskGateway = new LocalJsonTaskGateway(new MathRandomizer());
      const userTaskGateway = new InMemoryUserTaskGateway();
      const color_gateway = new ArrayColorGateway(COLORS, new MathRandomizer());
      const encouragement_gateway = new ArrayEncouragementGateway(ENCOURAGEMENTS, new MathRandomizer());
      DoGoodApplicationFactory.instance = new DoGoodApplication(taskGateway, userTaskGateway, color_gateway, encouragement_gateway);
    }

    return DoGoodApplicationFactory.instance;
  }
}
