db.campaigns.find(
    {
        $and: [
            { "rules.UsageLimit.value" : { $eq: 1 } },
            { "rules.MultipleCoupons.value.coupons.timesUsed" : { $gt: 1} },
            { "active": true},
            { "end_at": { $lte : new ISODate() }}
        ]
    }
).count();
