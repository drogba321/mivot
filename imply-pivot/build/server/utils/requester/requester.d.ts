import { DruidRequestDecorator } from 'plywood-druid-requester';
export interface ProperDruidRequesterOptions {
    druidHost?: string;
    retry?: number;
    timeout?: number;
    verbose?: boolean;
    concurrentLimit?: number;
    requestDecorator?: DruidRequestDecorator;
}
export declare function properDruidRequesterFactory(options: ProperDruidRequesterOptions): Requester.PlywoodRequester<any>;
