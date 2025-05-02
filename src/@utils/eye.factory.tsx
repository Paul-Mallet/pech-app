import { EyeModel } from "../models/fish.model.tsx";

export default class EyeFactory {
    public static responseToModel(response : any) : EyeModel {
        return new EyeModel (
            response.id,
            response.color,
            response.size,
            response.position,
            response.parameter
        )
    }
}