export default class FinModel {
    constructor(
        public id : number,
        public type : string, 
        public shape : string, 
        public color : string, 
        public size : string, 
        public label?: string,
        public parameter?: string,
    ) {}
}