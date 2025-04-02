"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Project_1 = __importDefault(require("./Project"));
const Partner_1 = __importDefault(require("./Partner"));
// 案件募集送信モデルクラス
let ProjectInvitation = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            tableName: 'project_invitations'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _projectId_decorators;
    let _projectId_initializers = [];
    let _projectId_extraInitializers = [];
    let _partnerId_decorators;
    let _partnerId_initializers = [];
    let _partnerId_extraInitializers = [];
    let _invitationDate_decorators;
    let _invitationDate_initializers = [];
    let _invitationDate_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _responseDate_decorators;
    let _responseDate_initializers = [];
    let _responseDate_extraInitializers = [];
    let _responseMessage_decorators;
    let _responseMessage_initializers = [];
    let _responseMessage_extraInitializers = [];
    let _responseDeadline_decorators;
    let _responseDeadline_initializers = [];
    let _responseDeadline_extraInitializers = [];
    let _remarks_decorators;
    let _remarks_initializers = [];
    let _remarks_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _project_decorators;
    let _project_initializers = [];
    let _project_extraInitializers = [];
    let _partner_decorators;
    let _partner_initializers = [];
    let _partner_extraInitializers = [];
    var ProjectInvitation = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.projectId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _projectId_initializers, void 0));
            this.partnerId = (__runInitializers(this, _projectId_extraInitializers), __runInitializers(this, _partnerId_initializers, void 0));
            this.invitationDate = (__runInitializers(this, _partnerId_extraInitializers), __runInitializers(this, _invitationDate_initializers, void 0));
            this.message = (__runInitializers(this, _invitationDate_extraInitializers), __runInitializers(this, _message_initializers, void 0));
            this.status = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.responseDate = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _responseDate_initializers, void 0));
            this.responseMessage = (__runInitializers(this, _responseDate_extraInitializers), __runInitializers(this, _responseMessage_initializers, void 0));
            this.responseDeadline = (__runInitializers(this, _responseMessage_extraInitializers), __runInitializers(this, _responseDeadline_initializers, void 0));
            this.remarks = (__runInitializers(this, _responseDeadline_extraInitializers), __runInitializers(this, _remarks_initializers, void 0));
            this.createdAt = (__runInitializers(this, _remarks_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            // リレーションシップ
            this.project = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _project_initializers, void 0));
            this.partner = (__runInitializers(this, _project_extraInitializers), __runInitializers(this, _partner_initializers, void 0));
            __runInitializers(this, _partner_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ProjectInvitation");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true
            })];
        _projectId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => Project_1.default), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false
            })];
        _partnerId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => Partner_1.default), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false
            })];
        _invitationDate_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
                allowNull: false,
                defaultValue: sequelize_typescript_1.DataType.NOW
            })];
        _message_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _status_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING(20),
                allowNull: false,
                defaultValue: '送信済'
            })];
        _responseDate_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
                allowNull: true
            })];
        _responseMessage_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _responseDeadline_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
                allowNull: true
            })];
        _remarks_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _createdAt_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
                allowNull: false,
                defaultValue: sequelize_typescript_1.DataType.NOW
            })];
        _updatedAt_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
                allowNull: false,
                defaultValue: sequelize_typescript_1.DataType.NOW
            })];
        _project_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => Project_1.default)];
        _partner_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => Partner_1.default)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _projectId_decorators, { kind: "field", name: "projectId", static: false, private: false, access: { has: obj => "projectId" in obj, get: obj => obj.projectId, set: (obj, value) => { obj.projectId = value; } }, metadata: _metadata }, _projectId_initializers, _projectId_extraInitializers);
        __esDecorate(null, null, _partnerId_decorators, { kind: "field", name: "partnerId", static: false, private: false, access: { has: obj => "partnerId" in obj, get: obj => obj.partnerId, set: (obj, value) => { obj.partnerId = value; } }, metadata: _metadata }, _partnerId_initializers, _partnerId_extraInitializers);
        __esDecorate(null, null, _invitationDate_decorators, { kind: "field", name: "invitationDate", static: false, private: false, access: { has: obj => "invitationDate" in obj, get: obj => obj.invitationDate, set: (obj, value) => { obj.invitationDate = value; } }, metadata: _metadata }, _invitationDate_initializers, _invitationDate_extraInitializers);
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _responseDate_decorators, { kind: "field", name: "responseDate", static: false, private: false, access: { has: obj => "responseDate" in obj, get: obj => obj.responseDate, set: (obj, value) => { obj.responseDate = value; } }, metadata: _metadata }, _responseDate_initializers, _responseDate_extraInitializers);
        __esDecorate(null, null, _responseMessage_decorators, { kind: "field", name: "responseMessage", static: false, private: false, access: { has: obj => "responseMessage" in obj, get: obj => obj.responseMessage, set: (obj, value) => { obj.responseMessage = value; } }, metadata: _metadata }, _responseMessage_initializers, _responseMessage_extraInitializers);
        __esDecorate(null, null, _responseDeadline_decorators, { kind: "field", name: "responseDeadline", static: false, private: false, access: { has: obj => "responseDeadline" in obj, get: obj => obj.responseDeadline, set: (obj, value) => { obj.responseDeadline = value; } }, metadata: _metadata }, _responseDeadline_initializers, _responseDeadline_extraInitializers);
        __esDecorate(null, null, _remarks_decorators, { kind: "field", name: "remarks", static: false, private: false, access: { has: obj => "remarks" in obj, get: obj => obj.remarks, set: (obj, value) => { obj.remarks = value; } }, metadata: _metadata }, _remarks_initializers, _remarks_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _project_decorators, { kind: "field", name: "project", static: false, private: false, access: { has: obj => "project" in obj, get: obj => obj.project, set: (obj, value) => { obj.project = value; } }, metadata: _metadata }, _project_initializers, _project_extraInitializers);
        __esDecorate(null, null, _partner_decorators, { kind: "field", name: "partner", static: false, private: false, access: { has: obj => "partner" in obj, get: obj => obj.partner, set: (obj, value) => { obj.partner = value; } }, metadata: _metadata }, _partner_initializers, _partner_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectInvitation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectInvitation = _classThis;
})();
exports.default = ProjectInvitation;
