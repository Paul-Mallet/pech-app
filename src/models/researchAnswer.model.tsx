export default class ResearchAnswerModel {
    bodyType: number;
    fin: number[];
    eye: number;

    constructor(bodyType: number, fin: number[], eye: number) {
        this.bodyType = bodyType;
        this.fin = fin;
        this.eye = eye;
    }
}