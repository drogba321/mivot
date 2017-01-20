import { Dimension, FilterClause, Essence } from '../../models/index';
export interface Formatter {
    (n: number): string;
}
export declare function getMiddleNumber(values: number[]): number;
export declare function formatterFromData(values: number[], format: string): Formatter;
export interface LabelFormatOptions {
    dimension: Dimension;
    clause: FilterClause;
    essence: Essence;
    verbose?: boolean;
}
export declare function formatLabel(options: LabelFormatOptions): string;
