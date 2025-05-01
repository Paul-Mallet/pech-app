import { lightTheme, poppinsFont } from '../../styles/base/Themes.tsx';

type ThemeType = typeof lightTheme;

type FontType = typeof poppinsFont;

export interface ThemeContextType {
    theme: ThemeType;
    setSelectedTheme: (themeName: string) => void;
    selectedTheme: string;
    setThemeByName: (themeName: string) => void;
    font: FontType;
    setFontByName: (fontName: string) => void;
    selectedFont: string;
    setSelectedFont: (fontName: string) => void;
};