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
const Member_1 = __importDefault(require("./Member"));
const Project_1 = __importDefault(require("./Project"));
const Partner_1 = __importDefault(require("./Partner"));
// 応募モデルクラス
let Application = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            tableName: 'applications'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _memberId_decorators;
    let _memberId_initializers = [];
    let _memberId_extraInitializers = [];
    let _projectId_decorators;
    let _projectId_initializers = [];
    let _projectId_extraInitializers = [];
    let _applicantName_decorators;
    let _applicantName_initializers = [];
    let _applicantName_extraInitializers = [];
    let _partnerId_decorators;
    let _partnerId_initializers = [];
    let _partnerId_extraInitializers = [];
    let _skills_decorators;
    let _skills_initializers = [];
    let _skills_extraInitializers = [];
    let _rate_decorators;
    let _rate_initializers = [];
    let _rate_extraInitializers = [];
    let _applicationDate_decorators;
    let _applicationDate_initializers = [];
    let _applicationDate_extraInitializers = [];
    let _coverLetter_decorators;
    let _coverLetter_initializers = [];
    let _coverLetter_extraInitializers = [];
    let _resumeUrl_decorators;
    let _resumeUrl_initializers = [];
    let _resumeUrl_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    let _interviewDate_decorators;
    let _interviewDate_initializers = [];
    let _interviewDate_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _member_decorators;
    let _member_initializers = [];
    let _member_extraInitializers = [];
    let _project_decorators;
    let _project_initializers = [];
    let _project_extraInitializers = [];
    let _partner_decorators;
    let _partner_initializers = [];
    let _partner_extraInitializers = [];
    var Application = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.memberId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _memberId_initializers, void 0));
            this.projectId = (__runInitializers(this, _memberId_extraInitializers), __runInitializers(this, _projectId_initializers, void 0));
            this.applicantName = (__runInitializers(this, _projectId_extraInitializers), __runInitializers(this, _applicantName_initializers, void 0));
            this.partnerId = (__runInitializers(this, _applicantName_extraInitializers), __runInitializers(this, _partnerId_initializers, void 0));
            this.skills = (__runInitializers(this, _partnerId_extraInitializers), __runInitializers(this, _skills_initializers, void 0));
            this.rate = (__runInitializers(this, _skills_extraInitializers), __runInitializers(this, _rate_initializers, void 0));
            this.applicationDate = (__runInitializers(this, _rate_extraInitializers), __runInitializers(this, _applicationDate_initializers, void 0));
            this.coverLetter = (__runInitializers(this, _applicationDate_extraInitializers), __runInitializers(this, _coverLetter_initializers, void 0));
            this.resumeUrl = (__runInitializers(this, _coverLetter_extraInitializers), __runInitializers(this, _resumeUrl_initializers, void 0));
            this.status = (__runInitializers(this, _resumeUrl_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.notes = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.interviewDate = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _interviewDate_initializers, void 0));
            this.createdAt = (__runInitializers(this, _interviewDate_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            // リレーションシップ
            this.member = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _member_initializers, void 0));
            this.project = (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _project_initializers, void 0));
            this.partner = (__runInitializers(this, _project_extraInitializers), __runInitializers(this, _partner_initializers, void 0));
            __runInitializers(this, _partner_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Application");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true
            })];
        _memberId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => Member_1.default), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false
            })];
        _projectId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => Project_1.default), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false
            })];
        _applicantName_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING(100),
                allowNull: false
            })];
        _partnerId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => Partner_1.default), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false
            })];
        _skills_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _rate_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: true
            })];
        _applicationDate_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
                allowNull: false,
                defaultValue: sequelize_typescript_1.DataType.NOW
            })];
        _coverLetter_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _resumeUrl_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _status_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING(20),
                allowNull: false,
                defaultValue: '審査中'
            })];
        _notes_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _interviewDate_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATE,
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
        _member_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => Member_1.default)];
        _project_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => Project_1.default)];
        _partner_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => Partner_1.default)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _memberId_decorators, { kind: "field", name: "memberId", static: false, private: false, access: { has: obj => "memberId" in obj, get: obj => obj.memberId, set: (obj, value) => { obj.memberId = value; } }, metadata: _metadata }, _memberId_initializers, _memberId_extraInitializers);
        __esDecorate(null, null, _projectId_decorators, { kind: "field", name: "projectId", static: false, private: false, access: { has: obj => "projectId" in obj, get: obj => obj.projectId, set: (obj, value) => { obj.projectId = value; } }, metadata: _metadata }, _projectId_initializers, _projectId_extraInitializers);
        __esDecorate(null, null, _applicantName_decorators, { kind: "field", name: "applicantName", static: false, private: false, access: { has: obj => "applicantName" in obj, get: obj => obj.applicantName, set: (obj, value) => { obj.applicantName = value; } }, metadata: _metadata }, _applicantName_initializers, _applicantName_extraInitializers);
        __esDecorate(null, null, _partnerId_decorators, { kind: "field", name: "partnerId", static: false, private: false, access: { has: obj => "partnerId" in obj, get: obj => obj.partnerId, set: (obj, value) => { obj.partnerId = value; } }, metadata: _metadata }, _partnerId_initializers, _partnerId_extraInitializers);
        __esDecorate(null, null, _skills_decorators, { kind: "field", name: "skills", static: false, private: false, access: { has: obj => "skills" in obj, get: obj => obj.skills, set: (obj, value) => { obj.skills = value; } }, metadata: _metadata }, _skills_initializers, _skills_extraInitializers);
        __esDecorate(null, null, _rate_decorators, { kind: "field", name: "rate", static: false, private: false, access: { has: obj => "rate" in obj, get: obj => obj.rate, set: (obj, value) => { obj.rate = value; } }, metadata: _metadata }, _rate_initializers, _rate_extraInitializers);
        __esDecorate(null, null, _applicationDate_decorators, { kind: "field", name: "applicationDate", static: false, private: false, access: { has: obj => "applicationDate" in obj, get: obj => obj.applicationDate, set: (obj, value) => { obj.applicationDate = value; } }, metadata: _metadata }, _applicationDate_initializers, _applicationDate_extraInitializers);
        __esDecorate(null, null, _coverLetter_decorators, { kind: "field", name: "coverLetter", static: false, private: false, access: { has: obj => "coverLetter" in obj, get: obj => obj.coverLetter, set: (obj, value) => { obj.coverLetter = value; } }, metadata: _metadata }, _coverLetter_initializers, _coverLetter_extraInitializers);
        __esDecorate(null, null, _resumeUrl_decorators, { kind: "field", name: "resumeUrl", static: false, private: false, access: { has: obj => "resumeUrl" in obj, get: obj => obj.resumeUrl, set: (obj, value) => { obj.resumeUrl = value; } }, metadata: _metadata }, _resumeUrl_initializers, _resumeUrl_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _interviewDate_decorators, { kind: "field", name: "interviewDate", static: false, private: false, access: { has: obj => "interviewDate" in obj, get: obj => obj.interviewDate, set: (obj, value) => { obj.interviewDate = value; } }, metadata: _metadata }, _interviewDate_initializers, _interviewDate_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _member_decorators, { kind: "field", name: "member", static: false, private: false, access: { has: obj => "member" in obj, get: obj => obj.member, set: (obj, value) => { obj.member = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
        __esDecorate(null, null, _project_decorators, { kind: "field", name: "project", static: false, private: false, access: { has: obj => "project" in obj, get: obj => obj.project, set: (obj, value) => { obj.project = value; } }, metadata: _metadata }, _project_initializers, _project_extraInitializers);
        __esDecorate(null, null, _partner_decorators, { kind: "field", name: "partner", static: false, private: false, access: { has: obj => "partner" in obj, get: obj => obj.partner, set: (obj, value) => { obj.partner = value; } }, metadata: _metadata }, _partner_initializers, _partner_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Application = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Application = _classThis;
})();
exports.default = Application;
