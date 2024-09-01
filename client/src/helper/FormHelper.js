let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
let EmailRegx = /\S+@\S+\.\S+/;

class FormHelper {
    IsEmpty(value) {
        return value.length === 0;
    }

    IsEmail(value) {
        return EmailRegx.test(value);
    }

    IsMobile(value) {
        return MobileRegx.test(value);
    }

    getBaseUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (err) => reject(err)
        })
    }
}

export const {IsEmpty, IsEmail, IsMobile, getBaseUrl} = new FormHelper()