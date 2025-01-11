import request from 'supertest';
import app from '../app';
import { connectTestDB, disconnectTestDB } from './testDB';

beforeAll(async () => {
    await connectTestDB(); // Connect to in-memory database
});

afterAll(async () => {
    await disconnectTestDB(); // Disconnect and clean up
});

describe('POST /api/signatures', () => {
    it('should create a new signature with valid data', async () => {
        const newSignature = {
            name: "Test Signature",
            description: "A description for testing",
            projectName: "Test Project",
            submittedBy: "Admin",
            suricata: {
                action: "alert",
                protocol: "TCP",
                source: {
                    ip: "192.168.1.1",
                    port: 80
                },
                destination: {
                    ip: "8.8.8.8",
                    port: 443
                },
                conditions: {
                    content: "malicious_string"
                }
            },
            metadata: {
                tags: ["test", "malware"]
            }
        };

        const response = await request(app)
            .post('/api/signatures')
            .send(newSignature);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newSignature.name);
    });

    it('should return a 400 error if required fields are missing', async () => {
        const invalidSignature = {};

        const response = await request(app)
            .post('/api/signatures')
            .send(invalidSignature);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Validation Failed');
    });
});