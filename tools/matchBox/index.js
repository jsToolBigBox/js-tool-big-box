const matchBox = {
    email: function(val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val);
    },
    phone: function(val) {
        const phoneRegex = /^1[3456789]\d{9}$/;
        return phoneRegex.test(val);
    },
    url: function(val) {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(val);
    },
    idCard: function(val) {
        const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return idCardRegex.test(val);
    },
    ip: function(val) {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
        return ipRegex.test(val);
    },
    postal: function(val) {
        const postalCodeRegex = /^[0-9]\d{5}$/;
        return postalCodeRegex.test(val);
    },
    checkUnicode: function(str) {
        const regex = /^[\s\S]$/u;
        return regex.test(str);
    },
    checkPasswordStrength: function(password) {
        let strength = 0;
        if (!password || password.length < 6) {
          strength = 0;
          return strength;
        }
        if (/[a-z]/.test(password)) {
          strength += 1;
        }
        if (/[A-Z]/.test(password)) {
          strength += 1;
        }
        if (/\d/.test(password)) {
          strength += 1;
        }
        if (/[\W_]/.test(password)) {
          strength += 1;
        }
        return strength;
    }
}
export default matchBox;