import { DruidRequestDecorator } from 'plywood-druid-requester';
import { DataSource, DataSourceJS, LinkViewConfigJS, Customization } from '../common/models/index';
import { DataSourceManager, SourceListScan } from './utils/index';
export interface ServerConfig {
    iframe?: "allow" | "deny";
}
export interface PivotConfig {
    port?: number;
    verbose?: boolean;
    brokerHost?: string;
    druidHost?: string;
    timeout?: number;
    introspectionStrategy?: string;
    pageMustLoadTimeout?: number;
    sourceListScan?: SourceListScan;
    sourceListRefreshOnLoad?: boolean;
    sourceListRefreshInterval?: number;
    sourceReintrospectOnLoad?: boolean;
    sourceReintrospectInterval?: number;
    auth?: string;
    druidRequestDecorator?: string;
    dataSources?: DataSourceJS[];
    linkViewConfig?: LinkViewConfigJS;
    serverConfig?: ServerConfig;
    customization?: Customization;
}
export interface RequestDecoratorFactoryOptions {
    config: any;
}
export interface DruidRequestDecoratorModule {
    druidRequestDecorator: (log: (line: string) => void, options: RequestDecoratorFactoryOptions) => DruidRequestDecorator;
}
export declare const VERSION: any;
export declare const PRINT_CONFIG: boolean;
export declare const START_SERVER: boolean;
export declare const VERBOSE: boolean;
export declare const PORT: number;
export declare const DRUID_HOST: any;
export declare const TIMEOUT: number;
export declare const INTROSPECTION_STRATEGY: string;
export declare const PAGE_MUST_LOAD_TIMEOUT: number;
export declare const SOURCE_LIST_SCAN: SourceListScan;
export declare const SOURCE_LIST_REFRESH_ON_LOAD: boolean;
export declare const SOURCE_LIST_REFRESH_INTERVAL: number;
export declare const SOURCE_REINTROSPECT_ON_LOAD: boolean;
export declare const SOURCE_REINTROSPECT_INTERVAL: number;
export declare const AUTH: any;
export declare const DRUID_REQUEST_DECORATOR: DruidRequestDecoratorModule;
export declare const DATA_SOURCES: DataSource[];
export declare const LINK_VIEW_CONFIG: LinkViewConfigJS;
export declare const SERVER_CONFIG: ServerConfig;
export declare const CUSTOMIZATION: Customization;
export declare const DATA_SOURCE_MANAGER: DataSourceManager;
