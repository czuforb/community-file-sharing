import { mergeTypeDefs } from "@graphql-tools/merge";
import { costumTypes } from "./costumTypes";
import { inputTypes } from "./inputTypes";
import { mutationTypes } from "./mutationTypes";
import { queryTypes } from "./queryTypes";

const types = [inputTypes, mutationTypes, queryTypes, costumTypes];
const mergedTypes = mergeTypeDefs(types);

export default mergedTypes;
