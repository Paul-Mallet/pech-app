import EyeModel from "../models/eye.model.tsx";

export default class EyeFactory {
    public static responseToModel(response : any) : EyeModel {
        return new EyeModel (
            response.id,
            response.color,
            response.size,
            response.position
        )
    }
}