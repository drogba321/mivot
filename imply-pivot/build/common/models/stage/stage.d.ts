import * as React from 'react';
import { Instance } from 'immutable-class';
export interface MarginParameters {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}
export interface StageValue {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface StageJS {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class Stage implements Instance<StageValue, StageJS> {
    static isStage(candidate: any): candidate is Stage;
    static fromJS(parameters: StageJS): Stage;
    static fromClientRect(rect: ClientRect): Stage;
    static fromSize(width: number, height: number): Stage;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(parameters: StageValue);
    valueOf(): StageValue;
    toJS(): StageJS;
    toJSON(): StageJS;
    private sizeOnlyValue();
    toString(): string;
    equals(other: Stage): boolean;
    getTransform(): string;
    getViewBox(): string;
    getLeftTop(): React.CSSProperties;
    getWidthHeight(): React.CSSProperties;
    getLeftTopWidthHeight(): React.CSSProperties;
    within(param: MarginParameters): Stage;
}
