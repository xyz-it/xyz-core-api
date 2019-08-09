import "reflect-metadata";
import { Container } from "inversify";
import {ModelAdapter} from "./underlying/connectors/model-adapter";
// import SERVICE_IDENTIFIER, {TAG} from "./underlying/connectors/identifiers";
// import {ConsolidationCompanyRfcAdapter} from "./underlying/connectors/setup/consolidation-company-rfc-adapter";
// import {ConsolidationCompany} from "./setup/organizational-structure/consolidation-company";

const container = new Container();
// container.bind<Warrior>(TYPES.Warrior).to(Ninja);
// container.bind<Weapon>(TYPES.Weapon).to(Katana);
// container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

// container.bind<ModelAdapter<any>>("ModelAdapter").to(ConsolidationCompanyRfcAdapter).whenTargetNamed("ConsolidationCompany");


export { container };
