import axios from 'axios';
import {openDB} from 'idb';

function initDB(store) {
    return openDB('reminder-dn', 2, {
        upgrade(db) {
            db.createObjectStore(store);
        }
    })
}

async function getJson(url) {
    const res = await axios.get(url);
    return res.data;
}

async function cacheAll(store, items) {
    const db = await initDB(store);
    const tx = db.transaction(store, 'readwrite');
    items.forEach(item => {
        tx.store.put(item, item._id);
    });
    await tx.done;
}

async function cacheOne(store, item) {
    const db = await initDB(store);
    await db.put(store, item, item._id);
}

export async function getAll(url, store) {
    const db = await initDB(store);
    let items = await db.getAll(store);
    if (items.length === 0) {
        items = await getJson(url);
        await cacheAll(store, items);
    }
    return items;
}

export async function getOne(url, store, id) {
    const db = await initDB(store);
    let item = await db.get(store, id);
    if (item == undefined) {
        item = await getJson(url);
        await cacheOne(store, item);
    }
    return item;
}

export async function addOne(url, store, item) {
    const res = await axios.put(url, item)
    if (res.status == 200 || res.status == 201) {
        const db = await initDB(store);
        db.add(store, res.data, res.data._id);
        return res.data;
    } else {
        throw 'Not OK or created response';
    }
}