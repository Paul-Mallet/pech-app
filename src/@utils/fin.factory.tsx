import FinModel from "../models/fins.model.tsx";

export default class FinFactory {
    public static responseToModel(response : any) : FinModel {
        return new FinModel(
            response.id,
            response.type,
            response.shape,
            response.color,
            response.size
        )
    }
}