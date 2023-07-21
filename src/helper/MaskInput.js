const GetMaskInput = (value) => {
    return value.replace(/.(?=.{4})/g, 'x');
}
export default GetMaskInput;