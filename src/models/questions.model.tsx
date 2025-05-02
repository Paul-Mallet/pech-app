import { BodyTypeModel, EyeModel, FinModel } from "./fish.model.tsx";

export type FinGroup = {
    type: string;
    fin: FinModel[];
}

export type FinsIds = {
    type : string;
    ids : number[];
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
        type: 'Corps',
        field: 'bodyType',
        reponses: this.bodyType.map(item => ({
          label: item.name,
          type: 'bodyType',
          id: item.id,
          parameter: item.parameter
        }))
      },
      ...this.fins.map(group => ({
        type: "Nageoire " + group.type,
        field: 'fins',
        reponses: group.fin.map(fin => ({
          label: fin.shape ?? '',
          type: 'fins',
          id: fin.id ?? 0,
          parameter: fin.shape ?? ''
        })),
        groupLabel: group.type
      })),
      {
        type: 'Yeux',
        field: 'eye',
        reponses: this.eye.map(item => ({
          label: item.color + " " + item.position,
          type: 'eye',
          id: item.id,
          parameter: item.parameter
        }))
      },
    ];
  }
}