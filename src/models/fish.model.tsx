import EyeModel from "./eye.model.tsx";
import FinModel from "./fins.model.tsx";
import BodyTypeModel from "./bodyType.model.tsx";

export interface Fish {
	scientificName: string;
	minSizeCm: string;
	englishAcronym: string;
	physicalDescription: 
    {
        WRF: string;
        moreInfos: string;
    }
    additionalImages: Array<{
        id: number;
        url: string;
    }>;
    id: number;
    name: string;
    img: string;
    bodyType: {
        id: number;
        name: string;
        description: string;
    };
    fins: Array<{
        id: number;
        type: string;
        shape: string;
        color: string;
        size: string;
    }>;
    eyes: Array<{
        id: number;
        color: string;
        size: string;
        position: string;
    }>;
}

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

export type FishListContext = {
  fishList : FishList;
  setFishList : (newFishList : FishList) => void;
};

export type DescriptionSheetProps = {
	fish: Fish;
	onClose: () => void;
};

export interface SliderProps {
	images: string[];
};