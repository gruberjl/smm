"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PouchDB = require("pouchdb");
const uuid = require("uuid/v4");
const secret = require("../../secret.js");
const workspace = {
    _id: uuid(),
    dbName: 'workspace1',
    interactionsDbName: 'interactions1'
};
const account = {
    _id: uuid(),
    token: secret.twitterAccessToken,
    tokenSecret: secret.twitterTokenSecret,
    provider: 'twitter'
};
const channel = {
    _id: uuid(),
    docType: 'channel',
    name: 'Office 365',
    dbName: 'channel0'
};
const connector = {
    _id: uuid(),
    docType: 'connector',
    name: 'Twitter @gruberjl',
    account: account._id,
    provider: 'twitter',
    accountName: 'gruberjl',
    image: 'https://pbs.twimg.com/profile_images/828784665083465728/4ungbkuP_normal.jpg'
};
const workflow = {
    _id: uuid(),
    docType: 'workflow',
    name: 'Twitter @Gruberjl to Office365',
    connector: connector._id,
    channel: channel._id,
    action: 'search',
    refiners: {
        language: 'en',
        search: '#office365 #microsoft',
        resultType: 'recent',
        fromPopularity: 1000,
        includeShares: false
    }
};
const start = () => __awaiter(this, void 0, void 0, function* () {
    const url = `http://${secret.dbAdmin}:${secret.dbPassword}@10.0.75.1:5984/`;
    const workspacesDB = new PouchDB(`${url}workspaces`);
    const interactionsDB = new PouchDB(`${url}${workspace.interactionsDbName}`);
    const workspaceDB = new PouchDB(`${url}${workspace.dbName}`);
    const accountsDB = new PouchDB(`${url}accounts`);
    const channelDb = new PouchDB(`${url}${channel.dbName}`);
    try {
        yield workspacesDB.put(workspace);
        yield interactionsDB.info();
        yield accountsDB.put(account);
        yield workspaceDB.put(channel);
        yield channelDb.info();
        yield workspaceDB.put(workflow);
        yield workspaceDB.put(connector);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        workspacesDB.close();
        workspaceDB.close();
        accountsDB.close();
    }
});
start();
//# sourceMappingURL=seed.js.map