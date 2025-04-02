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
const User_1 = __importDefault(require("./User"));
// 要員評価モデルクラス
let MemberEvaluation = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            tableName: 'member_evaluations'
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
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _evaluationDate_decorators;
    let _evaluationDate_initializers = [];
    let _evaluationDate_extraInitializers = [];
    let _projectName_decorators;
    let _projectName_initializers = [];
    let _projectName_extraInitializers = [];
    let _technicalSkill_decorators;
    let _technicalSkill_initializers = [];
    let _technicalSkill_extraInitializers = [];
    let _communicationSkill_decorators;
    let _communicationSkill_initializers = [];
    let _communicationSkill_extraInitializers = [];
    let _teamworkSkill_decorators;
    let _teamworkSkill_initializers = [];
    let _teamworkSkill_extraInitializers = [];
    let _leadershipSkill_decorators;
    let _leadershipSkill_initializers = [];
    let _leadershipSkill_extraInitializers = [];
    let _overallRating_decorators;
    let _overallRating_initializers = [];
    let _overallRating_extraInitializers = [];
    let _strengths_decorators;
    let _strengths_initializers = [];
    let _strengths_extraInitializers = [];
    let _weaknesses_decorators;
    let _weaknesses_initializers = [];
    let _weaknesses_extraInitializers = [];
    let _comments_decorators;
    let _comments_initializers = [];
    let _comments_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _member_decorators;
    let _member_initializers = [];
    let _member_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    var MemberEvaluation = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.memberId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _memberId_initializers, void 0));
            this.userId = (__runInitializers(this, _memberId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.evaluationDate = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _evaluationDate_initializers, void 0));
            this.projectName = (__runInitializers(this, _evaluationDate_extraInitializers), __runInitializers(this, _projectName_initializers, void 0));
            this.technicalSkill = (__runInitializers(this, _projectName_extraInitializers), __runInitializers(this, _technicalSkill_initializers, void 0));
            this.communicationSkill = (__runInitializers(this, _technicalSkill_extraInitializers), __runInitializers(this, _communicationSkill_initializers, void 0));
            this.teamworkSkill = (__runInitializers(this, _communicationSkill_extraInitializers), __runInitializers(this, _teamworkSkill_initializers, void 0));
            this.leadershipSkill = (__runInitializers(this, _teamworkSkill_extraInitializers), __runInitializers(this, _leadershipSkill_initializers, void 0));
            this.overallRating = (__runInitializers(this, _leadershipSkill_extraInitializers), __runInitializers(this, _overallRating_initializers, void 0));
            this.strengths = (__runInitializers(this, _overallRating_extraInitializers), __runInitializers(this, _strengths_initializers, void 0));
            this.weaknesses = (__runInitializers(this, _strengths_extraInitializers), __runInitializers(this, _weaknesses_initializers, void 0));
            this.comments = (__runInitializers(this, _weaknesses_extraInitializers), __runInitializers(this, _comments_initializers, void 0));
            this.createdAt = (__runInitializers(this, _comments_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            // リレーションシップ
            this.member = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _member_initializers, void 0));
            this.user = (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            __runInitializers(this, _user_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MemberEvaluation");
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
        _userId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => User_1.default), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false
            })];
        _evaluationDate_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DATEONLY,
                allowNull: false,
                defaultValue: sequelize_typescript_1.DataType.NOW
            })];
        _projectName_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING(100),
                allowNull: false
            })];
        _technicalSkill_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5
                }
            })];
        _communicationSkill_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5
                }
            })];
        _teamworkSkill_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5
                }
            })];
        _leadershipSkill_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5
                }
            })];
        _overallRating_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5
                }
            })];
        _strengths_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _weaknesses_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.TEXT,
                allowNull: true
            })];
        _comments_decorators = [(0, sequelize_typescript_1.Column)({
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
        _member_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => Member_1.default)];
        _user_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => User_1.default)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _memberId_decorators, { kind: "field", name: "memberId", static: false, private: false, access: { has: obj => "memberId" in obj, get: obj => obj.memberId, set: (obj, value) => { obj.memberId = value; } }, metadata: _metadata }, _memberId_initializers, _memberId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _evaluationDate_decorators, { kind: "field", name: "evaluationDate", static: false, private: false, access: { has: obj => "evaluationDate" in obj, get: obj => obj.evaluationDate, set: (obj, value) => { obj.evaluationDate = value; } }, metadata: _metadata }, _evaluationDate_initializers, _evaluationDate_extraInitializers);
        __esDecorate(null, null, _projectName_decorators, { kind: "field", name: "projectName", static: false, private: false, access: { has: obj => "projectName" in obj, get: obj => obj.projectName, set: (obj, value) => { obj.projectName = value; } }, metadata: _metadata }, _projectName_initializers, _projectName_extraInitializers);
        __esDecorate(null, null, _technicalSkill_decorators, { kind: "field", name: "technicalSkill", static: false, private: false, access: { has: obj => "technicalSkill" in obj, get: obj => obj.technicalSkill, set: (obj, value) => { obj.technicalSkill = value; } }, metadata: _metadata }, _technicalSkill_initializers, _technicalSkill_extraInitializers);
        __esDecorate(null, null, _communicationSkill_decorators, { kind: "field", name: "communicationSkill", static: false, private: false, access: { has: obj => "communicationSkill" in obj, get: obj => obj.communicationSkill, set: (obj, value) => { obj.communicationSkill = value; } }, metadata: _metadata }, _communicationSkill_initializers, _communicationSkill_extraInitializers);
        __esDecorate(null, null, _teamworkSkill_decorators, { kind: "field", name: "teamworkSkill", static: false, private: false, access: { has: obj => "teamworkSkill" in obj, get: obj => obj.teamworkSkill, set: (obj, value) => { obj.teamworkSkill = value; } }, metadata: _metadata }, _teamworkSkill_initializers, _teamworkSkill_extraInitializers);
        __esDecorate(null, null, _leadershipSkill_decorators, { kind: "field", name: "leadershipSkill", static: false, private: false, access: { has: obj => "leadershipSkill" in obj, get: obj => obj.leadershipSkill, set: (obj, value) => { obj.leadershipSkill = value; } }, metadata: _metadata }, _leadershipSkill_initializers, _leadershipSkill_extraInitializers);
        __esDecorate(null, null, _overallRating_decorators, { kind: "field", name: "overallRating", static: false, private: false, access: { has: obj => "overallRating" in obj, get: obj => obj.overallRating, set: (obj, value) => { obj.overallRating = value; } }, metadata: _metadata }, _overallRating_initializers, _overallRating_extraInitializers);
        __esDecorate(null, null, _strengths_decorators, { kind: "field", name: "strengths", static: false, private: false, access: { has: obj => "strengths" in obj, get: obj => obj.strengths, set: (obj, value) => { obj.strengths = value; } }, metadata: _metadata }, _strengths_initializers, _strengths_extraInitializers);
        __esDecorate(null, null, _weaknesses_decorators, { kind: "field", name: "weaknesses", static: false, private: false, access: { has: obj => "weaknesses" in obj, get: obj => obj.weaknesses, set: (obj, value) => { obj.weaknesses = value; } }, metadata: _metadata }, _weaknesses_initializers, _weaknesses_extraInitializers);
        __esDecorate(null, null, _comments_decorators, { kind: "field", name: "comments", static: false, private: false, access: { has: obj => "comments" in obj, get: obj => obj.comments, set: (obj, value) => { obj.comments = value; } }, metadata: _metadata }, _comments_initializers, _comments_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _member_decorators, { kind: "field", name: "member", static: false, private: false, access: { has: obj => "member" in obj, get: obj => obj.member, set: (obj, value) => { obj.member = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MemberEvaluation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MemberEvaluation = _classThis;
})();
exports.default = MemberEvaluation;
