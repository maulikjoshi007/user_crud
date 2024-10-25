
//
// get the errors
//
const getErrors = async (rules: any) => {
    var errors: any = {};
    if (rules.error) {

        for (var e of rules.error.details) {
            let key: string = e.context.label;
            errors[key] = e.message.replace(/['"]+/g, '');
        }

    }

    return errors;

}

export = getErrors;