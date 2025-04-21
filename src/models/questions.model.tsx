import BodyTypeModel from "./bodyType.model.tsx";
import EyeModel from "./eye.model.tsx";
import FinModel from "./fins.model.tsx";

export type FinGroup = {
    type : string,
    fin : FinModel[]
}

export default class QuestionModel
{
    constructor(
        public bodyType : BodyTypeModel[],
        public fins : FinGroup[],
        public eye : EyeModel[]
    ) {}
}