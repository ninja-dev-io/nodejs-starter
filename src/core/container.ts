import { Container } from "inversify";
import TYPES from "./types"
import { Logger } from "./logger";
import "../controllers/users";

const container = new Container();
container.bind(TYPES.Logger).to(Logger).inSingletonScope();

export default container