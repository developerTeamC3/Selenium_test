describe('test accountHelpers', function() {
    it('test accountHelpers.isDateEnabledCoupon', function(done) {
        let date = new Date();
        let result = accountHelpers.isDateEnabledCoupon(date);
        assert.equal(result, true);
        done();
    })
})