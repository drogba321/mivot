import { AttributeInfo } from 'plywood';
import { DataSource, Dimension, Measure } from '../../../common/models/index';
export declare function attributeToYAML(attribute: AttributeInfo): string[];
export declare function dimensionToYAML(dimension: Dimension): string[];
export declare function measureToYAML(measure: Measure): string[];
export declare function dataSourceToYAML(dataSource: DataSource, withComments: boolean): string[];
