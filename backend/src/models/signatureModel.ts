import mongoose from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose) as any;
const signatureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectName: { type: String, required: true },
    submittedBy: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    suricata: {
        action: { type: String, required: true },
        protocol: { type: String, required: true },
        source: {
            ip: { type: String, required: true },
            port: { type: Number, required: true },
            region: { type: String, default: null },
            latitude: { type: Number, default: null },
            longitude: { type: Number, default: null },
        },
        destination: {
            ip: { type: String, required: true },
            port: { type: Number, required: true },
            region: { type: String, default: null },
            latitude: { type: Number, default: null },
            longitude: { type: Number, default: null },
        },
        conditions: {
            content: { type: String, required: true },
            threshold: { type: Number, default: null },
        },
    },
    metadata: {
        tags: [String],
        priority: { type: Number, default: 3 },
    },
    deployment: {
        status: { type: String },
        date: { type: Date, default: null },
        deployedBy: { type: String, default: null },
    },
    tracking: {
        triggerFrequency: { type: Number, default: 0 },
        lastModifiedDate: { type: Date, default: Date.now },
    },
});

signatureSchema.plugin(AutoIncrement, { inc_field: 'id' });
export default mongoose.model('Signature', signatureSchema);