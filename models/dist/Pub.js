"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Pub = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var Pub = /** @class */ (function () {
    function Pub() {
    }
    __decorate([
        typegoose_1.prop()
    ], Pub.prototype, "name");
    __decorate([
        typegoose_1.prop()
    ], Pub.prototype, "drink");
    __decorate([
        typegoose_1.prop()
    ], Pub.prototype, "price");
    __decorate([
        typegoose_1.prop()
    ], Pub.prototype, "full_address");
    __decorate([
        typegoose_1.prop()
    ], Pub.prototype, "address");
    __decorate([
        typegoose_1.prop()
    ], Pub.prototype, "borough");
    __decorate([
        typegoose_1.prop()
    ], Pub.prototype, "type");
    __decorate([
        typegoose_1.prop({ "default": { lat: "", lon: "" } })
    ], Pub.prototype, "coordinates");
    __decorate([
        typegoose_1.prop({ "default": function () { return new Date(); } })
    ], Pub.prototype, "date");
    return Pub;
}());
exports.Pub = Pub;
