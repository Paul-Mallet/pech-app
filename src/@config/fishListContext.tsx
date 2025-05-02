import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllFish } from "../services/fish.service.tsx";
import { FishList, FishListContextProps } from "../models/fish.model.tsx";

const FishListContext = createContext<FishListContextProps | undefined>(undefined);

export const FishListProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
    const [fishList , setFishList] = useState<FishList>([]);

    useEffect(() => {
        const getFish = async () => {
            const response = await getAllFish();
            setFishList(response);
        }
        getFish();
    }, []);

    return (
        <FishListContext.Provider value={{fishList, setFishList}}>
            {children}
        </FishListContext.Provider>
    )
}
export const useFishList = (): FishListContextProps => {
    const context = useContext(FishListContext);
    if (!context) {
      throw new Error("useFishList must be used within a FishListProvider");
    }
    return context;
};