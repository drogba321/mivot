import { List } from 'immutable';
import { Instance } from 'immutable-class';
import { Expression, ExpressionJS } from 'plywood';
export interface DimensionValue {
    name: string;
    title?: string;
    expression?: Expression;
    kind?: string;
    url?: string;
}
export interface DimensionJS {
    name: string;
    title?: string;
    expression?: ExpressionJS | string;
    kind?: string;
    url?: string;
}
export declare class Dimension implements Instance<DimensionValue, DimensionJS> {
    static isDimension(candidate: any): candidate is Dimension;
    static getDimension(dimensions: List<Dimension>, dimensionName: string): Dimension;
    static getDimensionByExpression(dimensions: List<Dimension>, expression: Expression): Dimension;
    static fromJS(parameters: DimensionJS): Dimension;
    name: string;
    title: string;
    expression: Expression;
    kind: string;
    className: string;
    url: string;
    constructor(parameters: DimensionValue);
    valueOf(): DimensionValue;
    toJS(): DimensionJS;
    toJSON(): DimensionJS;
    toString(): string;
    equals(other: Dimension): boolean;
}
