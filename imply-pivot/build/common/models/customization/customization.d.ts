import { Instance } from 'immutable-class';
import { ExternalView, ExternalViewValue } from '../external-view/external-view';
export interface CustomizationValue {
    title?: string;
    headerBackground?: string;
    customLogoSvg?: string;
    externalViews?: ExternalView[];
}
export interface CustomizationJS {
    title?: string;
    headerBackground?: string;
    customLogoSvg?: string;
    externalViews?: ExternalViewValue[];
}
export declare class Customization implements Instance<CustomizationValue, CustomizationJS> {
    static isCustomization(candidate: any): candidate is Customization;
    static fromJS(parameters: CustomizationJS): Customization;
    title: string;
    headerBackground: string;
    customLogoSvg: string;
    externalViews: ExternalView[];
    constructor(parameters: CustomizationValue);
    valueOf(): CustomizationValue;
    toJS(): CustomizationJS;
    toJSON(): CustomizationJS;
    toString(): string;
    equals(other: Customization): boolean;
}
