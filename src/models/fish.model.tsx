import EyeModel from "./eye.model.tsx";
import FinModel from "./fins.model.tsx";
import BodyTypeModel from "./bodyType.model.tsx";

export default class FishModel {
    constructor(
        id : number,
        name : string,
        img : string,
        bodyType : BodyTypeModel,
        fins : FinModel[],
        eyes : EyeModel
    ) {}
}