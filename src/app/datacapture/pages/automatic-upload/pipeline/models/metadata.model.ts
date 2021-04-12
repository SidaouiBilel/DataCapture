export interface PipelineMetadata {
    pipeline_id: string;
    name: string;
    description: string;
    scheduler?: string;
    start_date?: Date;

}
