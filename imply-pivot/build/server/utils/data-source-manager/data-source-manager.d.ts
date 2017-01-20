import * as Q from 'q';
import { DataSource } from '../../../common/models/index';
export declare type SourceListScan = "disable" | "auto";
export interface DataSourceLoader {
    (dataSource: DataSource): Q.Promise<DataSource>;
}
export interface DataSourceManagerOptions {
    dataSources?: DataSource[];
    dataSourceStubFactory?: (source: string) => DataSource;
    dataSourceLoader?: DataSourceLoader;
    druidRequester?: Requester.PlywoodRequester<any>;
    pageMustLoadTimeout?: number;
    sourceListScan?: SourceListScan;
    sourceListRefreshOnLoad?: boolean;
    sourceListRefreshInterval?: number;
    sourceReintrospectOnLoad?: boolean;
    sourceReintrospectInterval?: number;
    log?: Function;
}
export interface DataSourceManager {
    getDataSources: () => Q.Promise<DataSource[]>;
    getQueryableDataSources: () => Q.Promise<DataSource[]>;
    getQueryableDataSource: (name: string) => Q.Promise<DataSource>;
}
export declare function dataSourceManagerFactory(options: DataSourceManagerOptions): DataSourceManager;
