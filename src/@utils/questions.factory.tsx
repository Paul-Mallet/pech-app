import QuestionModel, { FinGroup } from "../models/questions.model.tsx";
import BodyTypeModel from "../models/bodyType.model.tsx";
import FinModel from "../models/fins.model.tsx";
import EyeModel from "../models/eye.model.tsx";

export default class QuestionsFactory
{
    public static RequestToModel(bodyType : BodyTypeModel, fins : FinModel[], eye : EyeModel) : QuestionModel
    {
        const map = new Map<string, FinModel[]>();

        fins.forEach((fin) => {
            if (!map.has(fin.type))
                map.set(fin.type, []);
            map.get(fin.type)!.push(fin);
        })

        const groupedFins : FinGroup[] = [];

        map.forEach((fin, type) => {
            groupedFins.push({type, fin : fin});
        })

        return new QuestionModel(bodyType, groupedFins, eye);
    }
}