import { FromSchema } from 'json-schema-to-ts';
import ReportSchema from '../../schemas/reports';

export type ReportDao = {
    id: string;
    name: string;
};

export type ReportDto = FromSchema<typeof ReportSchema>;
