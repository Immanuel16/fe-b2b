// TODO: combine both regex validation into passwordRegex
const passwordWithSymbolRegex =
  /^(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=]).*$/g;

const passwordWithCapitalRegex = /^(?=.*[A-Z]).*$/g;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export { passwordWithCapitalRegex, passwordWithSymbolRegex, passwordRegex };
