
db.campaigns.aggregate([
    {
        $match: {
            "rules.UsageLimit.value" : { $gt: 1 },
            "rules.MultipleCoupons.value.coupons.timesUsed" : { $gt: 1},
            "active": true,
            "end_at": { $gte : new ISODate() }
        }
    },
    {
        $unwind: "$rules.MultipleCoupons.value.coupons"
    },
    {
        $match: {
            "rules.MultipleCoupons.value.coupons.timesUsed" : { $gt: 1},
        }
    },
    {
        $project: {
            _id : "$_id",
            limit_exceeded: {
                $gt: [
                    "$rules.MultipleCoupons.value.coupons.timesUsed",
                    "$rules.UsageLimit.value"
                ]
            },
            times_used: "$rules.MultipleCoupons.value.coupons.timesUsed"
        }
    },{
        $match: {
            limit_exceeded: true
        }
    },{
        $group: {
            _id: "$_id",
            total : { $sum : "$times_used" }
        }
    }
]);


db.campaigns.aggregate([
    {
        $match: {
            "rules.UsageLimit.value" : { $gt: 1 },
            "rules.MultipleCoupons.value.coupons.timesUsed" : { $gt: 1},
            "active": true,
            "end_at": { $gte : new ISODate() }
        }
    },
    {
        $unwind: "$rules.MultipleCoupons.value.coupons"
    },
    {
        $match: {
            "rules.MultipleCoupons.value.coupons.timesUsed" : { $gt: 1},
        }
    },
    {
        $project: {
            _id : "$_id",
            limit_exceeded: {
                $gt: [
                    "$rules.MultipleCoupons.value.coupons.timesUsed",
                    "$rules.UsageLimit.value"
                ]
            },
            usage_limit: "$rules.UsageLimit.value",
            times_used: "$rules.MultipleCoupons.value.coupons.timesUsed",
            coupon: "$rules.MultipleCoupons.value.coupons.coupon"
        }
    },{
        $match: {
            "limit_exceeded": true
        }
    },{
        $project: {
            coupon: 1,
            times_used: 1,
            usage_limit: 1
        }
    }
]);

//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

db.campaigns.aggregate([
    {
        $match: {
            "rules.UsageLimit.value" : { $gte: 1 },
            "rules.MultipleCoupons.value.coupons.timesUsed" : { $gte: 1},
            "active": true,
            "end_at": { $lte : new ISODate() }
        }
    },
    {
        $unwind: "$rules.MultipleCoupons.value.coupons"
    },
    {
        $match: {
            "rules.MultipleCoupons.value.coupons.timesUsed" : { $gt: 1},
        }
    },
    {
        $project: {
            _id : "$_id",
            limit_exceeded: {
                $gt: [
                    "$rules.MultipleCoupons.value.coupons.timesUsed",
                    "$rules.UsageLimit.value"
                ]
            },
            usage_limit: "$rules.UsageLimit.value",
            times_used: "$rules.MultipleCoupons.value.coupons.timesUsed",
            coupon: "$rules.MultipleCoupons.value.coupons.coupon"
        }
    },{
        $match: {
            "limit_exceeded": true
        }
    },{
        $project: {
            _id: 1,
            coupon: 1,
            times_used: 1,
            usage_limit: 1
        }
    }
]);