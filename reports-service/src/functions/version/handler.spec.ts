import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';

import { middyfy } from '@libs/middyfy';

jest.mock('@libs/middyfy');

describe('version', () => {
    let main;
    let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

    beforeAll(async () => {
        mockedMiddyfy = mocked(middyfy);
        mockedMiddyfy.mockImplementation((handler: Handler) => {
            return handler as never;
        });
        main = (await import('./handler')).main;
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('should return version object', async () => {
        const event = {
            body: { }
        };
        process.env.GIT_VERSION = 'd0ce0a4a6d4b94477d887524f0438e6fbccc9ca5';
        process.env.DEPLOY_DATE = '2021-05-15T10:40:42.079Z';
        const actual = await main(event);
        expect(actual.statusCode).toBe(200);
        const body = JSON.parse(actual.body);
        expect(body.githash).toBe('d0ce0a4a6d4b94477d887524f0438e6fbccc9ca5');
        expect(body.deployDate).toBe('2021-05-15T10:40:42.079Z');
    });
});
