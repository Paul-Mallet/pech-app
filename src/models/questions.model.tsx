import BodyTypeModel from "./bodyType.model.tsx";
import EyeModel from "./eye.model.tsx";
import FinModel from "./fins.model.tsx";

export type FinGroup = {
    type: string;
    fin: FinModel; // single fin, not an array
}

export type FinsIds = {
    type : string,
    ids : number[]
}

export default class QuestionModel
{
    constructor(
        public bodyType : BodyTypeModel[],
        public fins : FinGroup[],
        public eye : EyeModel[],
        public finsIds : FinsIds[]
    ) {}
    toFlatListData() {
        return [
          {
            type: 'Morphologie',
            field: 'bodyType',
            reponses: this.bodyType.map(item => ({
              label: item.name,           // Replace `name` with actual field
              parameter: item.parameter          // Replace with relevant identifier
            }))
          },
          ...this.fins.map(group => ({
            type: "Nageoire " + group.type,
            field: 'fins',
            reponses: [{
              label: group.fin.label,
              parameter: group.fin.parameter
            }],
            groupLabel: group.type
          })),
          {
            type: 'Yeux',
            field: 'eye',
            reponses: this.eye.map(item => ({
              label: item.color + " " + item.position,
              parameter: item.parameter
            }))
          },
        ];
      }
      
}