import * as Q from 'q';
import { DataSource } from '../../../common/models/index';
export declare function getFileData(filePath: string): Q.Promise<any[]>;
export declare function dataSourceLoaderFactory(druidRequester: Requester.PlywoodRequester<any>, configDirectory: string, timeout: number, introspectionStrategy: string): (dataSource: DataSource) => Q.Promise<DataSource>;
