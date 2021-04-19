import {
    request
} from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getComment() {
    return request({
        url: '/recommend'
    })
}
//
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title,
            this.desc = itemInfo.desc,
            this.newPrice = itemInfo.price,
            this.oldPrice = itemInfo.oldPrice,
            this.discountDesc = itemInfo.discountDesc,
            this.columns = columns,
            this.services = services,
            this.realPrice = itemInfo.lowNowPrice
    }
}

//商铺信息
export class Shop {
    constructor(shopInfo) {
        this.shopLogo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.score = shopInfo.score;
        this.cSells = shopInfo.cSells;
        this.cGoods = shopInfo.cGoods;
    }
}
//参数信息
export class Param {
    constructor(info, rule) {
        this.info = info.set;
        this.rule = rule.tables;
    }
}