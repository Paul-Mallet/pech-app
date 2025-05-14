export interface Fish {
    id: number;
    name: string;
	scientificName: string;
	minSizeCm: string;
	faoCode: string;
	physicalDescription: string;
    particularity: string;
    mouth: 
    {
        id: number;
        forme: string;
    }
    bodyType: {
        id: number;
        name: string;
    };
    fins: Array<{
        id: number;
        type: string;
        shape: string;
        color: string;
        size: string;
    }>;
    eyes: {
        id: number;
        forme: string;
        size: string;
        position: string;
    };
    img: string;
    additionalImages: Array<{
        id: number;
        url: string;
    }>;
    probability?: number;
}

export class BodyTypeModel {
    constructor(
        public id : number,
        public name : string,
        public description : string,
        public parameter : string
    ) {}
};

export class EyeModel {
    constructor (
        public id : number,
        public color : string,
        public size : string,
        public position : string,
        public parameter : string
    ) {}
};

export class FinModel {
    constructor(
        public id : number,
        public type : string, 
        public shape : string, 
        public color : string, 
        public size : string, 
        public label?: string,
        public parameter?: string,
    ) {}
};

export class FishModel {
    constructor(
        id : number,
        name : string,
        img : string,
        bodyType : BodyTypeModel,
        fins : FinModel[],
        eyes : EyeModel
    ) {}
};

export type FishList = FishModel[];

export type FishListContextProps = {
  fishList : FishList;
  setFishList : (newFishList : FishList) => void;
};

export type DescriptionSheetProps = {
	fish: Fish | null;
	onClose: () => void;
};

export interface SliderProps {
	images: string[];
};