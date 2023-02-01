interface IPerformanceStats {
    value: number;
    max: number;
}

export interface MintcapCreaturesOut {
    name: string;
    type: string;
    boostAcceleration: IPerformanceStats;
    acceleration: IPerformanceStats;
    boostTime: IPerformanceStats;
    speed: IPerformanceStats;
    fuel: number;
    boost: number;
    heart: number;
    lungs: number;
    muscles: number;
}
