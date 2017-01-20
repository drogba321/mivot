import { List } from 'immutable';
import { Equalable } from 'immutable-class';
export interface Fn {
    (): void;
}
export declare function hasOwnProperty(obj: any, key: string | number): boolean;
export declare function moveInList<T>(list: List<T>, itemIndex: number, insertPoint: number): List<T>;
export declare function makeTitle(name: string): string;
export declare function immutableListsEqual<T extends Equalable>(listA: List<T>, listB: List<T>): boolean;
export declare function collect(wait: number, fn: Fn): Fn;
export declare function makeUrlSafeName(name: string): string;
export declare function verifyUrlSafeName(name: string): void;
export declare function arraySum(inputArray: number[]): number;
