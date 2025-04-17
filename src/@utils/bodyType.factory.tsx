import BodyTypeModel from "../models/bodyType.model.tsx"

export default class BodyTypeFactory
{
    public static responseToModel(response : any) : BodyTypeModel {
        return new BodyTypeModel(
            response.id,
            response.name,
            response.description
        );
    }
};