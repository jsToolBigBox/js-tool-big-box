const eventBox = {
    debounce: function(func, delay) {
        delay = delay || 300;
        let timeoutId;

        return function() {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        };
    },
    throttle: function(func, delay) {
        delay = delay || 300;
        let lastCalledTime = 0;

        return function() {
            const now = Date.now();

            if (now - lastCalledTime >= delay) {
                func.apply(this, arguments);
                lastCalledTime = now;
            }
        };
    },
}
export default eventBox;