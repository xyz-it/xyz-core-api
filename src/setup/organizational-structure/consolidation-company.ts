import {inject, named} from "inversify";
import { SERVICE_IDENTIFIER, TAG } from "../../underlying/connectors/identifiers";
import {ModelAdapter} from "../../underlying/connectors/model-adapter";

export class ConsolidationCompany {
  @inject(SERVICE_IDENTIFIER.MODEL_ADAPTER) @named(TAG.CONSOLIDATION_COMPANY) private adapter: ModelAdapter<ConsolidationCompany>;
}
